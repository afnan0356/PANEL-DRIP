import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateEmail,
  updatePassword,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  getDocFromServer,
  collection,
  getDocs,
  query,
  where,
  onSnapshot
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { UserAccount, OrderDetails, ProductReview } from '../types';

// Initialize Firebase Application
const app = initializeApp(firebaseConfig);

// Initialize Firestore with database instance ID
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// Initialize Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Enum for Operation Types as specified in error handling guide
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map((provider) => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error Details: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Connectivity Test Function as required by Firebase skill
export async function testConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log('Firebase connection verified.');
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration: client is offline.');
    } else {
      console.log('Firebase server responded (test connection checked).');
    }
    return false;
  }
}

// Firebase Auth & Firestore User Helpers
export async function signInWithGoogle(): Promise<UserAccount> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const fbUser = result.user;
    return await syncUserProfile(fbUser);
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
}

export async function syncUserProfile(fbUser: FirebaseUser): Promise<UserAccount> {
  const userRef = doc(db, 'users', fbUser.uid);
  const pathName = `users/${fbUser.uid}`;
  const nowIso = new Date().toISOString();
  
  try {
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      const existingData = docSnap.data() as UserAccount;
      const rawName = existingData.name || fbUser.displayName || 'Collector';
      const cleanName = rawName.toLowerCase().replace(/[^a-z0-9]/g, '');
      const defaultUsername = `@${cleanName || 'user'}_${fbUser.uid.substring(0, 4)}`;
      
      const updatedUser: UserAccount = {
        ...existingData,
        email: fbUser.email || existingData.email,
        emailVerified: fbUser.emailVerified,
        lastLoginAt: nowIso,
        username: existingData.username || defaultUsername,
        avatar: existingData.avatar || fbUser.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
      };
      await setDoc(userRef, updatedUser, { merge: true });
      return updatedUser;
    } else {
      const rawName = fbUser.displayName || 'Collector';
      const cleanName = rawName.toLowerCase().replace(/[^a-z0-9]/g, '');
      const generatedUsername = `@${cleanName || 'user'}_${fbUser.uid.substring(0, 4)}`;

      const newUser: UserAccount = {
        id: fbUser.uid,
        name: rawName,
        username: generatedUsername,
        email: fbUser.email || 'collector@paneldrip.com',
        avatar: fbUser.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        loyaltyPoints: 100, // 100 welcome points
        membershipTier: 'Free',
        totalSpentUSD: 0,
        referralCode: `PANEL-${fbUser.uid.substring(0, 5).toUpperCase()}`,
        referralCount: 0,
        referralEarningsPoints: 0,
        dailyStreak: 1,
        lastCheckInDate: new Date().toISOString().split('T')[0],
        spinWheelLastUsed: null,
        createdAt: nowIso,
        lastLoginAt: nowIso,
        emailVerified: fbUser.emailVerified,
        savedAddresses: [],
        giftRewardsHistory: []
      };
      await setDoc(userRef, newUser);
      return newUser;
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, pathName);
  }
}

export async function sendPasswordReset(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email);
}

export async function triggerEmailVerification(): Promise<void> {
  if (auth.currentUser) {
    await sendEmailVerification(auth.currentUser);
  } else {
    throw new Error('No logged in user found for email verification.');
  }
}

export async function updateUserEmail(newEmail: string): Promise<void> {
  if (auth.currentUser) {
    await updateEmail(auth.currentUser, newEmail);
  } else {
    throw new Error('No authenticated user session.');
  }
}

export async function updateUserPassword(newPassword: string): Promise<void> {
  if (auth.currentUser) {
    await updatePassword(auth.currentUser, newPassword);
  } else {
    throw new Error('No authenticated user session.');
  }
}

export async function checkUsernameAvailable(username: string, currentUid?: string): Promise<boolean> {
  const formatted = username.startsWith('@') ? username : `@${username}`;
  try {
    const q = query(collection(db, 'users'), where('username', '==', formatted));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return true;
    // If the only document with this username is the current user's document, it's valid
    if (currentUid && snapshot.docs.length === 1 && snapshot.docs[0].id === currentUid) {
      return true;
    }
    return false;
  } catch (err) {
    console.error('Error checking username availability:', err);
    return true; // fallback
  }
}

export async function saveUserToFirestore(user: UserAccount): Promise<void> {
  const pathName = `users/${user.id}`;
  try {
    const userRef = doc(db, 'users', user.id);
    await setDoc(userRef, user, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, pathName);
  }
}

export async function saveOrderToFirestore(order: OrderDetails): Promise<void> {
  const pathName = `orders/${order.orderId}`;
  try {
    const orderRef = doc(db, 'orders', order.orderId);
    await setDoc(orderRef, order);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, pathName);
  }
}

export async function fetchUserOrdersFromFirestore(userId: string): Promise<OrderDetails[]> {
  const pathName = 'orders';
  try {
    const ordersQuery = query(collection(db, 'orders'), where('userId', '==', userId));
    const snapshot = await getDocs(ordersQuery);
    return snapshot.docs.map((d) => d.data() as OrderDetails);
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, pathName);
  }
}

export async function saveWishlistToFirestore(userId: string, productIds: string[]): Promise<void> {
  const pathName = `wishlists/${userId}`;
  try {
    const wishlistRef = doc(db, 'wishlists', userId);
    await setDoc(wishlistRef, { userId, productIds, updatedAt: new Date().toISOString() });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, pathName);
  }
}

export async function saveReviewToFirestore(review: ProductReview, productId: string, userId: string): Promise<void> {
  const pathName = `reviews/${review.id}`;
  try {
    const reviewRef = doc(db, 'reviews', review.id);
    await setDoc(reviewRef, {
      id: review.id,
      productId,
      userId,
      userName: review.userName,
      userBadge: review.userBadge || 'Verified Collector',
      rating: review.rating,
      title: review.title,
      comment: review.comment,
      helpfulCount: review.helpfulCount || 0,
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, pathName);
  }
}

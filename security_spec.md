# Security Specification for Firestore Rules

## Data Invariants
1. A User profile can only be read, created, or modified by the user themselves (`request.auth.uid == userId`).
2. Orders belong strictly to a user (`userId == request.auth.uid`). Users can only query and read their own orders.
3. Wishlists belong strictly to a user (`request.auth.uid == userId`).
4. Product Reviews are readable by anyone, but only created or modified by an authenticated user who owns the `userId` field.
5. The `/test/connection` path is readable for connection diagnostics.

## The Dirty Dozen Payloads (Targeting Rejection via PERMISSION_DENIED)
1. **Unauthenticated User Profile Read**: Attempting to read `/users/otherUid` without auth.
2. **Cross-User Profile Update**: User `A` attempting to edit `/users/userB`.
3. **Order Impersonation**: User `A` creating an order with `userId: "userB"`.
4. **Order Scraping**: User `A` listing orders without filtering by `userId == "userA"`.
5. **Wishlist Hijack**: User `A` writing to `/wishlists/userB`.
6. **Review Identity Spoofing**: User `A` posting a review with `userId: "userB"`.
7. **Malformed ID Injection**: Writing to document ID with oversized 200-character payload.
8. **Junk Field Injection**: Writing an order with unexpected shadow keys.
9. **Invalid Rating Boundary**: Submitting a review rating of 999.
10. **Unauthenticated Write**: Writing to `/users/any` without auth token.
11. **Negative Loyalty Points Injection**: Setting `loyaltyPoints: -50000`.
12. **Status Privilege Escalation**: Non-owner altering order status to "Delivered" arbitrarily.

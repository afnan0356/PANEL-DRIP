import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, Key, CheckCircle, Sparkles, ArrowRight, ShieldCheck, Gift, AlertCircle, AtSign } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalTab,
    setAuthModalTab,
    loginUser,
    signupUser,
    loginWithGoogle,
    sendPasswordResetLink
  } = useShop();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isResetSent, setIsResetSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      if (authModalTab === 'login') {
        const res = await loginUser(email, password);
        if (!res.success && res.message) {
          setErrorMessage(res.message);
        }
      } else if (authModalTab === 'register') {
        const cleanUsername = username ? (username.startsWith('@') ? username : `@${username}`) : undefined;
        const res = await signupUser(name, email, password, cleanUsername);
        if (!res.success && res.message) {
          setErrorMessage(res.message);
        }
      } else if (authModalTab === 'forgot') {
        const res = await sendPasswordResetLink(email);
        if (res.success) {
          setIsResetSent(true);
        } else {
          setErrorMessage(res.message);
        }
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage(null);
    setLoading(true);
    try {
      await loginWithGoogle();
    } catch (err: any) {
      setErrorMessage(err.message || 'Google Sign In failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoLogin = () => {
    loginUser('ren.joker@paneldrip.com', 'demo1234');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md overflow-hidden bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl text-white"
        >
          {/* Header gradient banner */}
          <div className="relative p-6 bg-gradient-to-br from-amber-500/20 via-purple-600/20 to-neutral-900 border-b border-neutral-800 text-center">
            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white bg-neutral-800/60 hover:bg-neutral-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center justify-center w-12 h-12 mb-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400">
              <Sparkles className="w-6 h-6" />
            </div>

            <h2 className="text-2xl font-black tracking-tight uppercase font-mono">
              {authModalTab === 'login' && 'Collector Portal Log In'}
              {authModalTab === 'register' && 'Join Panel & Drip Club'}
              {authModalTab === 'forgot' && 'Reset Account Password'}
            </h2>
            <p className="mt-1 text-xs text-neutral-400">
              {authModalTab === 'login' && 'Access order tracking, wishlist collections & loyalty perks'}
              {authModalTab === 'register' && 'Unlock 100 Welcome Points + VIP Tier discounts instantly'}
              {authModalTab === 'forgot' && 'Enter your registered email to receive a secure recovery code'}
            </p>
          </div>

          {/* Quick Demo Login Pill Banner */}
          <div className="p-3 bg-amber-500/10 border-b border-amber-500/20 flex items-center justify-between px-6 text-xs text-amber-300">
            <span className="flex items-center gap-1.5 font-medium">
              <Gift className="w-4 h-4 text-amber-400" /> Demo VIP Collector Account Available
            </span>
            <button
              onClick={handleQuickDemoLogin}
              className="px-2.5 py-1 bg-amber-500 text-neutral-950 font-bold rounded-lg hover:bg-amber-400 transition-all text-[11px]"
            >
              One-Click Demo Sign In
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-neutral-800 text-sm font-semibold">
            <button
              onClick={() => {
                setAuthModalTab('login');
                setIsResetSent(false);
                setErrorMessage(null);
              }}
              className={`flex-1 py-3 border-b-2 transition-colors ${
                authModalTab === 'login'
                  ? 'border-amber-400 text-amber-400 bg-neutral-800/40'
                  : 'border-transparent text-neutral-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setAuthModalTab('register');
                setIsResetSent(false);
                setErrorMessage(null);
              }}
              className={`flex-1 py-3 border-b-2 transition-colors ${
                authModalTab === 'register'
                  ? 'border-amber-400 text-amber-400 bg-neutral-800/40'
                  : 'border-transparent text-neutral-400 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6">
            {errorMessage && (
              <div className="mb-4 p-3 bg-red-950/60 border border-red-800/80 rounded-xl flex items-start gap-2.5 text-xs text-red-300">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {isResetSent ? (
              <div className="py-6 text-center space-y-4">
                <div className="w-12 h-12 mx-auto bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold">Password Reset Instructions Sent</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  We sent a recovery link to <span className="text-amber-400 font-mono">{email}</span>. Please check your inbox or spam folder.
                </p>
                <button
                  onClick={() => {
                    setIsResetSent(false);
                    setAuthModalTab('login');
                  }}
                  className="w-full py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl font-bold text-sm transition-all"
                >
                  Return to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Google Sign In Button */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full py-2.5 px-4 bg-white text-neutral-900 hover:bg-neutral-100 font-semibold rounded-xl transition-all flex items-center justify-center gap-2.5 text-sm shadow-md cursor-pointer disabled:opacity-50"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  Continue with Google
                </button>

                <div className="flex items-center gap-3 my-2">
                  <div className="flex-1 h-px bg-neutral-800" />
                  <span className="text-[11px] font-semibold tracking-wider text-neutral-500 uppercase">Or Email</span>
                  <div className="flex-1 h-px bg-neutral-800" />
                </div>
                {authModalTab === 'register' && (
                  <>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1">
                        Full Name / Collector Tag
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-4 h-4 text-neutral-500" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Ren Amamiya"
                          className="w-full pl-9 pr-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm focus:outline-none focus:border-amber-400 text-white placeholder-neutral-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1">
                        Unique Username
                      </label>
                      <div className="relative">
                        <AtSign className="absolute left-3 top-3 w-4 h-4 text-neutral-500" />
                        <input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_@]/g, ''))}
                          placeholder="@joker_ren"
                          className="w-full pl-9 pr-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm focus:outline-none focus:border-amber-400 text-white placeholder-neutral-600 font-mono"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-neutral-500" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-9 pr-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm focus:outline-none focus:border-amber-400 text-white placeholder-neutral-600"
                    />
                  </div>
                </div>

                {authModalTab !== 'forgot' && (
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400">
                        Password
                      </label>
                      {authModalTab === 'login' && (
                        <button
                          type="button"
                          onClick={() => setAuthModalTab('forgot')}
                          className="text-xs text-amber-400 hover:underline"
                        >
                          Forgot Password?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-4 h-4 text-neutral-500" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-9 pr-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm focus:outline-none focus:border-amber-400 text-white placeholder-neutral-600"
                      />
                    </div>
                  </div>
                )}

                {authModalTab === 'login' && (
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-neutral-700 bg-neutral-950 text-amber-500 focus:ring-amber-400"
                    />
                    <label htmlFor="rememberMe" className="text-xs text-neutral-400 select-none cursor-pointer">
                      Remember me on this browser session
                    </label>
                  </div>
                )}

                {authModalTab === 'register' && (
                  <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-neutral-400 space-y-1">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                      <ShieldCheck className="w-4 h-4" /> Instant Email Verification Included
                    </div>
                    <p className="text-[11px]">
                      By joining, you agree to receive club drop alerts and earn 1 point per $1 spent.
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-black tracking-wide rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 uppercase font-mono disabled:opacity-50"
                >
                  {authModalTab === 'login' && 'Sign In to Account'}
                  {authModalTab === 'register' && 'Create Free Account'}
                  {authModalTab === 'forgot' && 'Send Reset Link'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

import React, { useState } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
} from 'firebase/auth';
import { auth } from './firebase';

interface LoginProps {
  onLogin: (email: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  function validateEmail(e: string) {
    return /@htu\.edu$/.test(e);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Please enter a valid HTU school email ending in @htu.edu.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }
    setError('');

    // --- Firebase Auth path ---
    if (auth) {
      setLoading(true);
      try {
        await setPersistence(auth, keepSignedIn ? browserLocalPersistence : browserSessionPersistence);
        try {
          await signInWithEmailAndPassword(auth, email, password);
        } catch (signInErr: any) {
          // Account doesn't exist yet — create it on first use
          if (
            signInErr.code === 'auth/user-not-found' ||
            signInErr.code === 'auth/invalid-credential' ||
            signInErr.code === 'auth/invalid-email'
          ) {
            await createUserWithEmailAndPassword(auth, email, password);
          } else if (signInErr.code === 'auth/wrong-password' || signInErr.code === 'auth/too-many-requests') {
            setError('Incorrect password. Please try again.');
            setLoading(false);
            return;
          } else {
            throw signInErr;
          }
        }
        // onAuthStateChanged in App.tsx will handle the rest
        onLogin(email);
      } catch (err: any) {
        if (err.code === 'auth/email-already-in-use') {
          setError('Incorrect password. Please try again.');
        } else if (err.code === 'auth/weak-password') {
          setError('Password must be at least 6 characters.');
        } else {
          setError('Login failed. Please check your credentials.');
        }
        setLoading(false);
      }
      return;
    }

    // --- Fallback (no Firebase, e.g. tests) ---
    if (keepSignedIn) {
      localStorage.setItem('laundryAppUser', email);
    } else {
      localStorage.removeItem('laundryAppUser');
    }
    onLogin(email);
  }

  return (
    <div className="login-container large-login">
      <img src="/htu-logo.png" alt="Huston-Tillotson University" className="login-htu-logo" />
      <h2 style={{ textAlign: 'center', marginBottom: 8 }}>HT Laundry — Student Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email" className="login-label">School Email</label>
          <input
            id="email"
            className="login-input"
            type="email"
            placeholder="School Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="login-label">Password</label>
          <input
            id="password"
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={keepSignedIn}
              onChange={e => setKeepSignedIn(e.target.checked)}
              style={{ marginRight: 8 }}
            />
            Keep me signed in
          </label>
        </div>
        <button className="btn login-btn" type="submit" disabled={loading}>
          {loading ? 'Signing in…' : 'Login'}
        </button>
      </form>
      {error && <div className="error" style={{ color: '#ff6b6b', marginTop: 8 }}>{error}</div>}
    </div>
  );
}

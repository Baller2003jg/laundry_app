import React, { useState } from 'react';

interface LoginProps {
  onLogin: (email: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  function validateEmail(email: string) {
    // Require school email to end with '@htu.edu'
    return /@htu\.edu$/.test(email);
  }

  function handleSubmit(e: React.FormEvent) {
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
    if (keepSignedIn) {
      localStorage.setItem('laundryAppUser', email);
    } else {
      localStorage.removeItem('laundryAppUser');
    }
    onLogin(email);
  }

  return (
    <div className="login-container large-login">
      <h2>Student Login</h2>
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
        <button className="btn login-btn" type="submit">Login</button>
      </form>
      {error && <div className="error" style={{ color: 'red', marginTop: 8 }}>{error}</div>}
    </div>
  );
}

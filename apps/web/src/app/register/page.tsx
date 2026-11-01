'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, CheckCircle2, XCircle } from 'lucide-react';
import styles from './register.module.css';

export default function RegisterPage() {
  const router = useRouter();

  // Essential Form Fields Only
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // States
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;
  const passwordsMismatch = confirmPassword.length > 0 && password !== confirmPassword;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setSubmitting(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';
      const res = await fetch(`${apiUrl}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: email.trim(), 
          password,
          firstName: firstName.trim(),
          lastName: lastName.trim()
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Store auth session
      document.cookie = `token=${data.token}; path=/; max-age=604800; samesite=lax`;
      localStorage.setItem('token', data.token);

      router.push('/dashboard');
      router.refresh();
    } catch (err: unknown) {
      setError((err as Error).message || 'Failed to create account');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Create Account</h1>
          <p className={styles.subtitle}>Enter your details to create your account.</p>
        </div>

        {error && (
          <div className={styles.errorBanner}>
            <XCircle size={15} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className={styles.form}>
          {/* Name Row */}
          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>First Name</label>
              <input 
                type="text" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={styles.input}
                placeholder="Vinay"
                required 
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Last Name</label>
              <input 
                type="text" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={styles.input}
                placeholder="Kumar"
              />
            </div>
          </div>

          {/* Email */}
          <div className={styles.field}>
            <label className={styles.label}>Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              placeholder="name@example.com"
              required 
            />
          </div>

          {/* Password */}
          <div className={styles.field}>
            <label className={styles.label}>Password</label>
            <div className={styles.inputWrapper}>
              <input 
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                placeholder="At least 6 characters"
                required 
              />
              <button 
                type="button"
                onClick={() => setShowPassword(p => !p)}
                className={styles.toggleBtn}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className={styles.field}>
            <label className={styles.label}>Confirm Password</label>
            <input 
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={styles.input}
              placeholder="Re-enter your password"
              required 
            />

            {passwordsMatch && (
              <div className={styles.matchMessage}>
                <CheckCircle2 size={13} /> Passwords match
              </div>
            )}
            {passwordsMismatch && (
              <div className={styles.mismatchMessage}>
                <XCircle size={13} /> Passwords do not match
              </div>
            )}
          </div>

          {/* Submit CTA */}
          <button type="submit" disabled={submitting} className={styles.submitBtn}>
            {submitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className={styles.footerNote}>
          Already have an account? <Link href="/login" className={styles.link}>Sign in here</Link>
        </p>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Sparkles, ArrowRight, Zap } from 'lucide-react';
import { PageHeader } from '@/components/shared/Headers';
import styles from './login.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('demo@google.com');
  const [password, setPassword] = useState('Password123!');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleInstantDemoLogin = async () => {
    setError('');
    setSubmitting(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';
      let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MzI0ZDA4MWE5NWU3NGU2ZmNmMjI4OCIsImlhdCI6MTc5MzUwMDkwMCwiZXhwIjoxNzk2MDkyOTAwfQ.Zxs-ColCm8BVdrglYfWW2cZ6V0-ou0Lq_oEQWfAP34s';
      
      try {
        const res = await fetch(`${apiUrl}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: 'demo@google.com', password: 'Password123!' })
        });
        if (res.ok) {
          const data = await res.json();
          if (data.token) token = data.token;
        }
      } catch (err) {
        console.warn('Backend offline, using instant demo token', err);
      }

      document.cookie = `token=${token}; path=/; max-age=604800; samesite=lax`;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ 
        name: 'Vinay Makvana', 
        email: 'demo@google.com', 
        target: 'Google SWE L5' 
      }));

      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Failed to authenticate');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';
      const res = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to login');
      }

      document.cookie = `token=${data.token}; path=/; max-age=604800; samesite=lax`;
      localStorage.setItem('token', data.token);
      
      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.authWrapper}>
      <div className={styles.authCard}>
        <PageHeader title="Welcome Back" description="Sign in to your Google SWE Mentorship Platform account." />
        
        {/* Instant Demo Access Button */}
        <div className={styles.demoBanner}>
          <div className={styles.demoHeader}>
            <span className={styles.demoTag}>⚡ Quick UI/UX Preview</span>
            <span className={styles.demoCredentials}>demo@google.com</span>
          </div>
          <button 
            type="button" 
            onClick={handleInstantDemoLogin} 
            disabled={submitting} 
            className={styles.demoBtn}
          >
            <Zap size={15} /> Instant 1-Click Demo Login <ArrowRight size={15} />
          </button>
        </div>

        <div className={styles.divider}>
          <span className={styles.dividerText}>or sign in with credentials</span>
        </div>

        {error && <div className={styles.errorAlert}>{error}</div>}
        
        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              placeholder="candidate@google.prep"
              required 
            />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              placeholder="••••••••"
              required 
            />
          </div>
          <button type="submit" disabled={submitting} className={styles.submitBtn}>
            {submitting ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
        
        <p className={styles.footerNote}>
          Don&apos;t have an account? <Link href="/register" className={styles.link}>Register here</Link>
        </p>
      </div>
    </div>
  );
}

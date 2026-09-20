'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/shared/Headers';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
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

      // Securely store token in cookies for SSR to pick up, and localStorage for client fetches
      document.cookie = `token=${data.token}; path=/; max-age=604800; samesite=lax`;
      localStorage.setItem('token', data.token);
      
      router.push('/dashboard');
      router.refresh(); // Refresh layouts
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-full max-w-md p-8 rounded-xl border border-gray-800 bg-gray-900/50">
        <PageHeader title="Welcome Back" description="Sign in to your Mentorship Platform account." />
        
        {error && <div className="mb-4 p-3 bg-red-900/50 text-red-200 border border-red-800 rounded-md text-sm">{error}</div>}
        
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500"
              required 
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500"
              required 
            />
          </div>
          <button type="submit" className="mt-4 p-2 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors">
            Sign In
          </button>
        </form>
        
        <p className="mt-6 text-sm text-center text-gray-400">
          Don't have an account? <a href="/register" className="text-blue-400 hover:underline">Register here</a>
        </p>
      </div>
    </div>
  );
}

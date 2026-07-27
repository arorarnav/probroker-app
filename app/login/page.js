'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '../../lib/supabaseClient';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);
    if (error) {
      setMessage(error.message);
    } else {
      router.push('/dashboard');
    }
  }

  return (
    <div style={wrap}>
      <div style={card}>
        <h1 style={title}>Log in</h1>
        <form onSubmit={handleLogin}>
          <label style={label}>Email</label>
          <input
            type="email" required value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={input} placeholder="you@example.com"
          />
          <label style={label}>Password</label>
          <input
            type="password" required value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={input} placeholder="Your password"
          />
          <button type="submit" disabled={loading} style={button}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
        {message && <p style={messageStyle}>{message}</p>}
        <p style={switchText}>
          Don&apos;t have an account? <Link href="/signup" style={link}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}

const wrap = { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 };
const card = { width: '100%', maxWidth: 380, background: '#151310', border: '1px solid rgba(245,241,231,0.09)', borderRadius: 14, padding: 32 };
const title = { fontSize: 24, fontWeight: 700, marginBottom: 24 };
const label = { display: 'block', fontSize: 13, color: 'rgba(245,241,231,0.62)', marginBottom: 6, marginTop: 16 };
const input = { width: '100%', padding: '11px 14px', borderRadius: 8, border: '1px solid rgba(245,241,231,0.15)', background: '#0B0A08', color: '#F5F1E7', fontSize: 15, boxSizing: 'border-box' };
const button = { width: '100%', marginTop: 24, padding: '13px', borderRadius: 8, border: 'none', background: '#A67C3D', color: '#0B0A08', fontWeight: 700, fontSize: 15, cursor: 'pointer' };
const messageStyle = { marginTop: 16, fontSize: 14, color: '#D9AD5F' };
const switchText = { marginTop: 20, fontSize: 14, color: 'rgba(245,241,231,0.62)' };
const link = { color: '#D9AD5F', textDecoration: 'underline' };

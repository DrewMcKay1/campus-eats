import { useState } from 'react'
import { supabase } from './supabaseClient'

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700;800&family=Nunito+Sans:opsz,wght@6..12,400;6..12,600;6..12,700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Nunito Sans',sans-serif;background:#1A1F2E;color:#fff;-webkit-font-smoothing:antialiased;}
input{font-family:'Nunito Sans',sans-serif;}
input:focus{outline:none;}
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
.auth-card{animation:fadeUp .3s ease both;}
`

export default function AuthPage() {
  const [mode, setMode] = useState('login')       // 'login' | 'signup' | 'reset'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)    // {type:'error'|'success', text}

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setMessage({ type: 'error', text: error.message })
      // On success, main.jsx picks up the new session automatically

    } else if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) {
        setMessage({ type: 'error', text: error.message })
      } else {
        setMessage({
          type: 'success',
          text: 'Account created! Check your email to confirm your address, then sign in.'
        })
        setMode('login')
      }

    } else if (mode === 'reset') {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin,
      })
      if (error) {
        setMessage({ type: 'error', text: error.message })
      } else {
        setMessage({ type: 'success', text: 'Password reset email sent — check your inbox.' })
      }
    }

    setLoading(false)
  }

  const IS = {
    width: '100%', padding: '12px 14px', borderRadius: 8,
    border: '1.5px solid rgba(255,255,255,.12)', background: 'rgba(255,255,255,.06)',
    color: '#fff', fontSize: 14, transition: 'border-color .14s',
  }

  return (
    <>
      <style>{CSS}</style>
      <div style={{
        minHeight: '100dvh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', padding: '24px 16px', background: '#1A1F2E'
      }}>
        <div className="auth-card" style={{
          width: '100%', maxWidth: 400,
          background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)',
          borderRadius: 16, padding: '36px 32px',
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
            <div style={{
              width: 44, height: 44, background: '#059669', borderRadius: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22
            }}>🍽</div>
            <div>
              <div style={{ fontFamily: "'Manrope',sans-serif", fontSize: 20, fontWeight: 800 }}>Campus Eats</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,.35)', letterSpacing: '.05em' }}>MEAL PLANNER</div>
            </div>
          </div>

          <h2 style={{
            fontFamily: "'Manrope',sans-serif", fontSize: 22, fontWeight: 800,
            marginBottom: 6
          }}>
            {mode === 'login' ? 'Welcome back' : mode === 'signup' ? 'Create an account' : 'Reset password'}
          </h2>
          <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,.45)', marginBottom: 24 }}>
            {mode === 'login'
              ? 'Sign in to access your meal plan.'
              : mode === 'signup'
              ? 'Your meal plan saves automatically and syncs across devices.'
              : "We'll email you a link to reset your password."}
          </p>

          {message && (
            <div style={{
              padding: '10px 14px', borderRadius: 8, marginBottom: 18, fontSize: 13.5,
              background: message.type === 'error' ? 'rgba(220,38,38,.15)' : 'rgba(5,150,105,.15)',
              border: `1px solid ${message.type === 'error' ? 'rgba(220,38,38,.3)' : 'rgba(5,150,105,.3)'}`,
              color: message.type === 'error' ? '#FCA5A5' : '#6EE7B7',
              lineHeight: 1.55
            }}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.07em', color: 'rgba(255,255,255,.4)', display: 'block', marginBottom: 6 }}>
                EMAIL
              </label>
              <input
                type="email" required value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com" style={IS}
                onFocus={e => e.target.style.borderColor = 'rgba(5,150,105,.6)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,.12)'}
              />
            </div>

            {mode !== 'reset' && (
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.07em', color: 'rgba(255,255,255,.4)', display: 'block', marginBottom: 6 }}>
                  PASSWORD
                </label>
                <input
                  type="password" required value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••" minLength={6} style={IS}
                  onFocus={e => e.target.style.borderColor = 'rgba(5,150,105,.6)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,.12)'}
                />
                {mode === 'signup' && (
                  <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,.3)', marginTop: 5 }}>Minimum 6 characters</div>
                )}
              </div>
            )}

            <button
              type="submit" disabled={loading}
              style={{
                padding: '12px 0', borderRadius: 8, border: 'none',
                background: loading ? 'rgba(5,150,105,.5)' : '#059669',
                color: '#fff', fontSize: 14, fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: "'Nunito Sans',sans-serif",
                transition: 'background .14s', marginTop: 4
              }}
            >
              {loading ? '…' : mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Send Reset Email'}
            </button>
          </form>

          {/* Mode switchers */}
          <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
            {mode === 'login' && (
              <>
                <button onClick={() => { setMode('signup'); setMessage(null); }}
                  style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,.5)', fontSize: 13.5, cursor: 'pointer', fontFamily: "'Nunito Sans',sans-serif" }}>
                  Don't have an account? <span style={{ color: '#34D399', fontWeight: 700 }}>Sign up</span>
                </button>
                <button onClick={() => { setMode('reset'); setMessage(null); }}
                  style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,.3)', fontSize: 12.5, cursor: 'pointer', fontFamily: "'Nunito Sans',sans-serif" }}>
                  Forgot password?
                </button>
              </>
            )}
            {mode !== 'login' && (
              <button onClick={() => { setMode('login'); setMessage(null); }}
                style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,.5)', fontSize: 13.5, cursor: 'pointer', fontFamily: "'Nunito Sans',sans-serif" }}>
                ← Back to sign in
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

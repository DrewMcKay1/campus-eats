import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { supabase } from './supabaseClient'
import AuthPage from './AuthPage'
import App from './App'

function Root() {
  const [session, setSession] = useState(undefined) // undefined = loading

  useEffect(() => {
    // Get the current session immediately on load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    // Listen for sign-in / sign-out events
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Still checking auth state
  if (session === undefined) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: '100dvh', background: '#1A1F2E',
        fontFamily: 'system-ui, sans-serif', color: 'rgba(255,255,255,.5)',
        fontSize: 15, gap: 12
      }}>
        <div style={{
          width: 22, height: 22, border: '3px solid rgba(255,255,255,.15)',
          borderTopColor: '#059669', borderRadius: '50%',
          animation: 'spin 0.7s linear infinite'
        }}/>
        Loading…
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    )
  }

  if (!session) {
    return <AuthPage />
  }

  return <App session={session} />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>
)

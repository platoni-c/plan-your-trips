import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/22c8983f-50a4-45be-b400-8115f80a8fdd',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'auth/callback/route.ts:4',message:'Callback route called',data:{url:request.url.substring(0,100)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
  // #endregion
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/22c8983f-50a4-45be-b400-8115f80a8fdd',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'auth/callback/route.ts:7',message:'Code parameter extracted',data:{hasCode:!!code,codeLength:code?.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
  // #endregion
  // if "next" is in param, use it as the redirect URL
  let next = searchParams.get('next') ?? '/dashboard'
  if (!next.startsWith('/')) {
    // if "next" is not a relative URL, use the default
    next = '/dashboard'
  }

  if (code) {
    const supabase = await createClient()
    const { error, data } = await supabase.auth.exchangeCodeForSession(code)
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/22c8983f-50a4-45be-b400-8115f80a8fdd',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'auth/callback/route.ts:19',message:'exchangeCodeForSession response',data:{hasError:!!error,errorMessage:error?.message,errorName:error?.name,hasSession:!!data?.session},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
    console.log('[OAuth Callback] exchangeCodeForSession:', { hasError: !!error, error: error?.message, hasSession: !!data?.session })
    if (!error) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/22c8983f-50a4-45be-b400-8115f80a8fdd',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'auth/callback/route.ts:21',message:'Session exchange successful, redirecting',data:{next,origin:origin.substring(0,50)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
      // #endregion
      const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === 'development'
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        return NextResponse.redirect(`${origin}${next}`)
      }
    } else {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/22c8983f-50a4-45be-b400-8115f80a8fdd',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'auth/callback/route.ts:32',message:'Session exchange error, redirecting to login',data:{errorMessage:error.message,errorStatus:error.status},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
      // #endregion
      console.error('[OAuth Callback] Session exchange failed:', error)
    }
  } else {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/22c8983f-50a4-45be-b400-8115f80a8fdd',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'auth/callback/route.ts:38',message:'No code parameter, redirecting to login',data:{url:request.url.substring(0,150)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
    // #endregion
    console.warn('[OAuth Callback] No code parameter in URL:', request.url)
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/login?error=auth_callback_error`)
}
import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/mpme'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Check if user is an admin
      const { data: { user } } = await supabase.auth.getUser()
      if (user && user.email) {
        const { data: admin } = await supabase
          .from('admins')
          .select('id')
          .eq('email', user.email)
          .single()

        if (admin) {
          // It's an admin, redirect to admin console
          return NextResponse.redirect(`${origin}/admin/candidatures`)
        }

        // If trying to access admin without admin role, sign out and redirect
        if (next.startsWith('/admin')) {
          await supabase.auth.signOut()
          return NextResponse.redirect(`${origin}/admin/login?error=unauthorized`)
        }
      }

      if (next.startsWith('/admin')) {
        return NextResponse.redirect(`${origin}/admin/login?error=unauthorized`)
      }

      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}

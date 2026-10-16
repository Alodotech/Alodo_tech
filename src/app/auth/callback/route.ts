import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { isListedAdmin } from '@/utils/supabase/isAdmin'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/admin/candidatures'

  if (code) {
    const cookieStore = await cookies()
    let response = NextResponse.redirect(`${origin}${next.startsWith('/') ? next : '/admin/candidatures'}`)

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
              response.cookies.set(name, value, options)
            })
          },
        },
      }
    )

    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data?.user) {
      const allowed = await isListedAdmin(supabase, data.user.email)

      if (allowed) {
        return response
      }

      await supabase.auth.signOut()
      const denied = NextResponse.redirect(`${origin}/admin/login?error=unauthorized`)
      response.cookies.getAll().forEach((cookie) => {
        denied.cookies.set(cookie.name, cookie.value)
      })
      return denied
    }

    if (error) {
      console.error("Auth callback exchange error:", error)
      return NextResponse.redirect(`${origin}/admin/login?error=${encodeURIComponent(error.message)}`)
    }
  }

  return NextResponse.redirect(`${origin}/admin/login?error=missing_code`)
}

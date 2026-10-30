import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { getConsoleRole } from '@/utils/supabase/isAdmin'
import { readFallbackRole } from '@/lib/staff/fallbackStore'

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
      const role = await getConsoleRole(supabase, data.user.email)
        ?? readFallbackRole(data.user.email?.trim().toLowerCase() ?? "")

      if (role === 'admin') {
        return response
      }

      if (role === 'partenaire') {
        const partner = NextResponse.redirect(`${origin}/partenaire`)
        response.cookies.getAll().forEach((cookie) => {
          partner.cookies.set(cookie.name, cookie.value)
        })
        return partner
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

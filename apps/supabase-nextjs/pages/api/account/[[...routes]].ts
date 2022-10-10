// import { supabaseServerClient, withApiAuth, getProviderToken, getUser } from "@supabase/auth-helpers-nextjs";
import { createClient } from '@supabase/supabase-js'
import type { NextApiRequest, NextApiResponse } from 'next'

const {
  NEXT_PUBLIC_SUPABASE_URL,
  // NEXT_PUBLIC_SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY,
} = process.env as Record<string, string>
const supabase = createClient(
  NEXT_PUBLIC_SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { routes } = req.query as {
    routes: string[]
    [key: string]: string | string[]
  }
  const body = req.body
  const route = routes[0]
  const action = routes[1]
  switch (route) {
    case 'getUser': {
      // session.access_token
      // sb-access-token sb-provider-token sb-refresh-token
      const token = req.cookies['sb-access-token'] as string

      const { data: user, error } = await supabase.auth.api.getUser(token)

      if (error) return res.status(401).json({ error: error.message })
      return res.status(200).json(user)
    }
    case 'update': {
      switch (action) {
        case 'email': {
          const { id, email } = body as { id: string; email: string }

          const result = await supabase.auth.api.updateUserById(id, {
            email,
          })
          // Invalid token: token contains an invalid number of segments
          // 'duplicate key value violates unique constraint "users_email_key"'
          if (result.error) {
            res.status(result.error.status).send(result.error?.message)
          } else {
            res.status(200).send(result)
          }

          break
        }
      }
    }
  }
}

import { Auth } from '@supabase/ui'
import { useUser } from '@supabase/auth-helpers-react'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import axios from 'axios'
interface TestRow {
  id: number
}

const LoginPage = () => {
  const { user, error } = useUser()
  const [data, setData] = useState<TestRow | null>(null)

  useEffect(() => {
    async function loadData() {
      const { data } = await supabaseClient
        .from<TestRow>('test')
        .select('*')
        .eq('id', 1)
        .single()
      setData(data)
    }
    // Only run query once user is logged in.
    if (user) loadData()
  }, [user])

  if (!user)
    return (
      <>
        <button
          onClick={async () => {
            const client = createClient(
              '/api/supabase',
              process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
            )
            const { session } = await client.auth.signIn({
              email: '1111',
              password: '2222',
            })

            if (session) {
              supabaseClient.auth.setAuth(session.access_token)
              supabaseClient.auth.setSession(session.refresh_token!)

              console.log('setAuth successfully')
            }
            console.log(session)
          }}>
          login
        </button>
        <Auth
          supabaseClient={supabaseClient}
          providers={['google', 'github']}
          socialLayout="horizontal"
          socialButtonSize="xlarge"
        />
      </>
    )

  return (
    <>
      <button onClick={() => supabaseClient.auth.signOut()}>Sign out</button>
      <button
        onClick={() => {
          axios.post('/api/account/update/email', {
            id: user.id,
            email: 'yangqimingshizhu@163.com',
          })
        }}>
        Update Email
      </button>
      <button
        onClick={() => {
          axios.get('/api/account/getUser')
        }}>
        getUser
      </button>
      <p>user:</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <p>client-side data fetching with RLS</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}

export default LoginPage

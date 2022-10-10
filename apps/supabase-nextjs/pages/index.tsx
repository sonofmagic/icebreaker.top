import { Auth } from '@supabase/ui'
import { useUser } from '@supabase/auth-helpers-react'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
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
        {error && <p>{error.message}</p>}
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
          axios.post('/account/update/email', {
            id: user.id,
            email: '1324318532@qq.com',
          })
        }}>
        Update Email
      </button>
      <p>user:</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <p>client-side data fetching with RLS</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}

export default LoginPage

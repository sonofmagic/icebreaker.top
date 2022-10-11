import type { NextApiRequest, NextApiResponse } from 'next'
import { serviceRoleClient } from 'server/supabase'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const password = 'some-password@123456'
  const { data, error } = await serviceRoleClient.auth.api.listUsers()
  if (error) {
    res.send(error)
    return
  }
  if (data) {
    const hit = data[0]
    const { error } = await serviceRoleClient.auth.api.updateUserById(hit.id, {
      password,
    })
    if (error) {
      res.send(error)
      return
    }
    const result = await serviceRoleClient.auth.signIn({
      email: hit.email,
      password,
    })
    res.send(result)
  }
}

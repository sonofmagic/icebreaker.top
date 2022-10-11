import type { NextApiRequest, NextApiResponse } from 'next'
import { serviceRoleClient } from 'server/supabase'
import cookie from 'cookie'

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
    // const { error } = await serviceRoleClient.auth.api.updateUserById(hit.id, {
    //   password,
    // })
    // if (error) {
    //   res.send(error)
    //   return
    // }
    const result = await serviceRoleClient.auth.signIn({
      email: hit.email,
      password,
    })
    const { session } = result
    if (session) {
      res.setHeader('set-cookie', [
        cookie.serialize('sb-access-token', session.access_token, {
          maxAge: session.expires_in! * 60,
          httpOnly: true,
          secure: true,
          path: '/',
          expires: new Date(session.expires_at!),
        }),
        cookie.serialize('sb-refresh-token', session.refresh_token!, {
          maxAge: session.expires_in! * 60,
          httpOnly: true,
          secure: true,
          path: '/',
          expires: new Date(session.expires_at!),
        }),
      ])
      res.send(session)
    } else {
      return ''
    }
  }
}
// set-cookie:
// sb-access-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjY1NDk5MjMyLCJzdWIiOiI0MDU0NTcyYy03NjI1LTQ3YWQtYTc3My01NjA1ZmU4MzNiN2UiLCJlbWFpbCI6IjEzNzU1NTEyOTRAcXEuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6e30sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwic2Vzc2lvbl9pZCI6IjMyY2U5YWMxLTlhNmUtNDViNy1hNDBmLWNjZWFhZmY1OWQzZiJ9.arEiOGTRqNanqsi1nP0KmaI-SuxYmmWI9ndmDgkzYPQ; Path=/; Expires=Wed, 12 Oct 2022 13:40:32 GMT; Max-Age=86400; HttpOnly; Secure
// set-cookie:
// sb-refresh-token=H3drGIgEpiStxtTjRa22XA;
// Path=/; Expires=Wed, 12 Oct 2022 13:40:32 GMT; Max-Age=86400; HttpOnly; Secure

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
          maxAge: session.expires_in! * 24,
          httpOnly: true,
          secure: true,
          path: '/',
          expires: new Date(session.expires_at! * 1000),
        }),
        cookie.serialize('sb-refresh-token', session.refresh_token!, {
          maxAge: session.expires_in! * 24,
          httpOnly: true,
          secure: true,
          path: '/',
          expires: new Date(session.expires_at! * 1000),
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

// set-cookie: sb-access-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjY1NTAwOTkxLCJzdWIiOiI0MDU0NTcyYy03NjI1LTQ3YWQtYTc3My01NjA1ZmU4MzNiN2UiLCJlbWFpbCI6IjEzNzU1NTEyOTRAcXEuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6e30sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwic2Vzc2lvbl9pZCI6ImQ3OTJlNDliLWUzODctNDc2Ni1hMTYzLTVhODljMjRlM2JlNCJ9.guuqQR1SVGM4Ds5bVSXxYSI6bPqz3a1rotHLNsABQbI; Max-Age=3600; Path=/; Expires=Tue, 11 Oct 2022 15:09:52 GMT; HttpOnly; Secure
// set-cookie: sb-refresh-token=P1KemsivBu5VZ1tJ8irjbw;
// Max-Age=3600; Path=/; Expires=Tue, 11 Oct 2022 15:09:52 GMT; HttpOnly; Secure

// set-cookie:
// sb-access-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjY1NTAxMTkyLCJzdWIiOiI0MDU0NTcyYy03NjI1LTQ3YWQtYTc3My01NjA1ZmU4MzNiN2UiLCJlbWFpbCI6IjEzNzU1NTEyOTRAcXEuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6e30sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwic2Vzc2lvbl9pZCI6IjhmYmYxNmIwLWI4NWUtNDQyOC05NDE3LTM2NmQxMDBjZmQ2NiJ9.j6X21Lt9ayH5gRoMcno-bq5Wvp-QcVOEvsPE7X0nQ-k; Max-Age=86400; Path=/; Expires=Tue, 11 Oct 2022 15:13:13 GMT; HttpOnly; Secure
// set-cookie:
// sb-refresh-token=LSxs3AHz2lC1R2Iw2Qciwg; Max-Age=86400; Path=/; Expires=Tue, 11 Oct 2022 15:13:13 GMT; HttpOnly; Secure

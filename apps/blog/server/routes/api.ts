export default defineEventHandler((event) => {
  event.context.auth = { user: 123 }
  event.res.end('haa')
})

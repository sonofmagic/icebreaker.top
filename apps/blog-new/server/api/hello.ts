export default defineEventHandler((event) => {
  console.log(event)
  console.log('--------------------------')
  return {
    hello: 'world'
  }
})

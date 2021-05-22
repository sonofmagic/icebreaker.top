
import proxy from './proxy'

export const handler = async (event) => {
  await proxy.start()
  const res = await proxy.getResponse(event)
  return res
}

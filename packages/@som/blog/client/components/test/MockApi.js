export function wait(ts = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, ts)
  })
}

export async function doSomeThing(params, data) {
  await wait(3000)
  return {
    data: {
      arr: [1, 2, 3, 4, 5],
    },
    statusCode: 200,
  }
}

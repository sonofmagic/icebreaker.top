function wait(ts = 500) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, ts)
  })
}

module.exports = {
  wait,
}

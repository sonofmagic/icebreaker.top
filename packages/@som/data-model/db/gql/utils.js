/**
 * @param {Object} resolvers
 * @property [String:resolver]
 */
export function adminAccess(resolvers) {
  Object.keys(resolvers).forEach((k) => {
    resolvers[k] = resolvers[k].wrapResolve((next) => async (rp) => {
      // extend resolve params with hook
      rp.beforeRecordMutate = async function (doc, rp) {}

      return next(rp)
    })
  })
  return resolvers
}

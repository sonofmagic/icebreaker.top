export default function ({ store, redirect }) {
  // // If the user is not authenticated
  // if (!store.state.authenticated) {
  //   return redirect('/login')
  // }
  // debugger
  // console.log(`[middleware]`, store)
  // if (store) {
  // }
  if (process.client) {
    // debugger
    console.log(`[middleware]`, store)
  }
}

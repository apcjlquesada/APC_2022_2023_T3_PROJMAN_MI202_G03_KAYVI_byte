import { LocalStorage } from "quasar"
/*
This Boot File is a Navigation Guard.
This makes sure that only logged in users
are allowed to navigate to different pages.
*/
export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    let loggedIn = LocalStorage.getItem('LoggedIn')
    if (!loggedIn && to.path !=="/login")  {
      next('/login')
    } else {
      next()
    }
  })
}

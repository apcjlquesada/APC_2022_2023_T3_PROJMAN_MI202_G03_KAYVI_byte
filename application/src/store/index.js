import { store } from "quasar/wrappers";
import Vuex from "vuex";
import auth from "./store-auth";
import incidents from "./store-incidents";
import reports from "./store-reports";
import users from "./store-users";
import logs from "./store-logs";

// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      auth,
      incidents,
      reports,
      users,
      logs,
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING,
  });

  return Store;
});

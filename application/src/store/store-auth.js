import { LocalStorage, Loading, Notify, Dialog } from "quasar";
import { projectAuth } from "boot/firebase";
import { showErrorMessage } from "src/functions/functions-show-error-message";
import firebase from "firebase/compat/app";

const state = {
  loggedIn: false
};

const mutations = {
  setLoggedIn(state, value) {
    state.loggedIn = value
  }
};

const actions = {
  loginUser({}, payload) {
    Loading.show();
    projectAuth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then((response) => {
        Notify.create({
          color: 'positive',
          position: 'top',
          message: 'Woohoo! Welcome Back!'
        })
      })
      .catch(error => {
        showErrorMessage()
      })
  },
  registerUser({}, payload) {
    projectAuth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        firebase.auth().currentUser.updateProfile({
          displayName : payload.displayName,
          }).then(()=>{
              firebase.database().
              ref('users/' + projectAuth.currentUser.uid).
              set({
                email: payload.email,
                name: payload.displayName,
                phoneNumber: payload.phoneNumber,
                job: payload.job,
                role: payload.role,
                createdAt: payload.createdAt
              });
              Notify.create({
                color: 'positive',
                position: 'top',
                message: 'User Registered!'
              })
          }).catch(errorHandler => {
            console.log(errorHandler.message)
          });
      })
      .catch(error => {
        console.log(error.message);
      })
  },


  handleAuthStateChange({ commit, dispatch }) {
    projectAuth.onAuthStateChanged((user) => {
      Loading.hide();
      if (user) {

        commit('setLoggedIn', true)
        LocalStorage.set('LoggedIn', true)
        //User is signed in
        this.$router.push("/home").catch((err) => {});
          dispatch("incidents/fbReadData", null, { root: true });
          dispatch("users/fbReadData", null, { root: true });
          dispatch("logs/fbReadData", null, { root: true });
      } else {
        //user is logout
        commit('setLoggedIn', false)
        LocalStorage.set('LoggedIn', false)

          this.$router.replace("/login").catch((err) => {});
      }
    });
  },
};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};


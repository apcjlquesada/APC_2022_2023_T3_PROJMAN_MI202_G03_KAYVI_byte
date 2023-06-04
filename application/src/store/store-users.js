import { uid, Notify } from "quasar";
import { projectDb, projectAuth, collection, getDocs, } from "src/boot/firebase";
import { updateEmail } from "firebase/compat/auth";
const state = {
  users: {},
  search: "",
  sort: "name",
};

const mutations = {
  updateUser(state, payload) {
    Object.assign(state.users[payload.id], payload.updates);
  },
  deleteUser(state, id) {
    delete state.users[id];
  },
  addUser(state, payload) {
    Object.assign(state.users, payload);
  },
  setSearch(state, value) {
    state.search = value;
  },
  setSort(state, value) {
    state.sort = value;
  },
};

const actions = {
  updateUser({ dispatch }, payload) {
    dispatch("fbUpdateUser", payload);
    Notify.create({
      type: 'positive',
      position: 'top',
      message: 'Changes Save'
    })
  },
  deleteUser({ dispatch }, id) {
    dispatch("fbDeleteUser", id);
  },
  addUser({ dispatch }, user) {
    let userId = uid();
    let payload = {
      id: userId,
      user: user,
    };
    dispatch("fbAddUser", payload);
  },
  setSearch({ commit }, value) {
    commit("setSearch", value);
  },
  setSort({ commit }, value) {
    commit("setSort", value);
  },

  fbReadData({ commit }) {
    let userUsers = projectDb.ref(
      "users/"
    ).orderByChild('name');

    //child added
    userUsers.on("child_added", (snapshot) => {
      let user = snapshot.val();
      let payload = { [snapshot.key]: user };
      commit("addUser", payload);
    });

    //child changed
    userUsers.on("child_changed", (snapshot) => {
      let user = snapshot.val();
      let payload = {
        id: snapshot.key,
        updates: user,
      };
      //let selectedUser = payload.id
      ////updateEmail(projectAuth.selectedUser, payload.updates.email).then(() => {
      ////})
      //projectAuth.a.updateProfile({
      //  email : payload.updates.email
      //  })
      commit("updateUser", payload);
    });

    //child removed
    userUsers.on("child_removed", (snapshot) => {
      let userId = snapshot.key;
      commit("deleteUser", userId);
    });
  },
  fbAddUser({}, payload) {
    let userRef = projectDb.ref(
      "users/" + payload.id
    );
    userRef.set(payload.user);
  },
  fbUpdateUser({}, payload) {
    let userRef = projectDb.ref(
      "users/" + payload.id
    );
    userRef.update(payload.updates);
  },
  fbDeleteUser({}, userId) {
    let userRef = projectDb.ref(
      "users/" + userId
    );
    userRef.remove();
  },
};

const getters = {
  usersSorted: (state) => {
    let usersSorted = {},
      keysOrdered = Object.keys(state.users);
    keysOrdered.forEach((key) => {
      usersSorted[key] = state.users[key];
    });
    return usersSorted;
  },
  usersFiltered: (state, getters) => {
    let usersSorted = getters.usersSorted,
      usersFiltered = {};
    if (state.search) {
      Object.keys(usersSorted).forEach(function (key) {
        let user = usersSorted[key],
          emailLowerCase = user.email.toLowerCase(),
          nameLowerCase = user.name.toLowerCase(),
          roleLowerCase = user.role.toLowerCase(),
          searchLowerCase = state.search.toLowerCase();
        if (
          emailLowerCase.includes(searchLowerCase) ||
          nameLowerCase.includes(searchLowerCase) ||
          roleLowerCase.includes(searchLowerCase)
        ) {
          usersFiltered[key] = user;
        }
      });
      return usersFiltered;
    }
    return usersSorted;
  },

  usersAssigned: (state, getters) => {
    let usersFiltered = getters.usersFiltered;
    let users = {};
    Object.keys(usersFiltered).forEach(function (key) {
      let user = usersFiltered[key];
      users[key] = user;
    });
    return users;
  },
  usersCompleted: (state, getters) => {
    let usersFiltered = getters.usersFiltered;
    let users = {};
    Object.keys(usersFiltered).forEach(function (key) {
      let user = usersFiltered[key];
      if (user.completed) {
        users[key] = user;
      }
    });
    return users;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

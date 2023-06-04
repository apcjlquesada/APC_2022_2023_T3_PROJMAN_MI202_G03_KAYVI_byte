import { uid, Notify } from "quasar";
import { projectDb, projectAuth, collection, getDocs } from "src/boot/firebase";

const state = {
  logs: {},
  search: "",
  sort: "descending",
};

const mutations = {
  updateLog(state, payload) {
    Object.assign(state.logs[payload.id], payload.updates);
    Notify.create({
      type: 'positive',
      position: 'top',
      message: 'Log Verified'
    })
  },
  deleteLog(state, id) {
    delete state.logs[id];
  },
  addLog(state, payload) {
    Object.assign(state.logs, payload);
  },
  setSearch(state, value) {
    state.search = value;
  },
  setSort(state, value) {
    state.sort = value;
  },
};

const actions = {
  updateLog({ dispatch }, payload) {
    dispatch("fbUpdateLog", payload);
  },
  deleteLog({ dispatch }, id) {
    dispatch("fbDeleteLog", id);
  },
  addLog({ dispatch }, log) {
    let logId = uid();
    let payload = {
      id: logId,
      log: log,
    };
    dispatch("fbAddLog", payload);
  },
  setSearch({ commit }, value) {
    commit("setSearch", value);
  },
  setSort({ commit }, value) {
    commit("setSort", value);
  },

  fbReadData({ commit }) {
    let userLogs = projectDb.ref(
      "logs/"
    );

    //child added
    userLogs.on("child_added", (snapshot) => {
      let log = snapshot.val();
      let payload = { [snapshot.key]: log };
      commit("addLog", payload);
    });

    //child changed
    userLogs.on("child_changed", (snapshot) => {
      let log = snapshot.val();
      let payload = {
        id: snapshot.key,
        updates: log,
      };
      commit("updateLog", payload);
    });

    //child removed
    userLogs.on("child_removed", (snapshot) => {
      let logId = snapshot.key;
      commit("deleteLog", logId);
    });
  },
  fbAddLog({}, payload) {
    let logRef = projectDb.ref(
      "logs/"+ payload.id
      );
    logRef.set(payload.log);
  },
  fbUpdateLog({}, payload) {
    let logRef = projectDb.ref(
      "logs/" + payload.id
      );
    logRef.update(payload.updates);
  },
  fbDeleteLog({}, logId) {
    let logRef = projectDb.ref(
      "logs/" + logId
    );
    logRef.remove();
  },
};

const getters = {
  logsSorted: (state) => {
    let logsSorted = {},
      keysOrdered = Object.keys(state.logs);
     keysOrdered.sort((a, b) => {
      if(state.sort=="descending"){
        let logAProp = state.logs[a].createdAt,
        logBProp = state.logs[b].createdAt;
        if (logAProp < logBProp) return 1;
        else if (logAProp > logBProp) return -1;
        else return 0;
      }else if (state.sort=="ascending"){
        let logAProp = state.logs[a].createdAt,
        logBProp = state.logs[b].createdAt;
        if (logAProp > logBProp) return 1;
        else if (logAProp < logBProp) return -1;
        else return 0;
      }
      });

    keysOrdered.forEach((key) => {
      logsSorted[key] = state.logs[key];
    });
    return logsSorted;
  },
  logsFiltered: (state, getters) => {
    let logsSorted = getters.logsSorted,
    logsFiltered = {};
    if (state.search) {
      Object.keys(logsSorted).forEach(function (key) {
        let log = logsSorted[key],
          nameLowerCase = log.name.toLowerCase(),
          postLowerCase = log.post.toLowerCase(),
          searchLowerCase = state.search.toLowerCase();
        if (
          nameLowerCase.includes(searchLowerCase) ||
          postLowerCase.includes(searchLowerCase) ||
          log.date.includes(searchLowerCase) ||
          log.time.includes(searchLowerCase)
        ) {
          logsFiltered[key] = log;
        }
      });
      return logsFiltered;
    }
    return logsSorted;
  },

  logsUnresolved: (state, getters) => {
    let logsFiltered = getters.logsFiltered;
    let logs = {};
    Object.keys(logsFiltered).forEach(function (key) {
      let log = logsFiltered[key];
      if (!log.status) {
        logs[key] = log;
      }
    });
    return logs;
  },
  logsResolved: (state, getters) => {
    let logsFiltered = getters.logsFiltered;
    let logs = {};
    Object.keys(logsFiltered).forEach(function (key) {
      let log = logsFiltered[key];
      if (log.status) {
        logs[key] = log;
      }
    });
    return logs;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

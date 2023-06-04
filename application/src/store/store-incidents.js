import { uid, Notify } from "quasar";
import { projectDb, projectAuth, collection, getDocs } from "src/boot/firebase";

const state = {
  incidents: {},
  search: "",
  sort: "descending",
};

const mutations = {
  updateIncident(state, payload) {
    Object.assign(state.incidents[payload.id], payload.updates);
  },
  deleteIncident(state, id) {
    delete state.incidents[id];
  },
  addIncident(state, payload) {
    Object.assign(state.incidents, payload);
  },
  setSearch(state, value) {
    state.search = value;
  },
  setSort(state, value) {
    state.sort = value;
  },
};

const actions = {
  updateIncident({ dispatch }, payload) {
    dispatch("fbUpdateIncident", payload);
    Notify.create({
      type: 'positive',
      position: 'top',
      message: 'Issued Resolved'
    })
  },
  deleteIncident({ dispatch }, id) {
    dispatch("fbDeleteIncident", id);
  },
  addIncident({ dispatch }, incident) {
    let incidentId = uid();
    let payload = {
      id: incidentId,
      incident: incident,
    };
    dispatch("fbAddIncident", payload);
  },
  setSearch({ commit }, value) {
    commit("setSearch", value);
  },
  setSort({ commit }, value) {
    commit("setSort", value);
  },

  fbReadData({ commit }) {
    let userIncidents = projectDb.ref(
      "incidents/"
    );

    //child added
    userIncidents.on("child_added", (snapshot) => {
      let incident = snapshot.val();
      let payload = { [snapshot.key]: incident };
      commit("addIncident", payload);
    });

    //child changed
    userIncidents.on("child_changed", (snapshot) => {
      let incident = snapshot.val();
      let payload = {
        id: snapshot.key,
        updates: incident,
      };
      commit("updateIncident", payload);
    });

    //child removed
    userIncidents.on("child_removed", (snapshot) => {
      let incidentId = snapshot.key;
      commit("deleteIncident", incidentId);
    });
  },
  fbAddIncident({}, payload) {
    let incidentRef = projectDb.ref(
      "incidents/" + payload.id
    );
    incidentRef.set(payload.incident);
  },
  fbUpdateIncident({}, payload) {
    let incidentRef = projectDb.ref(
      "incidents/" + payload.id
    );
    incidentRef.update(payload.updates);
  },
  fbDeleteIncident({}, incidentId) {
    let incidentRef = projectDb.ref(
      "incidents/" + incidentId
    );
    incidentRef.remove();
  },
};

const getters = {
  incidentsSorted: (state) => {
    let incidentsSorted = {},
      keysOrdered = Object.keys(state.incidents);
    keysOrdered.sort((a, b) => {
      if(state.sort=="descending"){
        let incidentAProp = state.incidents[a].irID,
        incidentBProp = state.incidents[b].irID;
        if (incidentAProp < incidentBProp) return 1;
        else if (incidentAProp > incidentBProp) return -1;
        else return 0;
      }else if (state.sort=="ascending"){
        let incidentAProp = state.incidents[a].irID,
        incidentBProp = state.incidents[b].irID;
        if (incidentAProp > incidentBProp) return 1;
        else if (incidentAProp < incidentBProp) return -1;
        else return 0;
      }

    });

    keysOrdered.forEach((key) => {
      incidentsSorted[key] = state.incidents[key];
    });
    return incidentsSorted;
  },
  incidentsFiltered: (state, getters) => {
    let incidentsSorted = getters.incidentsSorted,
    incidentsFiltered = {};
    if (state.search) {
      Object.keys(incidentsSorted).forEach(function (key) {
        let incident = incidentsSorted[key],
          deptLowerCase = incident.department.toLowerCase(),
          typeLowerCase = incident.type.toLowerCase(),
          postLowerCase = incident.post.toLowerCase(),
          specLowerCase = incident.spec.toLowerCase(),
          nameLowerCase = incident.name.toLowerCase(),
          jobLowerCase = incident.job.toLowerCase(),
          iridLowerCase = incident.viewID.toLowerCase(),
          searchLowerCase = state.search.toLowerCase()
        if (
          deptLowerCase.includes(searchLowerCase) ||
          typeLowerCase.includes(searchLowerCase) ||
          postLowerCase.includes(searchLowerCase) ||
          specLowerCase.includes(searchLowerCase) ||
          nameLowerCase.includes(searchLowerCase) ||
          jobLowerCase.includes(searchLowerCase) ||
          iridLowerCase.includes(searchLowerCase) ||
          incident.date.includes(searchLowerCase) ||
          incident.time.includes(searchLowerCase)
        ) {
          incidentsFiltered[key] = incident;
        }
      });
      return incidentsFiltered;
    }
    return incidentsSorted;
  },

  incidentsUnresolved: (state, getters) => {
    let incidentsFiltered = getters.incidentsFiltered;
    let incidents = {};
    Object.keys(incidentsFiltered).forEach(function (key) {
      let incident = incidentsFiltered[key];
      if (!incident.status) {
        incidents[key] = incident;
      }
    });
    return incidents;
  },
  incidentsResolved: (state, getters) => {
    let incidentsFiltered = getters.incidentsFiltered;
    let incidents = {};
    Object.keys(incidentsFiltered).forEach(function (key) {
      let incident = incidentsFiltered[key];
      if (incident.status) {
        incidents[key] = incident;
      }
    });
    return incidents;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

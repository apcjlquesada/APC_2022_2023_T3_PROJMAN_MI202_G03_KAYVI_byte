import { uid } from "quasar";
import { projectDb, projectAuth, collection, getDocs } from "src/boot/firebase";

const state = {
  assignments: {},
  search: "",
  sort: "name",
};

const mutations = {
  updateAssignment(state, payload) {
    Object.assign(state.assignments[payload.id], payload.updates);
  },
  deleteAssignment(state, id) {
    delete state.assignments[id];
  },
  addAssignment(state, payload) {
    Object.assign(state.assignments, payload);
    console.log(
      "mutations id : ",
      payload.id,
      "and mutations ass :",
      payload.assignment
    );
  },
  setSearch(state, value) {
    state.search = value;
  },
  setSort(state, value) {
    state.sort = value;
  },
};

const actions = {
  updateAssignment({ dispatch }, payload) {
    dispatch("fbUpdateAssignment", payload);
  },
  deleteAssignment({ dispatch }, id) {
    dispatch("fbDeleteAssignment", id);
  },
  addAssignment({ dispatch }, assignment) {
    let assignmentId = uid();
    let payload = {
      id: assignmentId,
      assignment: assignment,
    };
    dispatch("fbAddAssignment", payload);
  },
  fbReadData({ commit }) {
    let userId = projectAuth.currentUser.uid;
    let userAssignments = projectDb.ref("assignments/" + userId);

    //child added
    userAssignments.on("child_added", (snapshot) => {
      let assignment = snapshot.val();
      let payload = {
        [snapshot.key]: assignment,
      };

      commit("addAssignment", payload);
    });

    //child changed
    userAssignments.on("child_changed", (snapshot) => {
      let assignment = snapshot.val();
      let payload = {
        id: snapshot.key,
        updates: assignment,
      };
      commit("updateAssignment", payload);
    });

    //child removed
    userAssignments.on("child_removed", (snapshot) => {
      let assignmentId = snapshot.key;
      commit("deleteAssignment", assignmentId);
    });
  },

  setSearch({ commit }, value) {
    commit("setSearch", value);
  },
  setSort({ commit }, value) {
    commit("setSort", value);
  },
};

const getters = {
  assignmentsSorted: (state) => {
    let assignmentsSorted = {},
      keysOrdered = Object.keys(state.assignments);
    keysOrdered.sort((a, b) => {
      let assignmentAProp = state.assignments[a][state.sort].toLowerCase(),
        assignmentBProp = state.assignments[b][state.sort].toLowerCase();
      if (assignmentAProp > assignmentBProp) return 1;
      else if (assignmentAProp < assignmentBProp) return -1;
      else return 0;
    });

    keysOrdered.forEach((key) => {
      assignmentsSorted[key] = state.assignments[key];
    });
    return assignmentsSorted;
  },
  assignmentsFiltered: (state, getters) => {
    let assignmentsSorted = getters.assignmentsSorted,
      assignmentsFiltered = {};
    if (state.search) {
      Object.keys(assignmentsSorted).forEach(function (key) {
        let assignment = assignmentsSorted[key],
          nameLowerCase = assignment.name.toLowerCase(),
          postLowerCase = assignment.post.toLowerCase(),
          searchLowerCase = state.search.toLowerCase();
        if (
          nameLowerCase.includes(searchLowerCase) ||
          postLowerCase.includes(searchLowerCase) ||
          assignment.date.includes(searchLowerCase) ||
          assignment.time.includes(searchLowerCase)
        ) {
          assignmentsFiltered[key] = assignment;
        }
      });
      return assignmentsFiltered;
    }
    return assignmentsSorted;
  },

  assignmentsAssigned: (state, getters) => {
    let assignmentsFiltered = getters.assignmentsFiltered;
    let assignments = {};
    Object.keys(assignmentsFiltered).forEach(function (key) {
      let assignment = assignmentsFiltered[key];
      if (!assignment.completed) {
        assignments[key] = assignment;
      }
    });
    return assignments;
  },
  assignmentsCompleted: (state, getters) => {
    let assignmentsFiltered = getters.assignmentsFiltered;
    let assignments = {};
    Object.keys(assignmentsFiltered).forEach(function (key) {
      let assignment = assignmentsFiltered[key];
      if (assignment.completed) {
        assignments[key] = assignment;
      }
    });
    return assignments;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

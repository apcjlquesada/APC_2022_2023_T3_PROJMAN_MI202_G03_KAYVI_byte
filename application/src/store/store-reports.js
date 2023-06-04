import { uid } from "quasar";

const state = {
  reports: {
    ID1: {
      name: "Ram",
      startlocation:
        "San Antonio Elementary School, Loriga Gallarza, Aparri, Cagayan, Cagayan Valley, 3515, Pilipinas / Philippines",
      startdatetime: "4/2/2022 17:5:35",
      endlocation:
        "San Antonio Elementary School, Loriga Gallarza, Aparri, Cagayan, Cagayan Valley, 3515, Pilipinas / Philippines",
      enddatetime: "4/2/2022 17:5:36",
      image: "",
      remarks: "gggggggg",
    },
  },
};

const mutations = {
  addReport(state, payload) {
    Object.assign(state.reports, payload);
  },
};

const actions = {
  addReport({ commit }, report) {
    let reportId = uid();
    let payload = {
      [reportId]: report,
    };
    commit("addReport", payload);
  },
};

const getters = {
  reportsSubmitted: (state) => {
    let reports = {};
    Object.keys(state.reports).forEach(function (key) {
      let report = state.reports[key];
      console.log("reports: ", report);
    });
    return reports;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

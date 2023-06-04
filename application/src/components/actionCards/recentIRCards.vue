<template>
  <!--HIGHER RESOLUTION-->
  <div class="row gt-xs q-my-sm bg-white">
    <div class="row full-width">
      <div class="col text-h5 text-weight-bold text-grey-9 q-pa-lg ">
        Recent Issued Incidents
      </div>
      <q-btn
          no-caps unelevated
          label="View more"
          class="row text-primary text-h6"
          @click="goToIR"
        />
    </div>
    <q-scroll-area class="full-width" style="height: 380px; min-width: 300px;">
      <div class="row no-wrap q-px-sm">
        <recentIR
          v-for="(incident, key) in incidentsUnresolved"
          :key="key"
          :incident="incident"
          :id="key"
        />
      </div>
      <no-incident
        v-if="!Object.keys(incidentsUnresolved).length"
      />
    </q-scroll-area>
  </div>
  <!--LOW RESOLUTION-->
  <div class="row lt-sm q-my-sm bg-white">
    <div class="col q-py-md q-px-md">
      <div class="col text-h6 text-weight-bold text-grey-9 ">Recent Issued Incidents
        <q-btn
          no-caps unelevated
          label="View more"
          class="text-primary "
          @click="goToIR"
        />
      </div>
    </div>
    <q-scroll-area class="full-width" style="height: 280px; min-width: 300px;">
      <div class="row no-wrap q-px-sm">
        <recentIR
          v-for="(incident, key) in incidentsUnresolved"
          :key="key"
          :incident="incident"
          :id="key"
        />
      </div>
      <no-incident
        v-if="!Object.keys(incidentsUnresolved).length"
      />
    </q-scroll-area>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default{
  computed: {
    ...mapGetters("incidents", [
      "incidentsUnresolved",
      "incidentsResolved",
    ]),
  },
  components: {
    recentIR: require("components/IncidentReports/RecentIR.vue").default,
    "no-incident": require("src/components/IncidentReports/StatusIR/NoRecentIR.vue").default,
  },
  methods: {
    goToIR() {
      this.$router.push("/viewir");
    },
  },
}
</script>

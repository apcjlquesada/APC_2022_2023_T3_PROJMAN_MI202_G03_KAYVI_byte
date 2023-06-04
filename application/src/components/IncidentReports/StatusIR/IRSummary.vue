<template>
  <q-card
      :class="!this.incident.status ? 'bg-white' : 'bg-white'"
      clickable
      v-ripple
      @click="showIncidentDetails = true"
      class="q-mb-sm">
    <!-- Fetch Reports -->
    <q-item v-if ="isITRO || isGuard || isHeadGuard || isAdmin || isElectrician || isPlumber || isAirconTech || isFabricator || isCarpenter || isBMO">
      <q-item-section class="col-2 q-py-sm">
        <q-item-label class="text-weight-bold text-grey-9">
          {{this.viewID}}
        </q-item-label>
      </q-item-section>
      <!--
        Section 001:
          Floor Level
          Security Personnel
       -->
      <q-item-section class="col-6 q-py-sm">
        <q-item-label class="text-weight-bold text-grey-9">
          {{ this.incident.type }}
        </q-item-label>
        <q-item-label class="text-caption text-grey-9">
          {{ "Issued by: "+this.incident.name}}
        </q-item-label>
        <q-item-label class="row" caption>
          Located: {{ this.incident.post }}
        </q-item-label>
      </q-item-section>
      <!--
        Section 002:
          Date
          Time
       -->
      <q-item-section class="col-2 q-py-sm">
        <!-- Date -->
        <q-item-label class="row" caption v-if="incident.date">
          {{ niceDate(this.incident.date) }}
        </q-item-label>
        <!-- Time -->
        <q-item-label class="row" caption v-if="incident.time">
          {{ assignmentTime }}
        </q-item-label>
      </q-item-section>
       <!--
         Section 003:
           Icon
       -->
      <q-item-section avatar class="col-1">
        <q-icon
          v-if="!this.incident.status"
          name="timelapse"
          color="secondary"
          size="sm"
        />
        <q-icon
          v-if="this.incident.status"
          name="check_circle"
          color="positive"
          size="sm"
        />
      </q-item-section>
    </q-item>
    <!-- Report Details Modal -->
    <q-dialog
      v-model="showIncidentDetails"
      transition-show="slide-up"
      transition-hide="slide-down"
      :maximized="maximizedToggle"
    >
    <q-card class="bg-accent">
      <incident-details
        @close="showIncidentDetails = false"
        :incident="incident"
        :id="id"
      />
    </q-card>
    </q-dialog>
  </q-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { date } from "quasar";
import { ref } from 'vue'
import { Role } from "src/components/roles"
import getUser from "src/composables/getUser";
import { projectDb } from "src/boot/firebase"

export default {
props: ["incident", "id"],
  methods: {
    ...mapActions("incidents", ["updateIncident", "deleteIncident"]),
    ...mapGetters("incidents", ["incidents"]),
  },
  setup () {
    return {
      dialog: ref(false),
      maximizedToggle: ref(true)
    }
  },
  data() {
    return {
      showIncidentDetails: false,
      viewID: "",
      isGuard: false,
      isHeadGuard: false,
      isBMO: false,
      isITRO: false,
      isElectrician: false,
      isPlumber: false,
      isAirconTech: false,
      isFabricator: false,
      isCarpenter: false,
      isAdmin: false
    };
  },
  components: {
    "incident-details": require("src/components/Modals/IncidentDetails.vue")
      .default,
  },
  computed: {
    niceDate() {
      return (value) => {
        return date.formatDate(value, "MM/DD/YY");
      };
    },
    assignmentTime() {
      return date.formatDate(
        this.incident.date + " " + this.incident.time,
        "h:mm A"
      );
    }
  },
  created() {
    const viewID = "IR-"+ this.incident.irID
    this.viewID = viewID
    const { user } = getUser();
          this.uid = user.value.uid // Checks the current User's UID
          const userRole = projectDb.ref(`users/${this.uid}/role`);
          const userJob = projectDb.ref(`users/${this.uid}/job`);
          // Then checks if what role they have.
          userRole.on('value', (role) => {
            userJob.on('value', (job) => {
              // if the role they have match with the authorized Role, then...
            if (role.val() === Role.HeadGuard ) {
              this.isHeadGuard = true
            } else if (job.val() === this.incident.job){
              this.isElectrician = true
            } else if (job.val() === this.incident.job){
              this.isPlumber = true
            } else if (job.val() === this.incident.job){
              this.isAirconTech = true
            } else if (job.val() === this.incident.job){
              this.isFabricator = true
            } else if (job.val() === this.incident.job){
              this.isCarpenter = true
            } else if (job.val() === "Admin" && this.incident.department == "Building Maintenance Office (BMO)") {
              this.isBMO = true
            } else if (role.val() === Role.Guard && this.incident.userId == this.uid) {
              this.isGuard = true
            } else if (role.val() === Role.ITRO && this.incident.department == "IT Resource Office (ITRO)") {
              this.isITRO = true
            } else if (role.val() === Role.Admin ) {
              this.isAdmin = true
            }
            })
          })
	}
};
</script>

<template>
  <!--HIGHER RESOLUTION-->
  <div class="gt-xs">
    <q-separator />
    <q-card v-if ="isGuard || isHeadGuard || isAdmin"
      :class="!this.incident.status ? 'bg-white' : 'bg-white'"
      clickable
      flat
      v-ripple
      @click="showIncidentDetails = true"
    >
      <div>
        <img
          :src="incident.imgUrl"
          style="height: 210px; width: 210px"
        />

        <div class="row q-pa-sm">
          <div class="col text-h6 text-weight-bold text-grey-9">
            {{"IR-"+ this.incident.irID}}
            <div class="col text-h6 text-weight-light">
              {{ this.incident.type }}
          </div>
          </div>
        </div>
        <div class="row q-pa-sm">
          <div class="col text-left text-subtitle2 text-weight-light" v-if="incident.date">
            {{ niceDate(this.incident.date) }}
          </div>
          <div class="col text-left text-subtitle2 text-weight-light" v-if="incident.time">
            {{ assignmentTime }}
          </div>
        </div>
      </div>
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
    <q-card v-if ="isITRO || isBMO"
      :class="!this.incident.status ? 'bg-white' : 'bg-white'"
      clickable
      flat
      v-ripple
      @click="showIncidentDetails = true"
    >
      <div>
        <img
          :src="incident.imgUrl"
          style="height: 210px; width: 210px"
        />

        <div class="row q-pa-sm">
          <div class="col text-h6 text-weight-bold text-grey-9">
            {{"IR-"+ this.incident.irID}}
            <div class="col text-h6 text-weight-light">
              {{ this.incident.type }}
          </div>
          </div>
        </div>
        <div class="row q-pa-sm">
          <div class="col text-left text-subtitle2 text-weight-light" v-if="incident.date">
            {{ niceDate(this.incident.date) }}
          </div>
          <div class="col text-left text-subtitle2 text-weight-light" v-if="incident.time">
            {{ assignmentTime }}
          </div>
        </div>
      </div>



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
  </div>
  <!--LOW RESOLUTION-->
  <div class="lt-sm">
    <q-separator />
  <q-card v-if ="isGuard || isHeadGuard  || isAdmin"
    :class="!this.incident.status ? 'bg-white' : 'bg-white'"
    clickable
    flat
    v-ripple
    @click="showIncidentDetails = true"
  >
    <div>
      <img
        :src="incident.imgUrl"
        style="height: 130px; width: 160px"
      />

      <div class="row q-pa-sm">
        <div class="col text-subtitle1 text-weight-bold text-grey-9">
          {{"IR-"+ this.incident.irID}}
          <div class="col text-caption ">
            {{ this.incident.type }}
        </div>
        </div>
      </div>
      <div class="row q-pa-sm">
        <div class="col text-left text-caption text-weight-light" v-if="incident.date">
          {{ niceDate(this.incident.date) }}
        </div>
        <div class="col text-left text-caption text-weight-light" v-if="incident.time">
          {{ assignmentTime }}
        </div>
      </div>
    </div>



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
  <q-card v-if ="isITRO || isBMO"
    :class="!this.incident.status ? 'bg-white' : 'bg-white'"
    clickable
    flat
    v-ripple
    @click="showIncidentDetails = true"
  >
    <div>
      <img
        :src="incident.imgUrl"
        style="height: 130px; width: 160px"
      />

      <div class="row q-pa-sm">
        <div class="col text-subtitle1 text-weight-bold text-grey-9">
          {{"IR-"+ this.incident.irID}}
          <div class="col text-caption ">
            {{ this.incident.type }}
        </div>
        </div>
      </div>
      <div class="row q-pa-sm">
        <div class="col text-left text-caption text-weight-light" v-if="incident.date">
          {{ niceDate(this.incident.date) }}
        </div>
        <div class="col text-left text-caption text-weight-light" v-if="incident.time">
          {{ assignmentTime }}
        </div>
      </div>
    </div>



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
  </div>
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
      isBMO: false,
      isGuard: false,
      isHeadGuard: false,
      isITRO: false,
      isAdmin: false,
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
async created() {
    const { user } = getUser();
          this.uid = user.value.uid // Checks the current User's UID
          const userRole = projectDb.ref(`users/${this.uid}/role`);
          // Then checks if what role they have.
          userRole.on('value', (snapshot) => {
            // if the role they have match with the authorized Role, then...
            if (snapshot.val() === Role.HeadGuard && this.incident.userId == this.uid) {
              this.isHeadGuard = true
            } else if (snapshot.val() === Role.BMO && this.incident.department == "Building Maintenance Office (BMO)") {
              this.isBMO = true
            } else if (snapshot.val() === Role.Guard && this.incident.userId == this.uid) {
              this.isGuard = true
            } else if (snapshot.val() === Role.ITRO && this.incident.department == "IT Resource Office (ITRO)") {
              this.isITRO = true
            } else if (snapshot.val() === Role.Admin ) {
              this.isAdmin = true
            }
          })
	}
};
</script>
<style>
.rounded {
    border-radius: 10px 10px 10px 10px;
}
</style>

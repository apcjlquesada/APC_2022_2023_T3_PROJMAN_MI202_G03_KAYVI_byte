<template>
  <q-card
      :class="!this.log.status ? 'bg-white' : 'bg-white'"
      clickable
      v-ripple
      @click="showLogDetails = true"
      class="q-mb-sm">
    <!-- Fetch Reports -->
    <q-item v-if ="isGuard || isHeadGuard || isAdmin ">
      <!--
        Section 001:
          Floor Level
          Security Personnel
       -->
      <q-item-section class="col-8 q-py-sm">
        <q-item-label class="text-weight-bold text-grey-9">
          {{ this.log.post }}
        </q-item-label>
        <q-item-label class="row" caption>
          {{ this.log.name }}
        </q-item-label>
      </q-item-section>
      <!--
        Section 002:
          Date
          Time
       -->
      <q-item-section class="col-2">
        <!-- Date -->
        <q-item-label class="row" caption v-if="log.date">
          {{ niceDate(this.log.date) }}
        </q-item-label>
        <!-- Time -->
        <q-item-label class="row" caption v-if="log.time">
          {{ assignmentTime }}
        </q-item-label>
      </q-item-section>
       <!--
         Section 003:
           Icon
       -->
      <q-item-section avatar class="col-1">
        <q-icon
          v-if="!this.log.status"
          name="timelapse"
          color="secondary"
          size="sm"
        />
        <q-icon
          v-if="this.log.status"
          name="check_circle"
          color="positive"
          size="sm"
        />
      </q-item-section>
    </q-item>
    <!-- Report Details Modal -->
    <q-dialog
      v-model="showLogDetails"
      transition-show="slide-up"
      transition-hide="slide-down"
      :maximized="maximizedToggle"
    >
    <q-card class="bg-accent">
      <log-details
        @close="showLogDetails = false"
        :log="log"
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
props: ["log", "id"],
  methods: {
    ...mapActions("logs", ["updateLog", "deleteLog"]),
    ...mapGetters("logs", ["logs"]),
  },
  setup () {
    return {
      dialog: ref(false),
      maximizedToggle: ref(true)
    }
  },
  data() {
    return {
      showLogDetails: false,
      isAdmin: false,
      isHeadGuard: false,
      isGuard: false,
      isBMO: false,
      isITRO: false
    };
  },
  components: {
    "log-details": require("src/components/Modals/LogDetails.vue")
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
        this.log.date + " " + this.log.time,
        "h:mm A"
      );
    }
  },
  created() {
    const { user } = getUser();
          this.uid = user.value.uid // Checks the current User's UID
          const userRole = projectDb.ref(`users/${this.uid}/role`);
          // Then checks if what role they have.
          userRole.on('value', (snapshot) => {
            // if the role they have match with the authorized Role, then...
            if (snapshot.val() === Role.HeadGuard ) {
              this.isHeadGuard = true
            } else if (snapshot.val() === Role.BMO) {
              this.isBMO = true
            } else if (snapshot.val() === Role.Guard && this.log.userId == this.uid) {
              this.isGuard = true
            } else if (snapshot.val() === Role.ITRO) {
              this.isITRO = true
            } else if (snapshot.val() === Role.Admin) {
              this.isAdmin = true
            }
          })
	}
};
</script>

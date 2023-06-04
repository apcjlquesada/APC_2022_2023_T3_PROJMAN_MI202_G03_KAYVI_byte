<template>
  <q-layout view="lhr LpR lFr">
    <q-header>
      <navbar @logout="goToAuth()" />
    </q-header>
    <q-page-container>
      <q-page>
        <card-modules />
        <card-recent />
        <card-insight />
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
          <q-fab
            icon="add"
            vertical-actions-align="right"
            direction="up"
            class="text-black bg-secondary"
            v-if="isGuard || isHeadGuard || isBMO || isAdmin"
          >
            <q-fab-action
              class="text-grey-10 bg-secondary"
              icon="assignment"
              label="Incident Report"
              @click="goToCreateIR"
              v-if="isGuard || isHeadGuard || isBMO || isAdmin"
            />
            <q-fab-action
              class="text-grey-10 bg-secondary"
              icon="fas fa-book"
              label="Logbook"
              @click="goToCreateLog"
              v-if="isGuard"
            />
            <q-fab-action
              class="text-grey-10 bg-secondary"
              icon="fas fa-book"
              label="Patrol"
              @click="goToCreatePatrol"
              v-if="isHeadGuard"
            />
          </q-fab>
        </q-page-sticky>
      </q-page>
    </q-page-container>
    <q-footer reveal class="bg-accent">
      <q-tabs
        class="text-grey-7"
        active-color="primary"
        align="justify"
        indicator-color="transparent"
      >
        <q-route-tab
          no-caps
          to="/home"
          icon="home"
          label="Home"
        />
        <q-route-tab
          no-caps
          to="/myprofile"
          icon="account_circle"
          label="Profile"
        />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
import { projectDb, projectAuth } from "src/boot/firebase"
import { ref } from "vue";
import { Role } from "src/components/roles"


export default {
  setup () {
    return {
      tab: ref('home'),
      isHeadGuard:false,
      isGuard:false,
      isBMO:false,
      isITRO:false,
      isAdmin:false
    }
  },
  components: {
    navbar: require("components/Navbars/Navbar.vue").default,
    "card-modules": require("components/actionCards/moduleCards.vue").default,
    "card-recent": require("components/actionCards/recentIRCards.vue").default,
    "card-insight": require("components/actionCards/insightsCards.vue").default
  },

  created() {
      projectAuth.onAuthStateChanged((auth) => {
        if (auth) {
          this.uid = auth.uid // Checks the current User's UID
          const userRole = projectDb.ref(`users/${this.uid}/role`);
          // Then checks if what role they have.
          userRole.on('value', (snapshot) => {
            // if the role they have match with the authorized Role, then...
            if (snapshot.val() === Role.HeadGuard ) {
              this.isHeadGuard = true
            } else if (snapshot.val() === Role.BMO ) {
              this.isBMO = true
            } else if (snapshot.val() === Role.Guard ) {
              this.isGuard = true
            } else if (snapshot.val() === Role.ITRO ) {
              this.isITRO = true
            } else if (snapshot.val() === Role.Admin ) {
              this.isAdmin= true
            } else {
            console.log('User Role is Invalid');
            }
          })
        }
      })
    },

  methods: {
    goToHome() {
      this.$router.push("/home");
    },
    goToProfile() {
      this.$router.push("/myprofile");
    },
    goToCreateIR() {
      this.$router.push("/createir");
    },
    goToCreateLog() {
      this.$router.push("/createLog");
    },
    goToCreatePatrol() {
      this.$router.push("/newpatrol");
    },
  },
};

</script>

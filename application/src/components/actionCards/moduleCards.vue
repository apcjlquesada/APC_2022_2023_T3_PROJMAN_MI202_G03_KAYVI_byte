<template>
  <!--Cards-->
    <!--HIGHER RESOLUTION-->
  <div class="row gt-xs q-px-md q-py-sm q-gutter-sm">
    <!-- IR -->
    <div
      v-if="isGuard || isHeadGuard || isBMO || isITRO  || isAdmin "
      class="col-2 col-grow"
    >
      <q-card
        v-ripple
        flat
        class="my-box cursor-pointer q-hoverable bg-primary"
        @click="goToIR()"
      >
        <div class="row q-pt-lg justify-center">
            <q-icon name="description" size="lg" class="text-white" />
        </div>
        <div class="row q-pb-md q-pt-xs">
          <div class="col text-center text-subtitle2 text-weight-light text-white">
            Incident Report
          </div>
        </div>
      </q-card>
    </div>
    <!-- Logs -->
    <div
      v-if="isHeadGuard || isGuard  || isAdmin "
      class="col-2 col-grow"
    >
      <q-card
        v-ripple
        flat
        class="my-box cursor-pointer q-hoverable bg-primary"
        @click="goToLogbook()"
      >
        <div class="row q-pt-lg justify-center">
          <q-icon name="fas fa-book" size="lg" class="text-white" />
        </div>
        <div class="row q-pb-md q-pt-xs">
          <div class="col text-center text-subtitle2 text-weight-light text-white">
            Logbook
          </div>
        </div>
      </q-card>
    </div>
    <!-- Members -->
    <div
      v-if="isHeadGuard || isBMO || isITRO  || isAdmin "
      class="col-2 col-grow"
    >
      <q-card
        v-ripple
        flat
        class="my-box cursor-pointer q-hoverable bg-primary"
        @click="goToUserManage()"
      >
        <div class="row q-pt-lg justify-center">
          <q-icon name="account_circle" size="lg" class="text-white" />
        </div>
        <div class="row q-pb-md q-pt-xs">
          <div class="col text-center text-subtitle2 text-weight-light text-white">
            User Management
          </div>
        </div>
      </q-card>
    </div>
    <!-- Insights -->
    <div
      v-if="isGuard || isHeadGuard || isBMO || isITRO  || isAdmin  "
      class="col-2 col-grow"
    >
      <q-card
        v-ripple
        flat
        class="my-box cursor-pointer q-hoverable bg-primary"
        @click="goToInsights()"
      >
        <div class="row q-pt-lg justify-center">
          <q-icon name="insights" size="lg" class="text-white" />
        </div>
        <div class="row q-pb-md q-pt-xs">
          <div class="col text-center text-subtitle2 text-weight-light text-white">
            Insights
          </div>
        </div>
      </q-card>
    </div>
  </div>
  <!--LOWER RESOLUTION-->
  <div class="row lt-sm q-px-md q-py-sm q-gutter-sm">
    <!-- IR -->
    <div
      v-if="isGuard || isHeadGuard || isBMO || isITRO || isAdmin"
      class="col-3 col-grow"
    >
      <q-card
        v-ripple
        flat
        class="my-box cursor-pointer q-hoverable bg-primary"
        @click="goToIR()"
      >
        <div class="row q-pt-lg justify-center">
            <q-icon name="description" size="md" class="text-white" />
        </div>
        <div class="row q-pb-md q-pt-xs">
          <div class="col text-center text-subtitle2 text-weight-light text-white">
            Incident Report
          </div>
        </div>
      </q-card>
    </div>
    <!-- Logs -->
    <div
      v-if="isHeadGuard || isGuard || isAdmin"
      class="col-3 col-grow"
    >
      <q-card
        v-ripple
        flat
        class="my-box cursor-pointer q-hoverable bg-primary"
        @click="goToLogbook()"
      >
        <div class="row q-pt-lg justify-center">
          <q-icon name="fas fa-book" size="md" class="text-white" />
        </div>
        <div class="row q-pb-md q-pt-xs">
          <div class="col text-center text-subtitle2 text-weight-light text-white">
            Logbook
          </div>
        </div>
      </q-card>
    </div>
    <!-- Members -->
    <div
      v-if="isHeadGuard || isBMO || isITRO || isAdmin "
      class="col-3 col-grow"
    >
      <q-card
        v-ripple
        flat
        class="my-box cursor-pointer q-hoverable bg-primary"
        @click="goToUserManage()"
      >
        <div class="row q-pt-lg justify-center">
          <q-icon name="account_circle" size="md" class="text-white" />
        </div>
        <div class="row q-pb-md q-pt-xs">
          <div class="col text-center text-subtitle2 text-weight-light text-white">
            Members
          </div>
        </div>
      </q-card>
    </div>
    <!-- Insights -->
    <div
      v-if="isGuard || isHeadGuard || isBMO || isITRO || isAdmin "
      class="col-3 col-grow"
    >
      <q-card
        v-ripple
        flat
        class="my-box cursor-pointer q-hoverable bg-primary"
        @click="goToInsights()"
      >
        <div class="row q-pt-lg justify-center">
          <q-icon name="insights" size="md" class="text-white" />
        </div>
        <div class="row q-pb-md q-pt-xs">
          <div class="col text-center text-subtitle2 text-weight-light text-white">
            Insights
          </div>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script>
import { projectDb, projectAuth } from "src/boot/firebase"
import { Role } from "src/components/roles"
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("incidents", [
      "incidentsUnresolved",
      "incidentsResolved",
    ]),
  },
  components: {
      //navbar: require("components/Navbars/Navbar.vue").default,
      //recentIR: require("components/IncidentReports/RecentIR.vue").default
    },
  data() {
    return {
      isGuard: false,
      isHeadGuard: false,
      isBMO: false,
      isITRO: false,
      isAdmin: false
    }
  },
  async created() {
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
              this.isAdmin = true
            }else {
            console.log('User Role is Invalid');
            }
          })
        }
      })
    },

  methods: {
    goToAuth() {
      this.$router.push("/login");
    },
    goToIR() {
      this.$router.push("/viewIR");
    },
    goToMyProfile(){
      this.$router.push("src/pages/myprofile");
    },
    goToInsights() {
       this.$router.push("/insights");
    },
    goToUserManage() {
      this.$router.push("/viewusers");
    },
    goToLogbook(){
      this.$router.push("/viewlog");
    },
  },
};
</script>
<style>
.my-box {
    border-radius: 10px 10px 10px 10px;
}
</style>

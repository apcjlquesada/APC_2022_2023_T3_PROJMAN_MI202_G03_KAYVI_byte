<template>
  <q-layout view="hHh lpR fFf">
    <q-header class=" bg-accent">
      <navbar @logout="goToAuth()" />
      <div class="q-px-md q-pt-sm">
        <q-card
          v-if="isHeadGuard"
          class="row q-my-sm q-pa-sm bg-white text-primary"
        >
          <q-card-section class="col text-subtitle1 text-weight-bold">
            Ready to Patrol?
          </q-card-section>
            <!--Routing to View Page -->
            <q-card-section class="row">
              <q-btn
                icon="add"
                rounded unelevated
                text-color="white"
                class="text-capitalize bg-primary"
                to="/newpatrol"
              >
                Start Patrol
              </q-btn>
            </q-card-section>
        </q-card>

        <q-card
          v-if="isGuard"
          class="row q-my-sm q-pa-sm bg-white text-primary"
        >
          <q-card-section class="col text-subtitle1 text-weight-bold">
            Ready to Log?
          </q-card-section>
            <!--Routing to View Page -->
            <q-card-section class="row">
              <q-btn
                icon="add"
                rounded unelevated
                text-color="white"
                class="text-capitalize bg-primary"
                to="/createlog"
              >
                Create Logs
              </q-btn>
            </q-card-section>
        </q-card>
      </div>
    </q-header>

    <q-page-container>
      <q-page>
      <!--Cards-->
      <div class="row q-px-md q-py-sm q-gutter-sm">
        <!-- IR -->
        <div class="col-3 col-grow">
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
        <div class="col-3 col-grow">
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
        <!-- Insights -->
        <div class="col-3 col-grow">
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
      <!-- RECENT IRs -->
      <div class="row q-my-sm bg-white">
        <div class="col q-py-md q-px-md">
          <div class="text-h6 text-weight-bold text-grey-9 ">Recent Issued Incidents
            <q-btn
              no-caps unelevated
              label="View more"
              class="text-primary"
              @click="goToIR"
            />
          </div>
        </div>
        <q-scroll-area class="full-width" style="height: 250px; min-width: 300px;">
          <div class="row no-wrap q-gutter-xs q-px-sm">
            <recentIR
              v-for="(incident, key) in incidentsUnresolved"
              :key="key"
              :incident="incident"
              :id="key"
            />
          </div>
        </q-scroll-area>
      </div>
    </q-page>
    </q-page-container>
  </q-layout>
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
      navbar: require("components/Navbars/Navbar.vue").default,
      recentIR: require("components/IncidentReports/RecentIR.vue").default
    },
  data() {
    return {
      isGuard: false,
      isHeadGuard: false,
    }
  },
  async created() {
      projectAuth.onAuthStateChanged((auth) => {
        if (auth) {
          this.uid = auth.uid // Checks the current User's UID
          const userRole = projectDb.ref(`users/${this.uid}/role`);
          // THIS SNIPPET IS COMMENTED DUE TO ITRO & BMO REDIRECT TO ERROR PAGE
          // Then checks if what role they have.
          userRole.on('value', (snapshot) => {
            // if the role they have match with the authorized Role, then...
            if (snapshot.val() === Role.HeadGuard ) {
              this.isHeadGuard = true
            } else if (snapshot.val() === Role.Guard ) {
              this.isGuard = true
            } else {
              console.log("not Guard or Head guard");
              //this.$router.push("/home");
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
    goToLogbook(){
      this.$router.push("/viewlog");
    },
  },
};



</script>


<template>
  <q-layout view="lhr LpR lFr">
    <q-header reveal class="bg-primary">
      <div class="col">
        <navbar2 @home="goToHome()" />
      </div>
      <div class="row q-px-md q-pb-sm q-pt-md">
        <search class="col" />
        <sort class="col-1"/>
      </div>
      <div>
        <q-tabs
          v-model="tab"
          class="text-white bg-primary"
          active-color="secondary"
          indicator-color="secondary"
          narrow-indicator
          align="justify"
        >
          <q-tab no-caps name="unresolved" label="Unresolved" />
          <q-tab no-caps name="resolved" label="Resolved" />
        </q-tabs>
      </div>
    </q-header>

    <q-page-container>
      <q-page>
        <q-list separator>
          <q-tab-panels v-model="tab" animated>
            <!--Unresolved Tab-->
            <q-tab-panel class="bg-accent" name="unresolved">
                <!--Incident-->
                <incident
                  v-for="(incident, key) in incidentsUnresolved"
                  :key="key"
                  :incident="incident"
                  :id="key"
                />
                <!--no incident available icon-->
                <no-incident
                  v-if="!Object.keys(incidentsUnresolved).length"
                />
            </q-tab-panel>
            <!--Resolved Tab-->
            <q-tab-panel class="bg-accent" name="resolved">
              <q-list separator>
                <incident
                  v-for="(incident, key) in incidentsResolved"
                  :key="key"
                  :incident="incident"
                  :id="key"
                ></incident>
                <!--no reports available icon-->
                <no-incident
                v-if="!Object.keys(incidentsResolved).length"
              ></no-incident>
              </q-list>
            </q-tab-panel>
          </q-tab-panels>
        </q-list>
        <q-page-sticky
          v-if="isGuard || isHeadGuard || isBMO || isAdmin"
          position="bottom-right"
          :offset="[18, 18]"
        >
          <q-btn
              fab
              icon="add"
              color="secondary"
              to="/createir"
          />
        </q-page-sticky>
      </q-page>
    </q-page-container>

    <q-footer class="bg-accent q-pa-md" />
  </q-layout>
</template>

<!--script-->
<script>
import { mapGetters } from "vuex";
import { Role } from "src/components/roles";
import { projectDb, projectAuth } from "src/boot/firebase";

export default {
  computed: {
    ...mapGetters("incidents", [
      "incidentsUnresolved",
      "incidentsResolved",
    ]),
  },
  components: {
    navbar2: require("components/Navbars/Navbar2.vue").default,
    incident: require("src/components/IncidentReports/StatusIR/IRSummary.vue").default,
    "no-incident": require("src/components/IncidentReports/StatusIR/NoIR.vue").default,
    search: require("src/components/Tools/SearchIR.vue").default,
    sort: require("src/components/Tools/SortIR.vue").default,
  },
  data() {
    return {
      tab: ("resolved", "unresolved"),
      isBMO: false,
      isGuard: false,
      isHeadGuard: false,
      isITRO: false,
      isAdmin: false,
    };
  },
  methods: {
    goToHome() {
      this.$router.push("/home");
    },
  },
  created() {
    //console.log(this.incident.irID)
      projectAuth.onAuthStateChanged((auth) => {
        if (auth) {
          this.uid = auth.uid // Checks the current User's UID
          const userRole = projectDb.ref(`users/${this.uid}/role`);
          const userJob = projectDb.ref(`users/${this.uid}/job`);
          // Then checks if what role they have.
          userRole.on('value', (snapshot) => {
            userJob.on('value', (job) =>{
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
            }
            })
            // if the role they have match with the authorized Role, then...
          })
        }
      })
    },
};
</script>

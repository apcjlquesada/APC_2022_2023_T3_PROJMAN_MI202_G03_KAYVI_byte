<template>
  <q-layout view="hHh lpR fFf">
    <q-header class=" bg-primary">
      <div class="col">
        <navbar2 @home="goToHome()" />
      </div>
      <div class="row q-px-md q-pb-sm q-pt-md">
        <search class="col" />
        <sort class="col-1"/>
      </div>
      <div class="col">
        <q-tabs
          v-model="tab"
          class="text-white bg-primary"
          active-color="secondary"
          indicator-color="secondary"
          narrow-indicator
        >
          <q-tab no-caps name="unresolved" label="Unverified" />
          <q-tab no-caps name="resolved" label="Verified" />
        </q-tabs>
      </div>
    </q-header>
    <q-page-container>
      <q-page>
        <q-list separator>
            <q-tab-panels v-model="tab" animated>
              <!--Unresolved Tab-->
              <q-tab-panel class="bg-accent" name="unresolved">
                  <!--Log-->
                  <log
                    v-for="(log, key) in logsUnresolved"
                    :key="key"
                    :log="log"
                    :id="key"
                  />
                  <!--no log available icon-->
                  <no-log
                    v-if="!Object.keys(logsUnresolved).length"
                  />
              </q-tab-panel>

              <!--Resolved Tab-->
              <q-tab-panel class="bg-accent" name="resolved">
                  <q-list separator>
                    <log
                      v-for="(log, key) in logsResolved"
                      :key="key"
                      :log="log"
                      :id="key"
                    ></log>
                    <!--no reports available icon-->
                    <no-log
                    v-if="!Object.keys(logsResolved).length"
                  ></no-log>
                  </q-list>
              </q-tab-panel>
            </q-tab-panels>
        </q-list>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
          <q-btn fab icon="add" color="secondary" to="/createlog" v-if="isGuard" />
          <q-btn fab icon="add" color="secondary" to="/newpatrol" v-if="isHeadGuard" />
        </q-page-sticky>
      </q-page>
    </q-page-container>
    <q-footer class="bg-accent q-pa-md" />
  </q-layout>
</template>

<!--script-->
<script>
import { mapGetters } from "vuex";
import { projectDb } from "src/boot/firebase"
import { Role } from "src/components/roles"
import getUser from "src/composables/getUser";

export default {
  name: "ViewLogs",

  computed: {
    ...mapGetters("logs", [
      "logsUnresolved",
      "logsResolved",
    ]),
  },
  components: {
    navbar2: require("components/Navbars/Navbar2.vue").default,
    log: require("src/components/Logbook/Logs/Logs.vue").default,
    "no-log": require("src/components/Logbook/Logs/NoLog.vue").default,
    search: require("src/components/Tools/SearchLog.vue").default,
    sort: require("src/components/Tools/SortLog.vue").default,
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

  setup() {
    return {
      thumbStyle: {
        right: "4px",
        borderRadius: "5px",
        backgroundColor: "#1a73e8",
        width: "5px",
        opacity: 0.3,
      },
    };
  },
  created() {
		this.logToSubmit = Object.assign({}, this.log)
    const { user } = getUser();
          this.uid = user.value.uid // Checks the current User's UID
          const userRole = projectDb.ref(`users/${this.uid}/role`);
          console.log(userRole)
          // Then checks if what role they have.
          userRole.on('value', (snapshot) => {
            // if the role they have match with the authorized Role, then...
            if (snapshot.val() === Role.HeadGuard ) {
              this.isHeadGuard = true
            } else if (snapshot.val() === Role.Guard ) {
              this.isGuard = true
            } else if (snapshot.val() === Role.Admin ) {
              this.isAdmin = true
            }
          })
	}
};
</script>

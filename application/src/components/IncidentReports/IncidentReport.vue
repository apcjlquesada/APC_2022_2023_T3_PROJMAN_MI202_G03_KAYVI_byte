<template>
  <q-page>
    <!--header-->
    <div rounded size="1000px" class="z-absolute bg-primary">
      <navbar2 @home="goToHome()" />
    </div>
    <!-- body -->
    <q-card scoped>
      <q-tabs
        v-model="tab"
        class="text-white bg-primary"
        active-color="secondary"
        indicator-color="secondary"
        align="justify"
        narrow-indicator
      >
        <q-tab no-caps name="addIncidents" label="Report an Incident" />
        <q-tab no-caps name="incidents" label="View Incident Reports" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <!-- add incidents -->
        <q-tab-panel name="addIncidents">
          <div class="q-px-md q-py-md" style="max-width: 1080px absolute-top">
            <add-incident />
          </div>
        </q-tab-panel>

        <!-- assignments -->
        <q-tab-panel name="incidents">
          <div class="q-px-md q-py-md" style="max-width: 1080px absolute-top">
            <incident />
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<!--script-->
<script>
import { mapActions, mapGetters } from "vuex";
import { firebaseAuth } from "src/boot/firebase";
import { ref, onBeforeMount } from "vue";

export default {
  name: "Incidents",

  components: {
    navbar2: require("components/Navbars/Navbar2.vue").default,
    "add-incident": require("src/components/IncidentReports/CreateIR.vue")
      .default,
    incident: require("src/components/IncidentReports/ViewIR.vue").default,
  },

  methods: {
    goToHome() {
      this.$router.push("/home");
    },
  },

  data() {
    return {
      tab: ("incidents", "addIncidents"),
    };
  },
};
</script>

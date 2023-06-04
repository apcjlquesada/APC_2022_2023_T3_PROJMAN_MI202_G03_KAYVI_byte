<template>
  <q-layout view="hHh lpR fff">
    <q-header class="row bg-white q-py-lg">
      <q-toolbar>
        <div class="col-1 justify-center text-center">
          <q-icon
            class="q-pt-xs q-px-sm"
            name="arrow_back_ios"
            size="sm"
            color="primary"
            v-close-popup flat round dense
          />
        </div>
        <q-toolbar-title
          class="
          col
          text-h6 text-weight-bold text-primary"
        >
          Incident Details
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page>
        <!--
          RESOLVED BANNER
        -->
        <div class="row text-subtitle2 bg-positive q-pa-sm justify-center" v-if="incident.status">
          Resolved on: {{incident.res}}
        </div>
        <div class="row text-subtitle2 bg-positive q-pa-sm justify-center" v-if="incident.status">
          Resolved by: {{incident.resolver}}
        </div>
        <!--
          Blue Card
        -->
        <div class="q-px-md q-pb-xs q-pt-lg">
          <q-card class="row q-my-sm q-pa-sm bg-primary text-grey-2" >
            <q-card-section>
              <q-icon name="account_circle" color="white" size="70px" />
            </q-card-section>
            <q-card-section class="col text-caption text-weight-light">
              <div class="row q-pt-sm text-h5 text-grey-1 text-weight-bold">
                {{ incident.name }}
              </div>
              <div class="row text-subtitle1 text-grey-4">
                Issued on: {{ niceDate(incident.date) }} at {{ incidentTime }}
              </div>
            </q-card-section>
          </q-card>
        </div>
        <!--
          Incident Number
        -->
        <div class="row q-px-md">
          <q-card class="col q-my-sm q-pa-sm bg-white" >
          <q-card-section>
            <div class="text-weight-bold text-h6 text-primary">
                Incident Number:
            </div>
            <div class="text-subtitle2 text-grey-8 text-weight-light">
              {{ "IR-"+ incident.irID }}
            </div>
          </q-card-section>
          </q-card>
        </div>
        <!--
          Issued to: Department
        -->
        <div class="row q-px-md">
          <q-card class="col q-my-sm q-pa-sm bg-white" >
          <q-card-section>
            <div class="text-weight-bold text-h6 text-primary">
                Issued to:
            </div>
            <div class="text-subtitle2 text-grey-8 text-weight-light">
              {{ incident.department }}
            </div>
          </q-card-section>
          </q-card>
        </div>
        <!--
          Incident Found
        -->
        <div class="row q-px-md q-pb-xs">
          <q-card class="col q-my-sm q-pa-sm bg-white">
            <q-card-section class="col full-wdith">
              <div class="text-weight-bold text-h6 text-primary q-pb-md">
                Incident Found:
              </div>

              <!-- Assigned to -->
              <div
              v-if="incident.department=='Building Maintenance Office (BMO)'"
              class="row full-width text-grey-9">
                <div class="col text-subtitle1 text-weight-bold">
                  Assigned to:
                </div>
                <div class="col-5"/>
                <div class="col text-subtitle1 text-right">
                  {{ incident.job }}
                </div>
              </div>

              <q-separator class="q-my-md" />

              <!-- TYPE -->
              <div class="row full-width text-grey-9">
                <div class="col text-subtitle1 text-weight-bold">
                  Type:
                </div>
                <div class="col-5"/>
                <div class="col text-subtitle1 text-right">
                  {{ incident.type }}
                </div>
              </div>

              <q-separator class="q-my-md" />

              <!-- LOCATION: FLOOR LEVEL  -->
              <div class="row full-width text-grey-9">
                <div class="col text-subtitle1 text-weight-bold">
                  Location:
                </div>
                <div class="col-5"/>
                <div class="col text-subtitle1 text-right">
                  {{ incident.post }}
                </div>
              </div>

              <q-separator class="q-my-md" />

              <!-- LOCATION: FLOOR LEVEL  -->
              <div class="row full-width text-grey-9">
                <div class="col text-subtitle1 text-weight-bold">
                  Specific Location:
                </div>
                <div class="col-5"/>
                <div class="col text-subtitle1 text-right">
                  {{ incident.spec }}
                </div>
              </div>

              <q-separator class="q-my-md" />

              <div class="row full-width text-grey-9">
                <div class="text-subtitle1 text-weight-bold">
                  Photo of the Incident
                </div>
              </div>
              <div class="flex-center items-center row full-width">
                <img
                  :src="incident.imgUrl"
                  style="max-height: 550px; min-width: 250px"
                />
              </div>
              <q-separator class="q-my-md" />

              <!-- DESCRIPTION -->
              <div>
              <div class="row full-width text-grey-9">
                <div class="col text-subtitle1 text-weight-bold">
                  Description:
                </div>
              </div>
              <div class="row q-pt-sm text-subtitle2 text-weight-light">
                  {{ incident.desc }}
                </div>
              </div>

              <q-separator class="q-my-md" v-if="incident.status" />
              <!--Time and Date of Resolution-->
              <div v-if="incident.status">
              <div class="row full-width text-grey-9">
                <div class="col text-subtitle1 text-weight-bold">
                  Root Cause:
                </div>
              </div>
              <div class="row q-pt-sm text-subtitle2 text-weight-light">
                  {{ incident.root }}
                </div>
              </div>

              <q-separator class="q-my-md" v-if="incident.status" />
              <!--Time and Date of Resolution-->
              <div v-if="incident.status">
              <div class="row full-width text-grey-9">
                <div class="col text-subtitle1 text-weight-bold">
                  Solution:
                </div>
              </div>
              <div class="row q-pt-sm text-subtitle2 text-weight-light">
                  {{ incident.solution }}
                </div>
              </div>

            </q-card-section>

          </q-card>
        </div>
      </q-page>
    </q-page-container>

    <!-- Confirmation Prompt -->
    <q-footer class="row bg-accent q-pa-lg" v-if="isBMO || isITRO || isAdmin ">
      <q-btn
        v-if="!incident.status"
        rounded no-caps
        class="col justify-center bg-secondary text-white"
        label="Resolve Issue"
        @click="prompt = true"
      />
      <!-- Confirmation Dialog -->
      <q-dialog v-model="prompt" class="q-pa-md" persistent position="bottom">
        <q-card class="q-pa-sm">
          <q-card-section class="row q-pa-md">
            <div>
              <p class="col text-h4 text-weight-bold text-warning">Hold on! </p>
              <p class="row text-subtitle1 text-weight-light">
                What was the cause and how did you resolve the Incident?
              </p>
            </div>
          </q-card-section>
          <q-card-section>
              <q-select
                v-if="incident.department=='Building Maintenance Office (BMO)'"
                outlined
                label="What was the cause of the Incident?"
                v-model="this.rOthers"
                :options="this.rootOptions"
                @update:model-value="rOthersChange"
                ref="type"
                :rules="[(val) => !!val || 'Field is required']"
              />
              <q-input
                v-if="rootOthers"
                label="Please describe what was the Root Cause"
                v-model="this.root"
                filled
                type="textarea"
                maxlength="300"
                ref="desc"
                :rules="[(val) => !!val || 'Field is required']"
              />
              <q-input
                v-if="incident.department=='IT Resource Office (ITRO)'"
                label="What was the cause of the Incident?"
                v-model="this.root"
                filled
                type="textarea"
                maxlength="300"
                ref="desc"
                :rules="[(val) => !!val || 'Field is required']"
              />
            </q-card-section>

            <q-card-section>
              <q-select
                v-if="incident.department=='Building Maintenance Office (BMO)'"
                outlined
                label="How did you resolve the issue?"
                v-model="this.sOthers"
                :options="this.solOptions"
                @update:model-value="sOthersChange"
                ref="type"
                :rules="[(val) => !!val || 'Field is required']"
              />
              <q-input
                v-if="solOthers"
                label="Please describe how it was Resolved"
                v-model="this.solution"
                filled
                type="textarea"
                maxlength="300"
                ref="desc"
                :rules="[(val) => !!val || 'Field is required']"
              />
              <q-input
                v-if="incident.department=='IT Resource Office (ITRO)'"
                label="How did you resolve the issue?"
                v-model="this.solution"
                filled
                type="textarea"
                maxlength="300"
                ref="desc"
                :rules="[(val) => !!val || 'Field is required']"
              />
            </q-card-section>
          <!-- body -->
          <q-card-actions class="q-pb-xl">
            <q-btn
              unelevated exact no-caps rounded outline
              color="primary"
              label="Submit"
              class="fit q-pa-md q-ma-sm text-weight-light"
              @click="resolve"
              size="18px"
            />
            <q-btn
              unelevated exact no-caps rounded
              color="primary"
              label="Cancel"
              class="fit q-pb-sm q-ma-sm text-weight-light"
              size="18px"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-footer>
  </q-layout>
</template>

<script>
import { mapActions } from "vuex";
import { ref } from "vue";
import { useQuasar, date } from "quasar";
import { projectDb } from "src/boot/firebase"
import { Role } from "src/components/roles"
import getUser from "src/composables/getUser";

export default {
  props: ["incident", "id"],


  setup() {
    const timeStamp = Date.now()
    const formattedDate = date.formatDate(timeStamp, 'MMMM DD, YYYY')
    const formattedTime = date.formatDate(timeStamp, 'hh : mm  A')
    const $q = useQuasar()

    return {
      getTime(){
        this.res = (formattedDate+" at "+formattedTime);
      },
      onError() {
        $q.notify({
          type: 'negative',
          message: `Please Populate All Fields`
        })
      },
      alert: ref(false),
      confirm: ref(false),
      prompt: ref(false),
      airconRootOps: [
        "Clogged Drainage",
        "Dirty Unit",
        "Gas leak",
        "Others"
      ],
      electricianRootOps: [
        "Old Age",
        "Lifespan Consume",
        "Others"
      ],
      plumberRootOps: [
        "Due to Usage",
        "Lost Gasket",
        "Clogged Drainage",
        "Others"
      ],
      fabcarpRootOps: [
        "Others"
      ],
      airconSolOps: [
        "Vacuum",
        "General Cleaning",
        "Repair System Reprosses",
        "Refrigerant Gas",
        "Others"
      ],
      electricianSolOps: [
        "Replacement",
        "Repair",
        "Others"
      ],
      plumberSolOps: [
        "Repair",
        "Replacement",
        "Others"
      ],
      fabcarpSolOps: [
        "Others"
      ],
    }
  },
  //maximaze fullscreen
  data: function () {
    const { user } = getUser();
    const uid = user.value.uid
    const userRole = projectDb.ref(`users/${uid}/role`);
    userRole.on('value', (snapshot) => {
      const currentUserRole = snapshot.val()
      this.role = currentUserRole
    })
    return {
      rOthers: "",
      sOthers: "",
      rootOptions: "",
      solOptions: "",
      rootOthers: false,
      solOthers: false,

      isBMO: false,
      isGuard: false,
      isHeadGuard: false,
      isITRO: false,
      isAdmin: false,
      maximizedToggle: true,
      root:"",
      solution:"",
      cname:""
    };
  },
  computed: {
    niceDate() {
      return (value) => {
        return date.formatDate(value, "MMM DD, YYYY");
      };
    },
    incidentTime() {
      return date.formatDate(
        this.incident.date + " " + this.incident.time,
        "h:mm A"
      );
    }
  },
  methods: {
    ...mapActions("incidents", ["updateIncident"]),

    rOthersChange(){
      if(this.rOthers == "Others"){
        this.root = ""
        this.rootOthers = true
      }else{
        this.rootOthers = false
        this.root = this.rOthers
      }
    },

    sOthersChange(){
      if(this.sOthers == "Others"){
        this.solution = ""
        this.solOthers = true
      }else{
        this.solOthers = false
        this.solution = this.sOthers
      }
    },

    resolve() {
      if (this.root == "" || this.solution == ""){
        this.onError()
      }else{
        this.getTime()
        this.updateIncident({
				id: this.id,
        updates: { status: !this.incident.status, res: this.res, root: this.root, solution: this.solution, resolver: this.cname},
			  })
      }
    }
  },
  created() {
		this.incidentToSubmit = Object.assign({}, this.incident)
    const { user } = getUser();
          this.uid = user.value.uid // Checks the current User's UID
          const userRole = projectDb.ref(`users/${this.uid}/role`);
          console.log(userRole)
          // Then checks if what role they have.
          userRole.on('value', (snapshot) => {
            // if the role they have match with the authorized Role, then...
            if (snapshot.val() === Role.HeadGuard ) {
              this.isHeadGuard = true
            } else if (snapshot.val() === Role.BMO && this.incident.department == "Building Maintenance Office (BMO)") {
              this.isBMO = true
            } else if (snapshot.val() === Role.Guard ) {
              this.isGuard = true
            } else if (snapshot.val() === Role.ITRO && this.incident.department == "IT Resource Office (ITRO)") {
              this.isITRO = true
            } else if (snapshot.val() === Role.Admin)  {
              this.isAdmin = true
            }
          })

    let uid = user.value.uid
    const userName = projectDb.ref(`users/${uid}/name`);
    userName.on('value', (snapshot) => {
      const currentUserName = snapshot.val()
      this.cname = currentUserName
    })

    if(this.incident.job == "Electrician"){
      this.rootOptions = this.electricianRootOps
      this.solOptions = this.electricianSolOps
    }else if(this.incident.job == "Plumber"){
      this.rootOptions = this.plumberRootOps
      this.solOptions = this.plumberSolOps
    }else if(this.incident.job == "Aircon Technician"){
      this.rootOptions = this.airconRootOps
      this.solOptions = this.airconSolOps
    }else if(this.incident.job == "Fabricator" || this.incident.job == "Carpenter"){
      this.rootOptions = this.fabcarpRootOps
      this.solOptions = this.fabcarpSolOps
    }
	}
};
</script>

<style>
.inputStyle {
  min-width: 250px;
  max-width: 1080px;
  max-height: 120px;
  padding: 15px;
  font-size: 20px;
}
</style>

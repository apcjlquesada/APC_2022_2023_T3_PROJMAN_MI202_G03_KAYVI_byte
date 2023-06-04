<template>
  <q-layout view="hhh lpR fff">
    <q-header class="row q-py-md bg-white text-primary">
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
        <div class="q-pa-md text-weight-bold text-subtitle1">
          Account Information
        </div>
        <q-toolbar-title />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page class="q-pt-md">
        <div
          v-if="!!this.user.updatedAt && !!this.user.updatedBy"
          class="row text-black bg-info q-mb-md text-caption items-center
        ">
          <div class="col-1 q-pl-md" v-if="isITRO || isAdmin">
            <q-icon name="info" size="sm" />
          </div>
          <s-spacce class="col-1"/>
          <div class="col" v-if="isITRO || isAdmin">
            <div class="text-weight-bold">
              Updated: {{this.user.updatedData}}
            </div>
            <div>
              {{this.user.updatedBy}} <q-space /> {{this.user.updatedAt}}
            </div>
          </div>
        </div>
        <!-- CARD PROFIE -->
        <q-card class="row q-pa-sm q-mx-md q-mb-md items-center">
          <q-icon name="account_circle" color="grey-6" size="70px" />
          <q-card-section class="col full-width ">
            <div class="text-weight-bold text-subtitle1">
              {{this.user.name}}
            </div>
            <div class="text-weight-light">
              {{this.user.email}}
            </div>
            <div class="text-caption text-weight-light">
              <div v-if="this.user.role == 'BMO'">
                {{ this.user.role }} | {{this.user.job}}
              </div>
              <div v-else>
                {{ this.user.role }}
              </div>
            </div>
          </q-card-section>
        </q-card>
        <!-- DISPLAY NAME -->
        <q-card
          flat
          class="row q-px-sm bg-accent items-center"
        >
          <q-card-section class="col">
            <div class=" text-weight-bold text-subtitle2">Display Name</div>
            <div class="text-caption">{{this.user.name}}</div>
          </q-card-section>
          <q-space />
          <q-card-section
            v-if="isITRO || isAdmin"
            class="text-caption text-weight-light"
          >
            <q-btn
              unelevated no-caps
              class="bg-primary text-white"
              label="Edit"
              @click="showEditName = true"
            >
              <!-- Report Details Modal -->
              <q-dialog
                v-model="showEditName"
                position="bottom"
                class="full-width"
                :full-width="fullWidthToggle"
              >
                <q-card class="bg-accent" style="height:300px">
                  <edit-name
                    @close="showEditName = false"
                    :user="user"
                    :id="id"
                  />
                </q-card>
              </q-dialog>
            </q-btn>
          </q-card-section>
        </q-card>

        <!-- PHONE NUMBER -->
        <q-card
          flat
          class="row q-px-sm bg-accent items-center"
        >
          <q-card-section class="col">
            <div class=" text-weight-bold text-subtitle2">Phone</div>
            <div class="text-caption">{{this.user.phoneNumber}}</div>
          </q-card-section>
          <q-space />
          <q-card-section
            v-if="isITRO || isAdmin"
            class="text-caption text-weight-light"
          >
            <q-btn
              unelevated no-caps
              class="bg-primary text-white"
              label="Edit"
              @click="showEditPhone = true"
            >
              <!-- Report Details Modal -->
              <q-dialog
                v-model="showEditPhone"
                position="bottom"
                class="full-width"
                :full-width="fullWidthToggle"
              >
                <q-card class="bg-accent" style="height:300px">
                  <edit-phone
                    @close="showEditPhone = false"
                    :user="user"
                    :id="id"
                  />
                </q-card>
              </q-dialog>
            </q-btn>
          </q-card-section>
        </q-card>

        <!-- ROLE-->
        <q-card
          flat
          class="row q-px-sm bg-accent items-center"
        >
          <q-card-section class="col">
            <div class=" text-weight-bold text-subtitle2">Role & Job</div>
            <div class="text-caption" v-if="this.user.role == 'BMO'">
              {{ this.user.role }} | {{this.user.job}}
            </div>
            <div class="text-caption" v-else>
              {{ this.user.role }}
            </div>
          </q-card-section>
          <q-space />
          <q-card-section
            v-if="isITRO || isAdmin"
            class="text-caption text-weight-light"
          >
            <q-btn
              unelevated no-caps
              class="bg-primary text-white"
              label="Edit"
              @click="showEditRole = true"
            >
              <!-- Report Details Modal -->
              <q-dialog
                v-model="showEditRole"
                position="bottom"
                class="full-width"
                :full-width="fullWidthToggle"
              >
                <q-card class="bg-accent" style="height:350px">
                  <edit-role
                    @close="showEditRole = false"
                    :user="user"
                    :id="id"
                  />
                </q-card>
              </q-dialog>
            </q-btn>
          </q-card-section>
        </q-card>

        <q-card
          flat
          class="row q-px-sm bg-accent items-center"
        >
          <q-card-section class="col">
            <div class=" text-weight-bold text-subtitle2">Incidents Reported</div>
            <div class="text-caption">{{this.incidentsReported}}</div>
          </q-card-section>
          <q-space />
        </q-card>

        <q-card
          v-if="this.isResolver"
          flat
          class="row q-px-sm bg-accent items-center"
        >
          <q-card-section class="col">
            <div class=" text-weight-bold text-subtitle2">Incidents Resolved</div>
            <div class="text-caption">{{this.incidentsResolved}}</div>
          </q-card-section>
          <q-space />
        </q-card>

      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import { mapActions, mapGetters } from "vuex";
import { projectDb, projectAuth } from "src/boot/firebase"
import { Role } from "src/components/roles"

export default {
  props: ["user", "id"],
  setup () {
    return {
      dialog: ref(false),
      fullWidthToggle: ref(true)
    }
  },
  data() {
    return {
      showEditName: false,
      showEditPhone: false,
      showEditRole: false,
      showEditJob: false,
      isBMO: false,
      isGuard: false,
      isHeadGuard: false,
      isITRO: false,
      isAdmin: false,
      isResolver: false,
      incidentsReported: 0,
      incidentsResolved: 0
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

    if(this.user.role == "BMO"){
      this.isResolver = true
    } else if (this.user.role == "ITRO"){
      this.isResolver = true
    } else {
      this.isResolver = false
    }

    const incidentsDB = projectDb.ref();

    let reportCounter = 0
      incidentsDB.child("incidents").orderByChild("name").equalTo(this.user.name).on("value", (snapshot)=>{
      snapshot.forEach(function(childSnapshot) {
        reportCounter++
      });
      this.incidentsReported = reportCounter
    });

    let resolvedCounter = 0
      incidentsDB.child("incidents").orderByChild("resolver").equalTo(this.user.name).on("value", (snapshot)=>{
      snapshot.forEach(function(childSnapshot) {
        resolvedCounter++
      });
      this.incidentsResolved = resolvedCounter
    });

  },
  methods: {
    ...mapActions("users", ["updateUser", "deleteUser"]),
    ...mapGetters("users", ["users"]),
  },
  components: {
    "edit-name": require("src/components/userManagement/editDisplayName.vue").default,
    "edit-phone": require("src/components/userManagement/editPhoneNumber.vue").default,
    "edit-role": require("src/components/userManagement/editRole.vue").default,
    //"edit-job": require("src/components/userManagement/editJob.vue").default,
  },
}
</script>

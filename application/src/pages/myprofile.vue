<template>
  <q-layout>
    <q-header class="bg-white">
      <q-toolbar class="row q-py-lg">
        <div class="col-1 ">
          <q-icon
            class="q-px-sm"
            name="arrow_back_ios"
            size="xs"
            color="primary"
            @click ="goToHome()"
          />
        </div>
        <div class="col text-primary text-subtitle1">
          Account profile
        </div>
      </q-toolbar>
      <div class="row full-width text-black q-pa-md items-center">
        <q-icon name="account_circle" color="grey-6" size="80px" />
        <div class="col q-pa-md">
          <div class="text-weight-bold text-h6 text-primary">
            {{ name }}
          </div>
          <div class="text-caption text-weight-light">
              <div v-if="role == 'BMO'">
                {{ role }} | {{job}}
              </div>
              <div v-else>
                {{ role }}
              </div>
            </div>
        </div>
      </div>
      <div class="row text-grey-7 text-subtitle1 q-px-md q-py-sm items-center">
        <q-icon name="phone" class="q-pr-lg" />
        {{phone}}
      </div>
      <div class="row text-grey-7 text-subtitle1 q-px-md q-pb-md items-center">
        <q-icon name="email" class="q-pr-lg" />
        {{email}}
      </div>
      <div class="text-grey-5 q-pt-sm q-px-md" v-if="updatedData1 != null">
          Updated: {{ updatedData1 }}
      </div>
      <div class="text-grey-5  q-pb-md q-pt-sm q-px-md" v-if="updated != null && updatedByUser != null">
          {{updatedByUser}} <q-space /> {{ updated }}
      </div>
    </q-header>
    <q-page-container>
      <q-page class="q-pt-xs">
        <div class="row bg-white q-pa-md">
          <div class="row full-width text-weight-bold text-grey-9">
                A RAM SINCE
          </div>
          <div class="row full-width text-black items-center">
            <div class="q-pa-sm">
              <img
                src="~assets/ramslogo-1.png"
                style="height: 25px; width: 25px"
              />
            </div>
            <div class="text-center q-pl-md">
              {{ created }}
            </div>
          </div>
        </div>
        <q-separator />
        <q-card
          flat class="row bg-white text-negative q-py-sm"
          clickable
          v-ripple
          @click="handleClick"
        >
          <q-card-section class="col-1">
            <q-icon name="power_settings_new" size="sm"  />
          </q-card-section>
          <q-card-section class="col">
            Log out
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
import { projectDb } from "src/boot/firebase"
import getUser from "src/composables/getUser";
import useLogout from "src/composables/useLogout";

export default{
  setup(props, context) {
    const { logout, error } = useLogout();
    const handleClick = async () => {
      await logout();
      if (!error.value) {
        context.emit("logout");
      }
    };

    return { handleClick};
  },
  data(){
    return{
      email: '',
      name: '',
      role: '',
      job: '',
      phone: '',
      created: '',
      updated: '',
      updatedData1: '',
      updatedByUser: '',

    }
  },

  async created() {
    const { user } = getUser();
    const uid = user.value.uid // Checks the current User's UID

    const userEmail = projectDb.ref(`users/${uid}/email`);
    userEmail.on('value', (snapshot) => {
      const currentUserEmail = snapshot.val()
      this.email = currentUserEmail
    })
    const userName = projectDb.ref(`users/${uid}/name`);
    userName.on('value', (snapshot) => {
      const currentUserName = snapshot.val()
      this.name = currentUserName
    })
    const userRole = projectDb.ref(`users/${uid}/role`);
    userRole.on('value', (snapshot) => {
      const currentUserRole = snapshot.val()
      this.role = currentUserRole
    })
    const userCreation = projectDb.ref(`users/${uid}/createdAt`);
    userCreation.on('value', (snapshot) => {
      const currentUserCreated = snapshot.val()
      this.created = currentUserCreated
    })
    const userPhone = projectDb.ref(`users/${uid}/phoneNumber`);
    userPhone.on('value', (snapshot) => {
      const currentUserPhone = snapshot.val()
      this.phone = currentUserPhone
    })
    const userJob = projectDb.ref(`users/${uid}/job`);
    userJob.on('value', (snapshot) => {
      const currentUserJob = snapshot.val()
      this.job = currentUserJob
    })
    const userUpdated = projectDb.ref(`users/${uid}/updatedAt`);
    userUpdated.on('value', (snapshot) => {
      const currentUserUpdates = snapshot.val()
      this.updated = currentUserUpdates
    })
    const userUpdatedData = projectDb.ref(`users/${uid}/updatedData`);
    userUpdatedData.on('value', (snapshot) => {
      const currentUserUpdates = snapshot.val()
      this.updatedData1 = currentUserUpdates
    })
    const userUpdatedBy = projectDb.ref(`users/${uid}/updatedBy`);
    userUpdatedBy.on('value', (snapshot) => {
      const currentUserUpdates = snapshot.val()
      this.updatedByUser = currentUserUpdates
    })
  },
  methods: {
    goToHome() {
      this.$router.go(-1);
    },
  }

}
</script>

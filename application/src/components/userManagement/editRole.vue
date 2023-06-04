<template>
  <q-form @submit="submitForm" class="q-pa-md">

    <div class="col full-width items-center q-py-md q-px-sm">
      <div class="row text-weight-bold text-subtitle1">
        Change your role & job
      </div>
      <div class="row caption text-weight-light">
        Enter your new department role
      </div>
    </div>
    <div class="q-pb-sm">
      <q-select
        filled
        label="Select a Role"
        v-model="userDetailsToSubmit.role"
        :options="roleOptions"
        @update:model-value="onChange"
        ref="role"
        :rules="[(val) => !!val || 'Please select your designated role']"
      />
      <q-select
        v-if="userDetailsToSubmit.role == 'BMO'"
        filled
        label="Select assigned job"
        v-model="userDetailsToSubmit.job"
        :options="this.options"
        ref="job"
        :rules="[
          val => !!val || 'Please select your designated job',
        ]"
      />
    </div>
    <div class="row full-width q-pa-sm">
      <q-space class="col" />
      <div class="row q-gutter-md">
        <q-btn
        unelevated
        densed
        class="text-capitalize bg-accent text-primary"
        label="cancel"
        v-close-popup
      />
      <q-btn
        unelevated
        color="primary"
        class="text-capitalize row q-px-lg q-py-sm"
        label="Done"
        type="submit"
      />
      </div>

    </div>
  </q-form>
</template>

<script>
import { ref } from 'vue'
import { mapActions, mapGetters } from "vuex";
import { useQuasar,date } from 'quasar'
import getUser from "src/composables/getUser";
import { projectDb} from "src/boot/firebase";

export default {
  props: ["user", "id"],
  setup () {
    const timeStamp = Date.now()
    const formattedDate = date.formatDate(timeStamp, 'MMMM DD, YYYY')
    const formattedTime = date.formatDate(timeStamp, 'hh : mm  A')
    return {
      getTime(){
        this.userDetailsToSubmit.updatedAt = (formattedDate+" at "+formattedTime);
      },
      userUpdatedData() {
        const { user } = getUser();
        let uid = user.value.uid
        const userName = projectDb.ref(`users/${uid}/name`);
        userName.on('value', (snapshot) => {
          const currentUserName = snapshot.val()
          this.userDetailsToSubmit.updatedBy = currentUserName
        })
      },
      userUpdateDataName() {
        this.userDetailsToSubmit.updatedData = "Role & Job"
      },
      readonly: ref(true),
      jobBMOOptions: [
        'Electrician',
        'Plumber',
        'Aircon Technician',
        'Fabricator',
        'Carpenter',
        'Admin'
      ],
      otherOptions: [
        'n/a',
      ],
      roleOptions:[
        "BMO",
        "ITRO",
        "Guard",
        "Head Guard"
      ],
    }
  },
  data() {
    return {
      options: null,
      isBMO: false,
      isGuard: false,
      isHeadGuard: false,
      isITRO: false,
      userDetailsToSubmit: {
      }
    }
  },


  methods: {
    ...mapActions("users", ["updateUser", "deleteUser"]),
    ...mapGetters("users", ["users"]),

    onChange(){
      if(this.userDetailsToSubmit.role === "BMO"){
        this.options = this.jobBMOOptions
        this.userDetailsToSubmit.job = null
        console.log(this.options);
      } else {
        this.options = this.otherOptions[0]
        this.userDetailsToSubmit.job = this.options
        console.log(this.userDetailsToSubmit.job);
      }
    },

    submitForm() {
      this.$refs.role.validate();
      if (!this.$refs.role.hasError) {
        this.getTime()
        this.userUpdatedData()
        this.userUpdateDataName()
        this.updateUser({
          id: this.id,
          updates: this.userDetailsToSubmit,
       })
       console.log('Submitted');
      }
    }
  },
  mounted() {
    this.userDetailsToSubmit = Object.assign({}, this.user)
  }
}
</script>

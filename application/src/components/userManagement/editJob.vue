<template>
  <q-form @submit="submitForm" class="q-pa-md">

    <div class="col items-center q-py-md q-px-sm">
      <div class="row text-weight-bold text-subtitle1">
        Change your BMO Job
      </div>
      <div class="row text-caption text-weight-light">
        Enter your new job title
      </div>
    </div>
      <q-select
        filled
        label="Select assigned job"
        v-model="userDetailsToSubmit.job"
        :options="jobBMOOptions"
        ref="job"
        :rules="[
          val => !!val || 'Please select your designated job',
        ]"
      />
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

export default {
  props: ["user", "id"],
  setup () {
    return {
      readonly: ref(true),
      jobBMOOptions: [
        'Electrician',
        'Plumber',
        'Aircon Technician',
        'Fabricator',
        'Carpenter'
      ],
    }
  },
  data() {
    return {
      popUp: false,
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

    submitForm() {
      this.$refs.job.validate();
      if (!this.$refs.job.hasError) {
        this.updateUser({
          id: this.id,
          updates: this.userDetailsToSubmit,
       })
      }
    }
  },
  mounted() {
    this.userDetailsToSubmit = Object.assign({}, this.user)
  }
}
</script>

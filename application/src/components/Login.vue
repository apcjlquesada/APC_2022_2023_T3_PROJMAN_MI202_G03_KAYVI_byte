<template>
  <!--authentication-->
  <form @submit.prevent="submitForm">
    <div class="row">
      <div class="col">
        <!--Email-->
        <div class="q-pt-md q-pb-sm">
          <div class="inputStyle">
            <q-input
              outlined
              v-model="formData.email"
              color="secondary"
              label="Email"
              stack-label
              :rules="[
                (val) => val.length >= 1 ||'Please fill out this field.',
                (val) => isValidEmailAddress(val) ||'Please enter a valid email address.',
              ]"
              type="email"
              ref="email"
              lazy-rules
            />
          </div>
        </div>

        <!--Password-->
        <div class="q-pt-xs q-pb-md">
          <div class="inputStyle">
            <q-input
              outlined
              v-model="formData.password"
              :type="isPwd ? 'password' : 'text'"
              color="secondary"
              label="Password"
              stack-label
              :rules="[
                (val) =>
                  val.length >= 1 || 'This field is required',
              ]"
              ref="password"
              lazy-rules
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </div>
        </div>

        <!--Login-->
        <div class="q-pa-xs">
          <div class="inputStyle">
            <q-btn
              exact
              no-caps
              rounded
              color="primary"
              label="Login"
              class="fit q-px-lg q-py-sm text-h7"
              type="submit"
            />
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<!--script-->
<script>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { mapActions } from "vuex";

export default {
  name: "AuthenticationLayout",
  setup() {
    const $q = useQuasar();

    function alert(title, message) {
      $q.dialog({
        title: title,
        message: message,
      });
    }
    return {
      isPwd: ref(true),
      alert,
    };
  },

  data() {
    return {
      formData: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions("auth", ["loginUser"]),
    isValidEmailAddress(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    submitForm() {
      this.$refs.email.validate();
      this.$refs.password.validate();

      if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
        this.loginUser(this.formData);
      }
    },
  },
};
</script>

<style>
.inputStyle {
  max-width: 450px;
}
</style>

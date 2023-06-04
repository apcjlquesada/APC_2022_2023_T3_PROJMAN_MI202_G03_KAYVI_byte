<template>
  <q-page>
      <!--background on desktop-->
      <div class="row bg-image gt-xs">
        <div class="col">
          <q-img src="~assets/Artboard2.png" class="absolute-full" />
        </div>
      </div>
      <!--card -->
      <div class="row absolute-center">
        <q-card
        style="width: 750px;
        max-width: 100vw"
        flat
        class="bg-accent"
        >
          <!--
            card section 01
            logo name appear on mobile
          -->
          <q-card-section>

            <div class="row justify-center q-pt-md lt-sm">
              <img
                src="~assets/ramslogo-1.png"
                style="min-height: 25px; max-width: 70px"
              />
            </div>
          </q-card-section>
          <q-card-section class="row">
            <!--
              card section 02
              Greetings and Warm welcome
            -->
            <div class="col">
              <div class="text-h4 text-primary text-bold q-pt-md q-px-md">
                Welcome Back!
              </div>
              <div class="subtitletext-h1 text-grey-7 text-weight-light q-px-md">
                We are excited to see you again!
              </div>
              <!--Login-->
              <div name="login">
                <login @login="enterHome()" />
              </div>
            </div>
            <!--col 1-->
            <div class="row items-center">
              <!--RAMS logo-->
              <div class="col gt-xs">
                <img
                  src="~assets/Ramslogo.png"
                  style="height: 270px; max-width: 270px"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const showLogin = ref(true);
    return { showLogin };
  },

  components: {
    login: require("components/Login.vue").default,
  },

  methods: {
    enterHome() {
      this.$router.push("/home");
    },
  },
};
</script>

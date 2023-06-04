<template>
  <q-header>
    <navbar @logout="goToAuth()" />
  </q-header>
  <q-page-container class="bg-accent">
    <q-page>
        <div class="q-px-md q-pb-md q-pt-sm">
          <q-card
            class="row q-my-sm q-pa-sm bg-primary text-grey-2"
          >
            <q-card-section class="col text-subtitle1 text-weight-bold">
              Incident Reports
            </q-card-section>
              <!--Routing to View Page -->
              <q-card-section class="row">
                <q-btn
                  rounded unelevated
                  text-color="primary"
                  class="text-capitalize bg-grey-2"
                  to="/viewir"
                >
                  View Reports
                </q-btn>
              </q-card-section>
          </q-card>
        </div>
        <!--Card Section-->
        <div class="row q-pa-md">
          <div class="col-xs-6 col-sm q-pa-sm">
            <q-card
              v-ripple
              bordered
              rounded
              class="my-box cursor-pointer q-hoverable"
              @click="goToUserManage()"
            >
              <!--
                icon, name
              -->
              <div class="row q-pt-lg">
                <q-avatar class="col vertical-center text-primary">
                  <q-icon name="people" size="40px" />
                </q-avatar>
              </div>
              <div class="row q-pb-md">
                <div class="col text-center text-body2  text-grey-8">
                  User Management
                </div>
              </div>
            </q-card>
          </div>
          <div class="col-xs-6 col-sm q-pa-sm">
            <q-card
              v-ripple
              bordered
              rounded
              class="my-box cursor-pointer q-hoverable"
              @click="goToInsights()"
            >
              <!--
                icon, name
              -->
              <div class="row q-pt-lg">
                <q-avatar class="col vertical-center text-primary">
                  <q-icon name="insights" size="40px" />
                </q-avatar>
              </div>
              <div class="row q-pb-md">
                <div class="col text-center text-body2  text-grey-8">
                  Insights
                </div>
              </div>
            </q-card>
          </div>
          <!--
          <div class="col-xs-6 col-sm q-pa-sm">
              <q-card
                v-ripple
                bordered
                rounded
                class="my-box cursor-pointer q-hoverable"
                @click="goToMyProfile()"
              >
                <div class="row q-pt-lg">
                  <q-avatar class="col vertical-center text-primary">
                    <q-icon name="account_circle" size="40px" />
                  </q-avatar>
                </div>
                <div class="row q-pb-md">
                  <div class="col text-center text-body2  text-grey-8">
                    My Profile
                  </div>
                </div>
              </q-card>
          </div>
          -->
        </div>
    </q-page>
  </q-page-container>
</template>

<script>
  export default {
    components: {
      navbar: require("components/Navbars/Navbar.vue").default,
    },
    methods: {
      goToAuth() {
        this.$router.push("/login");
      },
      goToInsights() {
       this.$router.push("/insights");
      },
      goToUserManage() {
        this.$router.push("/viewusers");
      },
      goToMyProfile(){
        this.$router.push("src/pages/myprofile");
      }
    },

  };
  </script>

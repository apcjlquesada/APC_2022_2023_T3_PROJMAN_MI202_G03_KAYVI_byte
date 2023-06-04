<template>
  <q-layout view="hHh lpR fFf">
    <q-header>
      <div class="col bg-primary">
        <navbar2 @home="goToHome()" />
      </div>
      <div class="col q-px-md q-pb-md">
        <search />
      </div>
    </q-header>
    <q-page-container>
      <q-page class="q-pa-md">
        <q-list separator>
          <users
            v-for="(user, key) in usersAssigned"
            :key="key"
            :user="user"
            :id="key"
          />
        </q-list>
        <q-page-sticky v-if="isITRO || isAdmin" position="bottom-right" :offset="[18, 18]">
          <q-btn fab icon="add" color="secondary" to="/register" />
        </q-page-sticky>
      </q-page>
    </q-page-container>
    <q-footer class="bg-accent q-pa-md" />
  </q-layout>
</template>

<script>
import { mapGetters } from "vuex"
import { projectDb, projectAuth } from "src/boot/firebase"
import { Role } from "src/components/roles"

export default {
  components: {
    navbar2: require("components/Navbars/Navbar2.vue").default,
    users: require("components/userManagement/listOfUsers.vue").default,
    search: require("src/components/Tools/SearchUser.vue").default,
  },
 computed: {
    ...mapGetters("users", ["usersAssigned"]),
 },
 data() {
    return {
      isBMO: false,
      isGuard: false,
      isHeadGuard: false,
      isITRO: false,
      isAdmin: false,
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
            } else {
            console.log('User Role is Invalid');
            }
          })
        }
      })
    },


  methods: {
    goToHome() {
      this.$router.push("/home");
    },
  }
}
</script>

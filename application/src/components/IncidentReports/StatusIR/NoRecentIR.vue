<template>
  <!--no assignments available icon-->
  <div class="row vertical-center"
    v-if="isHeadGuard || isGuard"
  >
    <div class="col q-pt-xl">
      <div class="q-pa-lg text-center">
        <!-- icon -->
        <q-icon name="sentiment_dissatisfied" color="grey-6" style="font-size: 4em" />
      </div>
      <!-- alt txt -->
      <div class="text-center text-grey-6 text-h8">
        You haven't made any reports yet
      </div>
      <div class="text-center q-pt-md">
        <q-btn unelevated no-caps rounded
          class="bg-primary text-white text-subtitle1 "
          icon="add"
          to="/createir"
        >
          Make Report
        </q-btn>
      </div>
    </div>
  </div>
  <div class="row vertical-center"
    v-if="isBMO || isITRO || isAdmin"
  >
    <div class="col q-pt-xl">
      <div class="q-pa-lg text-center">
        <!-- icon -->
        <q-icon name="sentiment_dissatisfied" color="grey-6" style="font-size: 4em" />
      </div>
      <!-- alt txt -->
      <div class="text-center text-grey-6 text-h8">
        Snap! Looks like there are no reports issued.
      </div>
    </div>
  </div>
</template>

<script>
import { Role } from "src/components/roles";
import { projectDb, projectAuth } from "src/boot/firebase";

export default {
  data() {
    return {
      isBMO: false,
      isGuard: false,
      isHeadGuard: false,
      isITRO: false,
      isAdmin: false,
    };
  },
  created() {
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
    },
};
</script>


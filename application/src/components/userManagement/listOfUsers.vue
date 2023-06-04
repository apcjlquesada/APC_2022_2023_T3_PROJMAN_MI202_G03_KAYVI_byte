<template>
  <q-card
    class="q-mb-sm"
    clickable
    v-ripple
    @click="showUserDetails = true"
  >
    <q-item
      class="q-pa-md"
      v-if ="isBMO || isITRO || isGuard || isHeadGuard || isAdmin "
    >
      <q-item-section avatar>
        <q-avatar>
          <q-icon name="account_circle" color="grey-6" size="45px" />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label class="text-weight-bold text-grey-10 text-subtitle">
          {{ this.user.name }}
        </q-item-label>
        <q-item-label caption class="row">
          <div v-if="this.user.role == 'BMO'">
            {{ this.user.role }} | {{this.user.job}}
          </div>
          <div v-else>
            {{ this.user.role }}
          </div>
        </q-item-label>
      </q-item-section>
    </q-item>
    <!-- Report Details Modal -->
    <q-dialog
      v-model="showUserDetails"
      transition-show="slide-left"
      transition-hide="slide-right"
      :maximized="maximizedToggle"
    >
      <q-card class="bg-accent">
        <user-details
          @close="showUserDetails = false"
          :user="user"
          :id="id"
        />
      </q-card>
    </q-dialog>
  </q-card>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { ref } from 'vue'
import { Role } from "src/components/roles"
import getUser from "src/composables/getUser";
import { projectDb } from "src/boot/firebase"

export default {
  props: ["user", "id"],
  methods: {
    ...mapActions("users", ["updateUser", "deleteUser"]),
    ...mapGetters("users", ["users"]),
  },
  components: {
    "user-details": require("src/components/Modals/UserDetails.vue")
      .default,
  },
  setup () {
    return {
      dialog: ref(false),
      maximizedToggle: ref(true)
    }
  },
  data() {
    return {
      showUserDetails: false,
      isGuard: false,
      isHeadGuard: false,
      isBMO: false,
      isITRO: false,
      isAdmin: false
    };
  },
  created() {
    const { user } = getUser();
          this.uid = user.value.uid // Checks the current User's UID
          const userRole = projectDb.ref(`users/${this.uid}/role`);
          // Then checks if what role they have.
          userRole.on('value', (snapshot) => {
            // if the role they have match with the authorized Role, then...
            if (snapshot.val() === Role.HeadGuard) {
              if (this.user.role == 'Guard' || this.user.role == 'Head Guard') {
                this.isHeadGuard = true
              }
            } else if (snapshot.val() === Role.BMO) {
              if (this.user.role == 'BMO' ||
                this.user.role == 'Guard' ||
                this.user.role == 'Head Guard'
              ) {
                this.isBMO = true
              }
            } else if (snapshot.val() === Role.Guard) {
              this.isGuard = true
            } else if (snapshot.val() === Role.ITRO) {
              this.isITRO = true
            } else if (snapshot.val() === Role.Admin) {
              this.isAdmin = true
            }
          })
	}
}
</script>


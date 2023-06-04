<template>
  <nav v-if="user">
      <!-- MED-LARGE RESOLUITION LT-SM -->
      <div class="
        lt-sm
        row q-px-md q-pt-lg q-pb-md
        text-grey-9 text-h5 text-weight-bold
        bg-accent"
      >
        <div class="q-pr-md">
          <img
            src="~assets/ramslogo-1.png"
            style="min-height: 25px; max-width: 30px"
          />
        </div>
        <div class="col">Hello! {{ this.user }}</div>
      </div>
      <!-- SMOL RESOLUITION GT-XS -->
      <div class="
        gt-xs
        col q-px-md q-pt-lg q-pb-md
        bg-accent items-center"
       >
       <div class="
        row text-h3 text-primary q-pa-md text-weight-bold items-center
       ">
          <img
            src="~assets/ramslogo-1.png"
            style="min-height: 35px; max-width: 50px"
          />
          <div class="q-pl-md">
            Surveirams
          </div>
        </div>
        <div class="
          row text-h4 text-grey-9 q-pa-md text-weight-light
        ">
          Hello! {{ this.user }}
        </div>
      </div>
  </nav>
</template>

<script>
import useLogout from "src/composables/useLogout";
import { projectAuth, projectDb } from "src/boot/firebase";

export default {
  data() {
    return {
      user: ''
    }
  },
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
  async created() {
      projectAuth.onAuthStateChanged((auth) => {
        if (auth) {
          this.uid = auth.uid // Checks the current User's UID
          const currentUserName = projectDb.ref(`users/${this.uid}/name`);
          currentUserName.on('value', (snapshot) => {
            const username = snapshot.val()
            this.user = username
          })
        }
      })
    },
};
</script>

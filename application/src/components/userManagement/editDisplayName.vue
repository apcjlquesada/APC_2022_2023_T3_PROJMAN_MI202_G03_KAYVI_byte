<template>
  <q-form @submit="submitForm" class="q-pa-md">
    <!-- DISPLAY NAME -->
    <!-- SAVE -->
    <div class="col items-center q-py-md q-px-sm">
      <div class="row text-weight-bold text-subtitle1">
        Change your display name
      </div>
      <div class="row text-caption text-weight-light">
        Enter your new display name
      </div>
    </div>
    <div class="q-pa-sm">
      <q-input
        filled
        lazy-rules outlined stack-label
        v-model="userDetailsToSubmit.name"
        ref="name"
        placeholder="Display Name"
        :rules="[
          val => !!val || 'Please enter a display name',
          val => val.length <= 15 || 'Hold on, you are only allowed 15 characters',
          val => checkUnavailableName(val) || 'This display name is already taken',
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
import { projectDb} from "src/boot/firebase";
import { useQuasar,date } from 'quasar'
import getUser from "src/composables/getUser";

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
        this.userDetailsToSubmit.updatedData = "Display Name"
      },
      readonly: ref(true),

    }
  },
  data() {
    return {
      isBMO: false,
      isGuard: false,
      isHeadGuard: false,
      isITRO: false,
      userDetailsToSubmit: {
      }
    }
  },
  async created(){
    let DisplayNamesTaken = []
    let username = null
    // Checks if the username exists
    const takenDisplayNames = projectDb.ref()
    takenDisplayNames.child("users").on("value", (snapshot) =>  {
      snapshot.forEach((childSnapshot) => {
        username = childSnapshot.child('name')
        DisplayNamesTaken.push(username.val())
      })
    })
    this.contains_existing_displayName = DisplayNamesTaken
  },



  methods: {
    ...mapActions("users", ["updateUser", "deleteUser"]),
    ...mapGetters("users", ["users"]),

    // Validate Available Display Name
    checkUnavailableName(displayName) {
      const usernameRegex = /^[a-zA-Z0-9_\.\s]*$/
      this.displayName_length = displayName.length
      //console.log(this.displayName_length);
      // Checks if the inputted value is greater than 3 and less than 15
      if (this.displayName_length >= 3) {
        this.contains_min_characters = true
        if (this.displayName_length <= 15) {
          this.contains_max_characters = true
        } else {
          this.contains_max_characters = false
        }
      } else {
        this.contains_min_characters = false
      }
      // Checks if the inputted vaue is existing in the database
      this.contains_existing_displayName.every((item) => {
        if (displayName.toLowerCase() == item.toLowerCase()) {
          this.valid_displayName = false
          //console.log('MATCH FOUND', item, displayName, this.valid_displayName);
          return false
        } else {
          this.valid_displayName = true
          //console.log('MATCH NOT FOUND', this.valid_displayName);
          return true
        }
      })

      if (
        this.contains_min_characters === true &&
                this.contains_max_characters === true &&
        this.valid_displayName === true
      ) {
          return usernameRegex.test(displayName)
      } else {
      }

    },


    submitForm() {
      this.$refs.name.validate();
      if (!this.$refs.name.hasError) {
        this.getTime()
        this.userUpdatedData()
        this.userUpdateDataName()
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

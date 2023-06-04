<template>
  <q-form @submit="submitForm" class="q-pa-md">
    <!-- DISPLAY NAME -->
    <!-- SAVE -->
    <div class="col items-center q-py-md q-px-sm">
      <div class="row text-weight-bold text-subtitle1">
        Change your phone number
      </div>
      <div class="row text-caption text-weight-light">
        Enter your new number
      </div>
    </div>
    <div class="q-pa-sm">
      <q-input
        filled lazy-rules stack-label
        v-model="userDetailsToSubmit.phoneNumber"
        ref="phoneNumber"
        label="Phone Number"
        mask="####-###-####"
        :rules="[
          val => !!val || 'Please enter your mobile number',
          val => isValidPhoneNum(val) || 'Phone number must start with (09)',
          val => val.length > 12 || 'Phone number must be 11 digits',
          val => ifPhoneNumExist(val) || 'This phone number is already being used'
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
        this.userDetailsToSubmit.updatedData = "Phone Number"
      },
      readonly: ref(true),
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
  async created(){
///////////////////////////////////// EXISTING PHONE NUMBER
let phoneNumTaken = []
    let phoneNumber = null
    // Checks if the username exists
    const takenPhoneNum = projectDb.ref()
    takenPhoneNum.child("users").on("value", (snapshot) =>  {
      snapshot.forEach((childSnapshot) => {
        phoneNumber = childSnapshot.child('phoneNumber')
        phoneNumTaken.push(phoneNumber.val())
      })
    })
    this.contains_existing_phone_number = phoneNumTaken
  },



  methods: {
    ...mapActions("users", ["updateUser", "deleteUser"]),
    ...mapGetters("users", ["users"]),

     // Validate Phone Number is Available
     isValidPhoneNum(phone) {
      // Checks if the inputted vaue is existing in the database
      const phoneNumbRegex = /^09[0-9-]*$/
      return phoneNumbRegex.test(phone)
    },
    // Validate Phone Number is Available
    ifPhoneNumExist(phone) {
      // Checks if the inputted vaue is existing in the database
      const phoneNumbRegex = /^09[0-9-]*$/
      this.contains_existing_phone_number.every((item) => {
        if (phone === item) {
          this.valid_phoneNum = false
          //console.log('MATCH FOUND', item, phone, this.valid_phoneNum );
          return false
        } else {
          this.valid_phoneNum = true
          //console.log('MATCH NOT FOUND', this.valid_phoneNum );
          return true
        }
      })

      if (
        this.valid_phoneNum === true
      ) {
        //console.log('Name Available: ',re.test(String(email).toLowerCase()));
        return phoneNumbRegex.test(phone)
      }
    },


    submitForm() {
      this.$refs.phoneNumber.validate()
      if (!this.$refs.phoneNumber.hasError) {
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

<template>
  <q-form @submit.prevent="submitForm">
    <!-- EMAIL ADDRESS -->
    <div class="row q-pb-lg">
      <q-input
        filled
        class="col"
        placeholder="Email"
        v-model="formData.email"
        ref="email"
        :rules="[
          val => !!val || 'Please enter an email address',
          val => isValidEmailAddress(val) || 'Email address must end with @apc.edu.ph',
          val => ifEmailAddressExist(val) || 'This email address is already taken'
        ]"
        lazy-rules
      >
      <template v-slot:hint>
        You may use letters, numbers & periods
      </template>
      </q-input>
    </div>
    <!-- DISPLAY NAME -->
    <div class="row q-pb-md">
      <q-input
        filled
        class="col"
        placeholder="Display Name"
        v-model="formData.displayName"
        ref="displayName"
        :rules="[
          val => !!val || 'Please enter a display name',
          val => val.length <= 15 || 'Hold on, you are only allowed 15 characters',
          val => checkUnavailableName(val) || 'This display name is already taken',
        ]"
        lazy-rules
       >
        <template v-slot:hint>
          You may use 3 to 15 characters with numbers or periods
        </template>
       </q-input>
    </div>
    <!-- PHONE NUMBER -->
    <div class="row q-pb-md">
    <q-input
        filled
        v-model="formData.phoneNumber"
        ref="phoneNumber"
        class="col"
        label="Phone Number"
        mask="####-###-####"
        hint="e.g 0912-235-2098"
        :rules="[
          val => !!val || 'Please enter your mobile number',
          val => isValidPhoneNum(val) || 'Phone number must start with (09)',
          val => val.length > 12 || 'Phone number must be 11 digits',
          val => ifPhoneNumExist(val) || 'This phone number is already being used'
        ]"
      />
    </div>
    <!-- ROLE && JOB -->
    <div class="q-gutter-md q-pb-sm">
      <q-select
        filled
        label="Select a Role"
        v-model="formData.role"
        @update:model-value="onChange"
        :options="roleOptions"
        ref="role"
        :rules="[(val) => !!val || 'Please select your designated role']"
      />
    </div>
    <div
      class="q-gutter-sm q-pb-lg"
      v-if="this.formData.role == 'BMO'"
    >
      <q-select
        filled
        label="Select assigned job"
        v-model="formData.job"
        :options="this.options"
        ref="job"
        :rules="[
          val => !!val || 'Please select your designated role',
        ]"
      >
      </q-select>
    </div>

    <!-- PASSWORD -->
    <div class="row q-pb-lg">
      <q-input
        filled
        class="col"
        placeholder="Password"
        v-model="formData.password"
        ref="password"
        :type="isPwd ? 'password' : 'text'"
        :rules="[
          val => checkPassword(val) || 'Use 8 or more characters with a mix of letters, numbers & symbols']"
        lazy-rules
      >
      <template v-slot:hint>
        Use 8 or more characters with a mix of letters, numbers & symbols
      </template>
      </q-input>
    </div>
    <!-- CONFIRM PASSWORD -->
    <div class="row">
      <q-input
        filled
        class="col"
        placeholder="Confirm Password"
        v-model="formData.confirmPassword"
        ref="confirmPassword"
        :type="isPwd ? 'password' : 'text'"
        :rules="[
          (val) => (val && val.length >= 0) || 'Please re-enter your password again',
          (val) => val === formData.password || 'The password does not match',
        ]"
        lazy-rules
      >
      </q-input>
    </div>
    <!-- SHOW PASSWORD -->
    <div class="q-pt-xs">
      <q-checkbox
        right-label
        v-model="toggleShowPassword"
        label="Show Password"
        color="secondary"
        @click="isPwd = !isPwd"
      />
    </div>
    <!-- REGISTER USER-->
    <div class="row q-pb-md">
      <q-space />
      <q-btn
        rounded
        unelevated
        color="primary"
        class="q-px-lg q-py-sm text-capitalize"
        label="Register User"
        type="submit"
      />
    </div>
  </q-form>
</template>

<script>
import { mapActions } from "vuex";
import { ref } from 'vue';
import { date } from 'quasar';
import { projectDb, projectAuth } from "src/boot/firebase";

export default {
  data() {
    return {
      options: null,

      formData: {
///////// Email Address Validation
        email: '',
        contains_existing_emailAdd: [],
        valid_emailAdd: false,
///////// Display Name Validation
        displayName: '',
        displayName_length: 0,
        contains_min_characters: false,
        contains_max_characters: false,
        contains_existing_displayName: [],
        valid_displayName: false,
///////// Password Validation
        password: '',
        confirmPassword: '',
        password_length: 0,
        contains_no_whitespace: false,
        contains_eight_characters: false,
        contains_number: false,
        contains_uppercase: false,
        contains_special_character: false,
        valid_password: false,
///////// Phone Number Validation
        phoneNumber: '',
        contains_existing_phone_number: false,
        valid_phoneNum: false,
///////// Others
        job: null,
        role: '',
        createdAt: '',
        updatedAt: '',
        updatedBy: '',
        updatedData: ''
      }
    }
  },
  setup() {
    return{
      isPwd: ref(true),
      toggleShowPassword: ref(false),
      jobBMOOptions: [
        'Electrician',
        'Plumber',
        'Aircon Technician',
        'Fabricator',
        'Carpenter',
        'Admin'
      ],
      otherOptions: [
        'n/a',
      ],
      roleOptions:[
        "BMO",
        "ITRO",
        "Guard",
        "Head Guard"
      ],
    }
  },

  async created(){
///////////////////////////////////// FORMAT DATE AND TIME
    const timeStamp = Date.now()
    const formattedDate = date.formatDate(timeStamp, 'MMMM DD, YYYY')
    const formattedTime = date.formatDate(timeStamp, 'hh : mm  A')
    this.formData.createdAt = (formattedDate+" at "+formattedTime);
///////////////////////////////////// EXISTING DISPLAY NAME
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
///////////////////////////////////// EXISTING EMAIL ADDRESS
    let emailAddTaken = []
    let email = null
    // Checks if the username exists
    const takenEmailAdd = projectDb.ref()
    takenEmailAdd.child("users").on("value", (snapshot) =>  {
      snapshot.forEach((childSnapshot) => {
        email = childSnapshot.child('email')
        emailAddTaken.push(email.val())
      })
    })
    this.contains_existing_emailAdd = emailAddTaken
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
    ...mapActions('auth', ['registerUser']),
    //Job Change
    onChange(){
      if(this.formData.role === "BMO"){
        this.options = this.jobBMOOptions
        console.log(this.options);
      } else {
        this.options = this.otherOptions[0]
        this.formData.job = this.options
        console.log(this.formData.job);
      }
    },
    // Validate Email Format Regex
    isValidEmailAddress(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@apc\.edu\.ph$/
      return re.test(String(email).toLowerCase())
    },
    // Validate Email is Available
    ifEmailAddressExist(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@apc\.edu\.ph$/
      // Checks if the inputted vaue is existing in the database
      this.contains_existing_emailAdd.every((item) => {
        if (email.toLowerCase() === item.toLowerCase()) {
          this.valid_emailAdd = false
          //console.log('MATCH FOUND', item, email, this.valid_emailAdd );
          return false
        } else {
          this.valid_emailAdd = true
          //console.log('MATCH NOT FOUND', this.valid_emailAdd );
          return true
        }
      })

      if (
        this.valid_emailAdd === true
      ) {
          //console.log('Name Available: ',re.test(String(email).toLowerCase()));
          return re.test(String(email).toLowerCase())
      } else {
      }
    },
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
        if (displayName.toLowerCase() === item.toLowerCase()) {
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
          //console.log('Name Available: ',usernameRegex.test(displayName));
          return usernameRegex.test(displayName)
      } else {
      }

    },
    // Validate Password Regex
    checkPassword(password) {
      this.password_length = password.length
      const passFormat = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/
        if (this.password_length >= 8) {
          this.contains_eight_characters = true
        } else {
          this.contains_eight_characters = false
        }
        this.contains_no_whitespace = /^(?=.*\s)/.test(password)
        this.contains_number = /\d/.test(password);
        this.contains_uppercase = /[A-Z]/.test(password);
			  this.contains_special_character = passFormat.test(password);

        if (this.contains_eight_characters === true &&
					this.contains_special_character === true &&
					this.contains_uppercase === true &&
					this.contains_number === true &&
          this.contains_no_whitespace === false
          ) {
					this.valid_password = true;
          console.log(passFormat.test(password));
          return passFormat.test(password)

        } else {
          this.valid_password = false;
        }
    },
    submitForm() {
      // Form first checks the rules per input
      this.$refs.email.validate()
      this.$refs.displayName.validate()
      this.$refs.phoneNumber.validate()
      this.$refs.password.validate()
      this.$refs.confirmPassword.validate()
      // If no Errors are found.


      this.$refs.role.validate()


      if (
        !this.$refs.email.hasError &&
        !this.$refs.displayName.hasError &&
        !this.$refs.phoneNumber.hasError &&
        !this.$refs.role.hasError &&
        !this.$refs.password.hasError &&
        !this.$refs.confirmPassword.hasError
      ) {
        // Then we check if there is an existing user for this
        this.registerUser(this.formData)
        console.log(this.registerUser);
        //console.log(this.formData);
        console.log("Submitted");
      }
    }
  }
}


</script>

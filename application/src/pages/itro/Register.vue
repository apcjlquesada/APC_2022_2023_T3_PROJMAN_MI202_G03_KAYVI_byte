<template>
    <q-layout view="hhh lpR fff">
      <q-header>
        <navbar2 @home="goToViewUsers()" />
      </q-header>
      <q-page-container >
        <q-page>
        <RegComponent class="q-pa-md" />
        </q-page>
      </q-page-container>
      <q-footer class="q-pa-md bg-accent"/>
    </q-layout>

</template>

<script>
import RegComponent from "components/RegComponent"
import firebase from "firebase/compat/app";
  export default {
    components:{
      RegComponent, navbar2: require("components/Navbars/Navbar2.vue").default,
   },
    methods: {
      createUser(email, password) {
        console.log(email, password)
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(auth => {
          this.$router.push('/viewusers')
        })
        .catch(error => {console.log(error)
        })
      },
      goToViewUsers() {
        this.$router.push("/viewusers");
    },
    }
  }
</script>

<template>
  <!--HIGHER RESOLUTION-->
  <div class="row gt-xs q-pa-sm q-gutter-md">
    <!-- UNRESOLVED INCIDENTS -->
    <q-card
      class="col-4 col-grow rounded q-px-md q-py-lg"
      v-ripple
      clickable
      @click="goToInsights()"
    >
      <div class="row q-pb-sm items-center">
        <div class="col text-h6 text-weight-light">
          Unresolved Incidents
        </div>
        <div
          v-if="this.percentUnresolved > 50"
          class="row text-negative text-h6"
        >
          <q-icon name="arrow_drop_up" />
          {{this.percentUnresolved}} %
        </div>
        <div
          v-if="this.percentUnresolved == 50"
          class="row text-warning text-h6"
        >
          = {{this.percentUnresolved}} %
        </div>
        <div
          v-if="this.percentUnresolved < 50"
          class="row text-positive text-h6"
        >
          <q-icon name="arrow_drop_down" />
          {{this.percentUnresolved}} %
        </div>
      </div>
      <div class="row items-center">
        <div class="col text-weight-bold text-h5">
          {{this.UnresCount}}
        </div>
        <div class="row text-weight-light text-grey-7 items-center">
          more info
          <q-icon name="chevron_right" />
        </div>
      </div>
    </q-card>
    <!-- RESOLVED INCIDENTS -->
    <q-card
      class="col-4 col-grow rounded q-px-md q-py-lg"
      v-ripple
      clickable
      @click="goToInsights()"
    >
      <div class="row q-pb-sm items-center">
        <div class="col text-h6 text-weight-light">
         Resolved Incidents
        </div>
         <div
          v-if="this.percentResolved > 50"
          class="row text-positive text-h6"
        >
          <q-icon name="arrow_drop_up" />
          {{this.percentResolved}} %
        </div>
        <div
          v-if="this.percentResolved == 50"
          class="row text-warning text-h6"
        >
          = {{this.percentResolved}} %
        </div>
        <div
          v-if="this.percentResolved < 50"
          class="row text-negative text-h6"
        >
          <q-icon name="arrow_drop_down" />
          {{this.percentResolved}} %
        </div>
      </div>
      <div class="row items-center">
        <div class="col text-weight-bold text-h5">
          {{this.ResCount}}
        </div>
        <div class="row text-weight-light text-grey-7 items-center">
          more info
          <q-icon name="chevron_right" />
        </div>
      </div>
    </q-card>
    <!-- ADDRESSED ISSUE -->
    <q-card
      class="col-4 col-grow rounded q-px-md q-py-lg"
      v-ripple
      clickable
      @click="goToInsights()"
    >
    <div class="row q-pb-sm items-center">
        <div class="col text-h6 text-weight-light">
         BMO Incidents
        </div>
      </div>
      <div class="row items-center">
        <div class="col text-h5 text-weight-bold">
          Unresolved: {{this.BMOUnResCount}}
        </div>
      </div>
      <div class="row items-center">
        <div class="col text-h5 text-weight-bold text-primary">
          Resolved: {{this.BMOResCount}}
        </div>
      </div>
    </q-card>
    <!-- ITRO INCIDENT -->
    <q-card
      class="col-4 col-grow rounded q-px-md q-py-lg"
      v-ripple
      clickable
      @click="goToInsights()"
    >
      <div class="row q-pb-sm items-center">
        <div class="col text-h6 text-weight-light">
         ITRO Incidents
        </div>
      </div>
      <div class="row items-center">
        <div class="col text-h5 text-weight-bold">
          Unresolved: {{this.ITROUnResCount}}
        </div>
      </div>
      <div class="row items-center">
        <div class="col text-h5 text-weight-bold text-primary">
          Resolved: {{this.ITROResCount}}
        </div>
      </div>
    </q-card>
  </div>
   <!--LOWER RESOLUTION-->
  <div class="row lt-sm q-pa-sm q-gutter-sm">
    <!-- UNRESOLVED INCIDENTS -->
    <q-card
      class="col-4 col-grow rounded q-px-md q-py-lg"
      v-ripple
      clickable
      @click="goToInsights()"
    >
      <div class="row q-pb-sm items-center">
        <div class="col text-caption">
          Unresolved Incidents
        </div>
        <div
          v-if="this.percentUnresolved > 50"
          class="row text-negative text-caption"
        >
          <q-icon name="arrow_drop_up" />
          {{this.percentUnresolved}} %
        </div>
        <div
          v-if="this.percentUnresolved == 50"
          class="row text-warning text-caption"
        >
          = {{this.percentUnresolved}} %
        </div>
        <div
          v-if="this.percentUnresolved < 50"
          class="row text-positive text-caption"
        >
          <q-icon name="arrow_drop_down" />
          {{this.percentUnresolved}} %
        </div>
      </div>
      <div class="row items-center">
        <div class="col text-weight-bold text-h6">
          {{this.UnresCount}}
        </div>
        <div class="row text-weight-light text-grey-7 items-center text-caption">
          more info
          <q-icon name="chevron_right" />
        </div>
      </div>
    </q-card>
    <!-- RESOLVED INCIDENTS -->
    <q-card
      class="col-4 col-grow rounded q-px-md q-py-lg"
      v-ripple
      clickable
      @click="goToInsights()"
    >
      <div class="row q-pb-sm items-center">
        <div class="col text-caption">
         Resolved Incidents
        </div>
         <div
          v-if="this.percentResolved > 50"
          class="row text-negative text-caption"
        >
          <q-icon name="arrow_drop_up" />
          {{this.percentResolved}} %
        </div>
        <div
          v-if="this.percentResolved == 50"
          class="row text-negative text-caption"
        >
          = {{this.percentResolved}} %
        </div>
        <div
          v-if="this.percentResolved < 50"
          class="row text-negative text-caption"
        >
          <q-icon name="arrow_drop_down" />
          {{this.percentResolved}} %
        </div>
      </div>
      <div class="row items-center">
        <div class="col text-weight-bold text-h5">
          {{this.ResCount}}
        </div>
        <div class="row text-weight-light text-grey-7 items-center text-caption">
          more info
          <q-icon name="chevron_right" />
        </div>
      </div>
    </q-card>
    <!-- BMO ISSUE -->
    <q-card
      class="col-4 col-grow rounded q-px-md q-py-lg"
      v-ripple
      clickable
      @click="goToInsights()"
    >
      <div class="row q-pb-sm items-center">
        <div class="col text-caption">
        BMO Incidents
        </div>
      </div>
      <div class="row items-center">
        <div class="col text-subtitle1 text-weight-bold">
          Unresolved: {{this.BMOUnResCount}}
        </div>
      </div>
      <div class="row items-center">
        <div class="col text-subtitle1 text-weight-bold text-primary">
          Resolved: {{this.BMOResCount}}
        </div>
      </div>
    </q-card>
    <!-- ITRO ISSUE -->
    <q-card
      class="col-4 col-grow rounded q-px-md q-py-lg"
      v-ripple
      clickable
      @click="goToInsights()"
    >
      <div class="row q-pb-sm items-center">
        <div class="col text-caption">
         ITRO Incidents
        </div>
      </div>
      <div class="row items-center">
        <div class="col text-subtitle1 text-weight-bold">
          Unresolved: {{this.ITROUnResCount}}
        </div>
      </div>
      <div class="row items-center">
        <div class="col text-subtitle1 text-weight-bold text-primary">
          Resolved: {{this.ITROResCount}}
        </div>
      </div>
    </q-card>
  </div>
</template>

<script>
import { projectDb } from "src/boot/firebase"

export default {
 components: {
   //areaChart: require("src/components/Insights/apexInsights.vue").default
 },

 data(){
   return{
     reports: "",
     percentUnresolved: "",
     percentResolved: "",
     ITROUnResCount: "",
     ITROResCount: "",
     BMOUnResCount: "",
     BMOResCount: "",
     BMOcount: "",
     ITROcount: "",
     department: "",
     UnresCount: "",
     ResCount: "",
     status: "",
     b3: "",
     b2: "",
     b1: "",
     f1: "",
     f2: "",
     f3: "",
     f4: "",
     f5: "",
     f6: "",
     f7: "",
     f8: "",
     f9: "",
     f10: "",
     f11: "",
     f12: "",
     floor: "",
     ITB1: "",
     ITB2: "",
     ITB3: "",
     ITB4: "",
     ITB5: "",
     ITRO1: "",
     ITRO2: "",
     ITRO3: "",
     ITRO4: "",
     ITRO5: "",
     bmoType: "",
     itroType: "",

   }
 },

 async created(){
   const incidentsDB = projectDb.ref();
   let ITROcounter = 0
   let BMOcounter = 0
   let Unrescounter = 0
   let Rescounter = 0
   let b3counter = 0
   let b2counter = 0
   let b1counter = 0
   let f1counter = 0
   let f2counter = 0
   let f3counter = 0
   let f4counter = 0
   let f5counter = 0
   let f6counter = 0
   let f7counter = 0
   let f8counter = 0
   let f9counter = 0
   let f10counter = 0
   let f11counter = 0
   let f12counter = 0
   let ITB1counter = 0
   let ITB2counter = 0
   let ITB3counter = 0
   let ITB4counter = 0
   let ITB5counter = 0
   let ITI1counter = 0
   let ITI2counter = 0
   let ITI3counter = 0
   let ITI4counter = 0
   let ITI5counter = 0

   incidentsDB.child("incidents").on('value', (snapshot) => {
     this.reports = snapshot.numChildren()
   })

   incidentsDB.child("incidents").orderByChild("department").equalTo("IT Resource Office (ITRO)").on("value", (snapshot)=>{
     snapshot.forEach(function(childSnapshot) {
       ITROcounter++
     });
   });

   this.ITROcount = ITROcounter

   incidentsDB.child("incidents").orderByChild("department").equalTo("Building Maintenance Office (BMO)").on("value", (snapshot)=>{
     snapshot.forEach(function(childSnapshot) {
       BMOcounter++
     });
   })
   this.BMOcount = BMOcounter

   if(this.BMOcount > this.ITROcount){
     this.department = "BMO"
   }else if(this.BMOcount < this.ITROcount){
     this.department = "ITRO"
   }else if(this.BMOcount == 0 & this.ITROcount == 0){
     this.department = "Both BMO and ITRO have equal amounts of Incident Reports"
   }else if(this.BMOcount == this.ITROcount){
     this.department = "Both BMO and ITRO have equal amounts of Incident Reports"
   }

   incidentsDB.child("incidents").orderByChild("status").equalTo(true).on("value", (snapshot)=>{
     snapshot.forEach(function(childSnapshot) {
       Rescounter++
     });
     this.ResCount = Rescounter
     this.percentResolved = ((this.ResCount / this.reports) * 100).toFixed(2)
   });



   incidentsDB.child("incidents").orderByChild("status").equalTo(false).on("value", (snapshot)=>{
     snapshot.forEach(function(childSnapshot) {
       Unrescounter++
     });
      this.UnresCount = Unrescounter
      this.percentUnresolved = ((this.UnresCount / this.reports) * 100).toFixed(2)
   });



   let bmoUnrescounter = 0
   let bmoRescounter = 0
   let itroUnrescounter = 0
   let itroRescounter = 0
   let status = null
   let dept = null
   incidentsDB.child("incidents").on("value", (snapshot)=>{
     snapshot.forEach(function(childSnapshot) {
       status = childSnapshot.child("status")
       dept = childSnapshot.child("department")

       if(dept.val()=="Building Maintenance Office (BMO)" && status.val() == false){
        bmoUnrescounter++
       }else if (dept.val()=="Building Maintenance Office (BMO)" && status.val() == true){
        bmoRescounter++
       }else if (dept.val()=="IT Resource Office (ITRO)" && status.val() == false){
        itroUnrescounter++
       }else if (dept.val()=="IT Resource Office (ITRO)" && status.val() == true){
        itroRescounter++
       }
     });
    this.ITROUnResCount = itroUnrescounter
    this.ITROResCount = itroRescounter
    this.BMOUnResCount = bmoUnrescounter
    this.BMOResCount = bmoRescounter
   });




   let testvar = null
   incidentsDB.child("incidents").on("value", (snapshot)=>{
     snapshot.forEach(function(childSnapshot) {
       testvar = childSnapshot.child("post")

       if(testvar.val()=="Basement 3"){
         b3counter++
       }else if (testvar.val()=="Basement 2"){
         b2counter++
       }else if (testvar.val()=="Basement 1"){
         b1counter++
       }else if (testvar.val()=="1st Floor"){
         f1counter++
       }else if (testvar.val()=="2nd Floor"){
         f2counter++
       }else if (testvar.val()=="3rd Floor"){
         f3counter++
       }else if (testvar.val()=="4th Floor"){
         f4counter++
       }else if (testvar.val()=="5th Floor"){
         f5counter++
       }else if (testvar.val()=="6th Floor"){
         f6counter++
       }else if (testvar.val()=="7th Floor"){
         f7counter++
       }else if (testvar.val()=="8th Floor"){
         f8counter++
       }else if (testvar.val()=="9th Floor"){
         f9counter++
       }else if (testvar.val()=="10th Floor"){
         f10counter++
       }else if (testvar.val()=="11th Floor"){
         f11counter++
       }else if (testvar.val()=="12th Floor"){
         f12counter++
       }
     });
   });

   this.b3 = b3counter
   this.b2 = b2counter
   this.b1 = b1counter
   this.f1 = f1counter
   this.f2 = f2counter
   this.f3 = f3counter
   this.f4 = f4counter
   this.f5 = f5counter
   this.f6 = f6counter
   this.f7 = f7counter
   this.f8 = f8counter
   this.f9 = f9counter
   this.f10 = f10counter
   this.f11 = f11counter
   this.f12 = f12counter

   let floormaxVal = Math.max(
     this.b3,
     this.b2,
     this.b1,
     this.f1,
     this.f2,
     this.f3,
     this.f4,
     this.f5,
     this.f6,
     this.f7,
     this.f8,
     this.f9,
     this.f10,
     this.f11,
     this.f12
     );

   if(this.b3 == floormaxVal){
     this.floor = "Basement 3"
   } else if (this.b2 == floormaxVal) {
     this.floor = "Basement 2"
   } else if (this.b1 == floormaxVal) {
     this.floor = "Basement 1"
   } else if (this.f1 == floormaxVal) {
     this.floor = "1st Floor"
   } else if (this.f2 == floormaxVal) {
     this.floor = "2nd Floor"
   } else if (this.f3 == floormaxVal) {
     this.floor = "3rd Floor"
   } else if (this.f4 == floormaxVal) {
     this.floor = "4th Floor"
   } else if (this.f5 == floormaxVal) {
     this.floor = "5th Floor"
   } else if (this.f6 == floormaxVal) {
     this.floor = "6th Floor"
   } else if (this.f7 == floormaxVal) {
     this.floor = "7th Floor"
   } else if (this.f8 == floormaxVal) {
     this.floor = "8th Floor"
   } else if (this.f9 == floormaxVal) {
     this.floor = "9th Floor"
   } else if (this.f10 == floormaxVal) {
     this.floor = "10th Floor"
   } else if (this.f11 == floormaxVal) {
     this.floor = "11th Floor"
   } else if (this.f12 == floormaxVal) {
     this.floor = "12th Floor"
   }

   let type = null
   incidentsDB.child("incidents").on("value", (snapshot)=>{
     snapshot.forEach(function(childSnapshot) {
       type = childSnapshot.child("type")

       if(type.val()=="Building Defects"){
         ITB1counter++
       }else if (type.val()=="Plumbing"){
         ITB2counter++
       }else if (type.val()=="Electrical Wiring"){
         ITB3counter++
       }else if (type.val()=="Appliances"){
         ITB4counter++
       }else if (type.val()=="Ventilation System"){
         ITB5counter++
       }else if (type.val()=="Damaged Computer"){
         ITI1counter++
       }else if (type.val()=="Damaged Router"){
         ITI2counter++
       }else if (type.val()=="Damaged TV"){
         ITI3counter++
       }else if (type.val()=="Damaged Projector"){
         ITI4counter++
       }else if (type.val()=="Damaged Gadget"){
         ITI5counter++
       }
     });
   });

   this.ITI1 = ITB1counter
   this.ITB2 = ITB2counter
   this.ITB3 = ITB3counter
   this.ITB4 = ITB4counter
   this.ITB5 = ITB5counter

   let bmomaxVal = Math.max(
     this.ITB1,
     this.ITB2,
     this.ITB3,
     this.ITB4,
     this.ITB5,
   )

   if(this.ITB1 == bmomaxVal){
     this.bmoType = "Building Defects"
   } else if (this.ITB2 == bmomaxVal) {
     this.bmoType = "Plumbing"
   } else if (this.ITB3 == bmomaxVal) {
     this.bmoType = "Electrical Wiring"
   } else if (this.ITB4 == bmomaxVal) {
     this.bmoType = "Appliances"
   } else if (this.ITB5 == bmomaxVal) {
     this.bmoType = "Ventilation System"
   }

   this.ITRO1 = ITI1counter
   this.ITRO2 = ITI2counter
   this.ITRO3 = ITI3counter
   this.ITRO4 = ITI4counter
   this.ITRO5 = ITI5counter

   let itromaxVal = Math.max(
     this.ITRO1,
     this.ITRO2,
     this.ITRO3,
     this.ITRO4,
     this.ITRO5,
   )

   if(this.ITRO1 == itromaxVal){
     this.itroType = "Damaged Computer"
   } else if (this.ITRO2 == itromaxVal) {
     this.itroType = "Damaged Router"
   } else if (this.ITRO3 == itromaxVal) {
     this.itroType = "Damaged TV"
   } else if (this.ITRO4 == itromaxVal) {
     this.itroType = "Damaged Projector"
   } else if (this.ITRO5 == itromaxVal) {
     this.itroType = "Damaged Gadget"
   }
 },
 methods: {
   goBack() {
     this.$router.go(-1);
   },
   goToInsights() {
      this.$router.push("/insights");
    },
 }

}

</script>

<style >
.rounded {
    border-radius: 10px 10px 10px 10px;
}
</style>

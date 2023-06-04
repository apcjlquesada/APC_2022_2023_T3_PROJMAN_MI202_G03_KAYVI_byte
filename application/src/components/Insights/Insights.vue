<template>
   <q-layout view="hhh lpR fff">
    <q-header class="row bg-accent q-py-lg">
      <q-toolbar>
        <div class="col-1 justify-center text-center">
          <q-icon
            class="q-pt-xs q-px-sm"
            name="arrow_back_ios"
            size="sm"
            color="primary"
            @click= "goBack()"
          />
        </div>
        <q-toolbar-title
          class="
          col
          text-h6 text-weight-bold text-primary"
        >
          Insights
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="q-px-md q-py-sm q-gutter-sm">
        <!-- INCIDENTS -->
        <q-card class="rounded">
          <q-card-section class="row q-pa-md items-center">
            <div class="col text-weight-bold text-h5 text-primary">
              Incidents
            </div>
            <q-avatar round class="bg-primary text-white">
              <q-icon name="summarize" class="row" size="sm" />
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="col">
              <!--TOTAL-->
              <div class="row text-weight-bold text-h5 items-center">
                <div class="col">{{this.reports}}</div>
              </div>
            </div>
          </q-card-section>
          <q-separator />
          <q-expansion-item
            header-class="text-black"
            class="text-black"
            label="show more"
            default-opened
          >
            <q-separator />
            <!--RESOLVED-->
            <div class="row q-pa-md items-center">
              <div class="col">
                Resolved Incidents
              </div>
              <div class="row q-pr-sm text-weight-bold q-pr-md">
                {{this.ResCount}}
              </div>
              <div class="row">
                <div
                  v-if="this.percentResolved > 50"
                  class="row rounded bg-positive text-white text-caption text-weight-bold q-px-sm"
                >
                  <q-icon name="arrow_drop_up" />
                  {{this.percentResolved}}%
                </div>
                <div
                  v-if="this.percentResolved == 50"
                  class="row rounded bg-warning text-white text-caption text-weight-bold q-px-sm"
                >
                  = {{this.percentResolved}}%
                </div>
                <div
                  v-if="this.percentResolved < 50"
                  class="row rounded bg-negative text-white text-caption text-weight-bold q-px-sm"
                >
                  <q-icon name="arrow_drop_down" />
                  {{this.percentResolved}}%
                </div>
              </div>
            </div>
            <!--UNRESOLVED-->
            <div class="row q-pa-md">
              <div class="col">
                Unresolved Incidents
              </div>
              <div class="row q-pr-sm text-weight-bold q-pr-md">
                {{this.UnresCount}}
              </div>
              <div class="row">
                <div
                  v-if="this.percentUnresolved > 50"
                  class="row rounded bg-negative text-white text-caption text-weight-bold q-px-sm"
                >
                  <q-icon name="arrow_drop_up" />
                  {{this.percentUnresolved}} %
                </div>
                <div
                  v-if="this.percentUnresolved == 50"
                  class="row rounded bg-warning text-white text-caption text-weight-bold q-px-sm"
                >
                  = {{this.percentUnresolved}} %
                </div>
                <div
                  v-if="this.percentUnresolved < 50"
                  class="row rounded bg-positive text-white text-caption text-weight-bold q-px-sm"
                >
                  <q-icon name="arrow_drop_down" />
                  {{this.percentUnresolved}} %
                </div>
              </div>
            </div>
            <!--DEPARTMENT-->
            <div class="row q-pa-md">
              <div class="col">
                Most Incidents found
              </div>
              <div class="row q-pr-sm text-weight-bold q-pr-md">
                {{this.department}}
              </div>
              <div class="row">
                <div
                  class="row rounded bg-grey-6 text-white text-caption text-weight-bold q-px-md"
                >
                  {{this.percentBMOcount}}%
                </div>
              </div>
            </div>
             <!--FLOOR -->
            <div class="row q-pa-md">
              <div class="col">
                Most Incidents occured
              </div>
              <div class="row q-pr-sm text-weight-bold q-pr-md">
                {{this.commonFloor}}
              </div>
            </div>
            <!--Common BMO Incident -->
            <div class="row q-pa-md">
              <div class="col">
                Most BMO incident
              </div>
              <div class="row q-pr-sm text-weight-bold q-pr-md">
                {{this.commonBMOtype}}
              </div>
            </div>
            <!--Common ITRO Incident -->
            <div class="row q-pa-md">
              <div class="col">
                Most ITRO incident
              </div>
              <div class="row q-pr-sm text-weight-bold q-pr-md">
                {{this.commonITROtype}}
              </div>
            </div>
          </q-expansion-item>
        </q-card>

        <!-- Reported Incidents -->
        <q-card class="rounded">
          <q-card-section class="row q-pa-md items-center">
            <div class="col">
              <div class=" text-weight-bold text-h5 text-primary">
                Reporters
              </div>
              <div class="text-caption text-weight-light">User with the most reported incidents</div>
            </div>
            <q-avatar round class="bg-primary text-white">
              <q-icon name="people" class="row" size="sm"  />
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="col">
              <div class="row text-weight-bold text-h5 items-center">
                <div class="col">{{this.bestreporter}}</div>
              </div>
            </div>
          </q-card-section>
          <q-separator />
          <q-expansion-item
            header-class="text-black"
            class="text-black"
            label="show more"
          >
            <q-separator />
            <!--User List-->
            <div v-for="(value, index) in repoterObj" :key="value">
              <div class="row q-pa-md items-center">
              <div class="col">
                {{index}}
              </div>
              <div class="row text-weight-bold">
                {{value}}
              </div>
            </div>
            </div>
          </q-expansion-item>
        </q-card>

         <!-- BMO Resolved Incidents -->
         <q-card class="rounded" v-if=" !isITRO && !isGuard && !isHeadGuard">
          <q-card-section class="row q-pa-md items-center">
            <div class="col">
              <div class=" text-weight-bold text-h5 text-primary">
                (BMO) Resolvers
              </div>
              <div class="text-caption text-weight-light">User with the most resolved incidents</div>
            </div>
            <q-avatar round class="bg-primary text-white">
              <q-icon name="handyman" class="row" size="sm"  />
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="col">
              <div class="row text-weight-bold text-h5 items-center">
                <div class="col">{{this.bestBMOresolver}}</div>
              </div>
            </div>
          </q-card-section>
          <q-separator />
          <q-expansion-item
            header-class="text-black"
            class="text-black"
            label="show more"
          >
            <q-separator />
            <!--User List-->
            <div v-for="(value, index) in BMOresolverObj" :key="value">
              <div class="row q-pa-md items-center">
              <div class="col">
                {{index}}
              </div>
              <div class="row text-weight-bold">
                {{value}}
              </div>
            </div>
            </div>
          </q-expansion-item>
        </q-card>

         <!-- ITRO Resolved Incidents -->
         <q-card class="rounded" v-if=" !isBMO && !isGuard && !isHeadGuard">
          <q-card-section class="row q-pa-md items-center">
            <div class="col">
              <div class=" text-weight-bold text-h5 text-primary">
                (ITRO) Resolvers
              </div>
              <div class="text-caption text-weight-light">User with the most resolved incidents</div>
            </div>
            <q-avatar round class="bg-primary text-white">
              <q-icon name="laptop" class="row" size="sm"  />
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="col">
              <div class="row text-weight-bold text-h5 items-center">
                <div class="col">{{this.bestITROresolver}}</div>
              </div>
            </div>
          </q-card-section>
          <q-separator />
          <q-expansion-item
            header-class="text-black"
            class="text-black"
            label="show more"
          >
            <q-separator />
            <!--User List-->
            <div v-for="(value, index) in ITROresolverObj" :key="value">
              <div class="row q-pa-md items-center">
              <div class="col">
                {{index}}
              </div>
              <div class="row text-weight-bold">
                {{value}}
              </div>
            </div>
            </div>
          </q-expansion-item>
        </q-card>

        <!-- (Updated) FLOOR LEVEL -->
        <q-card class="rounded">
          <q-card-section class="row q-pa-md items-center">
            <div class="col">
              <div class=" text-weight-bold text-h5 text-primary">
                Floor Levels
              </div>
              <div class="text-caption text-weight-light">Incidents found on each level</div>
            </div>
            <q-avatar round class="bg-primary text-white">
              <q-icon name="elevator" class="row" size="sm"  />
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="col">
              <div class="row text-weight-bold text-h5 items-center">
                <div class="col">{{this.commonFloor}}</div>
              </div>
              <div class="row text-caption">Most Incidents occured</div>
            </div>
          </q-card-section>
          <q-separator />
          <q-expansion-item
            header-class="text-black"
            class="text-black"
            label="show more"
          >
            <q-separator />
            <!--User List-->
            <!--B3-->
            <div class="row q-pa-md items-center">
              <div class="col">
                Basement 3
              </div>
              <div class="row text-weight-bold">
                {{this.b3}}
              </div>
            </div>
            <!--B2-->
            <div class="row q-pa-md items-center">
              <div class="col">
                Basement 2
              </div>
              <div class="row text-weight-bold">
                {{this.b2}}
              </div>
            </div>
            <!--B1-->
            <div class="row q-pa-md items-center">
              <div class="col">
                Basement 1
              </div>
              <div class="row text-weight-bold">
                {{this.b1}}
              </div>
            </div>
            <!--f1-->
            <div class="row q-pa-md items-center">
              <div class="col">
                1st floor
              </div>
              <div class="row text-weight-bold">
                {{this.f1}}
              </div>
            </div>
            <!--f2-->
            <div class="row q-pa-md items-center">
              <div class="col">
                2nd floor
              </div>
              <div class="row text-weight-bold">
                {{this.f2}}
              </div>
            </div>
            <!--f3-->
            <div class="row q-pa-md items-center">
              <div class="col">
                3rd floor
              </div>
              <div class="row text-weight-bold">
                {{this.f3}}
              </div>
            </div>
            <!--f4-->
            <div class="row q-pa-md items-center">
              <div class="col">
                4th floor
              </div>
              <div class="row text-weight-bold">
                {{this.f4}}
              </div>
            </div>
            <!--f5-->
            <div class="row q-pa-md items-center">
              <div class="col">
                5th floor
              </div>
              <div class="row text-weight-bold">
                {{this.f5}}
              </div>
            </div>
            <!--f6-->
            <div class="row q-pa-md items-center">
              <div class="col">
                6th floor
              </div>
              <div class="row text-weight-bold">
                {{this.f6}}
              </div>
            </div>
            <!--f7-->
            <div class="row q-pa-md items-center">
              <div class="col">
                7th floor
              </div>
              <div class="row text-weight-bold">
                {{this.f7}}
              </div>
            </div>
            <!--f8-->
            <div class="row q-pa-md items-center">
              <div class="col">
                8th floor
              </div>
              <div class="row text-weight-bold">
                {{this.f8}}
              </div>
            </div>
            <!--f9-->
            <div class="row q-pa-md items-center">
              <div class="col">
                9th floor
              </div>
              <div class="row text-weight-bold">
                {{this.f9}}
              </div>
            </div>
            <!--f10-->
            <div class="row q-pa-md items-center">
              <div class="col">
                10th floor
              </div>
              <div class="row text-weight-bold">
                {{this.f10}}
              </div>
            </div>
            <!--f11-->
            <div class="row q-pa-md items-center">
              <div class="col">
                11th floor
              </div>
              <div class="row text-weight-bold">
                {{this.f11}}
              </div>
            </div>
            <!--f12-->
            <div class="row q-pa-md items-center">
              <div class="col">
                12th floor
              </div>
              <div class="row text-weight-bold">
                {{this.f12}}
              </div>
            </div>
          </q-expansion-item>
        </q-card>

        <!-- (Updated) BMO -->
        <q-card class="rounded" v-if=" !isITRO && !isGuard">
          <q-card-section class="row q-pa-md items-center">
            <div class="col">
              <div class="row text-weight-bold text-h5">
                <div class=" text-primary q-pr-sm">Building Issues</div>
              </div>
              <div class="text-caption text-weight-light">Incidents Addressed to BMO</div>
            </div>
            <q-avatar round class="bg-primary text-white">
              <q-icon name="engineering" class="row" size="sm"  />
            </q-avatar>
          </q-card-section>
          <q-card-section class="row">
            <div class="col">
              <div class="row text-weight-bold text-h5 items-center">
                <div class="col">{{this.commonBMOtype}}</div>
              </div>
              <div class="row text-caption">Most Common BMO Incident</div>
            </div>
            <div class="row text-center items-center">
              <div class="col text-weight-bold">
                Total Incidents:
                <div class="q-px-md text-h5">{{this.BMOcount}}</div>
              </div>
            </div>
          </q-card-section>
          <q-separator />
          <q-expansion-item
            header-class="text-black"
            class="text-black"
            label="show more"
          >
            <q-separator />
            <!--User List-->
            <div v-for="(value, index) in btypeObj" :key="value">
              <div class="row q-pa-md items-center">
              <div class="col">
                {{index}}
              </div>
              <div class="row text-weight-bold">
                {{value}}
              </div>
            </div>
            </div>
          </q-expansion-item>
        </q-card>

        <!-- (Updated) BMO-Job -->
        <q-card class="rounded" v-if=" !isITRO && !isGuard">
          <q-card-section class="row q-pa-md items-center">
            <div class="col">
              <div class=" text-weight-bold text-h5 text-primary">
                Specialist Activity
              </div>
              <div class="text-caption text-weight-light">Incidents Addressed to BMO Specialists</div>
            </div>
            <q-avatar round class="bg-primary text-white">
              <q-icon name="work" class="row" size="sm"  />
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="col">
              <div class="row text-weight-bold text-h5 items-center">
                <div class="col">{{this.commonJob}}</div>
              </div>
              <div class="row text-caption">Most active Specialist</div>
            </div>
          </q-card-section>
          <q-separator />
          <q-expansion-item
            header-class="text-black"
            class="text-black"
            label="show more"
          >
            <q-separator />
            <!--User List-->
            <div v-for="(value, index) in jobObj" :key="value">
              <div class="row q-pa-md items-center">
              <div class="col">
                {{index}}
              </div>
              <div class="row text-weight-bold">
                {{value}}
              </div>
            </div>
            </div>
          </q-expansion-item>
        </q-card>

         <!-- (Updated) ITRO -->
         <q-card class="rounded" v-if="!isBMO && !isGuard">
          <q-card-section class="row q-pa-md items-center">
            <div class="col">
              <div class=" text-weight-bold text-h5 text-primary">
                IT Issues
              </div>
              <div class="text-caption text-weight-light">Incidents Addressed to ITRO</div>
            </div>
            <q-avatar round class="bg-primary text-white">
              <q-icon name="devices" class="row" size="sm"  />
            </q-avatar>
          </q-card-section>
          <q-card-section  class="row">
            <div class="col">
              <div class="row text-weight-bold text-h5 items-center">
                <div class="col">{{this.commonITROtype}}</div>
              </div>
              <div class="row text-caption">Most Common ITRO Incident</div>
            </div>
            <div class="row text-center items-center">
              <div class="col text-weight-bold">
                Total Incidents:
                <div class="q-px-md text-h5">{{this.ITROcount}}</div>
              </div>
            </div>
          </q-card-section>
          <q-separator />
          <q-expansion-item
            header-class="text-black"
            class="text-black"
            label="show more"
          >
            <q-separator />
            <!--User List-->
            <div v-for="(value, index) in itypeObj" :key="value">
              <div class="row q-pa-md items-center">
              <div class="col">
                {{index}}
              </div>
              <div class="row text-weight-bold">
                {{value}}
              </div>
            </div>
            </div>
          </q-expansion-item>
        </q-card>

      </q-page>
    </q-page-container>
    <q-footer class="bg-accent q-pa-md" />
  </q-layout>
</template>

<script>
import { projectDb, projectAuth } from "src/boot/firebase"
import { Role } from "src/components/roles";
export default {
  components: {
    //areaChart: require("src/components/Insights/apexInsights.vue").default
  },

  data(){
    return{
      isBMO: false,
      isGuard: false,
      isHeadGuard: false,
      isITRO: false,
      isAdmin: false,

      reports: "",
      BMOcount: "",
      ITROcount: "",
      percentUnresolved: "",
      percentResolved: "",
      percentITROcount: "",
      percentBMOcount: "",
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

      bestreporter: "",
      bestITROresolver: "",
      bestBMOresolver: "",
      commonFloor: "",
      commonBMOtype: "",
      commonITROtype: "",
      commonJob: "",

      repoterObj: new Object(),
      ITROresolverObj: new Object(),
      BMOresolverObj: new Object(),
      floorObj: new Object(),
      btypeObj: new Object(),
      itypeObj: new Object(),
      jobObj: new Object(),

    }
  },

  created(){
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
      })
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
    })


    let testarr = []
    let testcounter1 = null
    incidentsDB.child("incidents").orderByChild("name").on("value", (snapshot)=>{
      snapshot.forEach(function(childSnapshot) {
        testcounter1 = childSnapshot.child("name")
        testarr.push(testcounter1.val())
      });
      let modeMap = []
      let maxEl = testarr[0], maxCount = 1;
      for(var i = 0; i < testarr.length; i++){
        var el = testarr[i];
        if(modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;
        if(modeMap[el] > maxCount)
        {
            maxEl = el;
            maxCount = modeMap[el];
        }
      }
      this.bestreporter = maxEl

      let elcount = []
      testarr.forEach(e =>{
        elcount[e] = (elcount[e] || 0) + 1;
      })
      Object.assign(this.repoterObj, elcount)
    });

    let resolverITROArr = []
    let resolverBMOArr = []
    let resolverEll = null
    let deptEll = null
    incidentsDB.child("incidents").orderByChild("name").on("value", (snapshot)=>{
      snapshot.forEach(function(childSnapshot) {
        resolverEll = childSnapshot.child("resolver")
        deptEll = childSnapshot.child("department")
        if(resolverEll.val() != null && deptEll.val() == "IT Resource Office (ITRO)"){
          resolverITROArr.push(resolverEll.val())
        }else if (resolverEll.val() != null && deptEll.val() == "Building Maintenance Office (BMO)"){
          resolverBMOArr.push(resolverEll.val())
        }
      });
      let modeITROMap = []
      let maxITROEl = resolverITROArr[0], maxITROCount = 1;
      for(var i = 0; i < resolverITROArr.length; i++){
        var el = resolverITROArr[i];
        if(modeITROMap[el] == null)
        modeITROMap[el] = 1;
        else
        modeITROMap[el]++;
        if(modeITROMap[el] > maxITROCount)
        {
            maxITROEl = el;
            maxITROCount = modeITROMap[el];
        }
      }
      this.bestITROresolver = maxITROEl


      let resITROObj = []
      resolverITROArr.forEach(e =>{
        resITROObj[e] = (resITROObj[e] || 0) + 1;
      })
      Object.assign(this.ITROresolverObj, resITROObj)

      let modeMap = []
      let maxEl = resolverBMOArr[0], maxCount = 1;
      for(var i = 0; i < resolverBMOArr.length; i++){
        var el = resolverBMOArr[i];
        if(modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;
        if(modeMap[el] > maxCount)
        {
            maxEl = el;
            maxCount = modeMap[el];
        }
      }
      this.bestBMOresolver = maxEl

      let resObj = []
      resolverBMOArr.forEach(e =>{
        resObj[e] = (resObj[e] || 0) + 1;
      })
      Object.assign(this.BMOresolverObj, resObj)
    });

    incidentsDB.child("incidents").on('value', (snapshot) => {
      this.reports = snapshot.numChildren()
    })

    incidentsDB.child("incidents").orderByChild("department").equalTo("IT Resource Office (ITRO)").on("value", (snapshot)=>{
      snapshot.forEach(function(childSnapshot) {
        ITROcounter++
      });
    });

    this.ITROcount = ITROcounter
    this.percentITROcount = ((this.ITROcount / this.reports) * 100).toFixed(2)

    incidentsDB.child("incidents").orderByChild("department").equalTo("Building Maintenance Office (BMO)").on("value", (snapshot)=>{
      snapshot.forEach(function(childSnapshot) {
        BMOcounter++
      });
    });

    this.BMOcount = BMOcounter
    this.percentBMOcount = ((this.BMOcount / this.reports) * 100).toFixed(2)

    if(this.BMOcount > this.ITROcount){
      this.department = "BMO"
    }else if(this.BMOcount < this.ITROcount){
      this.department = "ITRO"
    }else if(this.BMOcount == 0 & this.ITROcount == 0){
      this.department = "Incidents have yet to be reported"
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

    let jobArr = []
    let jobEll = null
    incidentsDB.child("incidents").on("value", (snapshot)=>{
      snapshot.forEach(function(childSnapshot){
        jobEll = childSnapshot.child("job")
        if(jobEll.val() != "N/A"){
          jobArr.push(jobEll.val())
        }
      });
      let modeMap = []
      let maxEl = jobArr[0], maxCount = 1;
      for(var i = 0; i < jobArr.length; i++){
        var el = jobArr[i];
        if(modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;
        if(modeMap[el] > maxCount)
        {
            maxEl = el;
            maxCount = modeMap[el];
        }
      }
      this.commonJob = maxEl
      //console.log(this.commonJob)

      let jobStats = []
      jobArr.forEach(e =>{
        jobStats[e] = (jobStats[e] || 0) + 1;
      })
      Object.assign(this.jobObj, jobStats)
      //console.log(this.jobObj)
    })

    let floorArr = []
    let floorEll = null
    incidentsDB.child("incidents").orderByChild("post").on("value", (snapshot)=>{
      snapshot.forEach(function(childSnapshot) {
        floorEll = childSnapshot.child("post")
        floorArr.push(floorEll.val())
      });
      //console.log(floorArr)
      let modeMap = []
      let maxEl = floorArr[0], maxCount = 1;
      for(var i = 0; i < floorArr.length; i++){
        var el = floorArr[i];
        if(modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;
        if(modeMap[el] > maxCount)
        {
            maxEl = el;
            maxCount = modeMap[el];
        }
      }
      this.commonFloor = maxEl
      //console.log(this.commonFloor)

      let floorStats = []
      floorArr.forEach(e =>{
        floorStats[e] = (floorStats[e] || 0) + 1;
      })

      Object.assign(this.floorObj, floorStats)

    });

    let bmoTypeArr = []
    let itroTypeArr = []
    let typeEll = null
    let departmentEll = null

    incidentsDB.child("incidents").on("value", (snapshot)=>{
      snapshot.forEach(function(childSnapshot) {
        typeEll = childSnapshot.child("type")
        departmentEll = childSnapshot.child("department")

        if(departmentEll.val() == "Building Maintenance Office (BMO)"){
          if(typeEll.val() == "Aircon Leakage"
          || typeEll.val() == "Cooling Unit Not Operational"
          || typeEll.val() == "Busted Lights"
          || typeEll.val() == "Defective Starter"
          || typeEll.val() == "Defective Ballast"
          || typeEll.val() == "Bidet Leakage"
          || typeEll.val() == "Faucet Leakage"
          || typeEll.val() == "Water Closet Leakage"){
              bmoTypeArr.push(typeEll.val())
            } else {
              bmoTypeArr.push("Others")
              }
        } else if (departmentEll.val() == "IT Resource Office (ITRO)"){
          if(typeEll.val() == "Damaged CPU"
          || typeEll.val() == "Damaged Mouse"
          || typeEll.val() == "Damaged Keyboard"
          || typeEll.val() == "Damaged Monitor"
          || typeEll.val() == "Damaged Speaker"
          || typeEll.val() == "Damaged Headset"
          || typeEll.val() == "Damaged Microphone"
          || typeEll.val() == "Damaged Router"
          || typeEll.val() == "Damaged TV"
          || typeEll.val() == "Damaged Projector"
          || typeEll.val() == "Damaged Camera"){
            itroTypeArr.push(typeEll.val())
          } else {
            itroTypeArr.push("Others")
            }
        }
      });
      // console.log("BMO Array: ",bmoTypeArr)
      // console.log("ITRO Array: ",itroTypeArr)
      let modeMap = []
      let maxEl = bmoTypeArr[0], maxCount = 1;
      for(var i = 0; i < bmoTypeArr.length; i++){
        var el = bmoTypeArr[i];
        if(modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;
        if(modeMap[el] > maxCount)
        {
            maxEl = el;
            maxCount = modeMap[el];
        }
      }
      this.commonBMOtype = maxEl
      //console.log(this.commonBMOtype)

      let blocalObj = []
      bmoTypeArr.forEach(e =>{
        blocalObj[e] = (blocalObj[e] || 0) + 1;
      })
      Object.assign(this.btypeObj, blocalObj)
      //console.log(this.btypeObj)

      let ITmodeMap = []
      let ITmaxEl = itroTypeArr[0], ITmaxCount = 1;
      for(var i = 0; i < itroTypeArr.length; i++){
        var el = itroTypeArr[i];
        if(ITmodeMap[el] == null)
        ITmodeMap[el] = 1;
        else
        ITmodeMap[el]++;
        if(ITmodeMap[el] > ITmaxCount)
        {
          ITmaxEl = el;
          ITmaxCount = ITmodeMap[el];
        }
      }
      this.commonITROtype = ITmaxEl
      // console.log(this.commonITROtype)

      let ilocalObj = []
      itroTypeArr.forEach(e =>{
        ilocalObj[e] = (ilocalObj[e] || 0) + 1;
      })
      Object.assign(this.itypeObj, ilocalObj)
      //console.log(this.itypeObj)
    });

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
    goBack() {
      this.$router.go(-1);
    },
  }

}

</script>
<style>
.rounded {
    border-radius: 10px 10px 10px 10px;
}
</style>

<template>
  <q-layout view="hHh lpR fff">
    <q-header>
      <div class="row q-pa-sm text-grey-2 q-pt-md">
        <div class="col-1 q-pa-md">
          <q-icon
            class="q-pt-xs"
            name="arrow_back_ios"
            size="sm"
            color="grey-2"
            @click="goToHome()"
          />
        </div>
        <div class="col q-pa-md text-weight-bold text-h6">
          {{ $route.name }}
        </div>
      </div>
    </q-header>
    <q-page-container>
      <q-page>
        <q-form
          @submit ="submitForm"
          ref="irForm"
        >
         <!--
          Date and Time
        -->
        <q-card bordered class="q-ma-md" style="border-radius: 10px">
          <q-card-section>
            <div class="text-primary text-h6 text-weight-bold">
              Date and Time
            </div>
          </q-card-section>

          <q-card-section class="row q-px-md">
            <!-- Date -->
            <q-input
              readonly
              class="full-width"
              style="max-weight:300px"
              filled v-model="incidentToSubmit.date"
              label="Date of incident"
              mask="date"
              :rules="['date']">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date
                        v-model="incidentToSubmit.date"
                        today-btn
                        ref="date"
                        :rules="[(val) => !!val || 'Field is required']"
                      >
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
            </q-input>

            <!-- Time -->
            <q-input
              readonly
              class="full-width"
              style="max-weight:300px"
              filled v-model="incidentToSubmit.time"
              label="Time of incident"
              mask="fulltime"
              :rules="['fulltime']"
              ref="time">
                <template v-slot:append>
                  <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-time
                        v-model="incidentToSubmit.time"
                        with-seconds
                        format24h
                        now-btn
                        :rules="[(val) => !!val || 'Field is required']"
                      />
                    </q-popup-proxy>
                  </q-icon>
                </template>
            </q-input>
          </q-card-section>
        </q-card>

        <!--
          Department
        -->
        <q-card bordered class="q-ma-md" style="border-radius: 10px">
          <q-card-section>
            <div class="text-primary text-h6 text-weight-bold">
              Department
            </div>
          </q-card-section>
          <q-card-section>

          <div class="q-gutter-md">
              <q-select
              outlined
              label="Select a Department"
              v-model="incidentToSubmit.department"
              @update:model-value="onChange"
              :options="deptOptions"
              ref="department"
              :rules="[(val) => !!val || 'Field is required']"
              />
          </div>
          </q-card-section>
        </q-card>

        <!--
          Incident Found Module:
          Attachment || Type || Location
        -->
        <q-card bordered class="q-ma-md" style="border-radius: 10px">
          <q-card-section>
            <div class="text-primary text-h6 text-weight-bold">
              Incident Found
            </div>
          </q-card-section>
          <!--
            Type of Incident,
            Where it happened
          -->
          <q-card-section>
            <q-select
              v-if="isBMO"
              outlined
              label="Assign Incident to"
              v-model="incidentToSubmit.job"
              @update:model-value="onJobChange"
              :options="jobOptions"
              ref="type"
              :rules="[(val) => !!val || 'Field is required']"
            />
            <q-select
              v-if="isBMO"
              outlined
              label="Type of Incident"
              v-model="this.others"
              :options="this.options"
              @update:model-value="othersChange"
              ref="type"
              :rules="[(val) => !!val || 'Field is required']"
            />
            <q-select
              v-if="isITRO"
              outlined
              label="Type of Incident"
              v-model="this.others"
              :options="this.options"
              @update:model-value="othersChange"
              ref="type"
              :rules="[(val) => !!val || 'Field is required']"
            />
            <q-input
              v-if="typeIsOthers"
              outlined
              label="Specify Incident"
              v-model="incidentToSubmit.type"
              :options="this.options"
              ref="type"
              :rules="[(val) => !!val || 'Field is required']"
            />
            <!--Incident Location-->
            <q-select
              outlined
              label="Location of Incident"
              v-model="incidentToSubmit.post"
              :options="floorOptions"
              ref="post"
              :rules="[(val) => !!val || 'Field is required']"
            />
            <q-input
              outlined
              label="Specific Location"
              v-model="incidentToSubmit.spec"
              hint="e.g Room 314 or MPH1"
              maxlength="15"
              :rules="[(val) => !!val || 'Field is required']"
            />
          </q-card-section>
          <!-- Upload -->
          <div class="q-pa-md">
            <div v-if="imageData!=null">
                <img
                  class="preview"
                  style="height: 140px; max-width: 250px"
                  :src="this.img1"
                >
          </div>
          <div class="row justify-center">
            <v-btn @click="click1" class="text-grey-8 text-subtitle2">
              Upload an Image here
            </v-btn>
            <input
              type="file"
              accept="image/*"
              ref="input1"
              @change="previewImage"
            >
          </div>
          </div>

          <!--Description-->
          <q-card-section>
              <q-input
                label="Description of incident"
                v-model="incidentToSubmit.desc"
                filled
                type="textarea"
                maxlength="300"
                ref="desc"
                :rules="[(val) => !!val || 'Field is required']"
              />
            </q-card-section>
        </q-card>
        <!--submit-->
        <div class="row q-py-xl q-px-md">
          <q-btn
            no-caps
            rounded
            unelevated=""
            class="
              col
              q-pa-sm
              bg-primary
              text-grey-1 text-subtitle1 text-weight-bold"
            label="Submit"
            type="submit"
          />
        </div>
        </q-form>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions } from "vuex";
import { projectStorage, projectDb } from "src/boot/firebase";
import getUser from "src/composables/getUser";
import { useQuasar, date } from 'quasar';
import { useRouter } from "vue-router";

export default {
  data() {
    const { user } = getUser();
    const uid = user.value.uid
    const userRole = projectDb.ref(`users/${uid}/name`);
    userRole.on('value', (snapshot) => {
      const currentUserName = snapshot.val()
      this.user = currentUserName
    })
    return {
      img1: '',
      imageData: null,
      fileError: null,
      validation: 0,
      options: '',
      typeIsOthers: false,
      isBMO: false,
      isITRO: false,
      others: "",

      incidentToSubmit: {

        date: "",
        time: "",

        department: "",

        job: "",
        type: "",
        post: "",
        spec: "",
        desc: "",
        imgUrl: "",

        irID: "",
        viewID: "",
        name: this.user,
        userId: user.value.uid,

        status: false,
        res: "Unresolved",
        root: "",
        solution: "",
        createdAt: "",
      },
    };
  },

  setup(){
    const $q = useQuasar()
    const router = useRouter();
    const timeStamp = Date.now()
    const formattedDate = date.formatDate(timeStamp, 'MMMM DD, YYYY')
    const formattedTime = date.formatDate(timeStamp, 'hh : mm  A')

    return{
      thumbStyle: {
        right: "4px",
        borderRadius: "5px",
        backgroundColor: "secondary",
        width: "5px",
        opacity: 0.3,
      },
      onError() {
        this.validation = 0;
        $q.notify({
          type: 'negative',
          message: `Please Upload a Photo of the Incident`
        })
      },
      onSuccess() {
          $q.notify({
            type: 'positive',
            position: 'top',
            message: `Incident Report Sent`
          })
        },
      toViewIR(){
        router.push({ path: "/viewir" });
      },
      getTime(){
        this.incidentToSubmit.createdAt = (formattedDate+" at "+formattedTime);
      },
      deptOptions:[
        "Building Maintenance Office (BMO)",
        "IT Resource Office (ITRO)"
      ],
      jobOptions:[
        'Electrician',
        'Plumber',
        'Aircon Technician',
        'Fabricator',
        'Carpenter'
      ],
      airconOps: [
        "Aircon Leakage",
        "Cooling Unit Not Operational",
        "Others"
      ],
      electricianOps: [
        "Busted Lights",
        "Defective Starter",
        "Defective Ballast",
        "Others"
      ],
      plumberOps: [
        "Bidet Leakage",
        "Faucet Leakage",
        "Water Closet Leakage",
        "Others"
      ],
      fabcarpOps: [
        "Others"
      ],
      itroOps: [
        "Damaged CPU",
        "Damaged Mouse",
        "Damaged Keyboard",
        "Damaged Monitor",
        "Damaged Speaker",
        "Damaged Headset",
        "Damaged Microphone",
        "Damaged Router",
        "Damaged TV",
        "Damaged Projector",
        "Damaged Camera",
        "Others"
      ],
      floorOptions:[
        "Basement 3", "Basement 2", "Basement 1",
        "1st Floor", "2nd Floor", "3rd Floor",
        "4th Floor", "5th Floor", "6th Floor",
        "7th Floor", "8th Floor", "9th Floor",
        "10th Floor", "11th Floor", "12th Floor"
      ],
    }

  },

  methods: {
    ...mapActions("incidents", ["addIncident"]),

    onChange(){
      this.options = ""
      this.others = ""
      this.incidentToSubmit.type = ""
      this.incidentToSubmit.job = ""
      if(this.incidentToSubmit.department == "Building Maintenance Office (BMO)"){
        this.isBMO = true
        this.isITRO = false
      } else if (this.incidentToSubmit.department == "IT Resource Office (ITRO)"){
        this.isBMO = false
        this.isITRO = true
        this.typeIsOthers = false
        this.incidentToSubmit.job = "N/A"
        this.options = this.itroOps
      } else {
        console.log('Please Select a Department before Selecting Incident Type');
      }
    },

    onJobChange(){
      this.others = ""
      if(this.incidentToSubmit.job == "Electrician"){
          this.options = this.electricianOps
        }else if (this.incidentToSubmit.job == "Plumber"){
          this.options = this.plumberOps
        }else if (this.incidentToSubmit.job == "Aircon Technician"){
          this.options = this.airconOps
        }else if (this.incidentToSubmit.job == "Fabricator"){
          this.options = this.fabcarpOps
        }else if (this.incidentToSubmit.job == "Carpenter"){
          this.options = this.fabcarpOps
        }
    },

    othersChange(){
      if(this.incidentToSubmit.department == "Building Maintenance Office (BMO)"){
        if(this.others == "Others"){
          this.incidentToSubmit.type = ""
          this.typeIsOthers = true
        }else {
          this.typeIsOthers = false
          this.incidentToSubmit.type = this.others
        }
      }else if(this.incidentToSubmit.department == "IT Resource Office (ITRO)"){
        if(this.others == "Others"){
          this.incidentToSubmit.type = ""
          this.typeIsOthers = true
        }else{
          this.typeIsOthers = false
          this.incidentToSubmit.type = this.others
        }
      }
    },

    click1() {
      this.$refs.input1.click()
    },

    previewImage(event) {
      const types = ["image/png", "image/jpeg"];

      this.uploadValue=0;
      this.img1=null;
      this.imageData = event.target.files[0];

      if (this.imageData && types.includes(this.imageData.type)) {
        this.onUpload()
      } else {
        this.imageData=null;
        this.onError()
      }
    },

    generateIRID(){
      let incidentsDB = projectDb.ref();
      let id = 0;
      incidentsDB.child("incidents").on('value', (snapshot) => {
        id = snapshot.numChildren()
        id = id + 1
        this.incidentToSubmit.irID = (id)
        this.incidentToSubmit.viewID = ("IR-" + id)
    })

    },

    onUpload(){
      this.img1 = null;
      this.incidentToSubmit.imgUrl = null;
      this.validation = 0;

      this.generateIRID()

      const storageRef=projectStorage.ref(`incidents/${this.user}/${this.incidentToSubmit.viewID}/${this.imageData.name}`).put(this.imageData);
      storageRef.on(`state_changed`,snapshot=>{
        this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
      }, error=>{console.log(error.message)},
      ()=>{this.uploadValue=100;
        storageRef.snapshot.ref.getDownloadURL().then((url)=>{
          this.incidentToSubmit.imgUrl = url;
          this.img1 = url;
          ++this.validation
        });
      }
      );
    },

    goToHome() {
       this.$router.go(-1);
    },

    submitForm() {
        if (this.validation == 1) {
          this.generateIRID()
          this.getTime()
          this.addIncident(this.incidentToSubmit);
          this.onSuccess()
          this.toViewIR()
        }
        else {
          this.onError()
        }
    }

  },
};
</script>

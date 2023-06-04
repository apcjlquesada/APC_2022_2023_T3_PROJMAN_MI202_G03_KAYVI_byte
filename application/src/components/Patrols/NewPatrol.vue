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
            @click="goBack()"
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
          ref="logForm"
          class="q-pa-xs"
        >
          <q-card bordered class="q-ma-md" style="border-radius: 10px">
            <q-card-section>
              <div class="text-primary text-h6 text-weight-bold">
                Patrol Information
              </div>
            </q-card-section>
            <!--
              Log Location
            -->
            <q-card-section>
              <q-select
                outlined
                label="Location"
                v-model="logToSubmit.post"
                :options="floorOptions"
                ref="post"
              />
            </q-card-section>

            <q-card-section>
              <q-input
                outlined
                label="Location Specifics"
                hint="e.g Room 314"
                v-model="logToSubmit.spec"
                ref="spec"
                maxlength="10"
              />
            </q-card-section>

            <!--Description-->
            <q-card-section>
              <q-input
                label="Log Description"
                v-model="logToSubmit.desc"
                filled
                type="textarea"
                maxlength="500"
                ref="desc"
              />
            </q-card-section>
          </q-card>
          <!--Finish Patrol-->
          <div class="row q-pa-md">
            <q-btn
              no-caps
              rounded
              unelevated
              class="
                col
                full-width q-pa-sm bg-primary
                text-grey-1 text-subtitle1 text-weight-bold"
              label="Patrol Area"
              @click="patrolArea"
            />
          </div>
          <div class="row q-pa-md">
            <q-btn
              no-caps
              outline
              rounded
              class="
                col
                full-width q-pa-sm text-primary
                text-subtitle1 text-weight-bold"
              label="Finish Patrol"
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
  import { projectDb } from "src/boot/firebase";
  import getUser from "src/composables/getUser";
  import { useQuasar, date } from "quasar";
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

        logToSubmit: {

          date: "",
          time: "",

          post: "",
          spec: "",
          desc: "",

          name: this.user,
          userId: user.value.uid,
          status: false,
          createdAt: "",
        },
      };
    },

    setup(){
      const timeStamp = Date.now()
      const router = useRouter();
      const formattedDate = date.formatDate(timeStamp, 'YYYY/MM/DD')
      const formattedTime = date.formatDate(timeStamp, 'HH:mm:ss')
      const CAformattedDate = date.formatDate(timeStamp, 'MMMM DD, YYYY')
      const CAformattedTime = date.formatDate(timeStamp, 'hh : mm  A')
      const $q = useQuasar()

      return{
        toViewLog(){
          router.push({ path: "/viewlog" });
        },
        getCreationDT(){
          this.logToSubmit.createdAt = (CAformattedDate+" at "+CAformattedTime);
        },
        getDate(){
          this.logToSubmit.date = (formattedDate);
        },
        getTime(){
          this.logToSubmit.time = (formattedTime);
        },
        onError() {
        $q.notify({
          type: 'negative',
          position: 'top',
          message: `Please Populate All Fields`
        })
        },
        onSuccess() {
        $q.notify({
          type: 'positive',
          position: 'top',
          message: `Log has been created`
        })
        },
        floorOptions:[
          "1st Floor", "2nd Floor", "3rd Floor",
          "4th Floor", "5th Floor", "6th Floor",
          "7th Floor", "8th Floor", "9th Floor",
          "10th Floor", "11th Floor", "12th Floor"
        ],
      }

    },

    methods: {
      ...mapActions("logs", ["addLog"]),

      goToHome() {
        this.$router.push("/home");
      },

      goBack(){
        this.$router.go(-1);
      },

      goToLogbook(){
      this.$router.push("/viewlog");
      },

      refreshPatrol(){
      this.logToSubmit.post = ""
      this.logToSubmit.spec = ""
      this.logToSubmit.desc = ""
      },

      patrolArea() {
        if(this.logToSubmit.post == "" || this.logToSubmit.spec == "" || this.logToSubmit.desc == ""){
          this.onError()
        }else{
          this.getDate()
          this.getTime()
          this.getCreationDT()
          this.addLog(this.logToSubmit)
          this.refreshPatrol()
          this.onSuccess()
        }
      },

      submitForm() {
        if(this.logToSubmit.post == "" || this.logToSubmit.spec == "" || this.logToSubmit.desc == ""){
          this.onError()
        }else{
          this.getDate()
          this.getTime()
          this.getCreationDT()
          this.addLog(this.logToSubmit)
          this.onSuccess()
          this.goToLogbook()
        }
      }
    },
  };
  </script>

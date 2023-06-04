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
                Log Information
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
                :rules="[(val) => !!val || 'Field is required']"
              />
            </q-card-section>

            <!--Location Speifics-->
            <q-card-section>
              <q-input
                outlined
                placeholder="Location Specifics"
                v-model="logToSubmit.spec"
                ref="spec"
                hint="e.g Room 314"
                maxlength="10"
                :rules="[(val) => !!val || 'Field is required']"
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
                :rules="[(val) => !!val || 'Field is required']"
              />
            </q-card-section>
          </q-card>
          <!--submit-->
          <div class="row q-py-xl q-px-md">
            <q-btn
              no-caps
              rounded
              unelevated
              class="
                col
                full-width q-pa-sm bg-primary
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
  import { projectDb } from "src/boot/firebase";
  import getUser from "src/composables/getUser";
  import { date, useQuasar } from 'quasar';
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
          res: "Unverified",
          createdAt: "",
        },
      };
    },

    setup(){
      const timeStamp = Date.now()
      const router = useRouter();
      const formattedDate = date.formatDate(timeStamp, 'YYYY/MM/DD')
      const formattedTime = date.formatDate(timeStamp, 'HH:mm:ss')
      const $q = useQuasar()

      return{
        toViewLog(){
          router.push({ path: "/viewlog" });
        },
        onSuccess() {
          $q.notify({
            type: 'positive',
            position: 'top',
            message: `Log has been created`
          })
        },
        getCreationDT(){
          this.logToSubmit.createdAt = (formattedDate+" at "+formattedTime);
        },
        getDate(){
          this.logToSubmit.date = (formattedDate);
        },
        getTime(){
          this.logToSubmit.time = (formattedTime);
        },
        floorOptions:[
          "Basement 3", "Basement 2", "Basement 1",
          "Lobby Information", "Humabon Entrance", "SLEX Entrance",
          "Dormitory"
        ],
      }

    },

    methods: {
      ...mapActions("logs", ["addLog"]),

      goToHome() {
        this.$router.push("/home");
      },

      goToLogbook(){
      this.$router.push("/viewlog");
      },

      goBack(){
        this.$router.go(-1);
      },

      submitForm() {
        this.getDate()
        this.getTime()
        this.getCreationDT()
        this.addLog(this.logToSubmit)
        this.onSuccess()
        this.goToLogbook()
      }

    },
  };
  </script>

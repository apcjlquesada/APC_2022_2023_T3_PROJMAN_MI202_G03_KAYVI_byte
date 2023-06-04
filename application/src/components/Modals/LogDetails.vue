<template>
  <q-layout view="hhh lpR fff">
    <q-header class="row bg-white q-py-lg">
      <q-toolbar>
        <div class="col-1 justify-center text-center">
          <q-icon
            class="q-pt-xs q-px-sm"
            name="arrow_back_ios"
            size="sm"
            color="primary"
            v-close-popup flat round dense
          />
        </div>
        <q-toolbar-title
          class="
          col
          text-h6 text-weight-bold text-primary"
        >
          Log Summary
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page>
      <!--
        Reported By: User
      -->
      <div class="row text-subtitle2 bg-positive q-pa-lg justify-center" v-if="log.status">
          Verified on: {{log.res}}
          <q-icon name="check_circle" class="q-pl-sm" />
        </div>
      <div class="q-px-md q-pb-xs q-pt-lg">
        <q-card class="row q-my-sm q-pa-sm bg-primary text-grey-2" >
          <q-card-section>
            <q-icon name="account_circle" color="seoncary" size="70px" />
          </q-card-section>
          <q-card-section class="col text-caption text-weight-light">
            <div class="row q-pt-sm text-h5 text-grey-1 text-weight-bold">
              {{ log.name }}
            </div>
            <div class="row text-subtitle1 text-grey-4">
              Issued on: {{ log.date }} at {{ log.time }}
            </div>
          </q-card-section>
        </q-card>
      </div>
      <!--
        Log Found
      -->
      <div class="q-px-md q-pb-xs">
        <q-card class="row q-my-sm q-pa-sm bg-white">
          <q-card-section class="col full-wdith">
            <div class="text-weight-bold text-h6 text-primary q-pb-md">
              Log Details:
            </div>

            <!-- LOCATION: FLOOR LEVEL  -->
            <div class="row full-width text-grey-9">
              <div class="col text-subtitle1 text-weight-bold">
                Location:
              </div>
              <div class="col-5"/>
              <div class="col text-subtitle1 text-right">
                {{ log.post }}
              </div>
            </div>

            <div class="row full-width text-grey-9">
              <div class="col text-subtitle1 text-weight-bold">
                Specific Location:
              </div>
              <div class="col-5"/>
              <div class="col text-subtitle1 text-right">
                {{ log.spec }}
              </div>
            </div>

            <q-separator class="q-my-md" />

            <!-- DESCRIPTION -->
            <div>
            <div class="row full-width text-grey-9">
              <div class="col text-subtitle1 text-weight-bold">
                Description:
              </div>
            </div>
            <div class="row q-pt-sm text-subtitle2 text-weight-light">
                {{ log.desc }}
              </div>
            </div>

          </q-card-section>
        </q-card>
      </div>
      <q-card-actions class="q-pa-lg" v-if="isHeadGuard">
          <q-btn
            v-if="!log.status"
            rounded no-caps
            class="col justify-center bg-primary text-white"
            label="Verify Log"
            @click="prompt = true"
          />
            <!-- Confirmation Dialog -->
            <q-dialog v-model="prompt" class="q-pa-md" persistent position="bottom">
              <q-card class="q-pa-sm">
                <q-card-section class="row q-pa-md">
                  <div>
                    <p class="col text-h4 text-weight-bold text-warning">Hold on! </p>
                    <p class="row text-subtitle1 text-weight-light">
                      Are you sure you have reviewed this log?
                    </p>
                  </div>
                </q-card-section>
                <!-- body -->

                <q-card-actions class="q-pb-xl">
                  <q-btn
                    unelevated exact no-caps rounded outline
                    color="primary"
                    label="Submit"
                    class="fit q-pa-md q-ma-sm text-weight-light"
                    @click="resolve"
                    size="18px"
                  />
                  <q-btn
                    unelevated exact no-caps rounded
                    color="primary"
                    label="Cancel"
                    class="fit q-pb-sm q-ma-sm text-weight-light"
                    size="18px"
                    v-close-popup
                  />
                </q-card-actions>
              </q-card>
            </q-dialog>
      </q-card-actions>
    </q-page>

    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions } from "vuex";
import { ref } from "vue";
import { date } from "quasar";
import { projectDb } from "src/boot/firebase"
import { Role } from "src/components/roles"
import getUser from "src/composables/getUser";

export default {
  props: ["log", "id"],

  setup() {
    const timeStamp = Date.now()
    const formattedDate = date.formatDate(timeStamp, 'MMMM DD, YYYY')
    const formattedTime = date.formatDate(timeStamp, 'hh : mm  A')

    return {
      getTime(){
        this.res = (formattedDate+" at "+formattedTime);
      },
      alert: ref(false),
      confirm: ref(false),
      prompt: ref(false),
      thumbStyle: {
        right: "4px",
        borderRadius: "5px",
        backgroundColor: "#1a73e8",
        width: "5px",
        opacity: 0.3,
      },
    }
  },
  //maximaze fullscreen
  data: function () {
    const { user } = getUser();
    const uid = user.value.uid
    const userRole = projectDb.ref(`users/${uid}/role`);
    userRole.on('value', (snapshot) => {
      const currentUserRole = snapshot.val()
      this.role = currentUserRole
    })
    return {
      isBMO: false,
      isGuard: false,
      isHeadGuard: false,
      isITRO: false,
      maximizedToggle: true,
    };
  },
  computed: {
    niceDate() {
      return (value) => {
        return date.formatDate(value, "MMM DD, YYYY");
      };
    },
    logTime() {
      return date.formatDate(
        this.log.date + " " + this.log.time,
        "h:mm A"
      );
    }
  },
  methods: {
    ...mapActions("logs", ["updateLog"]),

    resolve() {
      this.getTime()
      this.updateLog({
				id: this.id,
        updates: { status: !this.log.status, res: this.res },
			})
    }
  },
  created() {
		this.logToSubmit = Object.assign({}, this.log)
    const { user } = getUser();
          this.uid = user.value.uid // Checks the current User's UID
          const userRole = projectDb.ref(`users/${this.uid}/role`);
          console.log(userRole)
          // Then checks if what role they have.
          userRole.on('value', (snapshot) => {
            // if the role they have match with the authorized Role, then...
            if (snapshot.val() === Role.HeadGuard ) {
              this.isHeadGuard = true
            } else {
            console.log('User Role is Invalid');
            }
          })
	}
};
</script>

<style>
.inputStyle {
  min-width: 250px;
  max-width: 1080px;
  max-height: 120px;
  padding: 15px;
  font-size: 20px;
}
</style>

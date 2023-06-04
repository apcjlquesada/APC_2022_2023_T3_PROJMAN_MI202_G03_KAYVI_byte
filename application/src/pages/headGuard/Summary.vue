<template>
  <div>
    <q-card rounded class="q-pa-md bg-primary absolute fullscreen">
      <div class="absolute-center">
        <q-card-section class="row q-pb-xl">
          <q-icon
          name="verified"
          class="col text-h5 text-white text-center text-bold"
          size="150px" />
        </q-card-section>
        <q-card-section class="row">
          <!-- title -->
          <div class="col text-white text-center">
            <div class="text-h3 text-bold">Excellent!</div>
            <div class="q-pt-lg text-body1">
              You have successfully finished your patrol!
              </div>
          </div>
        </q-card-section>
      </div>
      <div class="absolute-bottom col flex flex-center">
        <q-btn
          rounded
          unelevated
          no-caps
          size="lg"
          class="fit q-ma-xl bg-secondary text-white"
          label="Finish Patrol"
          @click="showLoading"
        />
      </div>
    </q-card>
  </div>
</template>

<script>
import { useQuasar } from 'quasar'
import { onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
     const $q = useQuasar()
     const router = useRouter()
    let timer

    onBeforeUnmount(() => {
      if (timer !== void 0) {
        clearTimeout(timer)
      }
    })

    return {
       showLoading () {
        $q.loading.show({
          message: 'Cleaning up <b>Patrol</b>.<br/>Hang on...',
          html: true,
        })

        // hiding in 3s
        timer = setTimeout(() => {
          router.push({ path: '/home'})
          $q.loading.hide()
          timer = void 0
        }, 1000)
      }
    }
  },


};
</script>

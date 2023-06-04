<template>
   <div
    class="fullscreen bg-primary text-accent text-center q-pa-md flex flex-center"
  >
    <div>
      <q-avatar round size="130px">
        <img
          src="~assets/pamtheram.png"
          style="min-height: 25px; max-width: 170px"
        />
      </q-avatar>
      <div class="text-h4 text-weight-bold q-pt-md">Waking up!</div>

      <div class="text-weight-light text-h5" style="opacity: 0.75">Setting up real quick...</div>
      <!--
        <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/home"
        label="Go Home"
        no-caps
      />
      -->
    </div>
    </div>
    <!--
  <q-layout class="bg-accent">


    <q-header class="
      row q-px-md q-pt-lg q-pb-md
      text-grey-9 text-h5 text-weight-bold
      bg-accent items-center
    ">
       <div  class="q-pr-md">
        <q-skeleton type="QAvatar" square size="50px" />
       </div>
       <div class="col-5">
        <q-skeleton type="text" class="text-subtitle1" height="50px" />
      </div>
    </q-header>

    <q-page-container>
      <q-page>
        <div class="row q-px-md q-py-sm q-gutter-sm">
          <div class="col-3 col-grow">
            <q-skeleton type="QAvatar" class="my-box" square size="100px" />
          </div>
          <div class="col-3 col-grow">
            <q-skeleton type="QAvatar" class="my-box" square size="100px" />
          </div>
          <div class="col-3 col-grow">
            <q-skeleton type="QAvatar" class="my-box" square size="100px" />
          </div>
          <div class="col-3 col-grow">
            <q-skeleton type="QAvatar" class="my-box full-width" square size="100px"/>
          </div>
        </div>

        <div class="bg-white q-my-sm" style="height: 270px">
            <div class="row q-pa-lg items-center">
              <q-skeleton type="text" class="col-7 text-subtitle1" height="50px" />
              <q-space />
              <q-skeleton type="QBtn"  class="row text-primary text-h6" />
            </div>
            <div class="row q-px-sm q-gutter-sm">
              <div class="col">
                <div class="row">
                  <q-skeleton height="130px" width="160px" square />
                </div>
              </div>
              <div class="col">
                <div class="row">
                  <q-skeleton height="130px" width="160px" square />
                </div>
              </div>
              <div class="col">
                <div class="row">
                  <q-skeleton height="130px" width="160px" square />
                </div>
              </div>
            </div>
        </div>
        <div class="row  q-pa-sm q-gutter-sm ">
          <div class="col-4 col-grow">
            <q-skeleton type="QAvatar" class="my-box" square size="150px" />
          </div>
          <div class="col-4 col-grow">
            <q-skeleton type="QAvatar" class="my-box" square size="150px" />
          </div>
          <div class="col-4 col-grow">
            <q-skeleton type="QAvatar" class="my-box" square size="150px" />
          </div>
          <div class="col-4 col-grow">
            <q-skeleton type="QAvatar" class="my-box" square size="150px"/>
          </div>
        </div>
      </q-page>
    </q-page-container>
    <q-footer>

    </q-footer>
  </q-layout>
  -->
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Error404",
});
</script>
<style>
.my-box {
    border-radius: 10px 10px 10px 10px;
}
</style>

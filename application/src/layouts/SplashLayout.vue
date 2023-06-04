<template>
  <q-layout class="bg-grey-2">
    <q-header
      class="q-pa-sm bg-grey-2 gt-xs"
    >
      <q-toolbar class="row">
        <div class="col-1" />
        <div class="col text-bold text-h5 text-primary">
          SurveiRams
        </div>
        <div class="col-7" />
        <div class="col">
          <q-btn
            unelevated
            rounded
            class= "
            text-capitalize
            q-px-lg q-py-sm
            bg-primary
            text-grey-2"
            to="/login"
          >
            Sign in
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>
    <!-- Route content inserted here -->
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer
      class="
      lt-sm
      q-pb-md
      q-pt-sm
      bg-grey-2"
    >
      <q-toolbar class="row flex flex-center q-pb-xl">
        <div>
          <q-btn
            unelevated
            rounded
            class= "
            text-capitalize
            q-px-xl q-py-sm
            bg-primary
            text-subtitle1
            text-grey-2"
            to="/login"
          >
            Sign in
          </q-btn>
        </div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

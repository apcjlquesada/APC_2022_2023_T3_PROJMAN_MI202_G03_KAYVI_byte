<template>
  <q-input
    filled
    v-model="searchField"
    class="col"
    standout="bg-white"
    color="primary"
    placeholder="Search reports"
  >
    <template v-slot:prepend>
      <q-icon name="search"/>
    </template>
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date
            v-model="searchField"
            today-btn
            ref="date"
            >
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
      <q-icon
        v-if="searchField !== ''"
        name="close"
        @click="searchField = ''"
        class="cursor-pointer"
      />
    </template>
  </q-input>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("logs", ["search"]),

    searchField: {
      get() {
        return this.search;
      },
      set(value) {
        this.setSearch(value);
      },
    },
  },

  methods: {
    ...mapActions("logs", ["setSearch"]),
  },
};
</script>

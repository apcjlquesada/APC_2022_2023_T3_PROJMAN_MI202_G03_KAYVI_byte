<template>
  <q-input
  filled
    v-model="searchField"
    class="col"
    standout="bg-white"
    color="primary"
    placeholder="Search members"
    style="padding-top: 10px"
  >
    <template v-slot:prepend>
      <q-icon name="search"/>
    </template>
    <template v-slot:append>
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
    ...mapState("users", ["search"]),

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
    ...mapActions("users", ["setSearch"]),
  },
};
</script>

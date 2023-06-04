<template>
  <q-select
    v-model="sortBy"
    :options="options"
    emit-value
    map-options
    filled
    bg-color="secondary"
    label="Sort by"
    class="q-ml-sm"
    stack-label
  />
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      options: [
        {
          label: "Latest Reports",
          value: "descending",
        },
        {
          label: "Earliest Reports",
          value: "ascending",
        },
      ],
    };
  },

  computed: {
    ...mapState("incidents", ["sort"]),
    sortBy: {
      get() {
        return this.sort;
      },
      set(value) {
        this.setSort(value);
      },
    },
  },

  methods: {
    ...mapActions("incidents", ["setSort"]),
  },
};
</script>

<style scoped>
.q-select {
  flex: 0 0 100px;
}
</style>

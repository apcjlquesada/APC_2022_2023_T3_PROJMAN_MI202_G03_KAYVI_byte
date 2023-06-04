<template>
  <q-select
    v-model="sortBy"
    :options="options"
    emit-value
    map-options
    class="col q-ml-sm"
    filled
    label="Sort by"
    stack-label
    style="padding-top: 10px"
  />
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      options: [
        {
          label: "Post",
          value: "post",
        },
        {
          label: "Date",
          value: "date",
        },
      ],
    };
  },

  computed: {
    ...mapState("assignments", ["sort"]),
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
    ...mapActions("assignments", ["setSort"]),
  },
};
</script>

<style scoped>
.q-select {
  flex: 0 0 100px;
}
</style>

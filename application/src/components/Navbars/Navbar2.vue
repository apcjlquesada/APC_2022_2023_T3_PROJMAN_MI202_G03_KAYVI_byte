<template>
  <nav v-if="user">
    <div class="row q-pa-sm text-grey-2 q-pt-md">
      <!-- <div class="text-grey-5">
        {{ user.displayName }}
      </div> -->
      <!--home-->
      <div class="col-1 q-pa-md">
        <q-icon
          class="q-pt-xs"
          name="arrow_back_ios"
          size="sm"
          color="grey-2"
          @click="handleClick"
        />
      </div>
      <!--page title-->
      <div class="col q-pa-md text-weight-bold text-h6">
        {{ $route.name }}
      </div>
    </div>
  </nav>
</template>

<script>
import getUser from "src/composables/getUser";

export default {
  setup(props, context) {
    const { user } = getUser();

    const handleClick = async () => {
      context.emit("home");
    };

    return { handleClick, user };
  },
};
</script>

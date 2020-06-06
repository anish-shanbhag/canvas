<template>
  <div>
    <div class="text-xs-center mt-4" :class="{hidden: !loading, visible: loading}">
      <v-progress-circular indeterminate color="primary" size="50" width="5"></v-progress-circular>
    </div>
    <div :class="{hidden: loading, visible: !loading}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { events } from "../events";

export default {
  props: {
    loading: Boolean,
    requiresAuth: Boolean
  },
  created() {
    if (this.requiresAuth) {
      if (this.$store.state.loadedUser) this.$emit("loadedUserData");
      events.$on("loadedUserData", () => {
        if (this.$store.state.user) this.$emit("loadedUserData");
        else {
          this.$router.push({
            name: "login",
            query: {
              redirect: this.$route.path
            }
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.hidden {
  height: 0px;
  opacity: 0;
  transform: translateY(50px);
}
.visible {
  transform: translateY(0px);
  transition: all 0.8s ease;
}
</style>



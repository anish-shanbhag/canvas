<template>
  <div>
    <v-toolbar dark app class="primary">
      <v-toolbar-title class="headline text-uppercase">
        <span>Canvas</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <transition name="grow">
        <v-btn v-if="this.$store.state.user == null" to="/login">Get Started</v-btn>
      </transition>
      <transition name="grow">
        <UserButton v-if="this.$store.state.user != null"/>
      </transition>
    </v-toolbar>
  </div>
</template>

<script>
import UserButton from "./UserButton";

export default {
  components: {
    UserButton
  }
};
</script>
 
<template>
  <v-app dark>
    <Toolbar/>
    <v-content>
      <v-container>
        <transition name="slide-fade-up">
          <router-view/>
        </transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Toolbar from "./components/Toolbar";

export default {
  name: "App",
  components: {
    Toolbar
  }
};
</script>

<style>
.slide-fade-up-enter-active {
  transition: all 0.8s ease;
}
.slide-fade-up-enter {
  transform: translateY(50px);
  opacity: 0;
}
.slide-fade-up-leave {
  opacity: 0;
}
.grow-enter-active {
  transition: all 0.4s ease;
}
.grow-enter {
  transform: scale(0);
  opacity: 0;
}
.grow-leave {
  opacity: 0;
}
</style>

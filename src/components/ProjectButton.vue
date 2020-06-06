<template>
  <div>
    <v-card
      class="text-xs-center ma-2"
      ripple
      hover
      style="border-radius: 15px"
      @click="openProject"
      width="170px"
      height="170px"
    >
      <v-img :src="projectImage" width="100%" height="50%"/>
      <v-card-title class="title text-xs-left">
        <span style="overflow: hidden; text-overflow: ellipsis; user-select: none">{{project.name}}</span>
      </v-card-title>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["project"],
  data() {
    return {
      projectImage: ""
    };
  },
  methods: {
    openProject() {
      this.$router.push("view/" + this.project.id);
    }
  }
};
</script>
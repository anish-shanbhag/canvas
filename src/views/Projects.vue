<template>
  <div>
    <Page :loading="loading" @loadedUserData="reloadProjects" requiresAuth>
      <v-layout row wrap>
        <v-flex
          xs12
          class="display-1 pb-2 mb-2"
          style="border-bottom: 0.5px solid white"
        >My Projects</v-flex>
        <v-card
          class="primary text-xs-center ma-2"
          dark
          ripple
          hover
          style="border-radius: 15px"
          @click="$router.push('/create')"
        >
          <div class="pa-4">
            <v-icon size="120px" style="user-select: none">add</v-icon>
          </div>
        </v-card>
        <ProjectButton v-for="project in projects" :project="project" :key="project.id" />
      </v-layout>
    </Page>
  </div>
</template>

<script>
import Page from "../components/Page";
import ProjectButton from "../components/ProjectButton";

import firebase from "firebase";

export default {
  components: {
    Page,
    ProjectButton
  },
  data() {
    return {
      projects: [],
      loading: true
    };
  },
  methods: {
    async reloadProjects() {
      this.loading = true;
      const snapshot = await firebase
        .firestore()
        .collection("projects")
        .where("username", "==", this.$store.state.username)
        .get();
      this.projects = snapshot.docs.map(doc => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });
      this.loading = false;
    }
  }
};
</script>


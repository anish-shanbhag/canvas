<template>
  <Page :loading="loading" requiresAuth @loadedUserData="loadProjectData">
    <v-layout v-if="project" row wrap>
      <v-flex class="subheading font-weight-bold grey--text mt-1" xs12>view/{{project.id}}</v-flex>
      <v-flex class="display-2 font-weight-bold" xs10>{{project.name}}</v-flex>
      <v-flex xs2>
        <v-btn class="primary" right :to="'/edit/' + project.id">
          <v-icon left size="20px" class="mr-2" style="margin-left: -5px">edit</v-icon>Edit
        </v-btn>
      </v-flex>
    </v-layout>
  </Page>
</template>

<script>
import Page from "../components/Page";

import firebase from "firebase/app";

export default {
  components: {
    Page
  },
  data() {
    return {
      loading: true,
      project: null
    };
  },
  methods: {
    async loadProjectData() {
      const snapshot = await firebase
        .firestore()
        .collection("projects")
        .doc(this.$route.params.id)
        .get();
      this.project = snapshot.data();
      this.project.id = snapshot.id;
      this.loading = false;
    }
  }
};
</script>


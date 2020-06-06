<template>
  <div>
    <Page :loading="loading" requiresAuth @loadedUserData="loading = false">
      <Form
        @submit="createProject"
        title="Create New Project"
        buttonText="Create"
        :errorMessage="errorMessage"
      >
        <TextField
          icon="create"
          label="Name"
          :rules="nameRules"
          @change="name => this.name = name"
        />
      </Form>
    </Page>
  </div>
</template>

<script>
import Page from "../components/Page";
import Form from "../components/Form";
import TextField from "../components/TextField";

import firebase from "firebase/app";

export default {
  components: {
    Page,
    Form,
    TextField
  },
  data() {
    return {
      loading: true,
      errorMessage: null,
      nameRules: [
        v => (v && v.length < 40) || "Name must be shorter than 40 characters"
      ],
      name: null
    };
  },
  methods: {
    async createProject() {
      this.loading = true;
      await firebase
        .firestore()
        .collection("projects")
        .add({
          name: this.name,
          username: this.$store.state.username
        });
      this.$router.push("/projects");
    }
  }
};
</script>


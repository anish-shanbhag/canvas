<template>
  <div>
    <Page :loading="loading">
      <Form
        @submit="login"
        title="Log In"
        buttonText="Log In"
        :errorMessage="errorMessage"
      >
        <TextField
          icon="email"
          label="Username or Email"
          @change="usernameOrEmail => this.usernameOrEmail = usernameOrEmail"
        />
        <TextField
          icon="vpn_key"
          label="Password"
          @change="password => this.password = password"
          password
        />
      </Form>
      <v-layout>
        <v-flex xs6 offset-xs3 class="mt-2">
          Don't have an account?
          <a
            color="primary"
            @click="signupPage"
            style="text-decoration: none"
          >Create one for free.</a>
        </v-flex>
      </v-layout>
    </Page>
  </div>
</template>

<script>
import Page from "../components/Page";
import Form from "../components/Form";
import TextField from "../components/TextField";

import firebase from "firebase";

import { events } from "../events"

export default {
  components: {
    Page,
    Form,
    TextField
  },
  data() {
    return {
      loading: false,
      errorMessage: null,
      usernameOrEmail: null,
      password: null
    };
  },
  created() {
    events.$on("loadedUser", this.redirect);
  },
  methods: {
    async login() {
      this.loading = true;
      try {
        let email;
        if (
          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
            this.usernameOrEmail
          )
        ) {
          email = this.usernameOrEmail;
        } else {
          const snapshot = await firebase
            .firestore()
            .collection("users")
            .doc(this.usernameOrEmail)
            .get();
          if (snapshot.exists) email = snapshot.data().email;
          else throw { code: "invalid-username" };
        }
        const cred = await firebase
          .auth()
          .signInWithEmailAndPassword(email, this.password);
      } catch (error) {
        this.loading = false;
        console.log(error);
        switch (error.code) {
          case "auth/invalid-email":
          case "auth/user-not-found":
          case "auth/wrong-password":
          case "invalid-username":
            this.errorMessage = "Invalid username, email, or password.";
            break;
          case "auth/too-many-requests":
            this.errorMessage =
              "Too many login requests. Please try again in a few seconds.";
            break;
          default:
            this.errorMessage = "An unknown error has occurred.";
        }
      }
    },
    redirect() {
      this.$router.push(this.$route.query.redirect || "/projects");
    },
    signupPage() {
      this.$router.push({
        name: "signup",
        query: {
          redirect: this.$route.query.redirect
        }
      });
    }
  }
};
</script>


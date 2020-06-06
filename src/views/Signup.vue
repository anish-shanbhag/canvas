<template>
  <div>
    <Page :loading="loading">
      <Form
        @submit="signup"
        title="Create Account"
        buttonText="Create Account"
        :errorMessage="errorMessage"
      >
        <TextField
          icon="person"
          label="Username"
          :rules="usernameRules"
          @change="username => this.username = username"
        />
        <TextField
          icon="email"
          label="Email"
          :rules="emailRules"
          @change="email => this.email = email"
        />Choose Profile Picture (Optional)
        <br />
        <v-btn fab large class="primary" style="padding: 0px" @click="$refs.profilePicture.click()">
          <v-avatar>
            <v-avatar v-if="profilePictureImage">
              <img :src="profilePictureImage" />
            </v-avatar>
            <span v-else>Upload</span>
          </v-avatar>
        </v-btn>
        <input
          type="file"
          accept="image/*"
          v-show="false"
          ref="profilePicture"
          @change="changeProfilePicture"
        />
        <TextField
          icon="vpn_key"
          label="Password"
          :rules="passwordRules"
          @change="password => this.password = password"
          password
        />
        <TextField
          icon="check"
          label="Confirm Password"
          :rules="confirmPasswordRules"
          @change="confirmPassword => this.confirmPassword = confirmPassword"
          password
        />
      </Form>
    </Page>
  </div>
</template>

<script>
import Page from "../components/Page";
import Form from "../components/Form";
import TextField from "../components/TextField";

import firebase from "firebase";

import { events } from "../events";

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
      username: null,
      email: null,
      profilePicture: null,
      profilePictureImage: null,
      password: null,
      confirmPassword: null,
      usernameRules: [
        v => (v && v.length >= 8) || "Username must be at least 8 characters"
      ],
      emailRules: [
        v =>
          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
            v
          ) || "Email must be valid"
      ],
      passwordRules: [
        v =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(
            v
          ) ||
          "Password must be at least 8 characters and should contain a combination of uppercase and lowercase letters, numbers, and special characters"
      ],
      confirmPasswordRules: [
        v => v == this.password || "The passwords don't match"
      ]
    };
  },
  created() {
    events.$on("loadedUser", this.redirect);
  },
  methods: {
    changeProfilePicture(event) {
      if (event.target.files && event.target.files[0]) {
        this.profilePicture = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => (this.profilePictureImage = reader.result);
        if (this.profilePicture) reader.readAsDataURL(this.profilePicture);
        else this.profilePictureImage = null;
      } else {
        this.profilePicture = null;
        this.profilePictureImage = null;
      }
    },
    async signup() {
      this.loading = true;
      try {
        const usernameSnapshot = await firebase
          .firestore()
          .collection("users")
          .doc(this.username)
          .get();
        if (usernameSnapshot.exists) throw { code: "username-in-use" };
        const emailSnapshot = await firebase
          .firestore()
          .collection("users")
          .where("email", "==", this.email)
          .get();
        if (emailSnapshot.docs.length > 0) throw { code: "email-in-use" };
        await firebase
          .firestore()
          .collection("users")
          .doc(this.username)
          .set({
            email: this.email
          });
        const component = this;
        function uploadProfilePicture() {
          return new Promise(resolve => {
            const upload = firebase
              .storage()
              .ref("profile-pictures/" + component.username)
              .put(component.profilePicture);
            upload.on("state_changed", {
              complete: resolve
            });
          });
        }
        await uploadProfilePicture();
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password);
      } catch (error) {
        this.loading = false;
        switch (error.code) {
          case "username-in-use":
            this.errorMessage = "The username you entered is already in use.";
            break;
          case "email-in-use":
            this.errorMessage =
              "This email already has an account associated with it.";
            break;
          case "auth/too-many-requests":
            this.errorMessage =
              "Too many signup requests. Please try again in a few seconds.";
            break;
          default:
            this.errorMessage = "An unknown error has occurred.";
        }
      }
    },
    redirect() {
      this.$router.push(this.$route.query.redirect || "/projects");
    }
  }
};
</script>

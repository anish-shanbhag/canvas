<template>
  <div>
    <v-menu open-on-hover bottom left offset-y>
      <template v-slot:activator="{on}">
        <v-btn
          light
          v-on="$store.state.loadedUser ? on : null"
          :loading="!$store.state.loadedUser"
        >
          <v-avatar size="24px" class="mr-2">
            <v-icon v-if="$store.state.profilePicture == 'generic'">person</v-icon>
            <img :src="$store.state.profilePicture" v-else>
          </v-avatar>
          {{$store.state.username}}
        </v-btn>
      </template>
      <v-list>
        <v-list-tile @click="test">
          <v-list-tile-title>My Account</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="signOut">
          <v-list-tile-title>Sign Out</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import firebase from "firebase/app";

export default {
  methods: {
    test() {},
    async signOut() {
      await firebase.auth().signOut();
      this.$router.push("/");
    }
  }
};
</script>


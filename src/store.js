import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import { events } from "./events";
import firebase from "firebase/app";

export default new Vuex.Store({
  state: {
    user: null,
    username: null,
    profilePicture: null,
    data: null,
    loadedUser: false
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      state.loadedUser = false;
      if (user) events.$emit("loadedUser");
    },
    setUserData(state, info) {
      Object.assign(state, info);
      state.loadedUser = true;
      events.$emit("loadedUserData");
    }
  },
  actions: {
    async changeUser(context, user) {
      context.commit("setUser", user);
      if (user) {
        const snapshot = await firebase
          .firestore()
          .collection("users")
          .where("email", "==", user.email)
          .get();
        const doc = snapshot.docs[0];
        let profilePicture;
        try {
          profilePicture = await firebase.storage().ref("profile-pictures/" + doc.id).getDownloadURL();
        } catch (error) {
          profilePicture = "generic";
        }
        context.commit("setUserData", {
          username: doc.id,
          profilePicture: profilePicture,
          data: doc.data()
        });
      } else {
        context.commit("setUserData", {
          username: null,
          profilePicture: null,
          data: null,
        });
      }
    }
  }
});
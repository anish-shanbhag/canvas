import Vue from "vue";
import Vuetify from "vuetify";
import colors from "vuetify/es5/util/colors";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import firebase from "firebase/app";

import firebaseConfig from "./firebase-config"
 
Vue.config.productionTip = false;

Vue.use(Vuetify, {
  theme: {
    primary: colors.blue,
    secondary: colors.orange.darken2,
    accent: colors.lightBlue,
    error: colors.red
  }
});

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

auth.onAuthStateChanged(user => {
  store.dispatch("changeUser", user);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
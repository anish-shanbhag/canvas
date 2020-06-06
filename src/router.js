import Vue from "vue";
import Router from "vue-router";

import Home from "./views/Home";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Projects from "./views/Projects";
import CreateNewProject from "./views/CreateNewProject";
import ViewProject from "./views/ViewProject";
import EditProject from "./views/EditProject";

Vue.use(Router);

const router = new Router({
  routes: [{
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup
    },
    {
      path: "/projects",
      name: "projects",
      component: Projects
    },
    {
      path: "/create",
      name: "create",
      component: CreateNewProject
    },
    {
      path: "/view/:id",
      name: "view",
      component: ViewProject
    },
    {
      path: "/edit/:id",
      name: "edit",
      component: EditProject
    }
  ],
  mode: 'history'
});

export default router;
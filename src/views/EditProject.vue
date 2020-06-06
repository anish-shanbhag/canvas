<template>
  <Page :loading="loading" requiresAuth @loadedUserData="loadProjectData">
    <div v-if="project">
      <div class="subheading font-weight-bold grey--text mt-1">edit/{{project.id}}</div>
      <div class="display-2 font-weight-bold">{{project.name}}</div>
      <div class="grey darken-3 pa-1 mt-3 elevation-20" style="border-radius: 6px">
        <v-btn class="green accent-4">
          <v-icon left size="20px" class="mr-2" style="margin-left: -5px">save</v-icon>Save
        </v-btn>
        <Slider
          label="Canvas Width"
          default="50"
          min="10"
          max="90"
          @input="value => canvasWidth = value"
        />
        <Slider
          label="Editor Height"
          default="28"
          min="5"
          max="50"
          @input="value => editorHeight = value"
        />
      </div>
      <v-layout class="mt-2" row wrap align-start>
        <canvas
          ref="canvas"
          style="border: 2px solid #eeeeee; border-radius: 6px; height: 400px; margin-right: 1%"
          class="elevation-20"
        />
        <div
          ref="editor"
          id="editor"
          style="width: 50%; display: inline-block; border-radius: 6px"
          class="elevation-20"
        ></div>
      </v-layout>
    </div>
  </Page>
</template>

<script>
import Page from "../components/Page";
import Slider from "../components/Slider";

import firebase from "firebase/app";

const ace = require("brace");
require("brace/mode/javascript");
require("brace/theme/monokai");

export default {
  components: {
    Page,
    Slider
  },
  data() {
    return {
      loading: true,
      project: null,
      editor: null,
      canvasWidth: 50,
      editorHeight: 28
    };
  },
  watch: {
    canvasWidth() {
      this.$refs.canvas.style.width = this.canvasWidth + "%";
      this.$refs.editor.style.width = 99 - this.canvasWidth + "%";
    },
    editorHeight() {
      this.resizeEditor();
    }
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
      this.$nextTick(() => {
        this.editor = ace.edit("editor");
        this.editor.getSession().setMode("ace/mode/javascript");
        this.editor.setTheme("ace/theme/monokai");
        this.resizeEditor();
      });
    },
    resizeEditor() {
      this.editor.setOptions({
        minLines: this.editorHeight,
        maxLines: this.editorHeight
      });
      this.editor.resize();
    }
  }
};
</script>

<style scoped>
#editor ::-webkit-scrollbar {
  width: 12px;
}

#editor ::-webkit-scrollbar-track {
  background: #eee;
}

#editor ::-webkit-scrollbar-thumb {
  background: #777;
}

#editor ::-webkit-scrollbar-thumb:hover {
  background: #444;
}
</style>
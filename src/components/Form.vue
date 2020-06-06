<template>
  <div>
    <v-layout>
      <v-flex xs6 offset-xs3>
        <div
          class="display-1 my-2 pb-2 text-xs-center"
          style="border-bottom: 0.5px solid white"
        >{{title}}</div>
        <div>
          <v-form ref="form" @submit.prevent="submit">
            <slot></slot>
            <v-btn
              type="submit"
              color="primary"
              style="margin-left: 0px"
            >{{buttonText}}</v-btn>
            <v-alert
              :value="errorMessage != null"
              type="error"
              style="padding: 10px; margin-top: 12px"
            >{{errorMessage}}</v-alert>
          </v-form>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    buttonText: String,
    errorMessage: String
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) this.$emit('submit');
    }
  }
};
</script>


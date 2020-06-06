<template>
  <div>
    <template>
      <div>
        <slot name="button" :open="() => shown = true"></slot>
        <v-dialog max-width="600px" v-model="shown">
          <v-card>
            <v-card-title>
              <span
                class="display-1 ml-4 mt-4 pb-2 text-xs-center"
                style="margin-bottom: -40px; width: 92%; border-bottom: 0.5px solid black"
              >{{name}}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-form ref="form" @submit="submit">
                  <slot></slot>
                  <v-btn
                    type="submit"
                    :loading="loading"
                    :disabled="loading"
                    color="primary"
                    style="margin-left: 0px"
                  >{{name}}</v-btn>
                  <v-alert
                    :value="error"
                    type="error"
                    style="padding: 10px; margin-top: 12px"
                  >{{errorMessage}}</v-alert>
                </v-form>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    name: String
  },
  data() {
    return {
      shown: false,
      loading: false,
      error: false,
      errorMessage: ""
    };
  },
  methods: {
    submit(event) {
      event.preventDefault();
      if (this.$refs.form.validate()) this.$emit("submit");
    },
    showError(message) {
      this.error = true;
      this.errorMessage = message;
    }
  },
  watch: {
    shown(value) {
      if (!value) {
        this.loading = this.error = false;
        this.$refs.form.reset();
      }
    }
  }
};
</script>

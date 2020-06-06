<template>
  <div>
    <v-text-field
      :prepend-icon="icon"
      :append-icon="password ? (visible ? 'visibility' : 'visibility_off') : null"
      @click:append="() => visible = !visible"
      :type="visible ? 'text' : 'password'"
      :label="label"
      @change="change"
      :rules="rules ? [v => !!v || 'Required'].concat(rules) : [v => !!v || 'Required']"
      v-model="value"
      required
    />
  </div>
</template>

<script>
export default {
  props: {
    icon: String,
    label: String,
    rules: Array,
    password: Boolean
  },
  data() {
    return {
      value: "",
      visible: !this.password
    };
  },
  methods: {
    change() {
      this.$emit("change", this.value);
    }
  }
};
</script>

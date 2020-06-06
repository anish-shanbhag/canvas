<template>
  <span style="display: inline-block" class="ml-2">
    <div class="caption" style="position: relative; top: 40px; left: 50px">{{label}}</div>
    <v-slider
      width="100px"
      style="width: 180px"
      v-model="value"
      :min="min"
      :max="max"
      thumb-size="0"
      thumb-color="transparent"
      thumb-label="always"
      always-dirty
      class="mt-0"
      @input="$emit('input', value)"
    ></v-slider>
  </span>
</template>

<script>
export default {
  props: {
    label: String,
    default: String,
    min: String,
    max: String
  },
  data() {
    return {
      value: this.default
    }
  }
}
</script>


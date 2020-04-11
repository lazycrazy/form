<template>
  <base-radio v-model="val" :options="options"></base-radio>
</template>

<script>

import BaseRadio from './base-radio'

export default {
  name: 'FieldRadio',
  components: { BaseRadio },
  props: {
    options: {
      default: Object,
      required: true
    },
    value: {
      required: true
    }
  },
  computed: {
    val: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>

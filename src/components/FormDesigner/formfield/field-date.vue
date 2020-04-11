<template>
  <base-date v-model="val" :options="options"></base-date>
</template>

<script>

import BaseDate from './base-date'

export default {
  name: 'FieldDate',
  components: { BaseDate },
  props: {
    options: {
      default: Object,
      required: true
    },
    value: {
      required: true,
      default: ''
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

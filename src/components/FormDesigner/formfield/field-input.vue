<template>
  <base-input v-model="val" :options="options"></base-input>
</template>

<script>
import BaseInput from './base-input'

export default {
  name: 'FieldInput',
  components: { BaseInput },
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

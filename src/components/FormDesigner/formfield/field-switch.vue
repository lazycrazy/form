<template>
  <base-switch v-model="val" :options="options"></base-switch>
</template>

<script>

import BaseSwitch from './base-switch'

export default {
  name: 'FieldSwitch',
  components: { BaseSwitch },
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
        if(this.value === undefined) {
          return this.options.defaultValue
        }
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>

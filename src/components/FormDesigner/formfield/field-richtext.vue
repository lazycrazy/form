<template>
  <base-richtext v-model="val" :options="options"></base-richtext>
</template>

<script>

import BaseRichtext from './base-richtext'

export default {
  name: 'FieldRichtext',
  components: { BaseRichtext },
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

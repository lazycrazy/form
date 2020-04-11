<template>
  <base-checkbox v-model="val" :options="options"></base-checkbox>
</template>

<script>

import BaseCheckbox from './base-checkbox'

export default {
  name: 'FieldCheckbox',
  components: { BaseCheckbox },
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
        return this.value ? this.value.toString().split(',') : []
      },
      set(value) {
        this.$emit('input', value.toString())
      }
    }
  },
  watch: {
    'options.checkboxs'() {
      this.setValues()
    }
  },
  created() {
    this.setValues()
  },
  methods: {
    setValues() {
      if (this.options.options && this.multiple === true) {
        this.options.options.forEach(o => {
          o.value = o.value.toString()
        })
      }
    }
  }
}
</script>

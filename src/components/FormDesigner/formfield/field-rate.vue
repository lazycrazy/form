<template>
  <el-rate v-model="val" :max="options['max']" :allow-half="options['allowHalf']" :show-text="options['showText']" :text-color="options['textColor']" :colors="options['colors']" :texts="options['texts']"> </el-rate>
</template>

<script>
export default {
  name: 'FieldRate',
  props: {
    options: {
      default: Object,
      required: true
    },
    value: {
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {
    val: {
      get() {
        // return this.value
        return null
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    _change(value) {
      this.$emit('change', value)
    }
  }
}
</script>

<style scoped></style>

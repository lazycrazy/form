<template>
  <el-time-picker 
  v-if="options['isRange'] || options['style'] === 'hms'"
  v-model="val" 
  :picker-options="{
    selectableRange: '00:00:00 - 23:59:59'
  }" 
  :is-range="options['isRange']" 
  :range-separator="options['rangeSeparator']" 
  :start-placeholder="options['startPlaceholder']" 
  :end-placeholder="options['endPlaceholder']" 
  :placeholder="options['placeholder']" 
  @change="_change" 
  @blur="_blur" 
  @focus="_focus"></el-time-picker>
  <el-time-select
    v-else
    v-model="val"
    :picker-options="{
      start: options['start'],
      step: options['step'],
      end: options['end']
    }"
    :placeholder="options['placeholder']"
    @change="_change"
    @blur="_blur"
    @focus="_focus"
  ></el-time-select>
</template>

<script>
export default {
  name: 'FieldTimepicker',
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
  },
  methods: {
    _change(value) {
      this.$emit('change', value)
    },
    _blur(e) {
      this.$emit('change', e)
    },
    _focus(e) {
      this.$emit('change', e)
    },
    focus() {
      this.$refs['input'].focus()
    }
  },
  mounted() {
  }
}
</script>

<style scoped></style>

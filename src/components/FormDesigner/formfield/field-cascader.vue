<template>
  <el-cascader
    v-model="val"
    :options="options['options']"
    :props="{ expandTrigger: 'hover' }"
    :clearable="options['clearable']"
    :show-all-levels="options['showAllLevels']"
    @change="_change"
  ></el-cascader>

  <!--<el-cascader-panel></el-cascader-panel>-->
</template>

<script>
export default {
  name: 'FieldCascader',
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
  },
  methods: {
    _change(value) {
      this.$emit('change', value)
    }
  }
}
</script>

<style scoped>

</style>

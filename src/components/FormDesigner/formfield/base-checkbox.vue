<template>
  <el-checkbox-group ref="checkbox" v-model="val" :size="options['size']" :disabled="options['disabled']" :min="options['min']" :max="options['max']" :text-color="options['text-color']" :fill="options['fill']" @change="_change">
    <template v-if="options['view'] === 'checkbox'">
      <el-checkbox v-for="checkbox in options['checkboxs']" :key="checkbox['value']" :label="checkbox['value']" :true-label="checkbox['true-label']" :false-label="checkbox['false-label']" :disabled="checkbox['disabled']" :border="options['border']" :name="checkbox['name']" :checked="checkbox['checked']" :indeterminate="checkbox['indeterminate']">{{ checkbox['text'] }}</el-checkbox>
    </template>

    <template v-else>
      <el-checkbox-button v-for="button in options['checkboxs']" :key="button['value']" :label="button['value']" :true-label="button['true-label']" :false-label="button['false-label']" :disabled="button['disabled']" :name="button['name']" :checked="button['checked']">{{ button['text'] }}</el-checkbox-button>
    </template>
  </el-checkbox-group>
</template>

<script>
export default {
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

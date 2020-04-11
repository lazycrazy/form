<template>
  <el-radio-group ref="radio" v-model="val" :size="options['size']" :disabled="options['disabled']" :text-color="options['text-color']" :fill="options['fill']" @change="_change">
    <template v-if="options['view'] === 'radio'">
      <el-radio v-for="radio in options['radios']" :key="radio['val']" :label="radio['val']" :disabled="radio['disabled']" :border="options['border']" :name="radio['name']">{{ radio['text'] }}</el-radio>
    </template>

    <template v-else>
      <el-radio-button v-for="button in options['radios']" :key="button['val']" :label="button['val']" :disabled="button['disabled']" :name="button['name']">{{ button['text'] }}</el-radio-button>
    </template>
  </el-radio-group>
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

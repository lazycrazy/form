<template>
  <el-input
    :type="options['type']"
    :maxlength="options['maxlength']"
    :minlength="options['minlength']"
    :placeholder="options['placeholder']"
    :disabled="options['disabled']"
    :size="options['size']"
    :prefix-icon="options['prefix-icon']"
    :suffix-icon="options['suffix-icon']"
    :rows="options['rows']"
    :autosize="options['autosize']"
    :name="options['name']"
    :readonly="options['readonly']"
    :show-word-limit="options['showWordLimit']"
    ref="input"
    :max="options['max']"
    v-model="val"
    :min="options['min']"
    :step="options['step']"
    :resize="options['resize']"
    :autofocus="options['autofocus']"

    :form="options['form']"
    :label="options['label']"
    @blur="_blur"

    @focus="_focus"
    @change="_change"
  >
    <template v-if="options['append']" slot="append">{{ options['append'] }}</template>
    <template v-if="options['suffix']" slot="suffix">{{ options['suffix'] }}</template>
    <template v-if="options['prepend']" slot="prepend">{{ options['prepend'] }}</template>
  </el-input>
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
        if(this.value === undefined) {
          return this.options['value']
        }
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    // 带下划线统一作为内部事件分发，防止外部调用
    _blur(e) {
      this.$emit('blur', e)
    },
    _focus(e) {
      this.$emit('focus', e)
    },
    _change(e) {
      this.$emit('change', e)
    },
    // 没带下划线的作为暴露的外部方法
    focus() {
      this.$refs['input'].focus()
    }
  }
}
</script>


<!-- 1、暂时没集成快捷选项 -->
<template>
  <el-date-picker
    :readonly="options['readonly']"
    :disabled="options['disabled']"
    :editable="options['editable']"
    :clearable="options['clearable']"
    :size="options['size']"
    :placeholder="options['placeholder']"
    :start-placeholder="options['startPlaceholder']"
    :end-placeholder="options['endPlaceholder']"
    :type="options['dateType']"
    :format="options['format']"
    :align="options['align']"
    ref="date"
    :popper-class="options['popperClass']"
    v-model="val"
    :picker-options="options['pickerOptions']"
    :range-separator="options['rangeSeparator']"
    :default-value="options['defaultValue']"
    :value-format="options['valueFormat']"

    :name="options['name']"
    :unlink-panels="options['unlinkPanels']"
    @change="_change"

    @blur="_blur"
    @focus="_focus"
  ></el-date-picker>
</template>

<script>

export default {
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
  }
}
</script>

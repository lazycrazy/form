<template>
  <el-switch
    :disabled="options['disabled']"
    :width="options['width']"
    v-model="val"
    :active-icon-class="options['active-icon-class']"
    :inactive-icon-class="options['inactive-icon-class']"
    :active-text="options['activeText']"
    :inactive-text="options['inactiveText']"
    :active-value="options['activeValue']"
    :inactive-value="options['inactiveValue']"
    :active-color="options['active-color']"
    :inactive-color="options['inactive-color']"

    :name="options['name']"

    @change="_change"
  >
  </el-switch>
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

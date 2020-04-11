<template>
  <div class="block">
    <el-slider
      v-model="val"
      :min="options['min']"
      :max="options['max']"
      :step="options['step']"
      :show-input="options['showInput']"
      :show-input-controls="options['showInputControls']"
      :show-stops="options['showStops']"
    >
    </el-slider>
  </div>
</template>

<script>
export default {
  name: 'FieldSlider',
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
    return {

    }
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

<style scoped>

</style>

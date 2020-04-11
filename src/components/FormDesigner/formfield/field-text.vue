<template>
  <span :style="{color: options['color'], fontSize: options['fontSize']}">{{options['label']}}</span>
</template>
<script>

export default {
  name: 'FieldText',
  props: {
    options: {
      default: Object,
      required: true
    }
  },
  computed: {

  }
}
</script>

<template>
  <div class="widget-config">
    <el-form v-if="this.data && Object.keys(this.data).length > 0" label-suffix="：">
      <el-form-item label="属性值">
        <el-input v-model="data.prop" placeholder="属性值"></el-input>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="data.label" placeholder="标题"></el-input>
      </el-form-item>
      <el-form-item v-if="data.subfield" label="宽度">
        <el-input-number v-model="data.width" controls-position="right" placeholder="宽度" :min="100"></el-input-number>
      </el-form-item>
      <el-form-item v-else label="表单栅格">
        <el-input-number v-model="data.span" controls-position="right" placeholder="表单栅格" :min="8" :max="24"></el-input-number>
      </el-form-item>
      <component :is="getComponent" :data="data"></component>
    </el-form>
  </div>
</template>

<script>
const dateArr = []

export default {
  name: 'WidgetConfig',
  props: ['data'],
  computed: {
    getComponent() {
      const prefix = 'config-'
      const { type } = this.data

      let result = type
      if ([undefined, 'input', 'text', 'textarea', 'password'].includes(type)) {
        result = 'input'
      } else if(type === 'texttag') {
        result = 'text'
      }

      return prefix + result
    }
  },
  methods: {}
}
</script>

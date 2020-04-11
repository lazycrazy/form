<template>
  <div>
    <el-form-item label="占位内容" v-if="data.dateType !== 'daterange' && data.dateType !== 'datetimerange'">
      <el-input v-model="data.placeholder" placeholder="占位内容"></el-input>
    </el-form-item>

    <el-form-item label="开始占位内容" v-if="data.dateType === 'daterange' || data.dateType === 'datetimerange'">
      <el-input v-model="data.startPlaceholder" placeholder="开始占位内容"></el-input>
    </el-form-item>

    <el-form-item label="连接占位内容" v-if="data.dateType === 'daterange' || data.dateType === 'datetimerange'">
      <el-input v-model="data.rangeSeparator" placeholder="连接占位内容"></el-input>
    </el-form-item>

    <el-form-item label="结束占位内容" v-if="data.dateType === 'daterange' || data.dateType === 'datetimerange'">
      <el-input v-model="data.endPlaceholder" placeholder="结束占位内容"></el-input>
    </el-form-item>

    <el-form-item label="是否禁用">
      <el-switch v-model="data.disabled"></el-switch>
    </el-form-item>
    <el-form-item label="是否必填">
      <el-switch v-model="data.required"></el-switch>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'ConfigDate',
  props: ['data'],
  data() {
    return {
      validator: {
        type: null,
        required: null,
        pattern: null,
        length: null
      }
    }
  },
  watch: {
    'data.required': function(val) {
      if (val) this.validator.required = { required: true, message: `${this.data.label}必须填写` }
      else this.validator.required = null

      this.generateRule()
    }
  },
  methods: {
    generateRule() {
      const rules = []
      Object.keys(this.validator).forEach(key => {
        if (this.validator[key]) rules.push(this.validator[key])
      })
      this.data.rules = rules
    }
  }
}
</script>

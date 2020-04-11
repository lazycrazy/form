<template>
  <div>
    <el-form-item label="字体大小">
      <el-select v-model="data.fontSize" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="颜色">
      <el-color-picker v-model="data.color"></el-color-picker>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'ConfigText',
  props: ['data'],
  data() {
    return {
      options: [
        {
          value: '12px',
          label: '12px'
        }, {
          value: '13px',
          label: '13px'
        },{
          value: '14px',
          label: '14px'
        },{
          value: '16px',
          label: '16px'
        },{
          value: '18px',
          label: '18px'
        },{
          value: '20px',
          label: '20px'
        }
      ]
    }
  },
  watch: {
    'data.required': function(val) {
      if (val) this.validator.required = { required: true, message: `${this.data.label}必须填写` }
      else this.validator.required = null

      this.generateRule()
    },
    'data.pattern': function(val) {
      if (val) 
        this.validator.pattern = { pattern: new RegExp(val), message: `${this.data.label}格式不匹配` }
      else this.validator.pattern = null

      // delete this.data.pattern
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

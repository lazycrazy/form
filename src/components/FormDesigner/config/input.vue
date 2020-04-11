<template>
  <div>
    <el-form-item label="占位内容">
      <el-input v-model="data.placeholder" placeholder="占位内容"></el-input>
    </el-form-item>
    <el-form-item label="默认值">
      <el-input v-model="data.value" placeholder="默认值"></el-input>
    </el-form-item>
    <el-form-item v-if="data.type !== 'textarea'" label="前缀">
      <el-input v-model="data.prepend" placeholder="前缀"></el-input>
    </el-form-item>
    <el-form-item v-if="data.type !== 'textarea'" label="后缀">
      <el-input v-model="data.append" placeholder="后缀"></el-input>
    </el-form-item>

    <el-form-item label="最大长度">
      <el-input-number v-model="data.maxlength" controls-position="right" placeholder="最大长度"></el-input-number>
    </el-form-item>
    <el-form-item label="显示计数">
      <el-switch v-model="data.showWordLimit"></el-switch>
    </el-form-item>
    <el-form-item label="是否只读">
      <el-switch v-model="data.readonly"></el-switch>
    </el-form-item>
    <el-form-item label="是否可见">
      <el-switch v-model="data.display"></el-switch>
    </el-form-item>
    <el-form-item label="是否必填">
      <el-switch v-model="data.required"></el-switch>
    </el-form-item>
    <el-form-item v-if="data.type !== 'textarea'" label="校验">
      <el-select v-model.lazy="data.pattern" placeholder="请选择">
        <el-option
          v-for="item in rules"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>

  </div>
</template>

<script>
export default {
  name: 'ConfigInput',
  props: ['data'],
  data() {
    return {
      validator: {
        type: null,
        required: null,
        pattern: null,
        length: null
      },
      rules: [{
          value: '0',
          label: '请选择'
        },{
          value: '^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$',
          label: '邮件',
        }, {
          value: '^[1][3,4,5,7,8,9][0-9]{9}$',
          label: '手机号码',
        }, {
          value: '^[0-9]*$',
          label: '数字',
        }
      ]
    }
  },
  watch: {
    'data.required': function(val) {
      if (val) 
        this.validator.required = { required: true, message: `${this.data.label}必须填写` }
      else 
        this.validator.required = null

      this.generateRule()
    },
    'data.pattern': function(val) {
      if(val.type === undefined) {
        this.validator.pattern = null
      }
      if (val)
        this.validator.pattern = { pattern: val.value, message: `${this.data.label}格式不匹配`, trigger: 'blur' }
      else 
        this.validator.pattern = null

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

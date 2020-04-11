<template>
  <div>
    <el-form-item label="占位内容" v-if="!data.isRange">
      <el-input v-model="data.placeholder" placeholder="占位内容"></el-input>
    </el-form-item>

    <el-form-item label="开始占位内容" v-if="data.isRange">
      <el-input v-model="data.startPlaceholder" placeholder="开始占位内容"></el-input>
    </el-form-item>

    <el-form-item label="连接占位内容" v-if="data.isRange">
      <el-input v-model="data.rangeSeparator" placeholder="连接占位内容"></el-input>
    </el-form-item>

    <el-form-item label="结束占位内容" v-if="data.isRange">
      <el-input v-model="data.endPlaceholder" placeholder="结束占位内容"></el-input>
    </el-form-item>

    <el-form-item label="形式"  v-if="!data.isRange">
      <el-switch
        v-model="data.style"
        active-value="hm"
        inactive-value="hms"
        active-text="时分"
        inactive-text="时分秒">
      </el-switch>
    </el-form-item>

    <el-form-item label="开始时间" v-if="data.style === 'hm'">
      <el-time-select
        v-model="data.start"
        :picker-options="{
          start: '00:00',
          end: ' 23:55',
          step: '00:05'
        }"
        placeholder="开始时间"
      >
      </el-time-select>
    </el-form-item>

    <el-form-item label="结束时间" v-if="data.style === 'hm'">
      <el-time-select
        v-model="data.end"
        :picker-options="{
          start: '00:00',
          end: ' 23:55',
          step: '00:05',
          minTime: data.start
        }"
        placeholder="结束时间"
      >
      </el-time-select>
    </el-form-item>

    <el-form-item label="步长" v-if="data.style === 'hm'">
      <el-select v-model="data.step" placeholder="步长">
        <el-option v-for="item in steps" :key="item.value" :label="item.label" :value="item.value"> </el-option>
      </el-select>
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
  name: 'ConfigTimepicker',
  props: ['data'],
  data() {
    return {
      steps: [
        { label: '00:05', value: '00:05' },
        { label: '00:10', value: '00:10' },
        { label: '00:15', value: '00:15' },
        { label: '00:30', value: '00:30' },
      ],
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

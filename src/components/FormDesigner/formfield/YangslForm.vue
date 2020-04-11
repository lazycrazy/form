<template>
  <el-form
  ref="form" 
  :model="values"
  :rules="computedRules"
  :label-width="data.labelWidth + 'px'"
  :label-position="data.labelPosition || 'left'"
  :size="data.size"
  :label-suffix="data.labelSuffix">
    <template v-for="(item, index) in data.column">
      <template v-if="item.type === 'grid' ||item.type === 'texttag' ">
        <component :is="getComponent(item.type)" :key="index" :ref="item.prop" v-model="values[item.prop]" :options="item" :column="item.column" value=""></component>
      </template>
      <template v-else>
        <el-form-item :key="index" :label="item.label" :prop="item.prop">
          <component :is="getComponent(item.type)" :ref="item.prop" v-model="values[item.prop]" :options="item" value=""></component>
        </el-form-item>
      </template>
    </template>
    <el-form-item>
      <el-button type="primary" @click="submitForm">提交</el-button>
      <el-button  @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'YangslForm',
  props: ['data'],
  data() {
    return {
      values: {}
    }
  },
  mounted() {
  },
  computed: {
// 校检规则
    computedRules () {
      if(this.$props.data.column) {
        return this.$props.data.column.reduce((rules,field) => {
          if(field.rules === undefined) {
            return rules
          }
          let t = {}
          for(let i = 0; i < field.rules.length; i++) {
            if(field.rules[i].pattern != undefined) {
              field.rules[i].pattern = new RegExp(field.rules[i].pattern)
            }
          }

          t[field.prop] = field.rules
          return Object.assign(rules, t);
        }, this.rules || {})
      }
    },
  },
  methods: {
    getComponent(type) {
      if(['text', 'textarea'].includes(type)) {
        type = 'input'
      } else if(type === 'texttag') {
        type = 'text'
      }
      return 'field-' + type
    },
    // 验证表单
    validateForm () {
      return new Promise((resolve, reject) => {
        if (this.computedRules) {
          // 当传递了验证规则
          this.$refs['form'].validate((valid, invalidFields) => {
            if (valid) {
              // 验证通过
              resolve()
            } else {
              // 显示错误
              reject(invalidFields)
            }
          })
        } else {
          resolve()
        }
      })
    },

    async submitForm() {
      try {
        await this.validateForm()
        this.$emit('submit', this.values)
      } catch(error) {
        return
      }

    },
    resetForm() {
      console.log(this.computedRules)
    }
  }
}
</script>

<style scoped>
</style>

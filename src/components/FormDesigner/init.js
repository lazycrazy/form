import Vue from 'vue'
import Formfields from './formfield'
import Config from './config'
import FormDesign from './index.vue'
import fields from './fieldsConfig.js'

const getConfigByType = type => {
  return new Promise((resolve, reject) => {
    fields.forEach(field => {
      field.list.forEach(config => {
        if (config.type === type) resolve(config)
      })
    })
    reject()
  })
}

const clone = obj => {
  var o
  // 如果  他是对象object的话  , 因为null,object,array  也是'object';
  if (typeof obj === 'object') {
    // 如果  他是空的话
    if (obj === null) {
      o = null
    } else {
      // 如果  他是数组arr的话
      if (obj instanceof Array) {
        o = []
        for (var i = 0, len = obj.length; i < len; i++) {
          o.push(clone(obj[i]))
        }
      } else {
        o = {}
        for (var j in obj) {
          o[j] = clone(obj[j])
        }
      }
    }
  } else {
    o = obj
  }
  return o
}

Vue.prototype.fields = fields
Vue.prototype.deepClone = clone
Vue.prototype.getConfigByType = getConfigByType
Vue.use(Formfields)
Vue.use(Config)
Vue.component(FormDesign.name, FormDesign)

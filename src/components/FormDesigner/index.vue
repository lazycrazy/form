<template>
  <div class="form-designer">
    <el-container>
      <!-- 左侧字段 -->
      <el-aside width="270px" style="background-color: #fff;">
        <div class="fields-list">
          <div v-for="(field, index) in fields" :key="index">
            <div v-if="!field.disabled">
              <div class="field-title">{{ field.title }}</div>
              <draggable tag="ul" :list="field.list" :group="{ name: 'form', pull: 'clone', put: false }" ghost-class="ghost" :sort="false">
                <li v-for="(item, ind) in field.list" :key="ind" class="field-label">
                  <a>
                    <i class="icon iconfont" :class="item.icon"></i>
                    <span>{{ item.label }}</span>
                  </a>
                </li>
              </draggable>
            </div>
            <div v-else>
              <div class="field-title">
                {{ field.title }}
                <span class="danger">（开发中）</span>
              </div>
              <ul>
                <li v-for="(item, ind) in field.list" :key="ind" class="field-label-disabled">
                  <a>
                    <i class="icon iconfont" :class="item.icon"></i>
                    <span>{{ item.label }}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </el-aside>
      <!-- 中间主布局 -->
      <el-container class="widget-container" direction="vertical">
        <el-header class="widget-container-header">
          <el-button class="danger" type="text" size="medium" icon="el-icon-delete" @click="handleClear">清空</el-button>
          <el-button type="text" size="medium" icon="el-icon-view" @click="handlePreview">预览</el-button>
          <el-button type="text" size="medium" icon="el-icon-download" @click="getData">保存</el-button>
        </el-header>
        <el-main :style="{ background: widgetForm.column.length === 0 ? `url(${widgetEmpty}) no-repeat 50%` : '' }">
          <widget-form ref="widgetForm" :data="widgetForm" :select.sync="widgetFormSelect"></widget-form>
        </el-main>
      </el-container>
      <!-- 右侧配置 -->
      <el-aside class="widget-config-container" width="300px"  style="background-color: #fff;">
        <el-tabs v-model="configTab" stretch>
          <el-tab-pane label="字段属性" name="widget" style="padding: 0 10px;">
            <widget-config :data="widgetFormSelect"></widget-config>
          </el-tab-pane>
          <el-tab-pane label="表单属性" name="form" lazy style="padding: 0 10px;">
            <form-config :data="widgetForm"></form-config>
          </el-tab-pane>
        </el-tabs>
      </el-aside>
      <!-- 弹窗 -->

      <!-- 预览 -->
      <el-drawer title="预览" :visible.sync="previewVisible" size="50%" :before-close="handleBeforeClose">
        <YangslForm v-if="previewVisible" ref="form" v-model="widgetModels" class="preview-form" :data="widgetForm"></YangslForm>

        <div class="drawer-foot">
          <el-button size="medium" type="primary" @click="handlePreviewSubmit">确定</el-button>
          <el-button size="medium" type="danger" @click="handleBeforeClose">取消</el-button>
        </div>
      </el-drawer>
    </el-container>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import fields from './fieldsConfig.js'
import WidgetForm from './WidgetForm'
import FormConfig from './FormConfig'
import WidgetConfig from './WidgetConfig'
import widgetEmpty from './assets/widget-empty.png'
import YangslForm from './formfield/YangslForm'

export default {
  name: 'MyForm',
  components: { Draggable, WidgetForm, FormConfig, WidgetConfig, YangslForm },

  props: {
    options: {
      type: Object,
      default: () => {
        return {
          column: []
        }
      }
    },
    storage: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      widgetEmpty: widgetEmpty,
      fields,
      widgetForm: {
        column: [],
        labelPosition: 'left',
        labelWidth: 120,
        gutter: 0,
        menuBtn: false,
        submitBtn: false,
        submitSize: 'medium',
        submitText: '提交',
        emptyBtn: false,
        emptySize: 'medium',
        emptyText: '清空',
        menuPosition: 'center'
      },
      widgetFormPreview: {},
      configTab: 'widget',
      widgetFormSelect: {},
      previewVisible: false,
      importJson: undefined,
      widgetModels: {},
      configOption: {}
    }
  },
  computed: {
  },
  watch: {
    options: {
      handler(val) {
        this.handleLoadData()
      },
    }
  },
  mounted() {
    this.handleLoadCss()
    this.handleLoadData()
  },
  methods: {
    handleLoadData() {
      this.setJSON({ ...this.widgetForm, ...this.options })
    },

    handleLoadCss() {
      // 字体图标
      const url = '//at.alicdn.com/t/font_1508161_li7hpbwun7.css'
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = url
      window.document.head.appendChild(link)
    },

    loadJson() {
      try {
        this.setJSON(this.importJson)
      } catch (e) {
        this.$message.error(e.message)
      }
    },

    handlePreview() {
      if (!this.widgetForm.column || this.widgetForm.column.length === 0) {
        this.$message.error('没有需要展示的内容')
      } else {
        this.previewVisible = true
      }
    },

    getData() {
      this.transformToAvueOptions().then(data => {
        this.$emit('get-data', data)
      })
    },

    handleGenerate() {
      this.transformToAvueOptions().then(data => {
        this.$emit('submit', data)
      })
    },

    handleClear() {
      if (this.widgetForm && this.widgetForm.column && this.widgetForm.column.length > 0) {
        this.$confirm('确定要清空吗？', '警告', {
          type: 'warning'
        })
          .then(() => {
            this.widgetForm = { column: [] }
            this.widgetFormSelect = {}
          })
          .catch(() => {})
      } else {
        this.$message.error('没有需要清空的内容')
      }
    },

    handlePreviewSubmit() {
      this.$refs.form.submitForm()
    },
    handleBeforeClose() {
      this.$refs.form.resetForm()
      this.previewVisible = false
    },
    handleCopy() {
      this.$Clipboard({
        text: JSON.stringify(this.widgetForm, null, 2)
      })
        .then(() => {
          this.$message.success('复制成功')
        })
        .catch(() => {
          this.$message.error('复制失败')
        })
    },

    transformToAvueOptions() {
      return new Promise((resolve, reject) => {
        try {
          const data = this.deepClone(this.widgetForm)
 
          data.column.forEach(col => {
            if (col.type === 'grid' && col.children && col.children.column && col.children.column.length > 0) {
              const c = col.children.column
              c.forEach(item => {
                delete item.subfield
              })
            }
          })
          resolve(data)
        } catch (e) {
          reject(e)
        }
      })
    },

    setJSON(json) {
      this.widgetForm = json
      if (json.column && json.column.length > 0) {
        this.widgetFormSelect = json.column[0]

        json.column.forEach(col => {
          if (col.type === 'grid' && col.children && col.children.column && col.children.column.length > 0) {
            const c = col.children.column
            c.forEach(item => {
              item.subfield = true
            })
          }
        })
      }
    }
  }
}
</script>

<style lang="scss">
@import './styles/index.scss';

.drawer-foot {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  display: flex;

  button {
    width: 50%;
  }
}

.preview-form {
  overflow-y: scroll;
  height: 83vh;
  padding: 0 10px;
}

.widget-config-container {
  .avue-group__item {
    padding: 0;
  }
}
.fields-list {
  text-align: left;
}
</style>
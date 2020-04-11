<template>
  <div class="widget-form-container">
    <el-form ref="widgetForm" :label-position="data.labelPosition || 'left'" :label-width="data.labelWidth ? `${data.labelWidth}px` : '100px'" :label-suffix="data.labelSuffix" :model="form">
      <el-row>
        <draggable class="widget-form-list" :list="data.column" :group="{ name: 'form' }" ghost-class="ghost" :animation="300" @add="handleWidgetAdd">
          <template v-for="(column, index) in data.column">
            <el-col :span="24" v-if="column.type === 'grid'" :key="index" class="widget-form-table" :class="{ active: selectWidget.prop === column.prop }" @click.native="handleSelectWidget(index)">
              <draggable class="widget-form-table__content" :list="column.children.column" :group="{ name: 'form' }" ghost-class="ghost" :animation="200" handle=".widget-form-table__item" @add="handleWidgetTableAdd($event, column)">
                <el-row v-if="column.children.column.length > 0" style="width: 100%;">
                  <el-col :span="24 / column.column" v-for="(item, tableIndex) in column.children.column" :key="tableIndex" class="row-col" :class="{ active: selectWidget.prop === item.prop, required: item.required }" @click.native.stop="handleWidgetTableSelect(item)">
                    <el-table :data="[item]" border>
                      <el-table-column :prop="item.prop" :label="item.label" :align="column.children.align" :header-align="column.children.headerAlign">
                        <component :is="getComponent(item.type, item.component)" :options="item" value=""></component>
                        <el-button v-if="selectWidget.prop === item.prop" title="删除" class="widget-table-action-delete" circle plain type="danger" @click.stop="handleWidgetTableDelete(column, tableIndex)">
                          <i class="iconfont icon-shanchu1"></i>
                        </el-button>
                        <el-button v-if="selectWidget.prop === item.prop" title="复制" class="widget-table-action-clone" circle plain type="primary" @click.stop="handleWidgetTableClone(column, item)">
                          <i class="iconfont icon-fuzhi"></i>
                        </el-button>
                      </el-table-column>
                    </el-table>
                  </el-col>
                </el-row>

                <template v-else>
                  <div class="avue-empty" style="width: 100%;text-align:center;">
                    <div class="avue-empty__image" style="height: 50px;">
                      <i class="iconfont icon-kong" style="font-size: 50px;color:#999;"></i>
                    </div>
                    <p class="avue-empty__desc">拖拽字段至此</p>
                  </div>
                </template>
              </draggable>
              <el-button v-if="selectWidget.prop === column.prop" title="删除" class="widget-action-delete" circle plain type="danger" @click.stop="handleWidgetDelete(index)">
                <i class="iconfont icon-shanchu1"></i>
              </el-button>
              <el-button v-if="selectWidget.prop === column.prop" title="清空" class="widget-action-clear" circle plain type="warning" @click.stop="handleWidgetClear(index)">
                <i class="iconfont icon-qingchu"></i>
              </el-button>
              <el-button v-if="selectWidget.prop === column.prop" title="复制" class="widget-action-clone" circle plain type="primary" @click.stop="handleWidgetCloneTable(index)">
                <i class="iconfont icon-fuzhi"></i>
              </el-button>
            </el-col>
            <el-col v-else-if="column.type === 'texttag'" :key="index" :md="column.span || 12" :xs="24" :offset="column.offset || 0">
              <div class="widget-form-item" :class="{ active: selectWidget.prop === column.prop, required: column.required }" @click.native="handleSelectWidget(index)">
                <component :is="getComponent(column.type, column.component)" :options="column"></component>
                <el-button v-if="selectWidget.prop === column.prop" title="删除" class="widget-action-delete" circle plain type="danger" @click.stop="handleWidgetDelete(index)">
                  <i class="iconfont icon-shanchu1"></i>
                </el-button>
                <el-button v-if="selectWidget.prop === column.prop" title="复制" class="widget-action-clone" circle plain type="primary" @click.stop="handleWidgetClone(index)">
                  <i class="iconfont icon-fuzhi"></i>
                </el-button>
              </div>
            </el-col>
            <el-col v-else-if="column.type === 'table'" :key="index">
              <div class="table"  @click.native="handleSelectWidget(index)">
              <Table :options="column"></Table>
              <el-button v-if="selectWidget.prop === column.prop" title="删除" class="widget-action-delete" circle plain type="danger" @click.stop="handleWidgetDelete(index)">
                <i class="iconfont icon-shanchu1"></i>
              </el-button>
              </div>
            </el-col>
            <el-col v-else :key="index" :md="column.span || 12" :xs="24" :offset="column.offset || 0">
              <el-form-item class="widget-form-item" :label="column.label" :prop="column.prop" :class="{ active: selectWidget.prop === column.prop, required: column.required }" @click.native="handleSelectWidget(index)">
                <component :is="getComponent(column.type, column.component)" :options="column" value=""></component>
                <el-button v-if="selectWidget.prop === column.prop" title="删除" class="widget-action-delete" circle plain type="danger" @click.stop="handleWidgetDelete(index)">
                  <i class="iconfont icon-shanchu1"></i>
                </el-button>
                <el-button v-if="selectWidget.prop === column.prop" title="复制" class="widget-action-clone" circle plain type="primary" @click.stop="handleWidgetClone(index)">
                  <i class="iconfont icon-fuzhi"></i>
                </el-button>
              </el-form-item>
            </el-col>
          </template>
        </draggable>
      </el-row>
    </el-form>
  </div>
</template>
<style>
.widget-form-item {
  text-align: left;
}
.row-col {
  padding-right: 10px;
}
.table .widget-action-delete{
     position: absolute;
    right: 10px;
    bottom: -32px;
    z-index: 1002;
}

</style>
<script>
import Draggable from 'vuedraggable'
import Table from '../Table'

export default {
  name: 'WidgetForm',
  components: { Draggable, Table },
  props: ['data', 'select'],
  data() {
    return {
      selectWidget: this.select,
      form: {}
    }
  },
  watch: {
    select(val) {
      this.selectWidget = val
    },
    selectWidget: {
      handler(val) {
        this.$emit('update:select', val)
      },
      deep: true
    }
  },
  methods: {
    getComponent(type, component) {
      const KEY_COMPONENT_NAME = 'field-'
      if (component != null) {
        return component
      }
      let result = type
      if (['text', 'textarea'].includes(type)) {
        result = 'input'
      } else if (type === 'texttag') {
        result = 'text'
      }
      return KEY_COMPONENT_NAME + result
    },
    getPlaceholder(column) {
      const label = column.label
      if (['select', 'checkbox', 'radio', 'tree', 'color', 'date', 'time'].includes(column.type)) {
        return `请选择${label}`
      } else {
        return `请输入${label}`
      }
    },
    handleSelectWidget(index) {
      this.selectWidget = this.data.column[index]
    },
    handleWidgetAdd(evt) {
      const newIndex = evt.newIndex
      const data = this.deepClone(this.data.column[newIndex])
      if (!data.prop) {
        data.prop = Date.now() + '_' + Math.ceil(Math.random() * 99999)
      }
      delete data.icon
      delete data.subfield
      this.$set(this.data.column, newIndex, { ...data })

      this.handleSelectWidget(newIndex)
    },
    handleWidgetClear(index) {
      this.data.column[index].children.column = []
      this.selectWidget = this.data.column[index]
    },
    handleWidgetDelete(index) {
      if (this.data.column.length - 1 === index) {
        if (index === 0) this.selectWidget = {}
        else this.handleSelectWidget(index - 1)
      } else this.handleSelectWidget(index + 1)

      this.$nextTick(() => {
        this.data.column.splice(index, 1)
      })
    },
    handleWidgetClone(index) {
      const cloneData = this.deepClone(this.data.column[index])
      cloneData.prop = Date.now() + '_' + Math.ceil(Math.random() * 99999)
      this.data.column.splice(index, 0, cloneData)
      this.$nextTick(() => {
        this.handleSelectWidget(index + 1)
      })
    },
    handleWidgetCloneTable(index) {
      const cloneData = this.deepClone(this.data.column[index])
      cloneData.prop = Date.now() + '_' + Math.ceil(Math.random() * 99999)
      cloneData.children.column.forEach(t => {
        t.prop = Date.now() + '_' + Math.ceil(Math.random() * 99999)
      })
      this.data.column.splice(index, 0, cloneData)
      this.$nextTick(() => {
        this.handleSelectWidget(index + 1)
      })
    },
    handleWidgetTableAdd(evt, column) {
      console.log(evt)
      let newIndex = evt.newIndex
      const item = evt.item

      if (newIndex === 1 && newIndex > column.children.column.length - 1) {
        newIndex = 0
      }
      if (['子表单', '富文本', '坐标拾取器'].includes(item.textContent)) {
        column.children.column.splice(newIndex, 1)
        return
      }

      const data = this.deepClone(column.children.column[newIndex])
      if (!data.prop) data.prop = Date.now() + '_' + Math.ceil(Math.random() * 99999)
      data.subfield = true
      delete data.icon
      this.$set(column.children.column, newIndex, { ...data })
      this.selectWidget = column.children.column[newIndex]
    },
    handleWidgetTableSelect(data) {
      this.selectWidget = data
    },
    handleWidgetTableClone(column, item) {
      const data = this.deepClone(item)
      data.prop = Date.now() + '_' + Math.ceil(Math.random() * 99999)
      this.$set(column.children.column, column.children.column.length, { ...data })
      this.$nextTick(() => {
        this.selectWidget = column.children.column[column.children.column.length - 1]
      })
    },
    handleWidgetTableDelete(column, index) {
      if (column.children.column.length - 1 === index) {
        if (index === 0) this.selectWidget = column
        else this.selectWidget = column.children.column[index - 1]
      } else this.selectWidget = column.children.column[index + 1]
      this.$nextTick(() => {
        column.children.column.splice(index, 1)
      })
    }
  }
}
</script>

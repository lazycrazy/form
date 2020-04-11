<template>
   <el-row>
      <el-col :span="24/options.column" v-for="(item, tableIndex) in options.children.column" class="row-col" :key="tableIndex">
  
        <el-table :data="[item]" border>
          <el-table-column :prop="item.prop" :label="item.label" :align="options.children.align" :header-align="options.children.headerAlign">
            <component :is="getComponent(item.type, item.component)" :options="item" value=""></component>
          </el-table-column>
        </el-table>
      </el-col>
   </el-row>
</template>

<script>
export default {
  name: 'FieldGrid',
  props: {
    options: {
      default: Object,
      required: true
    },
    column: {
      default: 3
    },
    value: {
      required: true
    }
  },
  data() {
    return {
      tableData: []
    }
  },
  mounted() {
    window.console.log(this.options)
  },
  methods: {
    getComponent(type) {
      if (['text', 'textarea'].includes(type)) {
        type = 'input'
      }
      return 'field-' + type
    }
  }
}
</script>

<style scoped>
.widget-form-table .item-title {
  border-bottom: 1px solid #cccccc;
  text-align: center;
  color: #999;
}
</style>

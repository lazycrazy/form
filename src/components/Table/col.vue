<template>
  <el-col :span="col.span" class="grid-content" :class="{ 'right-border': col.showRightBorder, 'selected': col.selected }" @click.native="select" @mousedown.native="beginSelect" @mouseup.native="endSelect"  @mousemove.native="moveSelect">
    <draggable :list="widgets" :group="{ name: 'widgets' }" ghost-class="ghost" :animation="300" @add="handleWidgetAdd">
      <el-tag v-for="(widget, index) in widgets" :key="index">标签一</el-tag>
    </draggable>

  </el-col>
</template>
<script>
import Draggable from 'vuedraggable'

export default {
  name: 'Col',
  components: { Draggable },
  props: {
    col: {
      type: Object,
      default: () => {
        return {}
      }
    },
    widgets: {
      type: Array,
      default: () => {
        return []
      }
    },
  },
  data() {
    return {
      selected: false
    }
  },
  methods: {
    handleWidgetAdd(evt) {
      console.log(evt)
      const newIndex = evt.newIndex
      const data = this.deepClone(this.widgets[newIndex])
      if (!data.prop) data.prop = Date.now() + '_' + Math.ceil(Math.random() * 99999)
      this.widgets[newIndex] = { ...data }
      //      this.$set(this.form, newIndex, { ...data })
      console.log(this.widgets)
    },
    select() {
      this.col.selected = !this.col.selected
      this.$emit('select', this.col)
    },
    beginSelect() {
      this.$emit('begin-select', this.col)
    },
    endSelect() {
      this.$emit('end-select', this.col)
    },
    moveSelect() {
      this.$emit('move-select', this.col)
    },
  
  }
}
</script>
<style scoped>
.grid-content {
  min-height: 65px;
  border-bottom: 1px solid #eee;
}

.right-border {
  border-right: 1px solid #eee;
}
.selected{box-shadow: 0 2px 12px 0 #5184a0}
.widget-form-list{min-height: 65px;}
</style>

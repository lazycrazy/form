<template>
  <el-row>
    <Column v-for="(col, index) in row.cols" :col="col" :key="index" @select="select" @begin-select="beginSelect" @end-select="endSelect" @move-select="moveSelect">
    </Column>
  </el-row>
</template>
<script>
import Column from './col'

export default {
  name: 'Row',
  components: { Column },
  props: {
    row: {
      type: Object,
      default: () => {
        return {}
      }
    },
    propIndex: 0
  },
  data() {
    return {
      selectedCols: [],
      beginNode: {},
      beginMoveSelect: false
    }
  },
  methods: {
    select(col) {
      if (col.selected) {
        this.selectedCols.push(col)
      } else {
        for (let i = 0; i < this.selectedCols.length; i++) {
          if (this.selectedCols[i].field === col.field) {
            this.selectedCols.splice(i, 1)
            break
          }
        }
      }
    },
    beginSelect(col) {
      this.$emit('begin-select', this.row, this.propIndex)
      this.beginNode = col
      this.beginMoveSelect = true
    },
    endSelect(col) {
      this.$emit('end-select', this.row)
      this.beginMoveSelect = false
      if(this.beginNode.field === undefined) {
        return
      }
      this.beginNode = {}
    },
    moveSelect(col) {
      this.$emit('move-select', this.row)
      if(!this.beginMoveSelect) {
        return
      }
      if(col.selected) {
        return
      }
      col.selected = true
      this.selectedCols.push(col)
      
    },
    merage() {
      if (this.selectedCols.length < 2) {
        return
      }
      this.selectedCols.sort(function(a, b) {
        return a.field[1] - b.field[1]
      })

      // 查找连续的col
      let merageCols = []
      let index = 0
      let step = 0
      let tmp = []
      for (let i = 0; i < this.row.cols.length; i++) {
        let col = this.row.cols[i]
        for (let j = index; j < this.selectedCols.length; j++) {
          if (col.field[1] === this.selectedCols[j].field[1]) {
            index++
            tmp.push(this.selectedCols[j])
            step = 0
            break
          }
          step++
        }
        if (step >= 1 && tmp.length > 0) {
          // 不再连续
          if (tmp.length > 1) {
            // 已经有两个以上存下来,否则丢弃
            merageCols.push(tmp)
          }
          tmp = []
        }
        if (index === this.selectedCols.length) {
          if (tmp.length > 1) {
            merageCols.push(tmp)
            tmp = []
          }
          // 全部找到
          break
        }
      }

      //合并连续的col
      let needDetete = []
      for (let i = 0; i < merageCols.length; i++) {
        let totalSpan = 0
        let showRightBorder = false
        for (let j = 0; j < merageCols[i].length; j++) {
          totalSpan += merageCols[i][j].span
          if (j > 0) {
            needDetete.push(merageCols[i][j].field)
          }
          if(j === merageCols[i].length - 1) {
            showRightBorder = merageCols[i][j].showRightBorder
          }
        }
        merageCols[i][0].span = totalSpan
        merageCols[i][0].showRightBorder = showRightBorder
        merageCols[i][0].selected = false
      }

      for (let i = 0; i < this.row.cols.length; i++) {
        let ind = 0
        for (let j = ind; j < needDetete.length; j++) {
          if (this.row.cols[i].field === needDetete[j]) {
            this.row.cols.splice(i, 1)
            ind++
          }
        }
      }
      this.selectedCols = []
    }
  }
}
</script>
<style scoped></style>

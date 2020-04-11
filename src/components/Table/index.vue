<template>
    <div class="A4">
      <Row v-for="(row, index) in table.rows" :key="index" :row="row" :propIndex="index" ref="row" @begin-select="beginSelect" @end-select="endSelect" @move-select="moveSelect"></Row>
    </div>
</template>

<script>
import Draggable from 'vuedraggable'
import Row from './row'
export default {
  name: 'Table',
  components: { Draggable, Row },
  data() {
    return {
      column: 4,
      table: {
        maxRowIndex: 0,
        rows: [
          {
            field: [100],
            cols: [
              {
                span: 24,
                field: [100, 0],
                selected: false,
                showRightBorder: false
              }
            ]
          }
        ]
      },
      startMoveSelectRow: null,
      propIndex: 0
    }
  },

  methods: {
    beginSelect(row, propIndex) {
      //propIndex?
      if(this.startMoveSelectRow === null) {
        this.startMoveSelectRow = row
        this.propIndex = propIndex
      }
    },
    endSelect(row) {
      this.startMoveSelectRow = null
    },
    moveSelect(row) {
      if(this.startMoveSelectRow === null) {
        return
      }
      if(this.startMoveSelectRow.field[0] !== row.field[0]) {
        this.$refs.row[this.propIndex].beginMoveSelect = false
        this.startMoveSelectRow = null
      }

    }
  }
}
</script>
<style>
.A4 {
  width: 756px;
  margin: 10px auto;
  min-height: 978px;
  border: 1px solid #eee;
}

.panel {
  padding: 10px;
  position: absolute;
  right: 0;
  top: 0;
}

</style>

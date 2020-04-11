<template>
  <div>
      <el-input-number v-model="column" :min="1" :max="8" label="列"></el-input-number>
      <el-button @click="add">add</el-button>
      <el-button @click="merage">merage</el-button>
  </div>
</template>

<script>
export default {
  name: 'ConfigTable',
  props: ['options'],
  data(){
    return {
      column: 4,
    }
  },
  methods: {
    add() {
      let cols = []
      for (let i = 10; i < 34; i++) {
        cols.push({
          span: 1,
          field: [this.table.maxRowIndex,i],
          selected: false,
          showRightBorder: i < 33 ? true : false
        })
      }
      let row = {
        field: [this.table.maxRowIndex++],
        cols: cols
      }
      this.table.rows.push(row)
    },
    
    merage() {
      for(let i = 0; i< this.$refs.row.length; i++) {
        this.$refs.row[i].merage()
      }
    }
  },
  mounted() {
    console.log(this.options)
  }
}
</script>

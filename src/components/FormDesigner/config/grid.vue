<template>
  <div>
    <el-form-item label="几列">
      <el-input-number v-model="data.column" :min="2" :max="4" label="几列"></el-input-number>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'ConfigGrid',
  props: ['data']
}
</script>

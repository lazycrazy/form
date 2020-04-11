<template>
  <div>
    <el-form-item label="默认值">
      <el-input v-model="data.defaultValue" placeholder="默认值"></el-input>
    </el-form-item>
    <el-form-item label="设置">
      <div class="dic">
        <el-input v-model="data.activeText" size="mini" placeholder="开启时文字" style="margin-right: 5px"></el-input>
        <el-input v-model="data.activeValue" size="mini" placeholder="开启时值"></el-input>
      </div>
      <div class="dic">
        <el-input v-model="data.inactiveText" size="mini" placeholder="关闭时文字" style="margin-right: 5px"></el-input>
        <el-input v-model="data.inactiveValue" size="mini" placeholder="关闭时值"></el-input>
      </div>
    </el-form-item>
    <el-form-item label="是否禁用">
      <el-switch v-model="data.disabled"></el-switch>
    </el-form-item>
    <el-form-item label="是否可见">
      <el-switch v-model="data.display"></el-switch>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'ConfigSwitch',
  props: ['data'],
  methods: {}
}
</script>
<style lang="scss" scoped>
.dic {
  width: 100%;
  display: flex;
  margin-bottom: 5px;
}
</style>

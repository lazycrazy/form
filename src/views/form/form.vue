<template>
  <MyForm :options="options" storage @submit="handleSubmit" @get-data="getData"></MyForm>
</template>

<script>
import { getInfo } from '@/api/form'
export default {
  data() {
    return {
      options: {},
      formData: {}
    }
  },
  mounted() {
    let id = this.$route.params.id
    this.getInfo()
  },

  methods: {
    handleSubmit(val) {
      window.console.log(val)
    },
    async getInfo() {
      let _this = this
      const result = getInfo().then(function(result) {
        _this.options = result.data.info
        _this.formData = result.data
      })
    },
    async getData(data) {
      console.log(data)
    }
  }
}
</script>

<style scoped></style>

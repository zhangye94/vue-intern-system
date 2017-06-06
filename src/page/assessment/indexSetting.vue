<template>
  <div id="index-setting-model">
      <el-tabs v-model="activeName">
        <el-tab-pane label="校内教师评价指标" name="first">

        </el-tab-pane>
        <el-tab-pane label="校外教师评价指标" name="second">

        </el-tab-pane>
        <el-tab-pane label="学生评价指标" name="third">

        </el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
  export default {
    components: {
    },
    created: function () {
      this.$store.state.adminleftnavnum="/assessment/indexSetting";
    },
    data () {
      return {
        root: localStorage.root,
        activeName: 'first'
      }
    },
    methods: {

    }
  }
</script>

<style lang="less">

</style>

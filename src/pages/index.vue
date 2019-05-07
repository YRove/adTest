<template>
  <div id="fronthome">
    <header></header>
    <router-view></router-view>
  </div>
</template>

<script>
  import header  from '@/components/header'
export default {
  components:{
    header
  }
}
</script>

<style rel="stylesheet/scss" scoped="scoped" lang="scss">

</style>

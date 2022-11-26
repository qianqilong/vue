<template>
 <div>
   <!-- 登陆模块 -->
   <!-- 一级路由缓存页面 -->
   <keep-alive exclude="SearchResult,Search,ArticleDeatil,UserEdit,Login">
      <router-view></router-view>
   </keep-alive>
  
 </div>
</template>

<script>
// import { getAllChannelsAPI } from './api'
export default {
  name: 'App'
  // async created () {
  //   try {
  //     const res = await getAllChannelsAPI()
  //     console.log(res)
  //   } catch (err) {
  //     console.dir(err)
  //   }
  // }
}
</script>

<style lang="less">

</style>

<template>
  <div>
    <!-- 使用全局的三级联动 -->
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from './ListContainer'
import Recommend from './Recommend'
import Rank from './Rank'
import Like from './Like'
import Brand from './Brand'
import Floor from './Floor'
export default {
name:'Home',
components:{
  ListContainer,
  Recommend,
  Rank,Like,Brand,Floor
},
mounted(){
  // 获取用户的信息在首页展示
    this.$store.dispatch('getUserInfo')
}
}
</script>

<style>

</style>
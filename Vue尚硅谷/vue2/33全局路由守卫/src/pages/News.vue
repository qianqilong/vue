<template>
   <ul>
        <li>news001 <input type="text"></li>
        <li>news002 <input type="text"></li>
        <li>news003 <input type="text"></li>
      </ul>
   
</template>

<script>
export default {
name:'News',
// keep-alive的生命周期
  //激活触发
  activated() {
    console.log('News组件被激活了');
  },
  //缓存触发
  deactivated() {
    console.log('News组件被缓存了');
  },
}
</script>

<style>

</style>
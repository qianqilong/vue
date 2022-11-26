<template>
  <h2>我是About的内容</h2>
  
</template>

<script>
export default {
  name: 'About',
  // 路由内守卫，通过路由规则进入该组件前被调用
  beforeRouteEnter (to, from, next) {
    // ...
    console.log('进入about组件');
  next();
  },
  // 路由内守卫，通过路由规则离开该组件前被调用
  beforeRouteLeave (to, from, next) {
    // ...
    console.log('离开about组件');
    next();
  }
}
</script>

<style>
</style>
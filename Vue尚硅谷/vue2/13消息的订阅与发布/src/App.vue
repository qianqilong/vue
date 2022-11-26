
<template>
  <div>
    <h1 v-text="msg" ref="title"></h1>
    <School></School>
     <Stu></Stu>
  </div>
</template>

<script>
// yarn add pubsub-js
// 用第三方的库来完成消息订阅与发布
// 引入组件
import School from './components/School.vue'
import Stu from './components/stu.vue'
export default {
name:'App',
components:{
  School,
  Stu,
},
data() {
  return {
    msg:'欢迎您~'
  }
},
}
</script>

<style>

</style>
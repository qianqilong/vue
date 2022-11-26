<template>
  <div>
    <h1 v-text="msg" ref="title"></h1>
    <School></School>
     <Stu></Stu>
  </div>
</template>

<script>
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
<template>
  <div>
    <School></School>
    <stu></stu>
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
  Stu
}
}
</script>

<style>

</style>
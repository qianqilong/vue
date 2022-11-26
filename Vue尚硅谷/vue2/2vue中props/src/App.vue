<template>
  <div>
    <!-- 用v-bind来指定是数字 -->
    <School address="龙子湖区" :age="5"></School>
    <School address="凤阳校区" ></School>
  </div>
</template>

<script>
// 引入组件
import School from './components/School.vue'
export default {
name:'App',
components:{
  School
}
}
</script>

<style>

</style>
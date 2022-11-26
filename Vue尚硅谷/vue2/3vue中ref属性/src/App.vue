<template>
  <div>
    <h1 v-text="msg" ref="title"></h1>
    <button @click="showDOM">输出</button>
    <School></School>
  </div>
</template>

<script>
// 引入组件
import School from './components/School.vue'
export default {
name:'App',
components:{
  School
},
data() {
  return {
    msg:'欢迎您~'
  }
},
methods: {
  showDOM(){
    console.log(this.$refs.title); 
  }
},
}
</script>

<style>

</style>
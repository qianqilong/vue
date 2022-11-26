<template>
 <h1>一个人的信息</h1>
 <h2>姓名：{{name}}</h2>
 <h2>年龄：{{age}}</h2>
 <h2>性别：{{sex}}</h2>
 <button @click="say">介绍</button>
</template>

<script>
import {h} from 'vue';
export default {
  name: 'App',
  setup() {
    // 数据
    let name='张三';
    let age=18;
    //方法
    function say(){
      alert(`我叫${name},现在${age}岁`)
    }
    return {
      name,
      age,
      say
    }
    // 返回渲染函数
    // return ()=>
    // h('h1','你好')
  }, 
  
  data() {
    return {
      sex:'男'
    }
  },

}
</script>

<style>

</style>

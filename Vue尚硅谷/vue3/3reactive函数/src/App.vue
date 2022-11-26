<template>
 <h1>一个人的信息</h1>
 <h2>姓名：{{name}}</h2>
 <h2>年龄：{{age}}</h2>
 <h3>工作：{{job.type}}</h3>
 <h3>薪水：{{job.salary}}</h3>
 <h3>爱好：{{hobby}}</h3>
 <button @click="changeInfo">修改</button>
</template>

<script>
// 为了页面有响应
import {ref,reactive} from 'vue'
export default {
  name: 'App',
  setup() {
    /*
    基本类型要使用ref进行包裹，不要用reactive函数，ref包裹了对象，实际上求助了reactive函数
    reactive是包裹复杂类型的数据,修改时不需要加.value,直接.属性名修改Proxy的对象
*/
    // 数据
     let name=ref('张三');
     let age=ref(18);
     let job=reactive({
       type:'前端',
       salary:'30k'
     })
     let hobby=reactive(['抽烟','喝酒','烫头'])
    //方法
  function changeInfo(){
  name.value='ls'
  age.value=20
  // job.value.type='后端'
  // job.value.salary='12k'
  job.type='后端'
  job.salary='12k'
  // 修改数组类型
  hobby[0]='学习'//vue2中不可以这样写
  }
    return {
      name,
      age,
      job,
    changeInfo,
    hobby
    }
  }, 
}
</script>

<style>

</style>

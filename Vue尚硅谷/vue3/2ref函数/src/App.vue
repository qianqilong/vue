<template>
 <h1>一个人的信息</h1>
 <h2>姓名：{{name}}</h2>
 <h2>年龄：{{age}}</h2>
 <h3>工作：{{job.type}}</h3>
 <h3>薪水：{{job.salary}}</h3>
 <button @click="changeInfo">修改</button>
</template>

<script>
// 为了页面有响应
import {ref} from 'vue'
export default {
  name: 'App',
  setup() {
    // 数据
     let name=ref('张三');
     let age=ref(18);
     let job=ref({
       type:'前端',
       salary:'30k'
     })
    //方法
  function changeInfo(){
  name.value='ls'
  age.value=20
  job.value.type='后端'
  job.value.salary='12k'
  }
    return {
      name,
      age,
      job,
    changeInfo
    }
  }, 
}
</script>

<style>

</style>

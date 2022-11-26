<template>
 <h2>当前求和为：{{sum}}</h2>
 <button @click="sum++">+1</button>
 <hr>
 <h2>当前信息为：{{msg}}</h2>
 <button @click="msg+='!'">修改</button>
 <hr>
 <h2>姓名：{{person.name}}</h2>
 <h2>年龄：{{person.age}}</h2>
 <h2>薪资：{{person.job.salary}}K</h2>
 <button @click="person.name+='~'">修改</button>
 <button @click="person.age++">+1</button>
  <button @click="person.job.salary++">+1</button>
</template>
<script>
import {ref,watch,reactive} from 'vue';
export default {
  name: 'App',
  
  setup() {
    let sum=ref(0);
    let msg=ref('你好！');
    let person=ref(
      {
        name:'张三',
        age:18,
        job:{
          salary:20
        }
      }
    )
    //1.ref基本数据类型时，不能直接监视里面的值(.value)
   watch(sum,(newVal,oldVal)=>{
     console.log('sum的值变化了',newVal,oldVal);
   })
    /*2.ref复杂类型数据,地址变化才会被检测到
    (1)监视.value里面的Proxy
    (2)开启深度监视
      */
   watch(person.value,(newVal,oldVal)=>{
     console.log('sum的值变化了',newVal,oldVal);
   })

   watch(person,(newVal,oldVal)=>{
     console.log('sum的值变化了',newVal,oldVal);
   },{deep:true})
    return {
     sum,
    msg, person
    }
   
  }, 
  

}
</script>

<style>

</style>

<template>

 <h2>姓名：{{name}}</h2>
 <h2>年龄：{{age}}</h2>
 <h2>薪资：{{job.salary}}K</h2>
 <button @click="name+='~'">修改</button>
 <button @click="age++">+1</button>
 <button @click="job.salary++">+1</button>
 <hr>
 <h2>x的值是：{{x}}</h2>
 <button @click="x++">+1</button>
</template>
<script>
import {reactive, toRef,ref,toRefs,readonly,shallowReadonly } from 'vue';
export default {
  name: 'App',
  
  setup() {
  


 

    let person= reactive(
      {
        name:'张三',
        age:18,
        job:{
          salary:20
        }
      }
    )
     //保护一个响应式的数据
    //  person=readonly(person);
    //保护响应式数据的第一层，对象还是响应式
  person=  shallowReadonly(person);
    let persons=toRefs(person)
   
 
   let x=ref(0);
    return {
      x,
    ...persons
    }
   
  }, 
  

}
</script>

<style>

</style>

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
import {ref,watch,reactive,watchEffect} from 'vue';
export default {
  name: 'App',
  
  setup() {
    let sum=ref(0);
    let msg=ref('你好！');
    let person=reactive(
      {
        name:'张三',
        age:18,
        job:{
          salary:20
        }
      }
    )
    //监视里面使用的全部数据
  watchEffect(()=>{
    const x=sum.value;
    console.log('值发生变化');
  })
   
  
    return {
     sum,
    msg, person
    }
   
  }, 
  

}
</script>

<style>

</style>

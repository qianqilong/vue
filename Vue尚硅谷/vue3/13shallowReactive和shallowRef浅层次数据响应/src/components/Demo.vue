<template>
<h4>{{person}}</h4>
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
import {reactive, toRef,ref,toRefs, shallowReactive,shallowRef} from 'vue';
export default {
  name: 'App',
  
  setup() {
  //  shallowReactive(只处理第一层的数据(第一层有响应式))
    let person= shallowReactive(
      {
        name:'张三',
        age:18,
        job:{
          salary:20
        }
      }
    )
    let persons=toRefs(person)
    // shallowRef,只能传人基本数据类型，传入对象类型不处理成Proxy
   let x=shallowRef(0);
    return {
      x,
			person,
    ...persons
    }
   
  }, 
  

}
</script>

<style>

</style>

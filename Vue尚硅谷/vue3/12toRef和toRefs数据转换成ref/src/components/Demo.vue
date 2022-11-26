<template>
<h4>{{person}}</h4>
 <h2>姓名：{{name}}</h2>
 <h2>年龄(ref包裹)：{{age}}</h2>
 <h2>薪资：{{job.salary}}K</h2>
 <button @click="name+='~'">修改</button>
 <button @click="age++">+1</button>
 <button @click="job.salary++">+1</button>
</template>
<script>
import {reactive, toRef,ref,toRefs} from 'vue';
export default {
  name: 'App',
  
  setup() {
   
    let person=reactive(
      {
        name:'张三',
        age:18,
        job:{
          salary:20
        }
      }
    )
    let persons=toRefs(person)
  
    return {
			person,
			//直接跳过了Proxy管理
			//直接用ref包裹修改的不是上面对象的属性，是不会响应person中的值的变化
				age:ref(person.age),
    //  name:toRef(person,'name'),
		// salary:toRef(person.job,'salary')
    ...persons
    }
   
  }, 
  

}
</script>

<style>

</style>

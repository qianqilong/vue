<template>
 <h2>当前求和为：{{sum}}</h2>
 <button @click="add">+1</button>
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
   
 /* watch:{
    
   vue2中的简单写法
    sum(newValue,oldValue){
      console.log('sum的值变化了',newValue,oldValue);
    }*/
    
    
    /*vue2中的复杂写法
    sum:{
      immediate:true,
      deep:true,
      handler(newValue,oldValue){
     console.log('sum的值变化了',newValue,oldValue);
      }
    }
  },*/
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
    //监视1:监视ref定义的响应式数据
    watch(sum,(newValue,oldValue)=>{
    console.log('sum的值变化了',newValue,oldValue);
    },{immediate:true})

    //监视2:监视多个ref的响应数据
     watch([sum,msg],(newValue,oldValue)=>{ 
   console.log('sum或者msg的值变化了',newValue,oldValue);
    })

    /*监视3:监视对象类型reactive的响应数据
    1.修改中数据时地址指向的是一样的修改后新旧数据一样
    2.强制开启了深度监视，不可关闭，deep配置无效
    */
    watch(person,(newValue,oldValue)=>{
    console.log('person的值变化了',newValue,oldValue);
    },{deep:false})

    //监视4:监视reactive中响应式中某个数值的改变
      watch(()=>person.name,(newValue,oldValue)=>{
    console.log('person.name的值变化了',newValue,oldValue);
    })

     //监视5:监视reactive中响应式中某些数值的改变
      watch([()=>person.name,()=>person.age],(newValue,oldValue)=>{
    console.log('person.name或者person.age的值变化了',newValue,oldValue);
    })

    //特殊情况:监视reactive中响应式中某个对象的改变，对象中的对象要deep
    watch(()=>person.job,(newValue,oldValue)=>{
    console.log('person.job的值变化了',newValue,oldValue);
    },{deep:true})
    function add(){
      sum.value+=1;
    }
    return {
     sum,add,
    msg, person
    }
   
  }, 
  

}
</script>

<style>

</style>

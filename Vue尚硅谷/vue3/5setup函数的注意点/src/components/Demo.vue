<template>
 <h1>一个人的信息</h1>
 <h2>姓名：{{person.name}}</h2>
 <h2>年龄：{{person.age}}</h2>
<button @click="test">触发自定义事件</button>
</template>

<script>
import {reactive} from 'vue';
export default {
  name: 'App',
  /*
  1.setup的执行时间在beforeCreate之前执行一次，this指向了undefined
  2.
  */ 
 beforeCreate() {
   console.log("--beforeCreate--");
   },
   props:['msg'],
   emits:['hello'],
  setup(props,context) {
    // console.log("--setup--",props);
    // console.log("--setup--",context.attrs);//相当于vue2中的this.$attrs
    // console.log("--setup--",context.item);//相当于vue2中的this.$item
    console.log("--setup--",context.slots);//相当于vue2中的this.$slots
    // 数据
    let person=reactive({
     name:'张三',
     age:18
    })
    
    function test(){
      context.emit('hello',666)
    }
   
    return {
     person,test
    }
   
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

<template>
  <div class="demo">
    <h2>学生姓名：{{myName}}</h2>
    <h2>学生年龄：{{age}}</h2>
    <button @click="sendStudentName">发送信息给school</button>
  </div>
</template>

<script>
import pubsub from 'pubsub-js'
export default {
  name:'Stu',
  data() {
    return {
     myName:'刘小龙',
     age:21
    }
  },
 methods: {
   sendStudentName(){
    pubsub.publish('hello',666)
   }
 },
}
</script>

<style>
.demo {
  background-color: aqua;
}
</style>
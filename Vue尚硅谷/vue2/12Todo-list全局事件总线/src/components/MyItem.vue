<template>
  <li>
    <label for="">
      <input type="checkbox" :checked=" todo.done" @change=" handleCheck(todo.id)">
       <!-- <input type="checkbox" v-model="todohobby.done"> -->
      <span>{{ todo.title}}</span>
    </label>
    <button class="btn btn-danger" @click="handledelect(todo.id)">删除</button>
  </li> 
</template>

<script>

export default {
name:'MyItem',

//接收父组件传来的对象
props:['todo'],
// 用data接收要改变的信息
data() {
  return {
    //直接赋值是浅层次赋值，地址相同一改都改，同样修改了地址 todohobby:this.todo
    todohobby: JSON.parse(JSON.stringify(this.todo))//深度拷贝
  }
},
methods: {
  
 handleCheck(id){
  //  调用父组件传过来修改勾选的方法
  //  this.checktodo(id)
  //调用总线上的方法
 this.$bus.$emit('checktodo',id);
 },
 handledelect(id){
  if(confirm('确定删除吗？')){
  //  通知父组件删除
// this.deleteTodo(id);
  //调用总线上的方法
  this.$bus.$emit('deleteTodo',id);
  }
 }
},
}
</script>

<style scoped>
li{
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}
li label{
  float: left;
  cursor: pointer;
}
li label li input{
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top:-1px
}
li button{
  float: right;
display: none;
margin-top: 3px;
}
li::before{
  content: initial;
}
li:last-child{
  border-bottom: none;
}
li:hover{
  background-color: #ddd;
}
li:hover button{
  display: block;
}
</style>
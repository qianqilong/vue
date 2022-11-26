<template>
<transition name="todo" appear>


  <li>
    <label for="">
      <input type="checkbox" :checked=" todo.done" @change=" handleCheck(todo.id)">
       <!-- <input type="checkbox" v-model="todohobby.done"> -->
      <span v-show="!todo.isEdit">{{ todo.title}}</span>
      <input type="text" :value="todo.title" 
      v-show="todo.isEdit"
      @blur="handleBlur(todo,$event)"
      ref="inputTitle"
      >
    </label>
      <button class="btn btn-danger" @click="handledelect(todo.id)">删除</button>
        <button class="btn btn-edit" @click="handleEdit(todo)" >编辑</button>
  </li> 
  </transition>
</template>

<script>
import pubsub from 'pubsub-js'
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
  //勾选
 handleCheck(id){
  //  调用父组件传过来修改勾选的方法
  //  this.checktodo(id)
  //调用总线上的方法
 this.$bus.$emit('checktodo',id);
 },
//  删除
 handledelect(id){
  if(confirm('确定删除吗？')){
  //  通知父组件删除
// this.deleteTodo(id);
  //调用总线上的方法
  // this.$bus.$emit('deleteTodo',id);
  //消息订阅
  pubsub.publish('deleteTodo',id);
  }
 },
 //编辑
 handleEdit(todo){
   if(todo.hasOwnProperty('isEdit')){
      todo.isEdit=true
   }else{
  this.$set(todo,'isEdit',true);
  }
   this.$nextTick(()=>{//dom渲染完毕之后执行回调
this.$refs.inputTitle.focus();
  });
//  this.$refs.inputTitle.focus();走了这句话才解析模板
 },
 //失去焦点
 handleBlur(todo,e){
  todo.isEdit=false;
  this.$bus.$emit('updateTodo',todo.id,e.target.value);
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
margin-left: 5px;
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
.todo-enter-active{
animation: A 1s
}
.todo-leave-active{
  animation: A 1s reverse
}


@keyframes A{
from{
  transform: translateX(100%);

}to{
  transform: translateX(0);
}

}
</style>
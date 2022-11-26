<template>
  <div class="todo-footer" v-show="total">
   <label for="">
     <input type="checkbox" :checked="totalcheck"  @change='isAll'>
   </label>
   <span>
     <span>已完成{{doneTotal}}</span>/全部{{total}}
   </span>
   <button class="btn btn-danger" @click="clearAll">清除已完成任务</button>
  </div>
</template>

<script>

export default {
name:'MyFooter',
props:['todos'],
methods: {
  //获取是否勾起全部的方法
  isAll(e){
  //  this. getisAll(e.target.checked)
  this.$emit('getisAll', e.target.checked);
  },
 clearAll(){
//  this.clearAllTodo()
 this.$emit('clearAllTodo');
 }
},
computed:{
  //计算属性如果要与v-model绑定时不能简写
  total(){
return this.todos.length
  },
  doneTotal(){
    // return this.todos.filter(item=>item.done==true).reduce(some=>{
    //   return  some+1;
    // },0)
    return this.todos.reduce((some,item)=>{
      return some+(item.done? 1:0);
    },0)
  },
  totalcheck(){
   return this.todos.every(item=>item.done)&&this.total>0;
  }
}
}
</script>

<style scoped>
.todo-footer{
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}
.todo-footer label{
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}
.todo-footer label input{
  position: relative;
  top:-1px;
  vertical-align: middle;
  margin-right: 5px;
}
.todo-footer button{
  float: right;
  margin-top: 5px;
}
</style>
<template>
  <div id="root">
    <div class="todo-container">
    <div class="todo-wrap">
      <MyHeader @getTodoObj="getTodoObj" ></MyHeader>
      <MyList  :todos="todos" ></MyList>
      <MyFooter  :todos="todos" @getisAll="getisAll" @clearAllTodo="clearAllTodo"></MyFooter>
    </div>
    </div>
  </div>
</template>

<script>
// 引入组件
import MyHeader from './components/MyHeader.vue'
import MyList from './components/MyList.vue'
import MyFooter from './components/MyFooter.vue'

export default {
  name: 'App',
  components: {
    MyHeader,
    MyList,
    MyFooter
  },
  data() {
    return {
   todos:JSON.parse(localStorage.getItem('todos'))||[] 
    }
  },
  methods: {
    //父组件通过自定义事件接收到了myheader传过来的数据
    getTodoObj(val){
    //更新数组
      this.todos.unshift(val);
    },
    // 接收子组件是否勾选全部
    getisAll(val){
           this.todos.forEach(item=>item.done=val) 
    },
    //勾选和取消勾选传给子组件
     checktodo(id){
       this.todos.forEach(item=>{
         if(item.id===id)item.done=!item.done;
       })
    } ,
    deleteTodo(id){
      this.todos=this.todos.filter(item=>item.id!==id)
    },
    // 清除全部
    clearAllTodo(){
      this.todos=this.todos.filter(item=>!item.done)
    }
  },
  watch:{
   todos:{
     deep:true,
     handler(val){
       localStorage.setItem('todos',JSON.stringify(val))
     }
   }
  },
  mounted() {
    this.$bus.$on('checktodo',this.checktodo)
    this.$bus.$on('deleteTodo',this.deleteTodo)

  },
  beforeDestroy() {
    this.$bus.$off('checktodo');
    this.$bus.$off('deleteTodo');
  },
}
</script>

<style>
body {
  background: #fff;
}
.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}
.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}
.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}
.btn:focus {
  outline: none;
}
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
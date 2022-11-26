<template>
  <div class="demo">
    <h2>学生姓名：{{myName}}</h2>
    <h2>学生年龄：{{age}}</h2>
    <button @click="add">+1</button>
    <button @click="demoStuName">传给父组件</button>
    <button @click="unbind">解绑事件</button>
    <button @click="death">销毁stu组件的实例对象</button>
  </div>
</template>

<script>
export default {
  name: 'Stu',
  data() {
    return {
      myName: '刘小龙',
      age: 21
    }
  },
  methods: {
    demoStuName() {
      // 触发Stu身上的getStuName事件,给那个绑定那个触发，事件的回调在父组件，通过回调获取数据
      this.$emit('getStuName', this.myName)
      // this.$emit('demo')
    },
    unbind() {
      //解绑一个自定义事件
      this.$off('getStuName')
      // this.$off(['getStuName', 'demo'])
      // this.$off() //解绑多个自定义事件
    },
    death(){
      this.$destroy();//销毁了stu组件
    },
    add(){
      this.age++;
      console.log('add被调用了');
    }
  }
}
</script>

<style scoped>
.demo {
  background-color: aqua;
  padding: 5px;
  margin-top: 30px;
}
</style>
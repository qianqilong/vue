<template>
  <div class="app">
    <h1>{{msg}}</h1>
    <School :getSchoolName="getSchoolName"></School>
    <!-- 第一种写法v-on,如果用原生的click事件@click是自定义事件,后面要加@click.native才可以触发原生事件 -->
     <Stu @getStuName="getStu" @click.native="show"></Stu> 
     <!-- 用ref ,可以加定时器等，更加-->
    <Stu ref="stu"></Stu>
  </div>
</template>

<script>
// 引入组件
import School from './components/School.vue'
import Stu from './components/stu.vue'
export default {
name:'App',
components:{
  School,
  Stu
},
data() {
  return {
    msg:'欢迎您~',
    stuName:''
  }
},
methods: {
  getSchoolName(name){
    console.log('父组件接收到了子组件的信息',name);
  },
  getStu(val){
    this.stuName=val
    console.log('父组件接收到了子组件的信息',val);
  },
  show(){
    console.log('');
  }
  // m1(){
  //   console.log("demo事件被触发了");
  // }
},
mounted() {
  // 能触发一次
  // this.$refs.stu.$once('getStuName',this.getStu)

  //  this.$refs.stu.$on('getStuName',this.getStu)//this.getStu的this始终指向的是methods里的对象
  
   this.$refs.stu.$on('getStuName',function(val){//这里用普通函数this指向了vm
    this.stuName=val;//这里的this是vm实例
    console.log('父组件接收到了子组件的信息',val);
    console.log(this);
  })
},
}
</script>

<style scoped>
.app{
  background-color: deeppink;
  padding: 5px;
}
</style>
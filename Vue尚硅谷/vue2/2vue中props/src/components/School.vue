<template>
  <div class="demo">
    <h2>学校名称：{{school}}</h2>
    <h2>学校地址：{{address}}</h2>
    <h2>建校时间：{{pAge}}</h2>
    <button @click="pAge=50">修改age</button>
  </div>
</template>

<script>
export default {
  name:'School',
  data() {
    return {
      school: '安徽科技学院',
      pAge:this.age
    }
  },
  // 数组接收方式
  // props:['address','age']

//对象形式
// props:{
//  address:String,
//  age:Number
// }

//对象嵌套对象
props:{
  age:{
    type:Number,//限制类型
    default:70//默认值
  },
  address:{
    type:String,
    required:true,//是否必填
  }
},//props的值一般不让修改
}
</script>

<style>
.demo {
  background-color: aqua;
}
</style>
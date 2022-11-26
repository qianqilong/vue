
<template>
  <div>
   <button @click="getStus">获取学生信息</button>
   <button @click="getCars">获取汽车信息</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
name:'App',
components:{},
methods: {
  //用代理服务器解决跨域服务器
  getStus(){
    axios.get('http://localhost:8080/api/students').then(async resovle=>{
      console.log(resovle.data);
    },reject=>{
      console.log(reject.message);
    })
  },
  async getCars(){
     const {data}= await axios.get('http://localhost:8080/demo/cars')
     console.log(data);
  }
},
}
</script>

<style scoped>

</style>
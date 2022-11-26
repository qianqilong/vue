<template>
<div class="app">
<h3>我是App组件(祖),,{{name}}--{{price}}</h3>
	<Child></Child>
</div>
</template>

<script>
import Child from './components/Child.vue'
import {reactive,toRefs,provide} from 'vue'
export default {
name:'App',
components:{
	Child
},
setup() {
  let car = reactive({
     name:'奔驰',
     price:'40W'
  })
provide('car',car);//给自己的后代组件传递数据
  return {...toRefs(car)}
}
}
</script>

<style scoped>
.app{
	background-color: gray;
	padding: 10px;
}
</style>
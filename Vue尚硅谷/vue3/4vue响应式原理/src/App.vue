<template>
	<h1>一个人的信息</h1>
	<h3>工作：{{job.type}}</h3>
	<h3>薪水：{{job.salary}}</h3>
  <h3 v-show="job.age">工龄：{{job.age}}</h3>
	<h3>爱好：{{hobby}}</h3>
	<button @click="changeInfo">修改</button>
	<button @click="addInfo">添加</button>
  	<button @click="deleteInfo">删除</button>
</template>

<script>
// 为了页面有响应
import { ref, reactive } from 'vue'
export default {
	name: 'App',
	setup() {
		/*
   vue2响应式
   1.对象类型通过Object.defineProperty()对属性的读取，修改进行拦截数据劫持
   2.数组类型,通过重写数组的方法来实现拦截,对数组变更方法进行包裹
   (新增属性，删除属性，直接通过下标修改数组不会更新界面)

   vue3响应式
   1.Proxy(代理):拦截对象中任意属性的变化，包括属性的读写，添加，删除
   2.Reflect(反射):对对象的属性进行操作
   */
		// 数据
		let job = reactive({
			type: '前端',
			salary: '30k'
		})
		let hobby = reactive(['抽烟', '喝酒', '烫头'])
		//方法
		function changeInfo() {
			job.type = '后端'
			job.salary = '12k'
			// 修改数组类型
			hobby[0] = '学习' //vue2中不可以这样写
		}
    function addInfo(){
      job.age=18
    }
    function deleteInfo(){
     delete job.age;
    }
		return {
			job,
			changeInfo,
			hobby,
      addInfo,
      deleteInfo,
		}
	}
}
</script>

<style>
</style>

<template>

	<h2>姓名：{{name}}</h2>
	<h2>年龄：{{age}}</h2>
	<h2>薪资：{{job.salary}}K</h2>
  <h3 v-show="person.car">汽车：{{person.car}}</h3>
	<button @click="name+='~'">修改</button>
	<button @click="age++">+1</button>
	<button @click="job.salary++">+1</button>
	<button @click="showRawPerson">输出原始person</button>
	<button @click="addCar">添加一台车</button>
  <button @click="person.car.name+='!'">修改车</button>
	<hr>
	<h2>x的值是：{{x}}</h2>
	<button @click="x++">+1</button>
</template>
<script>
import { reactive, toRef, ref, toRefs, toRaw, markRaw } from 'vue'
export default {
	name: 'App',

	setup() {
		let person = reactive({
			name: '张三',
			age: 18,
			job: {
				salary: 20
			}
		})
	

		let x = ref(0)

		function showRawPerson() {
			// 把响应式的数据进行还原
			console.log(toRaw(person))
		}

    function addCar(){
      let  car ={name:'本次',price:'40w'}
      // 让后添加的数据不需要修改,对象不会变成响应式
      person.car=markRaw(car);
      console.log(car);
      
    }

    
		return {
			x,addCar,
      person,
			showRawPerson,
			...toRefs(person)
		}
	}
}
</script>

<style>
</style>

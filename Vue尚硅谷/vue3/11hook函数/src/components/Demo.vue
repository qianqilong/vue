<template>

	<h2>当前求和为：{{sum}}</h2>
	<button @click="sum++">+1</button>

	<h2>当前点击的坐标为：X{{point.x}},Y{{point.y}}</h2>
  
</template>
<script>
import { ref} from 'vue'
import usePoint from '../hooks/usePoint'
export default {
	name: 'App',

	setup() {
		let sum = ref(0)
      /*
		let point = reactive({
			x: 0,
			y: 0
		})
		function savepoint(event) {
			point.x = event.pageX
			point.y = event.pageY
			console.log(event.pageX, event.pageY)
		}
		onMounted(() => {
			window.addEventListener('click', savepoint)
		})
		onBeforeUnmount(() => {
			window.removeEventListener('click',savepoint)
		})
*/
 let point=usePoint();
		return {
			sum,
			point
		}
	}
}
</script>

<style>
</style>

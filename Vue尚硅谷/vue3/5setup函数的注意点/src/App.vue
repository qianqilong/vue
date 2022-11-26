<template>
<Demo @hello="showHello" msg="ls">
	<!-- <span>你好！</span> -->

	<template v-slot:hello>
		<div>
			你好啊！
		</div>
	</template>
</Demo>
</template>

<script>
import Demo from './components/Demo.vue'
export default {
	name: 'App',
  components:{
		Demo
	},
	setup() {
		function showHello(value){
			alert(`触发了自定义事件，受到的参数是${value}`)
		}
		return {
			showHello
		}
	}
}
</script>

<style>
</style>

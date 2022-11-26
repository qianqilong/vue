<template>
<h1>我是Test组件</h1>
	<h2>当前点击的坐标为：X{{point.x}},Y{{point.y}}</h2>
  <br>
</template>
<script>
import usePoint from '../hooks/usePoint'
export default {
	name: 'Test',

	setup() {
	
 let point=usePoint();
		return {
		
			point
		}
	}
}
</script>

<style>
</style>

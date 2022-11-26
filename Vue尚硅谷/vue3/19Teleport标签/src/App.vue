<template>
<div class="app">
<h3>我是App组件(祖)</h3>
	<Child></Child>
</div>
</template>

<script>
import Child from './components/Child.vue'
export default {
name:'App',
components:{
	Child
},
}
</script>

<style scoped>
.app{
	background-color: gray;
	padding: 10px;
}
</style>
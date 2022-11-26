<template>
<div class="app">
<h3>我是App组件(祖)</h3>
<!-- 等待异步组件时渲染一些额外内容，让应用有更好的用户体验-->
<Suspense >
	<template v-slot:default>
		<div>
			<Child></Child>
		</div>
	</template>
	
	<template v-slot:fallback>
		<div>
			<h3>加载中。。。。</h3>
		</div>
	</template>

	</Suspense>
</div>
</template>

<script>
// import Child from './components/Child.vue'//静态引入
import {defineAsyncComponent} from 'vue';
const Child=defineAsyncComponent(()=>import('./components/Child.vue'))//动态(异步)引入
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
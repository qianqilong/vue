<template>
<div class="child">
<h3>我是Child组件(儿)</h3>
 <h4>{{sum}}</h4>
</div>
</template>

<script>

import {ref} from 'vue'
export default {
name:'Child',
setup() {
	let sum=ref(0);
	return new Promise((resolve,reject)=>{
		setTimeout(()=>{
			resolve({sum})
		},1000)
	})
}

}
</script>

<style scoped>
.child{
	background-color: pink;
	padding: 10px;
}
</style>
<template>
<input type="text" v-model="keyword">
<br>
<span>{{keyword}}</span>

</template>

<script>


import {ref,customRef} from 'vue'
export default {
	name: 'App',
  
	setup() {
		// 自定义ref
		function myRef(value){
			 let timer;
 return customRef((track,trigger)=>{
	
	 return{
		 get(){
			console.log('有人读取数据了！');
			track();//通知vue追踪数据的变化
				return value;
		 },
		 set(newVal){
        console.log('有人修改了数据！');
				clearTimeout(timer)
		    value=newVal;
			timer=	setTimeout(()=>{
      trigger();//通知vue重新解析模板
				},1000)
				
		 }
	 }

 })
		}
	  // let keyword=ref('');//普通ref
		let keyword=myRef('11')
		return {
		keyword
		}
	}
}
</script>

<style>
</style>

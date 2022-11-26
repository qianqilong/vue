<template>
<Demo v-if="isshowDemo">
</Demo>
<br>
<button @click="isshowDemo=!isshowDemo">切换</button>
</template>

<script>
import Demo from './components/Demo.vue'
import {ref} from 'vue'
export default {
	name: 'App',
  components:{
		Demo
	},
	setup() {
	  let isshowDemo=ref(true);
		return {
			isshowDemo
		}
	}
}
</script>

<style>
</style>

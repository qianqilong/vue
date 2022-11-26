<template>
<Demo v-if="isshowDemo">
</Demo>
<hr>
<Test></Test>
<hr>

<button @click="isshowDemo=!isshowDemo">切换</button>
</template>

<script>
import Demo from './components/Demo.vue'
import Test from './components/Test.vue'

import {ref} from 'vue'
export default {
	name: 'App',
  components:{
		Demo,Test
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

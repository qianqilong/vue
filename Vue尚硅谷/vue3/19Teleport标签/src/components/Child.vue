<template>
<div class="child">
<h3>我是Child组件(儿)</h3>
<Son></Son>
</div>
</template>

<script>
import Son from './Son'

export default {
name:'Child',
components:{
  Son
},

}
</script>

<style scoped>
.child{
	background-color: pink;
	padding: 10px;
}
</style>
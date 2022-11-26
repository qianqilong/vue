<template>
<div class="son">
<h3>我是Son组件(孙)</h3>
<Dialog></Dialog>
</div>
</template>

<script>
import Dialog from './Dialog.vue'
export default {
name:'Son',
components:{
  Dialog
}

}
</script>

<style scoped>
.son{
	background-color: deeppink;
	padding: 10px;
}
</style>
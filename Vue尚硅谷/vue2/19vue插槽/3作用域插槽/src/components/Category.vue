<template>
  <div class="category">
    <h3>
     {{title}}分类
    </h3>
   <slot :listData="listData"></slot>
    
  </div>
</template>

<script>
export default {
 name:'Category',
 props:["listData","title"]
}
</script>

<style>
.category{
  background-color: skyblue;
  width: 200px;
  height: 300px;
}
h3{
 background-color: deeppink;
 text-align: center; 
}
img{
  width: 100%;
}
video{
		width: 100%;
	}
</style>
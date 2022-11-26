<template>
  <div class="category">
    <h3>
     {{title}}分类
    </h3>
    <!-- 插槽里面的值在父组件没有传值时出现 -->
    <slot>
      <ul>
      <li v-for="(item,index) in listData" :key="index">{{item}}</li>
    </ul>
    </slot>
    <!-- <ul   v-show="title!=='美食'">
      <li v-for="(item,index) in listData" :key="index">{{item}}</li>
    </ul> -->
    <!-- <img src="https://s3.ax1x.com/2021/01/16/srJlq0.jpg" v-show="title=='美食'"> -->
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
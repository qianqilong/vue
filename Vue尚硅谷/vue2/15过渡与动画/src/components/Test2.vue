<template>
  <div>
    <button @click="isShow=!isShow">显示/隐藏</button>
 
  <!-- 
    :appear：上来有一个切换，布尔值
    name：属性可以让多个执行动画，css样式要改-->
  <transition name="hello" :appear="true">
    <h1 v-show="isShow">你好啊~</h1>
  </transition>
  
  </div>
</template>

<script>
export default {
name:'Test',
data() {
  return {
    isShow:true
  }
},
}
</script>

<style scoped>
h1{
  background-color: deeppink;
}
.hello-enter-active,.hello-leave-active{
  transition: 1s;
}
/* 进入的起点 离开的终点*/
.hello-enter, .hello-leave-to{
 transform: translateX(-100%);
}
/* 进入的终点  离开的起点*/
.hello-enter-to, .hello-leave{
  transform: translateX(0);
}




</style>
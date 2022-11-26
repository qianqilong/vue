<template>
  <div>
    <button @click="isShow=!isShow">显示/隐藏</button>
 
  <!-- 
    :appear：上来有一个切换，布尔值
    name：属性可以让多个执行动画，css样式要改-->
  <transition name="hello" :appear="true">
    <h1 v-show="isShow">你好啊~</h1>
  </transition>
   <transition-group name="hello" :appear="true">
    <h1 v-show="isShow" key="1">你好啊~</h1>
    <h1 v-show="isShow"  key="2">你好啊~</h1>
  </transition-group>
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
  background-color: aqua;
}
.hello-enter-active{
animation: A 1s
}
.hello-leave-active{
  animation: A 1s reverse
}


@keyframes A{
from{
  transform: translateX(-100%);

}to{
  transform: translateX(0);
}

}
</style>
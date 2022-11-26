<template>
  <div class="demo">
    <h2 @click="showName">学校名称：{{school}}</h2>
    <h2>学校地址：{{address}}</h2>
    
  </div>
</template>

<script>
// 局部混合
// import {mixin} from '../mixin'
//产生冲突时以组件内容为主
//生命周期都要
export default {
  name:'School',
  data() {
    return {
      school: '安徽科技学院',
      address: '龙子湖校区'
    }
  },
//  mixins:[mixin]
}
</script>

<style>
.demo {
  background-color: aqua;
}
</style>
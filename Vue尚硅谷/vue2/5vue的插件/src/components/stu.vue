<template>
  <div class="demo">
    <h2 @click="showName">学生姓名：{{myName}}</h2>
    <h2>学生年龄：{{age}}</h2>
    
  </div>
</template>

<script>
// import {mixin} from '../mixin'局部
export default {
  name:'Stu',
  data() {
    return {
     myName:'刘小龙',
     age:21
    }
  },
//  mixins:[mixin]
}
</script>

<style scoped>
/* 加上scoped */
.demo {
  background-color: deeppink;
}
</style>
<template>
  <div class="demo">
    <h2>学校名称：{{school}}</h2>
    <h2>学校地址：{{address}}</h2>
    <button @click="showName">点我提示</button>
  </div>
</template>

<script>
export default {
  name:'School',
  data() {
    return {
      school: '安徽科技学院',
      address: '龙子湖校区'
    }
  }
}
</script>

<style lang="less" scoped>
.demo {
  background-color: aqua;
}
</style>
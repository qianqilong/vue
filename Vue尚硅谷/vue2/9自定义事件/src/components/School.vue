<template>
  <div class="demo">
    <h2>学校名称：{{school}}</h2>
    <h2>学校地址：{{address}}</h2>
    <button @click="getSchoolName(school)">传给父组件</button>
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
  },
  props:['getSchoolName']
}
</script>

<style scoped>
.demo {
   padding: 5px;
  background-color: pink;
}
</style>
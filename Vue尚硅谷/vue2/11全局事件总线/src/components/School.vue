<template>
  <div class="demo">
    <h2>学校地址：{{address}}</h2>   
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
mounted() {
  this.$bus.$on('getStuName',(val)=>{
    console.log('我收到了来自stu的信息',val);
  })
},
beforeDestroy() {
  this.$bus.$off('getStuName');
},
}
</script>

<style>
.demo {
  background-color: aqua;
}
</style>
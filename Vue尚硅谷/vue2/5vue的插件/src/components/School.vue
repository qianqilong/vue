<template>
  <div class="demo">
    <h2>学校名称：{{school | myslice}}</h2>
    <h2>学校地址：{{address}}</h2>
    <input type="text" v-fbind:value="school">
    <button @click="test">点我测试</button>
  </div>
</template>

<script>
export default {
  name:'School',
  data() {
    return {
      school: '安徽科技学院sdadsada',
      address: '龙子湖校区'
    }
  },
  methods: {
    test(){
      this.hello();
    }
  },
}
</script>

<style lang="less">
.demo {
  background-color: aqua;
}
</style>
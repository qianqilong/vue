<template>
  <div>
    <h2>Home组件内容</h2>
    <div>
      <ul class="nav nav-tabs">
        <li>
          <router-link
            class="list-group-item "
            active-class="active"
            to="/home/news"
          >News</router-link>
        </li>
        <li>
          <router-link
            class="list-group-item "
             active-class="active"
            to="/home/message"
          >Message</router-link>
        </li>
      </ul>
      <!-- 让新闻模块缓存，组件名-->
      <keep-alive include="News">
     <router-view></router-view>
      </keep-alive>

  </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  /*mounted() {
    console.log('Home组件挂载完成');
},*/
  beforeDestroy() {
    console.log('Home组件要被销毁了', this)
  },
  
}
</script>

<style>
</style>
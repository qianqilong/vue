<template>
   <div>
    <div class="row">
      <Banner></Banner>
    </div>
    <div class="row">
      <div class="col-xs-2 col-xs-offset-2">
        <div class="list-group">
          <!--原始html中a标签使用页面跳转
             <a class="list-group-item" href="./about.html">About</a>
          <a class="list-group-item active" href="./home.html">Home</a> -->
          
          <!-- 最终都是转换成a标签,
          1.router-link 实现路由的切换
          2.active-class="active"激活时加入样式
          -->
          <!-- 下面about用到了命名路由简化了路由跳转， -->
           <router-link  replace active-class="active" class="list-group-item" :to="{name:'about'}">About</router-link>
          <router-link   replace active-class="active" class="list-group-item " to="/home">Home</router-link>
        </div>
      </div>
      <div class="col-xs-6">
        <div class="panel">
          <div class="panel-body">
           <!-- 要用于一个符号进行占位 router-view -->
           <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Home from './pages/Home.vue'
import About from './pages/About.vue'
import Banner from './components/Banner.vue'
export default {
  name: 'App',
  components: { 
    Home,
    About,
    Banner
  },

}
</script>

<style scoped>
 
</style>
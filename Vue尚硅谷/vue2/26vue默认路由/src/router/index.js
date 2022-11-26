import vueRouter from 'vue-router';
import About from '../pages/About.vue';
import Home from '../pages/Home.vue';
//创建一个路由器,并暴露一个路由器
export default new vueRouter({
  routes: [
    {
      path: '/about',
      component:About
    },
    {
      path: '/home',
      component:Home
    }
   ]
})
 
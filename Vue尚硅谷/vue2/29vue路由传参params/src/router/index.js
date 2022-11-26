import vueRouter from 'vue-router';
import About from '../pages/About.vue';
import Home from '../pages/Home.vue';
import News from '../pages/News.vue'
import Message from '../pages/Message.vue'
import Detail from '../pages/Detail.vue'
//创建一个路由器,并暴露一个路由器
export default new vueRouter({
  routes: [
    {
      name:'about',//命名路由
      path: '/about',
      component:About
    },//一级路由
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: 'news',
          component:News
        },
        {
          path: 'message',
          component: Message,
          children: [
            {
              name:'detail',
              path: 'detail/:id/:title',
              component:Detail
            }
          ]
        }
      ]
    }
   ]
})
 
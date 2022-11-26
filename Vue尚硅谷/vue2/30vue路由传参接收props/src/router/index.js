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
              // path: 'detail/:id/:title',
              path:'detail',
              component: Detail,
              //对象写法，直接传参,直接把key-val值传给detail组件
              // props:{a:1}

              //布尔值,如果布尔值为真，就会把该路由受到的所有params参数以props的形式传给detail组件
              // props:true

              //函数写法，很少用
              props({query:{id,title}}) {
                return {id,title}
              }
            }
          ]
        }
      ]
    }
   ]
})
 
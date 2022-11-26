import vueRouter from 'vue-router';
import About from '../pages/About.vue';
import Home from '../pages/Home.vue';
import News from '../pages/News.vue'
import Message from '../pages/Message.vue'
import Detail from '../pages/Detail.vue'
//创建一个路由器,并暴露一个路由器
const router = new vueRouter({
  mode: 'history',
  //hash:路径后有#,#后面的是hash值,不会发送给服务器
  //history:正常路径,兼容性比较差,刷新时会直接将请求发送给服务器
  /*
  后端解决刷新问题
  */
  routes: [
    {
      name:'about',//命名路由
      path: '/about',
      component: About,
      meta: {
         title:'关于'
       }
    },//一级路由
    {
      path: '/home',
      component: Home,
      meta:{isAuth:true,title:'主页'},//路由元信息，isAuth看是否有权限
      children: [
        {
          path: 'news',
          component: News,
          meta: {
            title:'新闻'
          },
          //独享路由守卫
        beforeEnter: (to, from, next) => {
          if (from.path == '/home/message') {
            next()
          }
        }
        },
        {
          path: 'message',
          component: Message,
          meta: {
            title:'信息'
          },
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

export default router
 
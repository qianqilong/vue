//
export default [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('../views/Home'),
    meta:{show:true,showcategory:true}
  },
  {
    path: '/login',
    component: () => import('../views/Login'),
    meta:{show:false}
  },
  {
    path: '/register',
    component: () => import('../views/Register'),
    meta:{show:false}
  },
  {
    path: '/search/:keyword?',// params传参
    component: () => import('../views/Search'),
    meta: { show: true ,showcategory:false},
    name: 'search',
    // props:true
    props: ($route) => ({
      keyword: $route.params.keyword,
      categoryName: $route.query.categoryName,
      category1id: $route.query.category1id,
      category2id: $route.query.category2id,
      category3id:$route.query.category3id
    }) 
  },
  {
    path: '/detail/:id',
    component: () => import('../views/Detail'),
    meta:{show:true,showcategory:true}
  },
  {
    path: '/addcartsuccess',
    component: () => import('../views/AddCartSuccess'),
    meta: { show: true, showcategory: true },
    beforeEnter: (to, from, next) => {
      if(from.path.indexOf("detail")!=-1){
        next()
      } else {
        next(false)
      }
    
    }
  },
  {
    path: '/shopcart',
    component:()=>import('@/views/ShopCart')
  },
  {
    path: '/trade',
    component: () => import('@/views/Trade'),
    beforeEnter: (to, from, next) => {
      if(from.path.indexOf("/shopcart")!=-1){
        next()
      } else {
        next(false)
      }
    
    }
  },
  {
    path: '/pay',
    component:()=>import('@/views/Pay')
  },
  {
    path: '/paysuccess',
    component: () => import('@/views/PaySuccess'),
    // beforeEnter: (to, from, next) => {
    //   if(from.path.indexOf("/pay")!=-1){
    //     next()
    //   } else {
    //     next(from.path)
    //   }
    // }
  },
  {
    path: '/center',
    component: () => import('@/views/Center'),
    children: [
      {
        path: 'myorder',
        component:()=>import('@/views/Center/myOrder')
      },
      {
        path: 'grouporder',
        component:()=>import('@/views/Center/groupOrder')
      }
    ]
  }
]
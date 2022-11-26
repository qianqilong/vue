## Pinia
### 1.基本使用
1. 安装```yarn add pinia```
2. 使用挂载到入口文件
```js
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

const app = createApp(App);
app.use(createPinia());
app.mount("#app");

```
3. 设置store/index
```js
import { defineStore } from 'pinia'

export const useTestStore = defineStore('test', {
  state: () => {
    return {
      count: 1,
      name: 'num'
    }
  },
  // 计算属性
  getters: {},
  // 提交state,同步异步都可以
  actions: {}
})

```
4. 读取state仓库中的值
```js
<template>
  <div>{{ Test.count }}---{{ Test.name }}</div>
</template>

<script setup lang="ts">
import { useTestStore } from './stores'

// 直接调用可以访问state
const Test = useTestStore()
</script>

<style scoped lang="less"></style>

```
### 2.改变state中的值
1. 直接修改
```js
<script setup lang="ts">
import { useTestStore } from './stores'

// 直接调用可以访问state
const Test = useTestStore()

// 直接修改
const add = () => {
  Test.count++
}
</script>

```
2. $patch直接修改
```js
<script setup lang="ts">
import { useTestStore } from './stores'

// 直接调用可以访问state
const Test = useTestStore()

// 批量修改
const change = () => {
  Test.$patch({
    count: 20,
    name: 'qq'
  })
}
</script>
```
3. $patch函数修改
```js
<script setup lang="ts">
import { useTestStore } from './stores'

// 直接调用可以访问state
const Test = useTestStore()

// 批量函数修改
const change = () => {
  Test.$patch(state => {
    state.count = 100
    state.name = '222'
  })
}
</script>
```
4. $state全部修改
```js
<script setup lang="ts">
import { useTestStore } from './stores'

// 直接调用可以访问state
const Test = useTestStore()

// 批量修改
const change = () => {
  Test.$state = {
    count: 1,
    name: '12'
  }
}
</script>
```
5. 借助action进行修改
仓库
```js
import { defineStore } from 'pinia'

export const useTestStore = defineStore('test', {
  state: () => {
    return {
      count: 1,
      name: 'num'
    }
  },
  // 计算属性
  getters: {},
  // 提交state,同步异步都可以
  actions: {
    setCount(num: number) {
      this.count = num
    }
})

```
调用action
```js
<template>
  <div>{{ Test.count }}---{{ Test.name }}</div>
  <button @click="change(100)">change</button>
</template>

<script setup lang="ts">
import { useTestStore } from './stores'

// 直接调用可以访问state
const Test = useTestStore()

// 借助action
const change = (num: number) => {
  Test.setCount(num)
}
</script>
```
### 3.解构store
1. 解构的state中的值无响应式
```js
<template>
  <div>{{ count }}---{{ Test.count }}</div>
  <button @click="change(100)">change</button>
</template>

<script setup lang="ts">
import { useTestStore } from './stores'

// 直接调用可以访问state
const Test = useTestStore()

// 解构无响应式
const { count, name } = Test

// 借助action
const change = (num: number) => {
  Test.setCount(num)
}
</script>

<style scoped lang="less"></style>

```
2. storeToRefs解构响应式
```js
<template>
  <div>{{ count }}---{{ Test.count }}</div>
  <button @click="change(100)">change</button>
</template>

<script setup lang="ts">
import { useTestStore } from './stores'
import { storeToRefs } from 'pinia'

// 直接调用可以访问state
const Test = useTestStore()

// 通过storeToRefs解构有响应
const { count } = storeToRefs(Test)

// 借助action
const change = (num: number) => {
  Test.setCount(num)
}
</script>

<style scoped lang="less"></style>

```
### 4.actions
1. 同步写法
仓库
```js
import { defineStore } from 'pinia'

type User = {
  name: string
  age: number
}

const result: User = {
  name: 'qq',
  age: 18
}
export const useTestStore = defineStore('test', {
  state: () => {
    return {
      user: <User>{}
    }
  },

  // 计算属性
  getters: {},

  // 提交state,同步异步都可以
  actions: {
    setUser() {
      this.user = result
    }
  }
})

```
调用
```js
<template>
  <div>state:{{ Test.user }}</div>
  <button @click="change">change</button>
</template>

<script setup lang="ts">
import { useTestStore } from './stores'

// 直接调用可以访问state
const Test = useTestStore()

// 借助action
const change = () => {
  Test.setUser()
}
</script>

<style scoped lang="less"></style>

```
2. 异步写法
```js
import { defineStore } from 'pinia'

type User = {
  name: string
  age: number
}

const result: User = {
  name: 'qq',
  age: 18
}

const Login = (): Promise<User> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(result)
    }, 2000)
  })
}
export const useTestStore = defineStore('test', {
  state: () => {
    return {
      user: <User>{}
    }
  },

  // 计算属性
  getters: {},

  // 提交state,同步异步都可以
  actions: {
    setUser() {
      this.user = result
    },
    async setUserAsync() {
      const result = await Login()
      this.user = result
    }
  }
})
```
### 5.getters
1. 基本使用
```js
import { defineStore } from 'pinia'

export const useTestStore = defineStore('test', {
  state: () => {
    return {
      name: 'zs'
    }
  },

  // 计算属性
  getters: {
    newName(): string {
      return `${this.name}`
    }
  },

 ...
})

<div>getters:{{ Test.newName }}</div>
```
2. 可以相互调用
```ts
  getters: {
    newName(): string {
      return `${this.name}--${this.getUserAge}`
    },
    getUserAge(): number {
      return this.user.age
    }
  },
```
### 6.$reset
```js
// 重置state中的值
const reset = () => {
  Test.$reset()
}
```
### 7.$subscribe
```js
Test.$subscribe((args, state) => {
  console.log(args, state)
})
```
### 8.$onAction
```js
// 监听调用action
Test.$onAction((args)=>{
   console.log(args);
   
})
```
### 9.手写pinia持久化
```js
// main.js
import { createApp, toRaw } from 'vue'
import { createPinia, type PiniaPluginContext } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/main.css'

type Options = {
  key?: string
}

const setStoreage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value))
}

const getStoreage = (key: string) => {
  return localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key) as string)
    : {}
}

const piniaPlugin = (options: Options) => {
  // store中的值
  return (context: PiniaPluginContext) => {
    // 获取store的值
    const { store } = context
    // 获取本地存储中的值
    const data = getStoreage(`${options?.key ?? 'qql'}-${store.$id}`)
    console.log(data)
    // 存入
    store.$subscribe(() => {
      setStoreage(`${options?.key ?? 'qql'}-${store.$id}`, toRaw(store.$state))
    })
    return { ...data }
  }
}
const store = createPinia()
store.use(
  piniaPlugin({
    key: 'pinia'
  })
)

//
const app = createApp(App)
app.use(createPinia()).use(router).use(store)
app.mount('#app')

```
## Router
### 1.基本使用
1. 路由配置
```js
// router/index.ts
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('../views/home.vue'),
    children: [
      {
        path: '/login',
        component: () => import('../views/login.vue')
      },
      {
        path: '/register',
        component: () => import('../views/login.vue')
      }
    ]
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

```
2. mian.ts中引入
```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'

const app = createApp(App)
app.use(router)
app.mount('#app')

```
3. 使用路由
```js
<template>
  <router-view></router-view>
</template>
```
### 2.命名跳转和编程式导航
1. 路由命名
```js
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/register.vue')
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

```
2. 命名路由跳转
```js
<template>
  <div>主页</div>
  <router-link :to="{ name: 'Login' }">登录</router-link>
  <router-link :to="{ name: 'Register' }">注册</router-link>
</template>

```
3. 编程式导航
```js
<template>
  <div>主页</div>
  <a @click="toPage('/login')">登录</a>
  <a @click="toPage('/register')">注册</a>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const toPage = (url: string) => {
  // 字符串
  // router.push(url)

  // 对象
  // router.push({
  //   path: url
  // })
 
  // 命名
  router.push({
    name: 'Login'
  })
}
</script>

<style scoped lang="less"></style>

```
### 3.路由跳转的历史记录问题
1. 声明式导航replace
```js
<template>
  <div>注册</div>
  <router-link to="/login" replace>登录</router-link>
  <router-link to="/" replace>首页</router-link>
</template>
```
2. 编程式导航replace
```js
<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const toPage = (url: string) => {
  // 字符串
  // router.push(url)

  // 对象
  // router.push({
  //   path: url
  // })
 
 // 命名
  router.replace({
    name: 'Login'
  })
}
</script>
```
3. 历史记录回退go,back
```js
<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const toPage = (url: string) => {
  // 字符串
  // router.push(url)

  // 对象
  // router.push({
  //   path: url
  // })

  router.go(1)
  router.back()
}
</script>
```
### 4.路由传参
#### (1)query传参
1. 传递参数可以
```js
<template>
  <h1>主页</h1>
  <br />
  <router-link to="/login?username=zs&password=123">登录</router-link>
  <br />
  <a @click="toPage">注册</a>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const toPage = () => {
  router.push({
    path: 'register',
    query: {
      username: 'zs',
      password: '123'
    }
  })
}
</script>
```
2. 接收参数
```js
<template>
  <h1>登录</h1>
  <br />
  <h3>username:{{ route.query.username }}</h3>
  <br />
  <h3>password:{{ route.query.password }}</h3>
  <br />
  <router-link to="/">首页</router-link>
  <br />
  <router-link to="/register">注册</router-link>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
```
#### (2)params传参
1. 路由文件中占位
```js
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home.vue')
  },
  {
    // 占位
    path: '/login/:username/:password',
    name: 'Login',
    component: () => import('../views/login.vue')
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

```
2. 传递参数(路由未命名，路径传递)
```js
<template>
  <h1>主页</h1>
  <br />
  <router-link to="/login/zs/123">登录</router-link>
  <br />
  <a @click="toPage">登录</a>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const toPage = () => {
  // 路径写法
  router.push({
    path: '/login/zs/123'
  })
}
</script>

<style scoped lang="less"></style>

```
3. 传递参数(命名跳转)
```js
<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const toPage = () => {
  // 路径写法
  router.push({
    name: 'Login',
    params: {
      username: 'zs',
      password: '123'
    }
  })
}
</script>

```
4. 接收参数
```js
<template>
  <h1>登录</h1>
  <br />
  <h3>username:{{ route.params.username }}</h3>
  <br />
  <h3>password:{{ route.params.password }}</h3>
  <br />
  <router-link to="/">首页</router-link>
  <br />
  <router-link to="/register">注册</router-link>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style scoped lang="less"></style>

```
### 5.嵌套路由
1. 路由嵌套
```js
const routes: Array<RouteRecordRaw> = [
    {
        path: "/user",
        component: () => import('../components/footer.vue'),
        children: [
            {
                path: "",
                name: "Login",
                component: () => import('../components/login.vue')
            },
            {
                path: "reg",
                name: "Reg",
                component: () => import('../components/reg.vue')
            }
        ]
    },
 
]
```
2. 不要忘记写router-view
```js
    <div>
        <router-view></router-view>
        <div>
            <router-link to="/">login</router-link>
            <router-link style="margin-left:10px;" to="/user/reg">reg</router-link>
        </div>
    </div>
```
### 6.命名视图
1. 路由写多重路由
```js
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('../views/root.vue'),
    children: [
      {
        path: 'a',
        // 命名视图
        components: {
          default: () => import('../views/A.vue'),
          B: () => import('../views/B.vue'),
          C: () => import('../views/C.vue')
        }
      }
    ]
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

```
2. 使用命名视图
```js
// ABC全部都显示了
<template>
  root
  <router-view></router-view>
  <router-view name="B"></router-view>
  <router-view name="C"></router-view>
</template>
```
### 7.重定向和别名
1. 字符串形式配置
```js
const routes: Array<RouteRecordRaw> = [
    {
        path:'/',
        component:()=> import('../components/root.vue'),
        redirect:'/user1',
        children:[
            {
                path:'/user1',
                components:{
                    default:()=> import('../components/A.vue')
                }
            },
            {
                path:'/user2',
                components:{
                    bbb:()=> import('../components/B.vue'),
                    ccc:()=> import('../components/C.vue')
                }
            }
        ]
    }
]
```
2. 对象形式配置
```js
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: () => import('../components/root.vue'),
        redirect: { path: '/user1' },
        children: [
            {
                path: '/user1',
                components: {
                    default: () => import('../components/A.vue')
                }
            },
            {
                path: '/user2',
                components: {
                    bbb: () => import('../components/B.vue'),
                    ccc: () => import('../components/C.vue')
                }
            }
        ]
    }
]
```
3. 函数形式配置
```js
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: () => import('../components/root.vue'),
        redirect: (to) => {
            return {
                path: '/user1',
                query: to.query
            }
        },
        children: [
            {
                path: '/user1',
                components: {
                    default: () => import('../components/A.vue')
                }
            },
            {
                path: '/user2',
                components: {
                    bbb: () => import('../components/B.vue'),
                    ccc: () => import('../components/C.vue')
                }
            }
        ]
    }
]
```
4. 别名 alias
```js
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('../views/root.vue'),
    alias: ['/aa', '/bb', '/cc'],
    children: [
      {
        path: 'a',
        components: {
          default: () => import('../views/A.vue'),
          B: () => import('../views/B.vue'),
          C: () => import('../views/C.vue')
        }
      },
      {
        path: 'b',
        components: {
          B: () => import('../views/B.vue'),
          C: () => import('../views/C.vue')
        }
      }
    ]
  }
]
```
### 8.导航守卫
#### (1)全局前置守卫
1. 登录后访问
```js
/**
 *
 * @param to Route 即将要进入的目标 路由对象
 * @param form Route 当前导航正要离开的路由
 * @param next 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)
 */

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  //前往首页无token跳转
  if (to.path === '/home' && !token) {
    next({
      path: '/login'
    })
  } else {
    next()
  }
})

```
2. 登录白名单页面访问
```js
const whileList = ['/login']
 
router.beforeEach((to, from, next) => {
    let token = localStorage.getItem('token')
    // 有token或者去白名单的地方
    if (whileList.includes(to.path) || token) {
        next()
    } else {
        next({
            path:'/login'
        })
    }
})
```
3. 登录黑名单页面禁止访问
```js
const blackList = ['/home']

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  // 有token或者去白名单的地方
  if (blackList.includes(to.path) && !token) {
    next({
      path: '/login'
    })
  } else {
    next()
  }
})

```
#### (2)全局后置守卫
1. 调用规则
```js
//全局后置守卫：初始化时执行、每次路由切换后执行
router.afterEach((to, from) => {
  console.log('afterEach', to, from)
})
```
2. 书写loadingBar插件样式(切换页面加载进度条)
```js
<template>
  <div class="wraps">
    <div ref="bar" class="bar"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
let speed = ref<number>(1)
let bar = ref<HTMLElement>()
let timer = ref<number>(0)
const startLoading = () => {
  let dom = bar.value as HTMLElement
  speed.value = 1
  timer.value = window.requestAnimationFrame(function fn() {
    if (speed.value < 90) {
      speed.value += 1
      // 设置进度条的宽度
      dom.style.width = speed.value + '%'
      // 递归调用
      timer.value = window.requestAnimationFrame(fn)
    } else {
      speed.value = 1
      // 清除
      window.cancelAnimationFrame(timer.value)
    }
  })
}

const endLoading = () => {
  let dom = bar.value as HTMLElement
  setTimeout(() => {
    window.requestAnimationFrame(() => {
      speed.value = 100
      dom.style.width = speed.value + '%'
    })
  }, 500)
}

defineExpose({
  startLoading,
  endLoading
})
</script>

<style scoped lang="less">
.wraps {
  position: fixed;
  top: 0;
  width: 100%;
  height: 2px;
  .bar {
    height: inherit;
    width: 0;
    background: blue;
  }
}
</style>

```
3. 书写loadingBar的方法
```js
import { render, type VNode } from 'vue'
import LoadingBar from './index.vue'
import { createVNode } from 'vue'
import router from '@/router'

export default {
  install() {
    // 变成div
    const Vnode: VNode = createVNode(LoadingBar)
    // 挂载
    render(Vnode, document.body)

    // 使用路由的方法进行全局挂载
    router.beforeEach((to, from, next) => {
      Vnode.component?.exposed?.startLoading()
      next()
    })

    router.afterEach(() => {
      Vnode.component?.exposed?.endLoading()
    })
  }
}

```
4. 使用插件
```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import LoadingBar from './plugins/LoadingBar'

const app = createApp(App)
// 使用插件
app.use(router).use(LoadingBar)
app.mount('#app')

```
### 9.路由元信息
1. 路由记录的 meta 属性可以定义路由的元信息
```
权限校验标识。
路由组件的过渡名称。
路由组件持久化缓存 (keep-alive) 的相关配置。
标题名称
```
2. 书写路由元信息
```js
const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    component: () => import('../views/home.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/login',
    component: () => import('../views/login.vue'),
    meta: {
      title: '登录'
    }
  }
]
```
3. 实现title显示页面信息
```js
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title: string
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    component: () => import('../views/home.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/login',
    component: () => import('../views/login.vue'),
    meta: {
      title: '登录'
    }
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

router.afterEach(to => {
  document.title = to.meta.title
})

export default router

```
### 10.路由过度动效的实现
1. 安装animate.css
2. 路由元信息添加动画效果
```js
declare module 'vue-router' {
  interface RouteMeta {
    title: string
    transition: string
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    component: () => import('../views/home.vue'),
    meta: {
      title: '首页',
      transition: 'animate__fadeInUp'
    }
  },
  {
    path: '/login',
    component: () => import('../views/login.vue'),
    meta: {
      title: '登录',
      transition: 'animate__bounceIn'
    }
  }
]
```
3. 使用路由插槽调用动画
```js
<template>
  <router-view #default="{ route, Component }">
    <transition
      :enter-active-class="`animate__animated ${route.meta.transition}`"
    >
      <Component :is="Component"></Component>
    </transition>
  </router-view>
</template>

```
### 11.路由滚动行为
1. 记录push后返回的滚动距离
2. 滚动行为记录
```js
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  // 滚动行为记录
  scrollBehavior: (to, from, savePosition) => {
    return savePosition ? savePosition : { top: 0 }
  },
  routes
})

router.afterEach(to => {
  document.title = to.meta.title
})

export default router

```
### 12.动态路由
#### (1)简单使用
1. 添加路由
```js
router.addRoute({ path: '/about', component: About })
```
2. 导航守卫中添加路由
```js
// 如果你决定在导航守卫内部添加或删除路由，你不应该调用 router.replace()
router.beforeEach(to => {
  if (!hasNecessaryRoute(to)) {
    router.addRoute(generateRoute(to))
    // 触发重定向
    return to.fullPath
  }
})
```
3. 删除路由
```js
// 名称冲突的路由。如果添加与现有途径名称相同的途径，会先删除路由，再添加路由


// 调用 router.addRoute() 返回的回调删除
const removeRoute = router.addRoute(routeRecord)
removeRoute() 

// 使用 router.removeRoute() 按名称删除路由
router.addRoute({ path: '/about', name: 'about', component: About })
router.removeRoute('about')
```
4. 添加嵌套路由
```js
router.addRoute({ name: 'admin', path: '/admin', component: Admin })
router.addRoute('admin', { path: 'settings', component: AdminSettings })
```
5. 查看现有路由信息
```js
router.hasRoute()：检查路由是否存在。
router.getRoutes()：获取一个包含所有路由记录的数组。
```
#### (2)简单实现权限管理
1. 安装express
```js
yarn add @types/express
yarn add express
```
2. 服务端返回动态路由
```js
// import express from 'express'
// eslint-disable-next-line no-undef
const express = require('express')
const app = express()
app.get('/login', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  if (req.query.user === 'admin' && req.query.password === '123456') {
    res.json({
      route: [
        {
          path: '/demo1',
          name: 'Demo1',
          component: 'demo1.vue'
        },
        {
          path: '/demo2',
          name: 'Demo2',
          component: 'demo2.vue'
        },
        {
          path: '/demo3',
          name: 'Demo3',
          component: 'demo3.vue'
        }
      ]
    })
  } else if (req.query.user === 'admin1' && req.query.password === '123456') {
    res.json({
      route: [
        {
          path: '/demo1',
          name: 'Demo1',
          component: 'demo1.vue'
        },
        {
          path: '/demo2',
          name: 'Demo2',
          component: 'demo2.vue'
        }
      ]
    })
  } else {
    res.json({
      code: 400,
      message: '账号密码错误'
    })
  }
})
app.listen(9000)

```
3. 登录页面发送请求动态添加路由
```js
<template>
  <div>
    <h1>登录</h1>
    <form>
      user:<input type="text" v-model="userinfo.user" /><br />
      password:<input
        type="password"
        autocomplete="tel"
        v-model="userinfo.password"
      /><br />
    </form>
    <button @click="login">登录</button>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userinfo = reactive({
  user: '',
  password: ''
})
const login = () => {
  const ajax = new XMLHttpRequest()
  ajax.open(
    'get',
    `http://localhost:9000/login?user=${userinfo.user}&password=${userinfo.password}`
  )
  ajax.send()
  ajax.onreadystatechange = function () {
    if (ajax.readyState == 4 && ajax.status == 200) {
      console.log(JSON.parse(ajax.responseText).route) //输入相应的内容
      JSON.parse(ajax.responseText).route.forEach((item: any) => {
        router.addRoute({
          path: item.path,
          name: item.name,
          component: () => import(`../components/${item.component}`)
        })
        router.push('/home')
      })
    }
  }
}
</script>

<style scoped lang="less"></style>

```
4. 主页显示；路由跳转
```js
<template>
  <div>
    <h1>首页</h1>
    <router-link to="/demo1">demo1</router-link>
    <router-link to="/demo2">demo2</router-link>
    <router-link to="/demo3">demo3</router-link>
  </div>
</template>

```







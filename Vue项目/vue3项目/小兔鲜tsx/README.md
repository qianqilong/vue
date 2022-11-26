## vuex的持久化
1.安装```yarn add vuex-persistedstate```<br>
2.引入到主仓库中
```js
import { createStore } from 'vuex'
+import createPersistedstate from 'vuex-persistedstate'

import user from './modules/user'
import cart from './modules/cart'
import cart from './modules/category'

export default createStore({
  modules: {
    user,
    cart,
    category
  },
+  plugins: [
+    createPersistedstate({
+      key: 'erabbit-client-pc-store',
+      paths: ['user', 'cart']
+    })
+  ]
})
```
## vuex仓库类型确定
```js
import { createStore } from 'vuex'
import cart from './modules/cart'
import user from './modules/user'
import category from './modules/category'
import createPersistedstate from 'vuex-persistedstate'
interface profileInterface{
  id: string,
  avatar: string,
  nickname: string,
  account: string,
  mobile: string,
  token: string,
}
interface userInterface{
  profile:profileInterface
}
interface TypeRootState {
  user:userInterface
}
export default createStore<TypeRootState>({
  modules: {
    cart, user, category
  },
  plugins: [
    createPersistedstate({
      key: 'erabbit-client-pc-store',
      paths: ['user', 'cart']
    })
  ]
})

```
## 封装请求库TS
1.创建axios实例
```js
import axios from 'axios'
export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
const ajax = axios.create({
  baseURL,
  timeout: 5000
})
```
2.请求拦截器，如果有token进行头部携带(ts问题 config.headers对象可能为“未定义”,类型断言)
```js
ajax.interceptors.request.use((config) => {
    // 类型断言
  if (!config) {
    config = {}
  }
  if (!config.headers) {
    config.headers = {}
  }
  // 如果有token进行头部携带
  const profile = store.state.user.profile
  if (profile.token) {
    config.headers.Authorization = `Bearer ${profile.token}`
  }
  return config
}, err => {
  return Promise.reject(err)
})

```
3.响应拦截器：1. 剥离无效数据  2. 处理token失效
```js
// 响应拦截器
ajax.interceptors.response.use(res =>
  res.data, err => {
  // 401跳转token过期
  if (err.response && err.response.status === 401) {
    // 清除token
    store.commit('user/setUser', {})
    //    js模块中router.currentRoute.value.fullPath就是当前路由地址
    // 存储跳转之前页面
    const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
    // 跳转到登录页
    router.push('/login?redirectUrl=' + fullPath)
  }
  return Promise.reject(err)
})

```
4.导出一个函数，调用当前的axsio实例发请求，返回值promise
```js
interface ajaxinterface{
  url:string,
  method:string,
  params?:object,
  data?:object
}
// 导出一个函数，调用当前的axsio实例发请求，返回值promise
export default (request:ajaxinterface) => {
  return ajax(request)
}

```
## vue中使用tsx的样式隔离
1.声明样式类型
```js
//  在*.d.ts中加入
declare module '*.module.less' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
declare module '*.less'
```
2.引入样式命名
```js
// 不同于react的jsx中命名为className,vuejsx中直接使用class
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import app from './App.module.less'
export default defineComponent({
  name: 'App',
  setup () {
    return () =>
      (
      <div class={app.main}>
       <RouterView/>
      </div>
      )
  }
})

```
3.默认样式的清除```yarn add normalize.css```
## jsx拿数据写嵌套循环
第二次循环要先判断数据有没有到，然后在遍历
```js
  return () => (
      <ul class="app-header-nav">
      <li class="home"><RouterLink to="/">首页</RouterLink></li>
      {
        list.value.map((item:any) => {
          return (
            <li key={item.id}>
        <a href="#">{item.name}</a>
        {
          item.children
            ? <div class="layer">
          <ul>
            {
              item.children.map((sub:any) => {
                return <li key={sub.id}>
                <a href="#">
                  <img src={sub.picture} alt=""/>
                  <p>{sub.name}</p>
                </a>
              </li>
              })
            }
          </ul>
        </div>
            : <div class="layer"></div>
        }

      </li>
            )
        })
      }
    </ul>

    )
```
## VueUse插件
1.安装```yarn add @vueuse/core@4.9.0```
2.操作(获取页面滚动距离)
```js
// 传统
const Y = ref(0)
    // 滚动时更新
    onMounted(() => {
      window.onscroll = () => {
        const scrollTop = document.documentElement.scrollTop
        Y.value = scrollTop
      }
    })
// 插件
 setup () {
    const { Y } = useWindowScroll()
 }
```
## Vue中JSX中各种样式
1.class中多个样式
```jsx
class={`carousel-item ${index.value === i ? 'fade' : ''}`}
```
2.style中加多个样式
```jsx
 <h2 style={{display:(isLogin?"block":"none")}}>v-show效果</h2>
style={{ height: props.height, width: props.width }}
```
## 封装轮播图
1.jsx的封装
```js
import { defineComponent, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import './xtx-carousel.less'
export default defineComponent({
  name: 'XtxCarousel',
  props: {
    sliders: {
      type: Array,
      default: () => []
    },
    duration: {
      type: Number,
      default: 3000
    },
    autoPlay: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const index = ref(0)
    // 自动播放
    let timer:any = null
    // 播放的定时器
    const autoPlayFn = () => {
      clearInterval(timer)
      timer = setInterval(() => {
        index.value++
        if (index.value >= props.sliders.length) {
          index.value = 0
        }
      }, props.duration)
    }
    // 有数据&开启自动播放，才调用自动播放函数
    watch(() => props.sliders, (newVal) => {
      if (newVal.length && props.autoPlay) {
        index.value = 0
        autoPlayFn()
      }
    }, { immediate: true })
    return () => (
   <div class='xtx-carousel'>
    <ul class="carousel-body" >
    {
      props.sliders
        ? props.sliders.map((item:any, i:number) => {
          return (
      <li key={i} class={`carousel-item ${index.value === i ? 'fade' : ''}`}>
        <RouterLink to="/">
          <img src={item.imgUrl} alt=""/>
        </RouterLink>
      </li>
          )
        })
        : ''
    }
</ul>
    <a href="javascript:;" class="carousel-btn prev"><i class="iconfont icon-angle-left" onClick={() => { index.value-- }}></i></a>
    <a href="javascript:;" class="carousel-btn next"><i class="iconfont icon-angle-right" onClick={() => { index.value++ }}></i></a>
    <div class="carousel-indicator">
    {
      props.sliders
        ? props.sliders.map((item:any, i:number) => {
          return (
            <span class={index.value === i ? 'active' : ''} key={i} onClick={() => { index.value = i }}></span>
          )
        })
        : ''
    }
    </div>
  </div>
    )
  }
})
```
2.vue文件的封装
```js
<template>
  <div class='xtx-carousel'>
    <ul class="carousel-body">
     <li class="carousel-item" v-for="(item,i) in sliders" :key="i" :class="{fade:index===i}">
        <RouterLink to="/">
         <img :src="item.imgUrl" alt="">
        </RouterLink>
      </li>
    </ul>
    <a href="javascript:;" class="carousel-btn prev"><i class="iconfont icon-angle-left"></i></a>
    <a href="javascript:;" class="carousel-btn next"><i class="iconfont icon-angle-right"></i></a>
    <div class="carousel-indicator">
     <span v-for="(item,i) in sliders" :key="i" :class="{active:index===i}"></span>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
export default {
  name: 'XtxCarousel',
  props: {
    sliders: {
      type: Array,
      default: () => []
    },
    duration: {
      type: Number,
      default: 3000
    },
    autoPlay: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    // 默认显示的图片的索引
    const index = ref(0)
    // 自动播放
    let timer = null
    const autoPlayFn = () => {
      clearInterval(timer)
      timer = setInterval(() => {
        index.value++
        if (index.value >= props.sliders.length) {
          index.value = 0
        }
      }, props.duration)
    }
    watch(() => props.sliders, (newVal) => {
      // 有数据&开启自动播放，才调用自动播放函数
      if (newVal.length && props.autoPlay) {
        index.value = 0
        autoPlayFn()
      }
    }, { immediate: true })
    return { index }
  }
}
</script>
```
## vue中jsx的具名插槽
1.占位组件
```js
 setup (props, { slots }) {
    console.log(slots.default)
    return () => (
        <div class="home-panel">
        <div class="container">
          <div class="head">
            <h3>{ props.title }<small>{ props.subTitle }</small></h3>
            {/* 具名插槽站位 */}
            {slots.right?.()}
          </div>
           {/* 默认插槽站位 */}
          {slots.default?.()}
        </div>
        </div>
    )
  }
```
2.传递组件的组件
```jsx
 setup () {
    return () => (
<div class="home-new">
<HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱"v-slots={{
  right: () => (
        <XtxMore path="/" />
  ),
  default: () => (
    <ul class="goods-list">
        <li>
            <RouterLink to="/">
                <img src="" alt="" />
                <p class="name ellipsis">221</p>
                <p class="price">122</p>
            </RouterLink>
        </li>
    </ul>
  )
}}>
{/* 具名插槽 */}

  {/* 普通插槽 */}

</HomePanel>
</div>
    )
  }
```
## vueUse中数据懒加载的封装
```js
// hooks 封装逻辑，提供响应式数据。
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'
// 数据懒加载函数
export const uselazyData = (dom: any, api: any) => {
  const result = ref([])
  // 观察的dom
  // 获取数据的API
  const { stop } = useIntersectionObserver(
    dom,
    ([{ isIntersecting }], observerElement) => {
      // 进入可视区停止劫持
      if (isIntersecting) {
        stop()
        api().then((data:any) => {
          result.value = data.result
        })
      }
      dom.value = isIntersecting
    }
  )
  return result
}

```
## 图片懒加载的封装
1.封装图片懒加载
```js
export const defineDirective = (app:any) => {
  // 图片懒加载指令
  app.directive('lazyload', {
    mounted (el:any, binding:any) {
      const observer = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
          observer.unobserve(el)
          el.onerror = () => {
            el.src = defaultImg
          }
          el.src = binding.value
        }
      }, {
        threshold: 0.01
      })
      observer.observe(el)
    }
  })
}
```
2.注册插件
```js
import { defineDirective } from './photo'
export default {
  // eslint-disable-next-line @typescript-eslint/ban-types
  install (app: any) {
    defineDirective(app)
  }
}
```
## 面包屑导航的封装
1.面包屑导航Item
```js
import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'
export default defineComponent({
  name: 'XtxBread',
  props: {
    to: {
      type: String
    }
  },
  setup (props:any, { slots }) {
    return () => (
       <div class="xtx-bread-item">
           <RouterLink to={props.to}>
          {slots.default?.()}
          </RouterLink>
       </div>
    )
  }
})
```
2.面包屑导航List
```js
import { defineComponent, h } from 'vue'
import './xtx-bread.less'
export default defineComponent({
  name: 'XtxBread',
  render () {
    const slots:any = this.$slots
    const items = slots.default()
    const dymanicItems:any = []
    items?.forEach((item:any, i:any) => {
      dymanicItems.push(item)
      if (i < (items.length - 1)) {
        dymanicItems.push(h('i', { class: 'iconfont icon-angle-right' }))
      }
    })
    return h('div', { class: 'xtx-bread' }, dymanicItems)
  }
})
```
3.面包屑导航的使用
```html
 <XtxBread>
      <XtxBreadItem to="/">首页</XtxBreadItem>
      <XtxBreadItem to="/category/1005000">电器</XtxBreadItem>
      <XtxBreadItem >空调</XtxBreadItem>
  </XtxBread>
```
## 下拉加载的封装
```js
import { defineComponent, ref } from 'vue'
import './xtx-infinite-loading.less'
import { useIntersectionObserver } from '@vueuse/core'
export default defineComponent({
  name: 'XtxInfiniteLoading',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    finished: {
      type: Boolean,
      default: false
    }
  },
  emits: ['Infinite'],
  setup (props, { emit }) {
    const container = ref(null)
    useIntersectionObserver(
      container,
      ([{ isIntersecting }], dom) => {
        if (isIntersecting) {
          if (props.loading === false && props.finished === false) {
            emit('Infinite')
          }
        }
      },
      {
        threshold: 0
      }
    )
    return () => (
        <div class="xtx-infinite-loading" ref={container}>
            {
                props.loading === true
                  ? <div class="loading">
                <span class="img"></span>
                <span class="text">正在加载...</span>
              </div>
                  : <div class="none">
                <span class="img"></span>
                <span class="text">亲，没有更多了</span>
              </div>
            }

        </div>
    )
  }
})
```
## 分页组件的封装
```jsx
import { computed, defineComponent } from 'vue'
import './good-pagination.less'
export default defineComponent({
  name: 'GoodPagination',
  props: {
    pageNo: {
      type: Number,
      default: 1 // 第几页
    },
    pageSize: {
      type: Number,
      default: 3 // 一页多少数据
    },
    total: {
      type: Number,
      default: 30 // 总页数
    },
    continues: {
      type: Number,
      default: 5 // 展示页数
    }
  },
  setup (props:any, { emit }) {
    const arr:any = []
    // 总的页码数
    const totalpage = computed(() => {
      return Math.ceil(props.total / props.pageSize)
    })
    // 计算起始数据和结束数据
    const startNumAndEndNum = computed(() => {
      let start = 0; let end = 0
      // 页码不够时，如只要5页
      if (props.continues > totalpage.value) {
        start = 1
        end = totalpage.value
      } else { // 正常现象
        start = props.pageNo - (props.continues / 2)
        end = props.pageNo + (props.continues / 2)
        //  start出现不正常现象
        if (start < 1) {
          start = 1
          end = parseInt(props.continues)
        } else if (end > totalpage.value) {
          start = totalpage.value - props.continues + 1
          end = totalpage.value
        }
      }
      return { start, end }
    })
    // 要循环的数据
    console.log(totalpage.value)
    for (let n = 0; n < startNumAndEndNum.value.end; n++) {
      arr[n] = n + 1
    }

    return () => (
<div class="pagination">
<button disabled={props.pageNo === 1} onClick={() => emit('getPageNo', props.pageNo - 1)}>上一页</button>
{
    startNumAndEndNum.value.end !== 0
      ? <button style={{ display: (startNumAndEndNum.value.start >= 2 ? '' : 'none') }} onClick={() => emit('getPageNo', 1)}>1</button>
      : ''
}
{
    startNumAndEndNum.value.end !== 0
    //
      ? <button style={{ display: (startNumAndEndNum.value.start > 2 ? '' : 'none') }}>···</button>
      : ''
}
{
  startNumAndEndNum.value.end !== 0
    ? arr.map((item:any) => {
      return <button style={{ display: (item >= startNumAndEndNum.value.start ? '' : 'none') }} class={`${item === props.pageNo ? 'active' : ''}`} onClick={() => emit('getPageNo', item)}>{item}</button>
    })
    : ''
}
{
   startNumAndEndNum.value.end !== 0
     ? <button style={{ display: (startNumAndEndNum.value.end < totalpage.value - 1 ? '' : 'none') }} >···</button>
     : ''
}
{
    startNumAndEndNum.value.end !== 0
      ? <button style={{ display: (startNumAndEndNum.value.end < totalpage.value ? '' : 'none') }} onClick={() => emit('getPageNo', totalpage.value)}>{ totalpage.value }</button>
      : ''
}
<button disabled={props.pageNo === totalpage.value} onClick={() => emit('getPageNo', props.pageNo + 1)}>下一页</button>
<button style="margin-left: 30px">共 { props.total } 条</button>
</div>
    )
  }
})

```
## 访问模块数据访问其他模块数据
```ctx.rootState.user.profile.token```
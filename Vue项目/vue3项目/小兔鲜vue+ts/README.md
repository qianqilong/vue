## 组件，指令，插件的封装
### 1.pinia持久化和模块
1. 封装pinia持久化
```js
import { createPinia, type PiniaPluginContext } from 'pinia'
import { toRaw } from 'vue'

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
  return (context: PiniaPluginContext) => {
    const { store } = context
    // 获取本地存储的值
    const data = getStoreage(`${options?.key ?? 'qql'}-${store.$id}`)
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

export default store

```
2. mian.ts中导入pinia持久化
```js
...
import './assets/styles/common.less'

const app = createApp(App)

app.use(store).use(router)
...

```
3. 创建主模块
```js
import store from '../utils/pinia-persistence'

const useStore = () => ({

})

export default useStore

```
4. 创建其他模块
```js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: '1'
    }
  },
  getters: {},
  actions: {}
})

```
5. 引入模块并使用store实例
```js
import { useUserStore } from './module/user'
import store from '../utils/pinia-persistence'
import { useCategoryStore } from './module/category'

const useStore = () => ({
  user: useUserStore(store),
  category: useCategoryStore(store)
})

export default useStore

```
### 2.封装axios
1. 由于接口返回类型是```{code: string,msg: string,result: T}```添加类型
```js
// api.d.ts
interface Response<T> {
  code: string
  msg: string
  result: T
}
```
2. 扩展AxiosResponse类型(让其可以解构出result)
```js
import axios from 'axios'

declare module 'axios' {
  export interface AxiosResponse<T = any> extends Response<D> {}
}
```
3. 封装axios(泛型对应返回值类型)
```js
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import useStore from '@/stores'
import axios from 'axios'
import router from '@/router'

// const { user } = useStore()
export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
class ajaxService {
  private ajax!: AxiosInstance
  constructor() {
    this.ajax = axios.create({
      baseURL,
      timeout: 5000
    })
    this.addInterceptors(this.ajax)
  }
  // 请求函数
  async request<T>(
    config: AxiosRequestConfig
  ): Promise<AxiosResponse<Response<T>, any> | Awaited<T>> {
    const data = await this.ajax.request<Response<T>>(config)
    if (data.code === '1') {
      return data.result
    }
    return data
  }
  // 拦截器
  private addInterceptors(ajax: AxiosInstance) {
    // 请求拦截器
    ajax.interceptors.request.use(config => {
      const { user } = useStore()
      // 添加token
      const token = user.token
      if (token) {
        // vue3 typescript 封装axios ,实例拦截时报错(property) AxiosRequestConfig<any>.headers?: AxiosRequestHeaders ...
        // 对headers进行判断如果没有就什么都不干
        config.headers ? (config.headers.Authorization = `Bearer ${token}`) : ''
      }
      return config
    })

    // 响应拦截器
    ajax.interceptors.response.use(
      res => res.data,
      err => {
        if (err.response && err.response.status === 401) {
          const { user } = useStore()
          // 清空token
          user.token = ''
          // 获取跳转登录页面前的路由xingx
          const fullPath = encodeURIComponent(
            router.currentRoute.value.fullPath
          )
          router.push('/login?redirectUrl=' + fullPath)
        }
        return Promise.reject(err)
      }
    )
  }
}

export const ajax = new ajaxService()
// 在使用ajax时传入一个泛型进行来对应返回值data的类型

// 在使用ajax时传入一个泛型进行来对应返回值data的类型

```
4. 简单使用
```js
<template>
  <button @click="req">button</button>
</template>

<script setup lang="ts">
import { ajax } from './utils/ajax'

interface A {
  id: string
  picture: string
  title: string
  alt: string
}

const req = async () => {
  const a = await ajax.request<A[]>({
    url: 'home/hot',
    method: 'GET'
  })
  console.log(a)
}
</script>


```
5. axios封装时使用pinia注意点
```
使用pinia时要放入拦截器中，否则会报错
```
### 3.vite引入全局less变量
```js
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
 ...
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `@import "${path.resolve(
          __dirname,
          'src/assets/styles/variables.less'
        )}";`
      }
    }
  }
})

```
### 4.样式的重置
1. 添加normalize.css
```js
 yarn add normalize.css
 import 'normalize.css'
```
2. 写入常用的样式重置
```js
// 重置样式
* {
  box-sizing: border-box;
 }
 
 html {
   height: 100%;
   font-size: 14px;
 }
 body {
   height: 100%;
   color: #333;
   min-width: 1240px;
   font: 1em/1.4 'Microsoft Yahei', 'PingFang SC', 'Avenir', 'Segoe UI', 'Hiragino Sans GB', 'STHeiti', 'Microsoft Sans Serif', 'WenQuanYi Micro Hei', sans-serif
 }
 
 ul,
 h1,
 h3,
 h4,
 p,
 dl,
 dd {
   padding: 0;
   margin: 0;
 }
 
 a {
   text-decoration: none;
   color: #333;
   outline: none;
 }
 
 i {
   font-style: normal;
 }
 
 input[type="text"],
 input[type="search"],
 input[type="password"], 
 input[type="checkbox"]{
   padding: 0;
   outline: none;
   border: none;
   -webkit-appearance: none;
   &::placeholder{
     color: #ccc;
   }
 }
 
 img {
   max-width: 100%;
   max-height: 100%;
   vertical-align: middle;
 }
 
 ul {
   list-style: none;
 }
 
 #app {
   background: #f5f5f5;
   user-select: none;
 }
 
 .container {
   width: 1240px;
   margin: 0 auto;
   position: relative;
 }
 
 .ellipsis {
   white-space: nowrap;
   text-overflow: ellipsis;
   overflow: hidden;
 }
 
 .ellipsis-2 {
   word-break: break-all;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-box-orient: vertical;
   -webkit-line-clamp: 2;
   overflow: hidden;
 }
 
 .fl {
   float: left;
 }
 
 .fr {
   float: right;
 }
 
 .clearfix:after {
   content: ".";
   display: block;
   visibility: hidden;
   height: 0;
   line-height: 0;
   clear: both;
 }
```
3. main.ts中引入
```js
import './assets/styles/common.less'
```
### 5.封装全局组件骨架
1. 样式
```js
<template>
  <div class="xtx-skeleton" :style="{ width: props.width, height: props.height }" :class="{ shan: props.animated }">
    <!-- 1 盒子-->
    <div class="block" :style="{ backgroundColor: props.bg }"></div>
    <!-- 2 闪效果 xtx-skeleton 伪元素 --->
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'
// 使用的时候需要动态设置 高度，宽度，背景颜色，是否闪下
const props = defineProps({
  bg: {
    type: String,
    default: '#efefef',
  },
  width: {
    type: String,
    default: '100px',
  },
  height: {
    type: String,
    default: '100px',
  },
  animated: {
    type: Boolean,
    default: false,
  },
})
</script>
<style scoped lang="less">
.xtx-skeleton {
  display: inline-block;
  position: relative;
  overflow: hidden;
  vertical-align: middle;
  .block {
    width: 100%;
    height: 100%;
    border-radius: 2px;
  }
}
.shan {
  &::after {
    content: '';
    position: absolute;
    animation: shan 1.5s ease 0s infinite;
    top: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      to left,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: skewX(-45deg);
  }
}
@keyframes shan {
  0% {
    left: -100%;
  }
  100% {
    left: 120%;
  }
}
.xtx-skeleton {
  animation: fade 1s linear infinite alternate;
}
@keyframes fade {
  from {
    opacity: 0.2;
  }
  to {
    opacity: 1;
  }
}
</style>

```
2. 全局注册
```js
...
import Globalskeleton from './components/global/global-skeleton.vue'

const app = createApp(App)

app.use(store).use(router).component('Globalskeleton', Globalskeleton)
app.mount('#app')

```
3. 使用
```js
 <Globalskeleton width="60px" height="18px" style="margin-right: 5px" bg="rgba(255,255,255,0.2)" />
 <Globalskeleton width="50px" height="18px" bg="rgba(255,255,255,0.2)" />
```
### 6.封装全局组件轮播图
1. 样式和逻辑的实现
```js
<template>
  <div class="xtx-carousel" @mouseenter="stop" @mouseleave="start">
    <ul class="carousel-body">
      <slot></slot>
    </ul>
    <a class="carousel-btn prev"><i class="iconfont icon-angle-left" @click="prevFn"></i></a>
    <a class="carousel-btn next"><i class="iconfont icon-angle-right" @click="nestFn"></i></a>
    <div class="carousel-indicator">
      <span
        v-for="i in props.length"
        :key="i"
        :class="{ active: props.index === i - 1 }"
        @click="pointFn(i - 1)"></span>
    </div>
  </div>
</template>

<script lang="ts" setup>
/**
 * index:第几个图片
 * length:图片数组的长度
 * autoPlay:是否开启自动播放
 * time:自动播放切换时间
 */
const props = defineProps({
  index: {
    type: Number,
    default: 1,
  },
  length: {
    type: Number,
    default: 5,
  },
  autoPlay: {
    type: Boolean,
    default: false,
  },
  time: {
    type: Number,
    default: 3000,
  },
})
/**
 * 点击左右按键
 */
const emit = defineEmits(['prevFn', 'nestFn', 'pointFn'])

// 点击prev
const prevFn = () => {
  let index = props.index
  index = index - 1
  if (index < 0) index = props.length - 1
  emit('prevFn', index)
}

// 点击nest
const nestFn = () => {
  let index = props.index
  index = index + 1
  if (index > props.length - 1) index = 0
  emit('nestFn', index)
}

// 点击点
const pointFn = (index: number) => {
  emit('nestFn', index)
}

let timer = 0 // 定时器
// 自动播放
const autoPlayFn = () => {
  clearInterval(timer)
  timer = setInterval(() => {
    nestFn()
  }, props.time)
}

// 判断是否开启自动播放
if (props.autoPlay === true) {
  autoPlayFn()
}

// 鼠标移上停止
const stop = () => {
  if (timer !== 0) {
    clearInterval(timer)
  }
}

// 鼠标松开开始
const start = () => {
  if (props.autoPlay) {
    autoPlayFn()
  }
}
</script>
<style scoped lang="less">
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }
    :slotted(&-item) {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      :slotted(&.fade) {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>

```
2. 全局注册
```js
...
import Globalcarousel from './components/global/global-carousel.vue'

const app = createApp(App)

app.use(store).use(router).component('Globalskeleton', Globalskeleton).component('Globalcarousel', Globalcarousel)
app.mount('#app')

```
3. 使用轮播图
```js
<template>
  <div class="home-banner">
    <!--
index:第几个图片
length:图片数组的长度
autoPlay:是否开启自动播放
time:自动播放切换时间

@prevFn:点击上一个按键(传递一个参数改变index)
@nestFn:点击下一个按键(传递一个参数改变index)
@@pointFn:点击下面的点(传递一个参数改变index)

#bann:作用域插槽的名称
      -->
    <Globalcarousel
      :index="index"
      :length="category.bannerList.length"
      :autoPlay="true"
      :time="+2000"
      @prevFn="changeFn"
      @nestFn="changeFn"
      @pointFn="changeFn">
    
        <!-- 插槽中的图片 ,可以封装成一个单独的组件-->
        <li
          class="carousel-item"
          v-for="(item, i) in category.bannerList"
          :key="item.id"
          :class="{ fade: index === i }">
          <router-link :to="item.hrefUrl">
            <img :src="item.imgUrl" alt="" />
          </router-link>
        </li>
      
    </Globalcarousel>
  </div>
</template>
<script lang="ts" setup>
import useStore from '@/stores'
import { ref } from 'vue'

// 第几张轮播图
const index = ref(0)
// pinia的实例
const { category } = useStore()
// 改变index
const changeFn = (i: number) => {
  index.value = i
}
</script>
<style scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
}
</style>

```
### 7.使用异步组件
1. 组件中发请求时使用await
```js
<template>
  <HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
    <ul ref="pannel" class="goods-list">
      <li v-for="item in HotList" :key="item.id">
        <RouterLink to="/">
          <img :src="item.picture" alt="" />
          <p class="name">{{ item.title }}</p>
          <p class="desc">{{ item.alt }}</p>
        </RouterLink>
      </li>
    </ul>
  </HomePanel>
</template>

<script lang="ts" setup>
import HomePanel from './components/home-panel.vue'
import { getHotAPI } from '@/api'

const HotList = await getHotAPI()
</script>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>

```
2. 使用组件时要异步引入
```js
<template>
  <div class="page-home">
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <homeCategoryVue />
        <!-- 轮播图 -->
        <HomeBanner />
        <!-- 异步组件
             新鲜好物 
             人气推荐  -->
        <Suspense>
          <template #default>
            <div>
              <HomeNewVue />
              <HomeHotVue />
            </div>
          </template>
          <template #fallback>
            <div>
              <HomeLoading />
              <HomeLoading />
            </div>
          </template>
        </Suspense>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="Home">
import homeCategoryVue from '@/components/home/home-category.vue'
import HomeBanner from '@/components/home/home-banner.vue'
import HomeLoading from '@/components/home/components/home-loading.vue'
import { defineAsyncComponent } from 'vue'

// homeNewVue是异步组件要用异步的方法进行引入
const HomeNewVue = defineAsyncComponent(() => import('@/components/home/home-new.vue'))
const HomeHotVue = defineAsyncComponent(() => import('@/components/home/home-hot.vue'))
</script>

<style scoped lang="less"></style>

```
### 8.数据懒加载的实现
1. 了解使用 @vueuse/core 中的 useIntersectionObserver
```js
// stop 是停止观察是否进入或移出可视区域的行为    
const { stop } = useIntersectionObserver(
  // target 是观察的目标dom容器，必须是dom容器，而且是vue3.0方式绑定的dom对象
  target,
  // isIntersecting 是否进入可视区域，true是进入 false是移出
  // observerElement 被观察的dom
  ([{ isIntersecting }], observerElement) => {
    // 在此处可根据isIntersecting来判断，然后做业务
  },
)
```
2. 封装数据懒加载的hooks
```js
// 数据懒加载
/**
 * @param target 观察的dom
 * @param callback 获取数据的回调函数
 * @T 传递的数据的泛型
 * @returns 获取的数据列表
 */
export function useLazyData<T>(target: MaybeElementRef<MaybeElement>, callback: Function) {
  const List = ref() as Ref<T>
  const { stop } = useIntersectionObserver(
    // 观察的目标dom容器
    target,
    // isIntersecting 是否进入可视区域
    async ([{ isIntersecting }]) => {
      if (isIntersecting) {
        stop()
        List.value = await callback()
      }
    },
  )
  return { List }
}

```
3. 使用数据懒加载的hooks
```js
<template>
 ....
</template>
<script lang="ts" setup>
import HomePanel from './components/home-panel.vue'
import type { NewResult } from '@/api/types/index'
import { getNewAPI } from '@/api'
import { ref } from 'vue'
import { useLazyData } from '@/hooks'

// 观察的dom
const box = ref(null)

// 传递观察的dom和获取数据的请求
const NewList = useLazyData<Array<NewResult>>(box, getNewAPI).List
</script>


```
### 9.图片懒加载的实现
1. 了解IntersectionObserver
```js
// 创建观察对象实例
const observer = new IntersectionObserver(callback[, options])
// callback 被观察dom进入可视区离开可视区都会触发
// - 两个回调参数 entries , observer
// - entries 被观察的元素信息对象的数组 [{元素信息},{}]，信息中isIntersecting判断进入或离开
// - observer 就是观察实例
// options 配置参数
// - 三个配置属性 root rootMargin threshold
// - root 基于的滚动容器，默认是document
// - rootMargin 容器有没有外边距
// - threshold 交叉的比例

// 实例提供两个方法
// observe(dom) 观察哪个dom
// unobserve(dom) 停止观察那个dom
```
2. 图片懒加载指令
```js
import type { App } from 'vue'
import defaultImg from '@/assets/images/200.png'

export const defineDirective = (app: App) => {
  app.directive('lazyload', {
    mounted(el, binding) {
      const observer = new IntersectionObserver(
        // // isIntersecting 是否进入可视区域，true是进入 false是移出
        ([{ isIntersecting }]) => {
          if (isIntersecting) {
            // 停止观察
            observer.unobserve(el)
            // 发生错误
            el.onerror = () => {
              el.src = defaultImg
            }
            el.src = binding.value
          }
        },
        {
          threshold: 0.01,
        },
      )
      //   观察指令挂载的dom
      observer.observe(el)
    },
  })
}

```
3. 全局挂载
```js
...
import { defineDirective } from './directive'

const app = createApp(App)

...
defineDirective(app)
app.mount('#app')

```
### 10.面包屑的封装
1. h函数
```js
h 接收三个参数
1.type 元素的类型
2.propsOrChildren 数据对象, 这里主要表示(props, attrs, dom props, class 和 style)
3.children 子节点
```
2. 封装面包屑的item
```js
<template>
  <div class="xtx-bread-item">
    <RouterLink :to="to"><slot /></RouterLink>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  to: {
    type: String,
    default: '/',
  },
})
</script>

```
3. 用render和h拼接
```js
<script lang="ts">
import { h } from 'vue'

export default {
  name: 'XtxBread',
  render<T extends { $slots: { default: Function } }>(this: T) {
    // 插槽中的值
    const items = this.$slots.default()
    // v-if的模块也会加入>,去掉图标
    if (items.some((item: any) => item.children === 'v-if')) {
      items.pop()
    }
    const dymanicItems = [] as any[]
    items.forEach((item: any, i: number) => {
      let length = items.length
      // 导入原来的插槽文件
      dymanicItems.push(item)
      //   更据插槽中的值渲染 图标
      if (i < length - 1) {
        dymanicItems.push(h('i', { class: 'iconfont icon-angle-right' }))
      }
    })
    return h('div', { class: 'xtx-bread' }, dymanicItems)
  },
}
</script>

<style lang="less">
// 去除 scoped 属性，目的：然样式作用到xtx-bread-item组件
.xtx-bread {
  display: flex;
  padding: 25px 10px;
  // ul li:last-child {}
  // 先找到父元素，找到所有的子元素，找到最后一个，判断是不是LI，是就是选中，不是就是无效选择器
  // ul li:last-of-type {}
  // 先找到父元素，找到所有的类型为li的元素，选中最后一个
  &-item {
    a {
      color: #666;
      transition: all 0.4s;
      &:hover {
        color: @xtxColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
    // 样式的方式，不合理
    // &:last-child {
    //   display: none;
    // }
  }
}
</style>


```
4. 全局注册
···
### 11.复习v-model
1. 实现简单的选择框组件
```js
<!-- 选择框的实现 -->
<template>
  <div class="xtx-checkbox" @click="changeCheck">
    <i v-if="modelValue" class="iconfont icon-checked"></i>
    <i v-else class="iconfont icon-unchecked"></i>
    <span v-if="$slots.default"><slot /></span>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{ (e: 'update:modelValue', flag: boolean): void }>()

const changeCheck = () => {
  emit('update:modelValue', !props.modelValue)
}
</script>
<style scoped lang="less">
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: @xtxColor;
    ~ span {
      color: @xtxColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>

```
2. 使用组件
```js
<template>
  ...
  <categoryCheckedVue v-model="flag" />
</template>

<script setup lang="ts">
...
import categoryCheckedVue from '@/components/home/category/category-checked.vue'

const flag = ref(true)
</script>

```
### 12.检测触底的两种方法(触底加载事件)
#### 1.@vueuse/core中的useIntersectionObserver
1. 代码实现
```js
<template>
  <div class="xtx-infinite-loading" ref="box">
    <div class="loading" v-if="loading">
      <span class="img"></span>
      <span class="text">正在加载...</span>
    </div>
    <div class="none" v-if="finished">
      <span class="img"></span>
      <span class="text">亲，没有更多了</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, type Ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const emit = defineEmits<{ (e: 'infinite'): void }>()
const props = defineProps<{ loading: boolean; finished: boolean }>()
const box = ref(null)

useIntersectionObserver(
  // 观察目标
  box,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
       if (props.loading === false && props.finished === false) {
        emit('infinite')
      }
    }
  },
)

</script>

<style scoped lang="less">
.xtx-infinite-loading {
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    .img {
      width: 50px;
      height: 50px;
      background: url(@/assets/images/load.gif) no-repeat center / contain;
    }
    .text {
      color: #999;
      font-size: 16px;
    }
  }
  .none {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    .img {
      width: 200px;
      height: 134px;
      background: url(@/assets/images/none.png) no-repeat center / contain;
    }
    .text {
      color: #999;
      font-size: 16px;
    }
  }
}
</style>


```
2. 使用加载组件
```js
<template>
  <div class="goods-list">
    <!-- 排序 -->
    <categorySubSortVue />
    <!-- 列表 -->
    <ul>
      <li v-for="i in index" :key="i">
        <categoryItemVue
          :good="{
            id: '12',
            name: ' string',
            desc: 'string',
            price: 'string',
            picture: 'string',
            orderNum: 1,
          }" />
      </li>
    </ul>
    <!-- 检测触底 -->
    <Globalloading @infinite="point" :loading="loading" :finished="finished" />
  </div>
</template>

<script setup lang="ts">
import categorySubSortVue from '@/components/home/category/category-sub-sort.vue'
import categoryItemVue from '@/components/home/category/components/category-item.vue'
import { ref } from 'vue'

const index = ref(20)

const loading = ref(false)
const finished = ref(false)
const point = () => {
  // 让组件处于加载中
  loading.value = true
  setTimeout(() => {
    // 加载完毕
    index.value += 20
    loading.value = false
  }, 5000)
  console.log('触底了')
}
</script>

<style scoped lang="less">
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>

```
#### 2.使用webAPI中的 和指令实现(自定义指令)
1. 代码实现
```js
<template>
  <div class="xtx-infinite-loading" v-element>
    <div class="loading" v-if="loading">
      <span class="img"></span>
      <span class="text">正在加载...</span>
    </div>
    <div class="none" v-if="finished">
      <span class="img"></span>
      <span class="text">亲，没有更多了</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const emit = defineEmits<{ (e: 'infinite'): void }>()
const props = defineProps<{ loading: boolean; finished: boolean }>()

// 加载的指令
const vElement = {
  mounted: (el: Element) => {
    const ob = new IntersectionObserver(([{ isIntersecting }]) => {
      if (isIntersecting) {
        if (props.loading === false && props.finished === false) {
          emit('infinite')
        }
      }
    })
    ob.observe(el)
  },
}
</script>

<style scoped lang="less">
.xtx-infinite-loading {
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    .img {
      width: 50px;
      height: 50px;
      background: url(@/assets/images/load.gif) no-repeat center / contain;
    }
    .text {
      color: #999;
      font-size: 16px;
    }
  }
  .none {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    .img {
      width: 200px;
      height: 134px;
      background: url(@/assets/images/none.png) no-repeat center / contain;
    }
    .text {
      color: #999;
      font-size: 16px;
    }
  }
}
</style>

```
2. 使用加载组件
```js
<template>
  <div class="goods-list">
    <!-- 排序 -->
    <categorySubSortVue />
    <!-- 列表 -->
    <ul>
      <li v-for="item in sublist" :key="item.id">
        <categoryItemVue :good="item" />
      </li>
    </ul>
    <!-- 检测触底 -->
    <Globalloading @infinite="point" :loading="loading" :finished="finished" />
  </div>
</template>

<script setup lang="ts">
import { getSubCategoryGoodsAPI } from '@/api'
import categorySubSortVue from '@/components/home/category/category-sub-sort.vue'
import categoryItemVue from '@/components/home/category/components/category-item.vue'
import { reactive, ref, type Ref } from 'vue'
import type { subListResult, subListItem } from '@/api/types'

// 是在加载中
const loading = ref(false)
// 是否还有数据
const finished = ref(false)
// 存储数据列表
const sublist: Ref<subListItem[]> = ref([]) as Ref<subListItem[]>
// 分页查询详情
const limit = reactive({ page: 1, pageSize: 20 })
const point = async () => {
  // 让组件处于加载中
  loading.value = true
  const subgood = (await getSubCategoryGoodsAPI({ page: limit.page, pageSize: limit.pageSize })) as subListResult
  if (subgood.items.length) {
    sublist.value.push(...subgood.items)
    limit.page++
    loading.value = false
  }
}
</script>

<style scoped lang="less">
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>

```
### 13.放大镜组件的实现
1. 组件
```js
<template>
  <div class="goods-image" v-if="images && images !== []">
    <div class="large" :style="[{ backgroundImage: `url(${images[currIndex]})` }, bgPosition]" v-if="show"></div>
    <div class="middle" @mousemove="move" @mouseleave="leave">
      <img :src="images[currIndex]" alt="" />
      <div class="layer" :style="position" v-if="show"></div>
    </div>
    <ul class="small">
      <li v-for="(img, i) in images" :key="img" :class="{ active: i === currIndex }">
        <img @mouseenter="currIndex = i" :src="img" alt="" />
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { usePreviewImg } from '@/hooks'

defineProps({
  images: {
    type: Array<string>,
  },
})

const { position, move, leave, show, bgPosition } = usePreviewImg()
const currIndex = ref(0)
</script>
<style scoped lang="less">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  z-index: 500;
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    position: relative;
    cursor: move;
    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, 0.2);
      left: 0;
      top: 0;
      position: absolute;
      pointer-events: none;
    }
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,
      &.active {
        border: 2px solid @xtxColor;
      }
    }
  }
}
</style>

```
2. hooks控制放大镜的样式
```js
/**
 * @returns
 * @position 遮罩容器的定位
 * @bgPosition 大背景的定位
 * @show 是否显示预览大图
 * @move 控制移动遮罩层移动的函数
 * @leave 鼠标离开的函数
 */
export const usePreviewImg = () => {
  // 控制遮罩层的定位
  const position: { left: string | number; top: string | number } = reactive({ left: 0 + 'px', top: 0 + 'px' })
  // 控制大图片的定位
  const bgPosition = reactive({ backgroundPositionX: 0 + 'px', backgroundPositionY: 0 + 'px' })
  // 控制遮罩层的显示隐藏
  const show = ref(false)
  // 控制移动遮罩层移动的函数
  const move = (el: MouseEvent) => {
    show.value = true
    if (el.offsetX < 100) position.left = 0
    else if (el.offsetX > 300) position.left = 200
    else position.left = el.offsetX - 100

    if (el.offsetY < 100) position.top = 0
    else if (el.offsetY > 300) position.top = 200
    else position.top = el.offsetY - 100

    bgPosition.backgroundPositionX = -position.left * 2 + 'px'
    bgPosition.backgroundPositionY = -position.top * 2 + 'px'

    position.left = position.left + 'px'
    position.top = position.top + 'px'
  }
  // 鼠标离开的函数
  const leave = () => {
    show.value = false
  }

  return { position, move, bgPosition, leave, show }
}

```
3. 使用组件
```js
 <goodImageVue :images="images" />
```
### 14.城市组件的封装
1. 简单封装组件的封装
```js
<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="open" :class="{ active }">
      <span class="placeholder" v-if="changeResult.fullLocation == ''">请选择配送地址</span>
      <span class="value">{{ changeResult.fullLocation }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="active">
      <div v-if="loading" class="loading"></div>
      <template v-else>
        <span class="ellipsis" v-for="item in currList" :key="item.code" @click="changeItem($event, item)">{{
          item.name
        }}</span>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeUnmount, reactive, ref, type Ref } from 'vue'
import { getCityDataAPI } from '@/api'
import type { cityObject, AreaList2, AreaList } from '@/api/types'

const props = defineProps<{ fullLocation: string }>()
const emit = defineEmits<{ (e: 'changeCity', city: string): void }>()
// 控制城市列表的显示和隐藏
const active = ref(false)
// 是否处于加载中
const loading = ref(false)
// 城市列表的数组
const cityData: Ref<cityObject[]> = ref([]) as Ref<cityObject[]>
// 城市选择的对象信息
const changeResult = reactive({
  provinceCode: '',
  provinceName: '',
  cityCode: '',
  cityName: '',
  countyCode: '',
  countyName: '',
  fullLocation: props.fullLocation,
})

// 第一次打开列表缓存到window中
const getCityData = () => {
  return new Promise<Array<cityObject>>((resolve) => {
    if (window.cityData) {
      resolve(window.cityData)
    } else {
      getCityDataAPI().then((res) => {
        window.cityData = res as Array<cityObject>
        resolve(window.cityData)
      })
    }
  })
}

// 控制选择地址的切换和隐藏
const open = (event: Event) => {
  let key: keyof {
    provinceCode: string
    provinceName: string
    cityCode: string
    cityName: string
    countyCode: string
    countyName: string
    fullLocation: string
  }
  for (key in changeResult) {
    changeResult[key] = ''
  }
  event.stopPropagation()
  loading.value = true
  getCityData().then((res) => {
    active.value = !active.value
    cityData.value = res
    loading.value = false
  })
}

// 选择城市信息
const changeItem = (event: Event, item: any) => {
  event.stopPropagation()
  if (item.level === 0) {
    changeResult.provinceCode = item.code
    changeResult.provinceName = item.name
  }
  // 市
  if (item.level === 1) {
    changeResult.cityCode = item.code
    changeResult.cityName = item.name
  }
  // 区
  if (item.level === 2) {
    changeResult.countyCode = item.code
    changeResult.countyName = item.name
    changeResult.fullLocation = `${changeResult.provinceName} ${changeResult.cityName} ${changeResult.countyName}`
    active.value = false
    emit('changeCity', changeResult.fullLocation)
  }
}

// 定义计算属性
const currList = computed({
  get() {
    // 省份
    let currList: cityObject[] | AreaList[] | AreaList2[] = cityData.value
    // 城市
    if (changeResult.provinceCode && currList) {
      currList = currList.find((p) => p.code === changeResult.provinceCode)?.areaList as AreaList2[]
    }
    // 地区
    if (changeResult.cityCode) {
      currList = (currList as AreaList2[]).find((c) => c.code === changeResult.cityCode)?.areaList as AreaList[]
    }
    return currList
  },
  set(value) {
    currList.value = value
  },
})

// 点击外面关闭
window.addEventListener('click', () => {
  active.value = false
})

// 点击外面关闭
onBeforeUnmount(() => {
  window.removeEventListener('click', () => {
    active.value = false
  })
})
</script>
<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    .loading {
      height: 290px;
      width: 100%;
      background: url(@/assets/images/loading.gif) no-repeat center;
    }
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>

```
2. 使用组件
```js
<!-- 商品信息 -->
<template>
......
        <GlobalCity :fullLocation="fullLocation" @changeCity="changeCity" />
   .....
</template>

<script lang="ts" setup>
import type { goodDetailResult } from '@/api/types'
import { ref } from 'vue'

defineProps<{ goodDetailList: goodDetailResult }>()

const fullLocation = ref('北京市 市辖区 东城区')

const changeCity = (city: string) => {
  fullLocation.value = city
}
</script>


```
### 15.sku和spu幂级算法
1. 幂级算法的实现
```js
function powerset(arr){
    const newArr = [[]];
    for(let i=0;i<arr.length;i++){

        for(let j=0,len=newArr.length;j<len;j++){
            newArr.push(newArr[j].concat(arr[i]));
            console.log(1)
            /**
             * 第一次[0]填充了 arr[0], [1] 结果 [[],[1]]
             * 第二次[0]填充了 arr[1], [2],[1,2] 结果 [[],[2],[1,2]]
             * 第三次[0]填充了 arr[2], [3],[2,3],[1,2,3] ,[1,3]
             */
        }
    }
    return newArr;
}

console.log(powerset([1,2,3]))

```
2. 实现商品的sku信息
```js
<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="sub in item.values" :key="sub.id">
          <img
            :class="{ selected: sub.selected }"
            :src="sub.picture"
            @click="clickSpecs(item, sub)"
            v-if="sub.picture"
            disabled />
          <span :class="{ selected: sub.selected }" @click="clickSpecs(item, sub)" v-else>{{ sub.name }}</span>
        </template>
      </dd>
    </dl>
  </div>
</template>
<script lang="ts" setup>
import type { Skus, Spec, Value } from '@/api/types'
import { onBeforeUpdate, ref, watch, type Ref } from 'vue'
import getPowerSet from '@/utils/A'
type stringKey = Record<string, any>

const path = ref({}) as Ref<stringKey>
const props = defineProps<{ goods: { skus: Array<Skus>; specs: Array<Spec> }; skuId: string }>()
const emit = defineEmits<{ (e: 'changeSku', skuid: Skus | undefined): void }>()
// 点击选择事件
const clickSpecs = (item: Spec, sub: Value) => {
  if (!item.disabled) return false
  if (sub.selected) {
    sub.selected = false
  } else {
    item.values.forEach((item) => (item.selected = false))
    sub.selected = true
  }
  const selectedArr = getSelectedArr(props.goods.specs) // 当前选中的数组集合
  if (selectedArr.length === props.goods.specs.length) {
    // 把选中数组拼接成路径的索引
    const skuIds = path.value[selectedArr.join(spliter)]
    // 找到对应skuid的信息
    const sku = props.goods.skus.find((sku) => sku.id === skuIds[0])
    emit('changeSku', sku)
  }
}
// 得到当前选中规格集合
const getSelectedArr = (specs: Array<Spec>) => {
  const selectedArr: Array<Value | string> = []
  specs.forEach((spec) => {
    const selectedVal = spec.values.find((val) => val.selected)
    selectedArr.push(selectedVal ? selectedVal.name : '')
  })
  return selectedArr
}

// 初始化选中状态
watch(
  () => props.goods,
  () => {
    initSelectedStatus()
  },
)
const initSelectedStatus = () => {
  const sku = props.goods.skus.find((item) => item.id === props.skuId)
  if (sku) {
    props.goods.specs.forEach((item, i) => {
      // 如果存在默认值则，找出对应的名字
      const value = sku.specs[i].valueName
      console.log(value)
      item.values.forEach((sub) => {
        // 更新sub的默认选中
        sub.selected = sub.name === value
      })
    })
  }
}

const spliter = '★'

// 生成有效的spu
onBeforeUpdate(() => {
  const pathMap: stringKey = {}
  // 选中规格的集合
  props.goods.skus.forEach((sku) => {
    // sku有效
    if (sku.inventory) {
      // 得到sku属性值数组
      const specsArr = sku.specs.map((item) => item.valueName)
      getPowerSet(specsArr).forEach((set) => {
        const key = set.join(spliter)
        if (pathMap[key]) {
          // 已经有key往数组追加
          pathMap[key].push(sku.id)
        } else {
          // 没有key设置一个数组
          pathMap[key] = [sku.id]
        }
      })
    }
  })
  path.value = pathMap
  // 更新按钮的禁用状态
  const selectedArr = getSelectedArr(props.goods.specs) // 当前选中的数组集合
  props.goods.specs.forEach((item, i) => {
    if (item.name === selectedArr[i]) return false
    // 没有选中替换值
    selectedArr[i] = item.name
    // 过滤掉为''的值
    const key = selectedArr.filter((item) => item).join(spliter)
    // 禁用，没有在幂集中的组合禁用
    item.disabled = !pathMap[key]
  })
})
</script>
<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>

```
### 16.数量选择框的封装
1. 使用计算属性和v-model
```js

<template>
  <div class="xtx-numbox">
    <div class="label">数量</div>
    <div class="numbox">
      <a @click="value--">-</a>
      <input type="text" readonly v-model="value" />
      <a @click="value++">+</a>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{ modelValue: number }>()
const emit = defineEmits<{ (e: 'update:modelValue', number: number): void }>()

// 使用计算属性属性修改的同步
const value = computed({
  get() {
    return +props.modelValue
  },
  set(value) {
    if (+value < 1) return
    emit('update:modelValue', +value)
  },
})
</script>
<style scoped lang="less">
.xtx-numbox {
  display: flex;
  align-items: center;
  .label {
    width: 60px;
    color: #999;
    padding-left: 10px;
  }
  .numbox {
    width: 120px;
    height: 30px;
    border: 1px solid #e4e4e4;
    display: flex;
    > a {
      width: 29px;
      line-height: 28px;
      text-align: center;
      background: #f8f8f8;
      font-size: 16px;
      color: #666;
      &:first-of-type {
        border-right: 1px solid #e4e4e4;
      }
      &:last-of-type {
        border-left: 1px solid #e4e4e4;
      }
    }
    > input {
      width: 60px;
      padding: 0 5px;
      text-align: center;
      color: #666;
    }
  }
}
</style>

```
2. 使用组件
```js
 <GlobalNumbox v-model="number" />
```
### 17.通用按键的封装
1. 按键通过传大小和颜色
```js
<template>
  <button class="xtx-button ellipsis" :class="[size, type]">
    <slot />
  </button>
</template>
<script lang="ts" setup>
defineProps({
  size: {
    type: String,
    default: 'middle',
  },
  type: {
    type: String,
    default: 'default',
  },
})
</script>
<style scoped lang="less">
.xtx-button {
  appearance: none;
  border: none;
  outline: none;
  background: #fff;
  text-align: center;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
}
.large {
  width: 240px;
  height: 50px;
  font-size: 16px;
}
.middle {
  width: 180px;
  height: 50px;
  font-size: 16px;
}
.small {
  width: 100px;
  height: 32px;
  font-size: 14px;
}
.mini {
  width: 60px;
  height: 32px;
  font-size: 14px;
}
.default {
  border-color: #e4e4e4;
  color: #666;
}
.primary {
  border-color: @xtxColor;
  background: @xtxColor;
  color: #fff;
}
.plain {
  border-color: @xtxColor;
  color: @xtxColor;
  background: lighten(@xtxColor, 50%);
}
.gray {
  border-color: #ccc;
  background: #ccc;
  color: #fff;
}
</style>

```
2. 使用组件
```js
  <GlobalButton type="primary" style="margin-top: 20px">加入购物车</GlobalButton>
```
### 18.内置组件component的注意事项
1. 基本使用
```js
<template>
  <div class="goods-tabs">
    <nav>
      <a >商品详情</a>
      <a >商品评价<span>(500+)</span></a>
    </nav>
    <!-- 切换内容的地方 -->
    <component :is="GoodsDetail" />
  </div>
</template>
<script setup lang="ts">
import GoodsDetail from './components/goods-detail.vue'
import GoodsComment from './components/goods-comment.vue'
</script>

```
2. 让组件为动态时(ref中直接引入组件会警告)
```js
<template>
  <div class="goods-tabs">
    <nav>
      <a >商品详情</a>
      <a >商品评价<span>(500+)</span></a>
    </nav>
    <!-- 切换内容的地方 -->
    <component :is="activeComponent" />
  </div>
</template>
<script setup lang="ts">
import GoodsDetail from './components/goods-detail.vue'
import GoodsComment from './components/goods-comment.vue'
import { ref } from 'vue'

// 默认清空下是详情
const activeComponent = ref(GoodsDetail)
</script>
```
3. 用markRaw包裹消除警告
```js
<template>
  <div class="goods-tabs">
    <nav>
      <a :class="{ active: activeComponent === markRaw(GoodsDetail) }">商品详情</a>
      <a :class="{ active: activeComponent === markRaw(GoodsComment) }">商品评价<span>(500+)</span></a>
    </nav>
    <!-- 切换内容的地方 -->
    <component :is="activeComponent" />
  </div>
</template>

<script setup lang="ts">
import { markRaw } from 'vue'
import GoodsDetail from './components/goods-detail.vue'
import GoodsComment from './components/goods-comment.vue'
import { ref } from 'vue'

// 默认清空下是详情
const activeComponent = ref(markRaw(GoodsDetail))
</script>

<style scoped lang="less">
.goods-tabs {
  min-height: 600px;
  background: #fff;
  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;
      > span {
        color: @priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
      &:first-child {
        border-right: 1px solid #f5f5f5;
      }
      &.active {
        &::before {
          content: '';
          position: absolute;
          left: 40px;
          bottom: -1px;
          width: 72px;
          height: 2px;
          background: @xtxColor;
        }
      }
    }
  }
}
</style>

```
### 19.图片预览组件的封装
1. 封装
```js
<template>
  <div class="goods-comment-image">
    <div class="list">
      <a
        href="javascript:;"
        :class="{ active: currImage === item }"
        @click="currImage = item"
        v-for="(item, i) in pictures"
        :key="i">
        <img :src="item" alt="" />
      </a>
    </div>
    <div class="preview" v-if="currImage">
      <img :src="currImage" alt="" @click="currImage = ''" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
defineProps<{ pictures: string[] }>()
// 存放图片的url地址
const currImage = ref('')
</script>
<style scoped lang="less">
.goods-comment-image {
  .list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    a {
      width: 120px;
      height: 120px;
      border: 1px solid #e4e4e4;
      margin-right: 20px;
      margin-bottom: 10px;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      &.active {
        border-color: @xtxColor;
      }
    }
  }
}
</style>

```
2. 使用
```js
<GoodsCommentImage v-if="item.pictures.length" :pictures="item.pictures" />
```
### 20.分页组件的封装
1. 封装组件
```js
<template>
  <div class="xtx-pagination">
    <!-- 如果当前页码数为1,禁用 -->
    <a :class="{ disabled: pageNo === 1 }" @click="pageNo > 1 ? emit('changePage', pageNo - 1) : ''">上一页</a>
    <!-- 当前起始页码大于1时显示1号按键方便跳转-->
    <a v-if="startEndPage.start > 1" @click="changePage(1)">1</a>
    <!-- 当前起始页码大于2时显示... -->
    <span v-if="startEndPage.start > 2">...</span>
    <!-- 遍历按键数组，如果当前页等于数组某一项高显 -->
    <a :class="{ active: pageNo === item }" v-for="item in startEndPage.btnArr" :key="item" @click="changePage(item)">
      {{ item }}
    </a>
    <!-- 如果页码总数大于结束页码数加1显示 -->
    <span v-if="pageTotal > startEndPage.end + 1">...</span>
    <!-- 如果页码总数大于结束页码显示最后一页方便跳转 -->
    <a v-if="pageTotal > startEndPage.end" @click="changePage(pageTotal)">{{ pageTotal }}</a>
    <!-- 当前页码为最后一页禁用 -->
    <a :class="{ disabled: pageNo === pageTotal }" @click="pageNo < pageTotal ? emit('changePage', pageNo + 1) : ''"
      >下一页</a
    >
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'

// 需要pageNo:当前页,pageSize:每页显示数据,dataTotal:数据总数,showbtnCount:显示按键
const props = defineProps({
  pageNo: {
    type: Number,
    default: 1,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  dataTotal: {
    type: Number,
    default: 100,
  },
  showBtn: {
    type: Number,
    default: 5,
  },
})
const emit = defineEmits<{ (e: 'changePage', newPage: number): void }>()
// 1.计算出总页数
const pageTotal = computed(() => {
  return Math.ceil(props.dataTotal / props.pageSize)
})
// 2.计算起始页码
const startEndPage = computed(() => {
  // 1.理想情况
  //   起始页码是当前页码-(按键总数/2)向下取整
  let start = props.pageNo - Math.floor(props.showBtn / 2)
  // 结束页码是起始页码+按键数+1
  let end = start + props.showBtn - 1

  //   2.如果开始页码小于1
  if (start < 1) {
    start = 1
    // 如果结束页计算后大于总页数结果就是总页数
    end = start + props.showBtn - 1 > pageTotal.value ? pageTotal.value : start + props.showBtn - 1
  }

  // 3.如果结束页码大于总页数
  if (end > pageTotal.value) {
    end = pageTotal.value
    // 如果开始页码计算后小于1
    start = end - props.showBtn + 1 < 1 ? 1 : end - props.showBtn + 1
  }
  // 生成起始页码和结束页码的数组
  const btnArr = []
  for (let i = start; i <= end; i++) {
    btnArr.push(i)
  }
  return { start, end, btnArr }
})
// 3.改变当前页码
const changePage = (newPage: number) => {
  emit('changePage', newPage)
}
</script>
<style scoped lang="less">
.xtx-pagination {
  display: flex;
  justify-content: center;
  padding: 30px;
  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;
    &:hover {
      color: @xtxColor;
    }
    &.active {
      background: @xtxColor;
      color: #fff;
      border-color: @xtxColor;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        color: #333;
      }
    }
  }
  > span {
    margin-right: 10px;
  }
}
</style>

```
2. 使用组件
```js
<template>
  <div class="goods-comment">
   ....
    <!-- 分页 -->
    <GlobalPagination
      :pageNo="reqParams.page"
      :pageSize="reqParams.pageSize"
      :dataTotal="counts"
      :showBtn="5"
      @changePage="changePage" />
  </div>
</template>
<script lang="ts" setup>
import { inject, reactive, ref, watch, type Ref } from 'vue'
import type { commentListItem, commentResult } from '@/api/types'
import { useRoute } from 'vue-router'
import { getCommentListByGoodsAPI } from '@/api'
import GoodsCommentImage from './goods-comment-image.vue'
// 评论tab列表
const commentList: Ref<commentResult> = inject('commentList') as Ref<commentResult>
// 切换筛选tab
const currTagIndex = ref(0)
// 数据总条数
const counts = ref()
const route = useRoute()
// 筛选条件准备
const reqParams = reactive({
  page: 1,
  pageSize: 10,
  hasPicture: false,
  tag: '',
  sortField: 'null',
})

// 改变排序
const changeSort = (keyword: string) => {
  reqParams.sortField = keyword
}
// 改变tag
const changeTag = (i: number) => {
  currTagIndex.value = i
  const currTag = commentList.value.tags[i]
  if (currTag.type === 'img') {
    reqParams.hasPicture = true
  } else {
    reqParams.tag = currTag.title
  }
}
// 评论信息列表
const commentInfoList: Ref<Array<commentListItem>> = ref([])
// 监听筛选条件的变化
watch(
  () => reqParams,
  async () => {
    counts.value = (await getCommentListByGoodsAPI(route.params.id as string, reqParams)).result.counts
    commentInfoList.value = (await getCommentListByGoodsAPI(route.params.id as string, reqParams)).result.items
  },
  { immediate: true, deep: true },
)
// 对数据处理
const formatSpecs = (spec: Array<any>) => {
  return spec.reduce((pre, item) => `${pre}  ${item.name}:${item.nameValue}`, '')
}
// 改变页码
const changePage = (newPage: number) => {
  reqParams.page = newPage
}
</script>
```
### 21.vue的自动引入的配置
#### (1)基本配置
1. 安装依赖```npm i -D unplugin-auto-import```
2. vite.config.ts配置
```js
// 配置完成后自动生成配置文件
import AutoImport from "unplugin-auto-import/vite"
export default defineConfig({
  plugins: [
    ...
     AutoImport ({
      imports: ["vue", "vue-router"], // 自动导入vue和vue-router相关函数
      dts: "./auto-import.d.ts" // 生成 `auto-import.d.ts` 全局声明
    })
  ]
})

```
#### (2)解决eslint报错问题
1. 第一种方法```安装依赖 yarn add vue-global-api -D```
```js
// 配置.eslintrc.cjs
module.exports = {
...
  extends: [
  ...
  // 不全
    'vue-global-api'
  ]
}
```
2. 第二种方法改变vite.config.ts配置
(1)添加eslintrc配置
```js
import AutoImport from "unplugin-auto-import/vite"
export default defineConfig({
  plugins: [
    ...
     AutoImport({
      imports: ['vue', 'vue-router'], // 自动导入vue和vue-router相关函数
      dts: './auto-import.d.ts', // 生成 `auto-import.d.ts` 全局声明
      eslintrc: {
        // eslint报错解决
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
    }),
  ]
})
```
​       (2)运行后生成配置在.eslintrc.cjs添加
```js
module.exports = {
  extends: [
    ...
    './.eslintrc-auto-import.json'
  ]
}
```
#### (3)解决TS2304警告问题
```js
// 在tsconfig.json中引入声明文件auto-import.d.ts
{
  "extends": "@vue/tsconfig/tsconfig.web.json",
  "include": ["env.d.ts", "src/**/*", "src/**/*.vue","auto-import.d.ts"],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "types": [ "vite/client" ],

  },
  "references": [
    {
      "path": "./tsconfig.config.json"
    }
  ]
}

```
### 22.表单验证的实现
#### 1.第三方的库vee-validate
1. 安装依赖```yarn add vee-validate```
2. 准备验证规则函数
```js
// 校检用户名
export const ruleUsername = (value: string) => {
  if (!value) return '请输入用户名'
  // \w 匹配字母或数字或下划线或汉字
  if (!/^[a-zA-Z]\w{5,19}$/.test(value)) return '字母开头且6-20个字符'
  return true
}
// 校检密码
export const rulePassword = (value: string) => {
  if (!value) return '请输入密码'
  if (!/^\w{4,20}$/.test(value)) return '密码是6-20个字符'
  return true
}
// 校检手机号码
export const ruleMobile = (value: string) => {
  if (!value) return '请输入手机号'
  if (!/^1[2-9]\d{9}$/.test(value)) return '手机号格式不正确'
  return true
}
// 校检验证码
export const ruleCode = (value: string) => {
  if (!value) return '请输入验证码'
  if (!/^\d{6}$/.test(value)) return '验证码规格不正确'
  return true
}
// 是否点击同意
export const ruleIsAgree = (value: boolean) => {
  if (!value) return '请同意用户协议'
  return true
}

```
3. 基本使用
```js
 <!--
       1.作用域插槽实现
      (1)通过validation-schema="rules"传递校检规则 
      (2)v-slot中解构出errors(错误提示信息)
      (3)Field组件的name属性，v-model的值，校检规则名尽量统一
    -->
    .....
    <Form ref="clearErrors" class="form" :validation-schema="rules" v-slot="{ errors }">
      <!-- 密码登录的表单 -->
      <template v-if="!isMsgLogin">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field
              :class="{ error: errors.username }"
              name="username"
              type="text"
              placeholder="请输入用户名或手机号"
              v-model="form.username" />
          </div>
          <!-- 错误提示 -->
          <div class="error" v-if="errors.username"><i class="iconfont icon-warning" />{{ errors.username }}</div>
        </div>
      </template>
    </Form>
    .....
<script lang="ts" setup>
// 引入规则
import { ruleUsername, rulePassword, ruleMobile, ruleCode, ruleIsAgree } from '@/utils/form-rules'
import { Form, Field } from 'vee-validate'

// 表单信息
const form = reactive({
  username: '', // 用户名
})
// 自定义的校检规则(通过From  validation-schema="rules"传递校检规则 )
const rules = {
  username: ruleUsername, // 用户名
}

</script>
```
4. 登录的完整实现
```js
<template>
  <div class="account-box">
    <div class="toggle">
      <a @click="isMsgLogin = false" href="javascript:;" v-if="isMsgLogin">
        <i class="iconfont icon-user"></i> 使用账号登录
      </a>
      <a @click="isMsgLogin = true" href="javascript:;" v-else> <i class="iconfont icon-msg"></i> 使用短信登录 </a>
    </div>
    <!--
       1.作用域插槽实现
      (1)通过validation-schema="rules"传递校检规则 
      (2)v-slot中解构出errors(错误提示信息)
      (3)Field组件的name属性，v-model的值，校检规则名尽量统一
    -->
    <Form ref="clearErrors" class="form" :validation-schema="rules" v-slot="{ errors }">
      <!-- 密码登录的表单 -->
      <template v-if="!isMsgLogin">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field
              :class="{ error: errors.username }"
              name="username"
              type="text"
              placeholder="请输入用户名或手机号"
              v-model="form.username" />
          </div>
          <!-- 错误提示 -->
          <div class="error" v-if="errors.username"><i class="iconfont icon-warning" />{{ errors.username }}</div>
        </div>
        <div class="form-item">
          <!-- 密码隐藏 -->
          <div class="input" v-show="showPass === false">
            <i class="iconfont icon-lock"></i>
            <Field
              :class="{ error: errors.password }"
              name="password"
              type="password"
              placeholder="请输入密码"
              v-model="form.password"
              autocomplete="off" />
            <svg
              @click="showPass = true"
              t="1665455426550"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="5857"
              width="16"
              height="16">
              <path
                d="M917.333333 573.866667l-87.466666-87.466667c34.133333-32 66.133333-68.266667 91.733333-108.8 8.533333-14.933333 4.266667-34.133333-10.666667-44.8-14.933333-8.533333-34.133333-4.266667-44.8 10.666667-76.8 125.866667-209.066667 200.533333-356.266666 200.533333-145.066667 0-279.466667-74.666667-354.133334-198.4-8.533333-14.933333-29.866667-19.2-44.8-10.666667-14.933333 8.533333-19.2 29.866667-10.666666 44.8 25.6 40.533333 55.466667 76.8 91.733333 108.8l-85.333333 85.333334c-12.8 12.8-12.8 32 0 44.8 6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333l91.733333-91.733334c38.4 25.6 81.066667 46.933333 125.866667 59.733334l-34.133333 130.133333c-4.266667 17.066667 6.4 34.133333 23.466666 38.4 2.133333 0 6.4 2.133333 8.533334 2.133333 14.933333 0 27.733333-8.533333 29.866666-23.466666l36.266667-132.266667c25.6 4.266667 51.2 6.4 78.933333 6.4 27.733333 0 55.466667-2.133333 83.2-6.4l36.266667 132.266667c4.266667 14.933333 17.066667 23.466667 29.866667 23.466666 2.133333 0 6.4 0 8.533333-2.133333 17.066667-4.266667 27.733333-21.333333 23.466667-38.4L661.333333 584.533333c44.8-12.8 85.333333-34.133333 123.733334-59.733333l91.733333 91.733333c6.4 6.4 14.933333 8.533333 23.466667 8.533334s17.066667-2.133333 23.466666-8.533334c6.4-10.666667 6.4-29.866667-6.4-42.666666z"
                p-id="5858"></path>
            </svg>
          </div>
          <!-- 错误提示信息 -->
          <div class="error" v-if="errors.password"><i class="iconfont icon-warning" />{{ errors.password }}</div>

          <!-- 密码显示 -->
          <div class="input" v-show="showPass === true">
            <i class="iconfont icon-lock"></i>
            <Field
              :class="{ error: errors.password }"
              name="password"
              type="text"
              placeholder="请输入密码"
              v-model="form.password" />
            <svg
              @click="showPass = false"
              t="1665455395730"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="4883"
              width="16"
              height="16">
              <path
                d="M512 384a128.853333 128.853333 0 0 0-128 128c0 70.058667 57.941333 128 128 128 70.016 0 128-57.941333 128-128 0-70.016-57.984-128-128-128z"
                fill=""
                p-id="4884"></path>
              <path
                d="M512 213.333333c-325.674667 0-423.552 282.325333-424.448 285.184a42.410667 42.410667 0 0 0 0 27.008C88.448 528.341333 186.325333 810.666667 512 810.666667s423.552-282.325333 424.448-285.184a42.410667 42.410667 0 0 0 0-27.008C935.552 495.658667 837.674667 213.333333 512 213.333333z m0 512c-228.309333 0-316.757333-164.096-338.176-213.333333C195.328 462.592 283.818667 298.666667 512 298.666667c228.309333 0 316.757333 164.096 338.176 213.333333-21.504 49.408-109.994667 213.333333-338.176 213.333333z"
                fill=""
                p-id="4885"></path>
            </svg>
          </div>
          <!-- 错误提示信息 -->
          <div class="error" v-if="errors.password && showPass === true">
            <i class="iconfont icon-warning" />{{ errors.password }}
          </div>
        </div>
      </template>
      <!-- 验证码登录的表单 -->
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field
              :class="{ error: errors.mobile }"
              name="mobile"
              type="text"
              placeholder="请输入手机号"
              v-model="form.mobile" />
          </div>
          <!-- 错误提示 -->
          <div class="error" v-if="errors.mobile"><i class="iconfont icon-warning" />{{ errors.mobile }}</div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <Field
              :class="{ error: errors.code }"
              name="code"
              type="text"
              placeholder="请输入验证码"
              v-model="form.code" />
            <span class="code" @click="getCode" v-if="count == 60">发送验证码</span>
            <span class="code" v-else>{{ count }}秒后发送</span>
          </div>
          <!-- 错误提示 -->
          <div class="error" v-if="errors.code"><i class="iconfont icon-warning" />{{ errors.code }}</div>
        </div>
      </template>
      <div class="form-item">
        <div class="agree">
          <CategoryChecked v-model="form.isAgree" />
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
        <div class="error" v-if="errors.isAgree"><i class="iconfont icon-warning" />{{ errors.isAgree }}</div>
      </div>
      <a @click="login" class="btn">登录</a>
    </Form>
    <div class="action">
      <img src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt="" />
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { userAccountLoginAPI, userMobileLoginAPI, userMobileLogincodeAPI } from '@/api'
import type { LoginResult } from '@/api/types'
import CategoryChecked from '@/components/home/category/category-checked.vue'
import { ruleUsername, rulePassword, ruleMobile, ruleCode, ruleIsAgree } from '@/utils/form-rules'
import { Form, Field } from 'vee-validate'
import type { Ref } from 'vue'
import useStore from '@/stores'
// 是否显示密码
const showPass = ref(false)
// 什么方式登录
const isMsgLogin = ref(false)
// 登录要求
const form = reactive({
  username: 'xiaotuxian001', // 用户名
  password: '123456', // 密码
  mobile: '', // 手机号
  code: '', // 验证码
  isAgree: true, // 是否同意协议
})
// 自定义的校检规则
const rules = {
  username: ruleUsername, // 用户名
  password: rulePassword, // 密码
  mobile: ruleMobile, // 手机号
  code: ruleCode, // 验证码
  isAgree: ruleIsAgree, // 是否同意协议
}
// From组件上的ref
const clearErrors: Ref<{ resetForm: Function; validate: Function }> = ref(null) as unknown as Ref<{
  resetForm: Function
  validate: Function
}>
// 监听表单登录方式的变化
watch(isMsgLogin, () => {
  form.isAgree = true
  clearErrors.value.resetForm()
})

// 获取验证码时间
const count = ref(60)
// 获取验证码函数
const getCode = async () => {
  if (ruleMobile(form.mobile) === true) {
    let timer: number = 1
    // 清除定时器
    clearInterval(timer)
    // 设置定时器
    timer = setInterval(() => {
      count.value--
      if (count.value == 0) {
        clearInterval(timer)
        count.value = 60
      }
    }, 1000)
    try {
      form.code = (await userMobileLogincodeAPI(form.mobile)) as string
    } catch (e) {
      // 清除定时器
      clearInterval(timer)
      // 隐藏读秒
      count.value = 60
      instance?.proxy?.$Message({ type: 'error', text: '该用户不存在请先注册' })
    }
    return
  }
  instance?.proxy?.$Message({ type: 'error', text: '请输入正确的手机号' })
}

const instance = getCurrentInstance()
// 用户仓库
const { user } = useStore()
const router = useRouter()
const route = useRoute()
// 需要在点击登录的时候对整体表单进行校验
const login = async () => {
  // Form组件提供了一个 validate 函数作为整体表单校验，当是返回的是一个promise
  clearErrors.value.validate()
  if (!isMsgLogin.value) {
    try {
      const { account, nickname, avatar, token, mobile } = (await userAccountLoginAPI({
        account: form.username,
        password: form.password,
      })) as LoginResult
      // 给仓库中赋值
      user.setState({ account, nickname, avatar, token, mobile })
      // 给出信息提示
      instance?.proxy?.$Message({ type: 'success', text: '登录成功' })
      router.push((route.query.redirectUrl as string) || '/')
    } catch (e) {
      instance?.proxy?.$Message({ type: 'error', text: '登录失败' })
    }
    // 密码登录
  } else {
    try {
      const { account, nickname, avatar, token, mobile } = (await userMobileLoginAPI({
        mobile: form.mobile,
        code: form.code,
      })) as LoginResult
      // 给仓库中赋值
      user.setState({ account, nickname, avatar, token, mobile })
      // 给出信息提示
      instance?.proxy?.$Message({ type: 'success', text: '登录成功' })
      router.push((route.query.redirectUrl as string) || '/')
    } catch (e) {
      instance?.proxy?.$Message({ type: 'error', text: '登录失败' })
    }
  }
}
</script>
<style lang="less">
// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: @xtxColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        > .icon {
          position: absolute;
          right: 4px;
          top: 10px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: @priceColor;
          }
          &.active,
          &:focus {
            border-color: @xtxColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>


```
#### 2.模拟第三方库封装
1. 封装双向响应input=>Field
```js
<template>
  <input :type="type" :value="modelValue" @input="input" />
</template>

<script setup lang="ts">
defineProps({
  type: {
    type: String,
    default: 'text',
  },
  modelValue: {
    type: String,
    default: '',
  },
})

const emit = defineEmits<{ (e: 'update:modelValue', data: string): void }>()

const input = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<style scoped lang="less"></style>

```
2. 封装错误信息处理组件Form
```js
<template>
  <form>
    <slot name="rule" :errors="errors"></slot>
  </form>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'

const props = defineProps({
  rule: {
    type: Object,
    default: () => {},
  },
  form: {
    type: Object,
    default: () => {},
  },
})

type stringKey = Record<string, any>

const errors: Ref<stringKey> = ref({})

// 获取错误信息
const getErr = () => {
  for (let i in props.rule) {
    for (let j in props.form) {
      if (i === j) {
        errors.value[i] = props.rule[i](props.form[j])
        if (errors.value[i] === true) errors.value[i] = null
      }
    }
  }
}

// 清除错误信息
const clearErr = () => {
  for (let i in props.form) {
    errors.value[i] = null
  }
}
// 监听props
watch(
  () => props.form,
  () => {
    getErr()
  },
  {
    deep: true,
  },
)
defineExpose({ getErr, clearErr })
</script>

```
3. 使用Field和Form
```js
  <From class="form" :rule="rules" :form="form">
      <!-- 作用域插槽 -->
      <template #rule="{ errors }">
        <!-- 密码登录的表单 -->
        <template v-if="!isMsgLogin">
          <div class="form-item">
            <div class="input">
              <i class="iconfont icon-user"></i>
              <Field
                :class="{ error: errors.username !== true }"
                type="text"
                placeholder="请输入用户名或手机号"
                v-model="form.username" />
            </div>
            <div class="error" v-if="errors.username !== true">
              <i class="iconfont icon-warning" />{{ errors.username }}
            </div>
          </div>
        </template>
       </template>
    </From>
<script lang="ts" setup>
   // 登录要求
const form = reactive({
  username: '', // 用户名
  password: '', // 密码
  mobile: '', // 手机号
  code: '', // 验证码
  isAgree: false, // 是否同意协议
})
// 自定义的校检规则
const rules = {
  username: ruleUsername, // 用户名
  password: rulePassword, // 密码
  mobile: ruleMobile, // 手机号
  code: ruleCode, // 验证码
  isAgree: ruleIsAgree, // 是否同意协议
} 
</script>
```
4. 完整代码
```js
<template>
  <div class="account-box">
    <div class="toggle">
      <a @click="isMsgLogin = false" href="javascript:;" v-if="isMsgLogin">
        <i class="iconfont icon-user"></i> 使用账号登录
      </a>
      <a @click="isMsgLogin = true" href="javascript:;" v-else> <i class="iconfont icon-msg"></i> 使用短信登录 </a>
    </div>
    <From class="form" :rule="rules" :form="form" ref="formErrors">
      <!-- 作用域插槽 -->
      <template #rule="{ errors }">
        <!-- 密码登录的表单 -->
        <template v-if="!isMsgLogin">
          <div class="form-item">
            <div class="input">
              <i class="iconfont icon-user"></i>
              <Field
                :class="{ error: errors.username }"
                name="username"
                type="text"
                placeholder="请输入用户名或手机号"
                v-model="form.username" />
            </div>
            <!-- 错误提示 -->
            <div class="error" v-if="errors.username"><i class="iconfont icon-warning" />{{ errors.username }}</div>
          </div>
          <div class="form-item">
            <!-- 密码隐藏 -->
            <div class="input" v-show="showPass === false">
              <i class="iconfont icon-lock"></i>
              <Field
                :class="{ error: errors.password }"
                name="password"
                type="password"
                placeholder="请输入密码"
                v-model="form.password"
                autocomplete="off" />
              <svg
                @click="showPass = true"
                t="1665455426550"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="5857"
                width="16"
                height="16">
                <path
                  d="M917.333333 573.866667l-87.466666-87.466667c34.133333-32 66.133333-68.266667 91.733333-108.8 8.533333-14.933333 4.266667-34.133333-10.666667-44.8-14.933333-8.533333-34.133333-4.266667-44.8 10.666667-76.8 125.866667-209.066667 200.533333-356.266666 200.533333-145.066667 0-279.466667-74.666667-354.133334-198.4-8.533333-14.933333-29.866667-19.2-44.8-10.666667-14.933333 8.533333-19.2 29.866667-10.666666 44.8 25.6 40.533333 55.466667 76.8 91.733333 108.8l-85.333333 85.333334c-12.8 12.8-12.8 32 0 44.8 6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333l91.733333-91.733334c38.4 25.6 81.066667 46.933333 125.866667 59.733334l-34.133333 130.133333c-4.266667 17.066667 6.4 34.133333 23.466666 38.4 2.133333 0 6.4 2.133333 8.533334 2.133333 14.933333 0 27.733333-8.533333 29.866666-23.466666l36.266667-132.266667c25.6 4.266667 51.2 6.4 78.933333 6.4 27.733333 0 55.466667-2.133333 83.2-6.4l36.266667 132.266667c4.266667 14.933333 17.066667 23.466667 29.866667 23.466666 2.133333 0 6.4 0 8.533333-2.133333 17.066667-4.266667 27.733333-21.333333 23.466667-38.4L661.333333 584.533333c44.8-12.8 85.333333-34.133333 123.733334-59.733333l91.733333 91.733333c6.4 6.4 14.933333 8.533333 23.466667 8.533334s17.066667-2.133333 23.466666-8.533334c6.4-10.666667 6.4-29.866667-6.4-42.666666z"
                  p-id="5858"></path>
              </svg>
            </div>
            <!-- 错误提示信息 -->
            <div class="error" v-if="errors.password"><i class="iconfont icon-warning" />{{ errors.password }}</div>

            <!-- 密码显示 -->
            <div class="input" v-show="showPass === true">
              <i class="iconfont icon-lock"></i>
              <Field
                :class="{ error: errors.password }"
                name="password"
                type="text"
                placeholder="请输入密码"
                v-model="form.password" />
              <svg
                @click="showPass = false"
                t="1665455395730"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="4883"
                width="16"
                height="16">
                <path
                  d="M512 384a128.853333 128.853333 0 0 0-128 128c0 70.058667 57.941333 128 128 128 70.016 0 128-57.941333 128-128 0-70.016-57.984-128-128-128z"
                  fill=""
                  p-id="4884"></path>
                <path
                  d="M512 213.333333c-325.674667 0-423.552 282.325333-424.448 285.184a42.410667 42.410667 0 0 0 0 27.008C88.448 528.341333 186.325333 810.666667 512 810.666667s423.552-282.325333 424.448-285.184a42.410667 42.410667 0 0 0 0-27.008C935.552 495.658667 837.674667 213.333333 512 213.333333z m0 512c-228.309333 0-316.757333-164.096-338.176-213.333333C195.328 462.592 283.818667 298.666667 512 298.666667c228.309333 0 316.757333 164.096 338.176 213.333333-21.504 49.408-109.994667 213.333333-338.176 213.333333z"
                  fill=""
                  p-id="4885"></path>
              </svg>
            </div>
            <!-- 错误提示信息 -->
            <div class="error" v-if="errors.password && showPass === true">
              <i class="iconfont icon-warning" />{{ errors.password }}
            </div>
          </div>
        </template>
        <!-- 验证码登录的表单 -->
        <template v-else>
          <div class="form-item">
            <div class="input">
              <i class="iconfont icon-user"></i>
              <Field
                :class="{ error: errors.mobile }"
                name="mobile"
                type="text"
                placeholder="请输入手机号"
                v-model="form.mobile" />
            </div>
            <!-- 错误提示 -->
            <div class="error" v-if="errors.mobile"><i class="iconfont icon-warning" />{{ errors.mobile }}</div>
          </div>
          <div class="form-item">
            <div class="input">
              <i class="iconfont icon-code"></i>
              <Field
                :class="{ error: errors.code }"
                name="code"
                type="text"
                placeholder="请输入验证码"
                v-model="form.code" />
              <span class="code" @click="getCode" v-if="count == 60">发送验证码</span>
              <span class="code" v-else>{{ count }}秒后发送</span>
            </div>
            <!-- 错误提示 -->
            <div class="error" v-if="errors.code"><i class="iconfont icon-warning" />{{ errors.code }}</div>
          </div>
        </template>
        <div class="form-item">
          <div class="agree">
            <CategoryChecked v-model="form.isAgree" />
            <span>我已同意</span>
            <a href="javascript:;">《隐私条款》</a>
            <span>和</span>
            <a href="javascript:;">《服务条款》</a>
          </div>
        </div>
        <a href="javascript:;" class="btn" @click="login">登录</a>
      </template>
    </From>
    <div class="action">
      <img src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt="" />
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { userAccountLoginAPI, userMobileLoginAPI, userMobileLogincodeAPI } from '@/api'
import type { LoginResult } from '@/api/types'
import CategoryChecked from '@/components/home/category/category-checked.vue'
import { ruleUsername, rulePassword, ruleMobile, ruleCode, ruleIsAgree } from '@/utils/form-rules'
import From from './components/From.vue'
import Field from './components/Field.vue'
import useStore from '@/stores'
// 是否显示密码
const showPass = ref(false)
// 什么方式登录
const isMsgLogin = ref(false)
// 登录要求
const form = reactive({
  username: 'xiaotuxian001', // 用户名
  password: '123456', // 密码
  mobile: '', // 手机号
  code: '', // 验证码
  isAgree: true, // 是否同意协议
})
// 自定义的校检规则
const rules = {
  username: ruleUsername, // 用户名
  password: rulePassword, // 密码
  mobile: ruleMobile, // 手机号
  code: ruleCode, // 验证码
  isAgree: ruleIsAgree, // 是否同意协议
}
// From组件上的ref
const formErrors: any = ref(null)
// 监听表单登录方式的变化
watch(isMsgLogin, () => {
  form.isAgree = true
  formErrors.value.clearErr()
})

// 获取验证码时间
const count = ref(60)
// 获取验证码函数
const getCode = async () => {
  if (ruleMobile(form.mobile) === true) {
    let timer: number = 1
    // 清除定时器
    clearInterval(timer)
    // 设置定时器
    timer = setInterval(() => {
      count.value--
      if (count.value == 0) {
        clearInterval(timer)
        count.value = 60
      }
    }, 1000)
    try {
      form.code = (await userMobileLogincodeAPI(form.mobile)) as string
    } catch (e) {
      // 清除定时器
      clearInterval(timer)
      // 隐藏读秒
      count.value = 60
      instance?.proxy?.$Message({ type: 'error', text: '该用户不存在请先注册' })
    }
    return
  }
  instance?.proxy?.$Message({ type: 'error', text: '请输入正确的手机号' })
}

const instance = getCurrentInstance()
// 用户仓库
const { user } = useStore()
const router = useRouter()
const route = useRoute()

// 需要在点击登录的时候对整体表单进行校验
const login = async () => {
  formErrors.value.getErr()
  if (!isMsgLogin.value) {
    try {
      const { account, nickname, avatar, token, mobile } = (await userAccountLoginAPI({
        account: form.username,
        password: form.password,
      })) as LoginResult
      // 给仓库中赋值
      user.setState({ account, nickname, avatar, token, mobile })
      // 给出信息提示
      instance?.proxy?.$Message({ type: 'success', text: '登录成功' })
      router.push((route.query.redirectUrl as string) || '/')
    } catch (e) {
      instance?.proxy?.$Message({ type: 'error', text: '登录失败' })
    }
    // 密码登录
  } else {
    try {
      const { account, nickname, avatar, token, mobile } = (await userMobileLoginAPI({
        mobile: form.mobile,
        code: form.code,
      })) as LoginResult
      // 给仓库中赋值
      user.setState({ account, nickname, avatar, token, mobile })
      // 给出信息提示
      instance?.proxy?.$Message({ type: 'success', text: '登录成功' })
      router.push((route.query.redirectUrl as string) || '/')
    } catch (e) {
      instance?.proxy?.$Message({ type: 'error', text: '登录失败' })
    }
  }
}
</script>
<style lang="less">
// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: @xtxColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        > .icon {
          position: absolute;
          right: 4px;
          top: 10px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: @priceColor;
          }
          &.active,
          &:focus {
            border-color: @xtxColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>

```
### 23.信息提示插件Message的封装
1. 封装组件
```js
<template>
  <div class="xtx-message" :style="style[type]" v-if="isShow">
    <!-- 上面绑定的是样式 -->
    <!-- 不同提示图标会变 -->
    <i class="iconfont" :class="[style[type].icon]"></i>
    <span class="text">{{ text }}</span>
  </div>
</template>
<script lang="ts" setup>
type stringKey = Record<string, any>

defineProps({
  text: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    // warn 警告  error 错误  success 成功
    default: 'warn',
  },
})

// 样式
const style: stringKey = {
  warn: {
    icon: 'icon-warning',
    color: '#E6A23C',
    backgroundColor: 'rgb(253, 246, 236)',
    borderColor: 'rgb(250, 236, 216)',
  },
  error: {
    icon: 'icon-shanchu',
    color: '#F56C6C',
    backgroundColor: 'rgb(254, 240, 240)',
    borderColor: 'rgb(253, 226, 226)',
  },
  success: {
    icon: 'icon-queren2',
    color: '#67C23A',
    backgroundColor: 'rgb(240, 249, 235)',
    borderColor: 'rgb(225, 243, 216)',
  },
}

// 控制消息提示的显示和隐藏
const isShow = ref(false)
// 显示方法
const show = () => {
  isShow.value = true
}
// 隐藏方法
const hide = () => {
  isShow.value = false
}

defineExpose({
  show,
  hide,
})
</script>
<style scoped lang="less">
.xtx-message {
  width: 300px;
  height: 50px;
  position: fixed;
  z-index: 9999;
  left: 50%;
  margin-left: -150px;
  top: 25px;
  line-height: 50px;
  padding: 0 25px;
  border: 1px solid #e4e4e4;
  background: #f5f5f5;
  color: #999;
  border-radius: 4px;
  i {
    margin-right: 4px;
    vertical-align: middle;
  }
  .text {
    vertical-align: middle;
  }
}
</style>

```
2. 封装插件函数
```js
import { render, type App, type VNode, createVNode } from 'vue'
import Message from './components/Message.vue'

const MessageFn = (message: { type: string; text: string }) => {
  // 变成div
  const Vnode: VNode = createVNode(Message, message)
  // 挂载
  render(Vnode, document.body)
  // 获取组件中的显示函数
  const show = Vnode.component?.exposed?.show
  // 获取显示函数
  const hide = Vnode.component?.exposed?.hide
  // 显示
  show()
  // 3秒后隐藏
  setTimeout(() => {
    hide()
  }, 3000)
}
export default {
  install(app: App) {
    // 挂载到全局
    app.config.globalProperties.$Message = MessageFn
  },
}

```
3. 对插件的方法进行声明
```js
//编写ts loading 声明文件放置报错 和 智能提示
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $Message: (message: { type: string; text: string }) => void
  }
}

```
4. main.ts中引入
```js
...
import Message from '@/plugin'

const app = createApp(App)

app
  .use(store)
  .use(router)
  .use(Message)
defineDirective(app)

app.mount('#app')

```
### 24.QQ登录的完成
#### 1.基本准备
1. 准备工作
```js
https://wiki.connect.qq.com/%E5%87%86%E5%A4%87%E5%B7%A5%E4%BD%9C_oauth2-0
https://wiki.connect.qq.com/js_sdk%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E#3..E8.87.AA.E5.AE.9A.E4.B9.89.E7.99.BB.E5.BD.95.E6.8C.89.E9.92.AE
有一个网站，且已备案。网站需要有QQ登录的逻辑（登录页面，回跳页面）。
然后在QQ互联上进行身份认证，审核通过。
然后在QQ互联上创建应用，应用需要域名，备案号，回调地址。审核通过。
得到：应用ID 应用key 回调地址。
才能完成QQ登录。（以上四个步骤，工作后大概率由后台或运维完成）
注意：id和uri都不能修改，否则无效。
# 测试用appid 
# 100556005
# 测试用redirect_uri
# http://www.corho.com:8080/#/login/callback
```
2. 在index.html中添加
```js
<script 
src="http://connect.qq.com/qc_jssdk.js" 
data-appid="100556005" 
data-redirecturi="http://www.corho.com:8080/#/login/callback">
</script>
```
3. 自动生成qq登录按键
```js
// 按键占位
<span id="qqLoginBtn"></span>


// 按键渲染
onMounted(() => {
  // 组件渲染完毕，使用QC生成QQ登录按钮
  window.QC.Login({
    btnId: 'qqLoginBtn',
  })
})
```
4. 复制点击按键后没有登录前的地址(用a标签和img替换按键)
```js
// 删除 <span id="qqLoginBtn"></span>

<a
        href="https://graph.qq.com/oauth2.0/show?which=Login&display=pc&client_id=100556005&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback">
        <img src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt="" />
</a>

// 删除
// 按键渲染
// onMounted(() => {
//   // 组件渲染完毕，使用QC生成QQ登录按钮
//   window.QC.Login({
//     btnId: 'qqLoginBtn',
//   })
// })
```
5. vite.config.ts中配置
```js

// https://vitejs.dev/config/
export default defineConfig({
  ...
  server: {
    host: '0.0.0.0',
    port: 8080,
  },
})

```
6. 修改模拟回调域名
```js
1. 找到 C:\Windows\System32\drivers\etc 下hosts文件
2. 在文件中加入  127.0.0.1       www.corho.com


# Copyright (c) 1993-2009 Microsoft Corp.
#
# This is a sample HOSTS file used by Microsoft TCP/IP for Windows.
#
# This file contains the mappings of IP addresses to host names. Each
# entry should be kept on an individual line. The IP address should
# be placed in the first column followed by the corresponding host name.
# The IP address and the host name should be separated by at least one
# space.
#
# Additionally, comments (such as these) may be inserted on individual
# lines or following the machine name denoted by a '#' symbol.
#
# For example:
#
# 102.54.94.97 rhino.acme.com # source server
# 38.25.63.10 x.acme.com # x client host
# localhost name resolution is handled within DNS itself.
# 127.0.0.1 localhost
# ::1 localhost
 127.0.0.1       www.corho.com


// 这时输入http://www.corho.com:8080   就可以访问项目

```
7. 配置登录后回调地址的路由信息
```js
已注册，已绑定，登录成功，跳转首页，或者来源页面
已注册，未绑定，绑定手机号，登录成功，跳转首页，或者来源页面
未注册，补充完善账户信息，，登录成功，跳转首页，或者来源页面
```
#### 2.获取qq的信息展示
1. 主页面展示qq登录的页面
```js
<template>
  <LoginHeader>联合登录</LoginHeader>
  <section class="container" v-if="isBind">
    <div class="unbind">
      <div class="loading"></div>
    </div>
  </section>
  <section class="container" v-else>
    <nav class="tab">
      <a @click="hasAccount = true" :class="{ active: hasAccount }" href="javascript:;">
        <i class="iconfont icon-bind" />
        <span>已有小兔鲜账号，请绑定手机</span>
      </a>
      <a @click="hasAccount = false" :class="{ active: !hasAccount }" href="javascript:;">
        <i class="iconfont icon-edit" />
        <span>没有小兔鲜账号，请完善资料</span>
      </a>
    </nav>
    <div class="tab-content" v-if="hasAccount">
      <LoginCallbackBind :unionId="unionId" />
    </div>
    <div class="tab-content" v-else>
      <LoginCallbackPatch />
    </div>
  </section>
  <LoginFooter />
</template>

<script lang="ts" setup>
import LoginHeader from '@/components/Login/login-header.vue'
import LoginFooter from '@/components/Login/login-footer.vue'
import LoginCallbackBind from '@/components/Login/login-callback-bind.vue'
import LoginCallbackPatch from '@/components/Login/login-callback-patch.vue'
import { userQQLoginAPI } from '@/api'
import useStore from '@/stores'
import type { LoginResult } from '@/api/types'

const hasAccount = ref(true)
// unionId的信息传递进版定
const unionId = ref('')
// 假设已经绑定，默认会去做一次登录，如果登录失败证明未绑定。
const isBind = ref(true)
const { user } = useStore()
const router = useRouter()
const instance = getCurrentInstance()
// 1. 获取QQ互联的openId也就是后台需要的unionId
// 2. 根据QQ互联的openId去进行登录，准备一个接口
// 检查QQ是否登录
if (window.QC.Login.check()) {
  // 获取登录的unionid
  window.QC.Login.getMe(async (openId: string) => {
    // 保存后放入其他组件
    unionId.value = openId
    try {
      // 登录成功获取用户的信息
      const { account, avatar, mobile, nickname, token } = (await userQQLoginAPI(openId)) as LoginResult
      // 存入仓库
      user.setState({ account, nickname, avatar, token, mobile })
      // 跳转地址
      router.push(user.redirectUrl)
      // 成功提示
      instance?.proxy?.$Message({ type: 'success', text: '登录成功' })
    } catch (e) {
      // 登录失败把第一次登录改为false
      isBind.value = false
    }
  })
}
</script>

<style scoped lang="less">
.container {
  padding: 25px 0;
  position: relative;
  height: 730px;
  .unbind {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 25px 0;
    z-index: 99;
    .loading {
      height: 100%;
      background: #fff url(../../assets/images/load.gif) no-repeat center / 100px 100px;
    }
  }
}
.tab {
  background: #fff;
  height: 80px;
  padding-top: 40px;
  font-size: 18px;
  text-align: center;
  a {
    color: #666;
    display: inline-block;
    width: 350px;
    line-height: 40px;
    border-bottom: 2px solid #e4e4e4;
    i {
      font-size: 22px;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
      margin-left: 4px;
    }
    &.active {
      color: @xtxColor;
      border-color: @xtxColor;
    }
  }
}
.tab-content {
  min-height: 600px;
  background: #fff;
}
</style>

```
2. 展示qq登录后绑定账号
```js
<template>
  <From class="xtx-form" :rule="rules" :form="form" ref="getErr">
    <template #rule="{ errors }">
      <div class="user-info">
        <img src="http://qzapp.qlogo.cn/qzapp/101941968/57C7969540F9D3532451374AA127EE5B/50" alt="" />
        <p>Hi，{{ nickname }} 欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~</p>
      </div>
      <div class="xtx-form-item">
        <div class="field">
          <i class="icon iconfont icon-phone"></i>
          <Field
            :class="{ err: errors.mobile }"
            class="input"
            type="text"
            placeholder="绑定的手机号"
            v-model="form.mobile" />
        </div>
        <div v-if="errors.mobile" class="error">{{ errors.mobile }}</div>
      </div>
      <div class="xtx-form-item">
        <div class="field">
          <i class="icon iconfont icon-code"></i>
          <Field :class="{ err: errors.code }" class="input" type="text" placeholder="短信验证码" v-model="form.code" />
          <span class="code" @click="sendCode" v-if="second === 60">发送验证码</span>
          <span class="code" v-else>{{ second }}秒后发送</span>
        </div>
        <div v-if="errors.code" class="error">{{ errors.code }}</div>
      </div>
      <a href="javascript:;" class="submit" @click="submit">立即绑定</a>
    </template>
  </From>
</template>

<script lang="ts" setup>
import From from '@/components/Login/components/From.vue'
import Field from '@/components/Login/components/Field.vue'
import { ruleMobile, ruleCode } from '@/utils/form-rules'
import { userQQLoginBindAPI, userQQLoginCodeAPI } from '@/api'
import type { LoginResult } from '@/api/types'
import useStore from '@/stores'

const props = defineProps({
  unionId: {
    type: String,
    default: '',
  },
})

// 自定义的校检规则
const rules = {
  mobile: ruleMobile, // 手机号
  code: ruleCode, // 验证码
}
// 表单参数
const form = reactive({
  mobile: '',
  code: '',
})
const nickname = ref('')
const avatar = ref('')
// 如果已经登录成功
if (window.QC.Login.check()) {
  // 获取登录的用户信息
  window.QC.api('get_user_info').success((res: any) => {
    avatar.value = res.data.figureurl_1
    nickname.value = res.data.nickname
  })
}
const instance = getCurrentInstance()

// 验证读秒参数
const second = ref(60)

// 获取验证码
const sendCode = async () => {
  let timer = 1
  clearInterval(timer)
  // 校检手机号
  const flag = ruleMobile(form.mobile)
  if (flag === true && second.value === 60) {
    timer = setInterval(() => {
      second.value--
      if (second.value === 0) {
        second.value = 60
        clearInterval(timer)
      }
    }, 1000)
    try {
      // 获取短信验证码
      await userQQLoginCodeAPI(form.mobile)
    } catch (e) {
      instance?.proxy?.$Message({ type: 'error', text: '获取验证码失败' })
    }
  } else {
    instance?.proxy?.$Message({ type: 'warn', text: flag as string })
  }
}

// 表单的实例
const getErr: any = ref(null)
const { user } = useStore()
const router = useRouter()
// 绑定账号信息
const submit = async () => {
  // 调用表单的错误信息
  getErr.value.getErr()
  try {
    // 登录成功获取用户的信息
    const { account, avatar, mobile, nickname, token } = (await userQQLoginBindAPI(
      props.unionId,
      form.mobile,
      form.code,
    )) as LoginResult
    // 存入仓库
    user.setState({ account, nickname, avatar, token, mobile })
    // 跳转地址
    router.push(user.redirectUrl)
    // 成功提示
    instance?.proxy?.$Message({ type: 'success', text: '登录成功' })
  } catch (e) {
    instance?.proxy?.$Message({ type: 'error', text: '用户信息不存在' })
  }
}
</script>

<style scoped lang="less">
.user-info {
  width: 320px;
  height: 70px;
  margin: 0 auto;
  display: flex;
  background: #f2f2f2;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 25px;
  img {
    background: #f2f2f2;
    width: 50px;
    height: 50px;
  }
  p {
    padding-left: 10px;
  }
}
.code {
  position: absolute;
  right: 0;
  top: 0;
  line-height: 50px;
  width: 80px;
  color: #999;
  &:hover {
    cursor: pointer;
  }
}
</style>

```
3. 无账号注册账号
```js
<template>
  <From class="xtx-form" :form="form" :rule="rule" ref="FromRef">
    <template #rule="{ errors }">
      <div class="xtx-form-item">
        <div class="field">
          <i class="icon iconfont icon-user"></i>
          <Field
            :class="{ err: errors.username }"
            class="input"
            type="text"
            placeholder="请输入用户名"
            v-model="form.username" />
        </div>
        <div class="error" v-if="errors.username">{{ errors.username }}</div>
      </div>
      <div class="xtx-form-item">
        <div class="field">
          <i class="icon iconfont icon-phone"></i>
          <Field
            :class="{ err: errors.mobile }"
            class="input"
            type="text"
            placeholder="请输入手机号"
            v-model="form.mobile" />
        </div>
        <div v-if="errors.mobile" class="error">{{ errors.mobile }}</div>
      </div>
      <div class="xtx-form-item">
        <div class="field">
          <i class="icon iconfont icon-code"></i>
          <Field
            :class="{ err: errors.code }"
            class="input"
            type="text"
            placeholder="请输入验证码"
            v-model="form.code" />
          <span class="code" @click="getCode" v-if="count === 60">发送验证码</span>
          <span class="code" v-else>{{ count }}秒后发送</span>
        </div>
        <div v-if="errors.code" class="error">{{ errors.code }}</div>
      </div>
      <div class="xtx-form-item">
        <div class="field">
          <i class="icon iconfont icon-lock"></i>
          <Field
            :class="{ err: errors.password }"
            class="input"
            type="password"
            placeholder="请输入密码"
            v-model="form.password"
            autocomplete="off" />
        </div>
        <div v-if="errors.password" class="error">{{ errors.password }}</div>
      </div>
      <div class="xtx-form-item">
        <div class="field">
          <i class="icon iconfont icon-lock"></i>
          <Field
            :class="{ err: repasswordInfo.err !== '' }"
            class="input"
            type="password"
            placeholder="请确认密码"
            v-model="repasswordInfo.repassword"
            autocomplete="off" />
        </div>
        <div class="error" v-if="repasswordInfo.err !== ''">{{ repasswordInfo.err }}</div>
      </div>
      <a href="javascript:;" class="submit" @click="submit">立即提交</a>
    </template>
  </From>
</template>

<script lang="ts" setup>
import From from './components/From.vue'
import Field from './components/Field.vue'
import { ruleUsername, rulePassword, ruleMobile, ruleCode } from '@/utils/form-rules'
import { userregisterAPI, userregisterCodeAPI } from '@/api'
import type { LoginResult } from '@/api/types'
import useStore from '@/stores'

// 表单验证
const form = reactive({
  username: '', // 用户名
  mobile: '', // 手机号
  code: '', // 验证码
  password: '', // 密码
})
// 样子规则
const rule = {
  username: ruleUsername,
  mobile: ruleMobile,
  code: ruleCode,
  password: rulePassword,
}
// 确认密码
const repasswordInfo = reactive({
  repassword: '',
  err: '',
})
// 监听密码的变化
watch(
  [() => repasswordInfo.repassword, () => form],
  () => {
    repasswordInfo.repassword !== form.password ? (repasswordInfo.err = '密码不一致') : (repasswordInfo.err = '')
  },
  { deep: true },
)

// 读秒
const count = ref(60)
// 获取验证码
const getCode = async () => {
  let timer = 1
  clearInterval(timer)
  if (ruleMobile(form.mobile) === true) await userregisterCodeAPI(form.mobile)
  form.code = '123456'
  timer = setInterval(() => {
    count.value--
    if (count.value === 0) {
      count.value = 60
      clearInterval(timer)
    }
  }, 1000)
}
const instance = getCurrentInstance()
const FromRef: any = ref(null)
const { user } = useStore()
const router = useRouter()
// 登录注册
const submit = async () => {
  if (FromRef.value.getErr() && repasswordInfo.err === '') {
    // 登录成功获取用户的信息
    const { account, avatar, mobile, nickname, token } = (await userregisterAPI({
      account: form.username,
      password: form.password,
      code: form.code,
      mobile: form.mobile,
    })) as LoginResult
    // 存入仓库
    user.setState({ account, nickname, avatar, token, mobile })
    // 跳转地址
    router.push(user.redirectUrl)
    // 成功提示
    instance?.proxy?.$Message({ type: 'success', text: '登录成功' })
  }
}
</script>

<style scoped lang="less">
.code {
  position: absolute;
  right: 0;
  top: 0;
  line-height: 50px;
  width: 80px;
  color: #999;
  &:hover {
    cursor: pointer;
  }
}
</style>

```
### 25.确认插件confirm的封装
1. 封装组件和样式
```js
<template>
  <div class="xtx-confirm" v-if="isShow">
    <div class="wrapper">
      <div class="header">
        <h3>{{ title }}</h3>
        <a href="JavaScript:;" class="iconfont icon-close-new" @click="CancelFn"></a>
      </div>
      <div class="body">
        <i class="iconfont icon-warning"></i>
        <span>{{ text }}</span>
      </div>
      <div class="footer">
        <GlobalButton size="mini" type="gray" @click="CancelFn">取消</GlobalButton>
        <GlobalButton size="mini" type="primary" @click="ConfirmFn">确认</GlobalButton>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import GlobalButton from '@/components/global/home/goodDetail/global-button.vue'
const props = defineProps({
  title: {
    type: String,
    default: '温馨提示',
  },
  text: {
    type: String,
    default: '',
  },
  cancel: {
    type: Function,
    default: () => {},
  },
  confirm: {
    type: Function,
    default: () => {},
  },
})

const isShow = ref(false)

const hide = () => {
  isShow.value = false
}

const show = () => {
  isShow.value = true
}
// 取消
const CancelFn = () => {
  props.cancel()
  hide()
}
// 确定
const ConfirmFn = () => {
  props.confirm()
  hide()
}
defineExpose({
  show,
})
</script>
<style scoped lang="less">
.xtx-confirm {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 8888;
  background: rgba(0, 0, 0, 0.5);
  .wrapper {
    width: 400px;
    background: #fff;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .header,
    .footer {
      height: 50px;
      line-height: 50px;
      padding: 0 20px;
    }
    .body {
      padding: 20px 40px;
      font-size: 16px;
      .icon-warning {
        color: @priceColor;
        margin-right: 3px;
        font-size: 16px;
      }
    }
    .footer {
      text-align: right;
      .xtx-button {
        margin-left: 20px;
      }
    }
    .header {
      position: relative;
      h3 {
        font-weight: normal;
        font-size: 18px;
      }
      a {
        position: absolute;
        right: 15px;
        top: 15px;
        font-size: 20px;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        color: #999;
        &:hover {
          color: #666;
        }
      }
    }
  }
}
</style>

```
2. 引入封装的插件
```js
import { render, type App, type VNode, createVNode } from 'vue'
import Confirm from './components/Confirm.vue'

const ConfirmFn = (confirm: { title: string; text: string; cancel: Function; confirm: Function }) => {
  // 变成div
  const Vnode: VNode = createVNode(Confirm, confirm)
  // 挂载
  render(Vnode, document.body)
  // 获取组件中的显示函数
  const show = Vnode.component?.exposed?.show
  // 执行时
  show()
}
export default {
  install(app: App) {
    app.config.globalProperties.$Confirm = ConfirmFn
  },
}

```
3. 使用确认插件
```js
// 清空失效商品
const deleteunvalidList = () => {
  if (cart.unvalidList.length === 0) return
  instance?.proxy?.$Confirm({
    text: '您确认从购物车删除全部失效商品吗？',
    confirm: () => {
      cart.deleteunvalidList()
    },
  })
}
```
### 26.支付流程的实现
1. 支付宝基本地址
```js
// 支付地址
// const payUrl = '后台服务基准地址+支付页面地址+订单ID+回跳地址'
const redirect = encodeURIComponent('http://www.corho.com:8080/#/paysuccess/' + route.query.orderId)
const payUrl = `${baseURL}pay/aliPay?orderId=${route.query.orderId}&redirect=${redirect}`
```
2. 支付宝支付
```js
// 直接调用地址就可以跳转到支付宝页面
 <a class="btn alipay" :href="payUrl" target="_blank" @click="flag = true"></a>
```
### 27.全局组件对话框的封装
1. 样式封装
```js
<template>
  <div class="xtx-dialog" :class="{ fade }" v-if="fade">
    <div class="wrapper" :class="{ fade }">
      <div class="header">
        <h3>{{ title }}</h3>
        <a href="JavaScript:;" class="iconfont icon-close-new" @click="close"></a>
      </div>
      <div class="body">
        <slot />
      </div>
      <div class="footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const fade = ref(true)

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  flag: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{ (e: 'update:flag', flag: boolean): void }>()

watch(
  () => props.flag,
  () => {
    fade.value = props.flag
  },
  { immediate: true },
)
// 关闭的时候通知父组件
const close = () => {
  emit('update:flag', false)
}
</script>
<style scoped lang="less">
.xtx-dialog {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 8887;
  background: rgba(0, 0, 0, 0);
  &.fade {
    transition: all 0.4s;
    background: rgba(0, 0, 0, 0.5);
  }
  .wrapper {
    width: 600px;
    background: #fff;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    opacity: 0;
    &.fade {
      transition: all 0.4s;
      transform: translate(-50%, -50%);
      opacity: 1;
    }
    .body {
      padding: 20px 40px;
      font-size: 16px;
      .icon-warning {
        color: @priceColor;
        margin-right: 3px;
        font-size: 16px;
      }
    }
    .footer {
      text-align: center;
      padding: 10px 0 30px 0;
    }
    .header {
      position: relative;
      height: 70px;
      line-height: 70px;
      padding: 0 20px;
      border-bottom: 1px solid #f5f5f5;
      h3 {
        font-weight: normal;
        font-size: 18px;
      }
      a {
        position: absolute;
        right: 25px;
        top: 25px;
        font-size: 24px;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        color: #999;
        &:hover {
          color: #666;
        }
      }
    }
  }
}
</style>

```
2. 基本使用
```js
<template>
  <GlobalDialog title="取消订单" v-model:flag="flag">
    <!-- 组件内容 -->
    <div class="cancel-info">
      <p>取消订单后，本单享有的优惠可能会一并取消，是否继续？</p>
      <p class="tip">请选择取消订单的原因（必选）：</p>
      <div class="btn">
        <a
          @click="curText = item"
          v-for="item in cancelReason"
          :key="item"
          href="javascript:;"
          :class="{ active: curText === item }">
          {{ item }}
        </a>
      </div>
    </div>
    <!-- 按钮操作 -->
    <template #footer>
      <GlobalButton type="gray" @click="flag = false" style="margin-right: 20px">取消</GlobalButton>
      <GlobalButton type="primary" @click="submit">确认</GlobalButton>
    </template>
  </GlobalDialog>
</template>
<script lang="ts" setup>
import { cancelOrderAPI } from '@/api'

const emit = defineEmits(['refresh'])
const cancelReason = [
  '配送信息有误',
  '商品买错了',
  '重复下单/误下单',
  '忘记使用优惠券、兔币等',
  '其他渠道价格更低',
  '不想买了',
]
const flag = ref(false)
const curText = ref()
// 控制对话框显示
const show = () => {
  flag.value = true
}
// 控制对话框隐藏
const hide = () => {
  flag.value = false
}
// 点击确认按键提交请求
const orderId = ref()
const submit = async () => {
  if (!curText.value && !orderId.value) return
  await cancelOrderAPI(orderId.value, cancelReason[curText.value])
  // 通知父组件区刷新
  emit('refresh')
  flag.value = false
}
defineExpose({
  show,
  hide,
  orderId,
})
</script>
<style scoped lang="less">
.xtx-dialog ::v-deep .wrapper {
  width: 620px;
}
.cancel-info {
  p {
    font-size: 16px;
    line-height: 35px;
    &.tip {
      color: #999;
    }
  }
  .btn {
    padding-top: 21px;
    display: flex;
    flex-wrap: wrap;
    a {
      width: 256px;
      height: 45px;
      line-height: 45px;
      text-align: center;
      background-color: #ffffff;
      border: 1px solid #e4e4e4;
      margin-right: 20px;
      margin-bottom: 20px;
      color: #666;
      &:nth-child(2n) {
        margin-right: 0;
      }
      &:hover,
      &.active {
        background-color: #e3f9f4;
        border-color: @xtxColor;
      }
    }
  }
}
</style>
s

```
### 28.全局组件Tab的封装
1. tsx封装
```js
import { defineComponent } from 'vue'
import { useVModel } from '@/hooks'
import './tab.less'

export default defineComponent({
  name: 'Globaltab',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  emits: ['tab-click', 'update:modelValue'],
  setup(props, { slots, emit }) {
    const activeName = useVModel(props, 'modelValue', emit)

    //    tab的点击事件
    const tabClick = (name: string, index: number) => {
      activeName.value = name
      // 触发一个点击自定义事件
      emit('tab-click', { name, index })
    }
    // 获取插槽的值
    const panels = slots.default?.()
    const dynamicPanels: any[] = []
    if (panels && panels?.length > 0) {
      panels?.forEach((item) => {
        if (item.type.__name === 'global-tab-panel') {
          dynamicPanels.push(item)
        } else {
          item.children?.forEach((com: any) => {
            dynamicPanels.push(com)
          })
        }
      })
    }
    return () => (
      <div class="xtx-tabs">
        <nav>
          {dynamicPanels?.map((item, i) => (
            <a href="javascript:;" onClick={() => tabClick(item.props.name, i)}>
              {item.props?.label}
            </a>
          ))}
        </nav>
      </div>
    )
  },
})

```
2. 封装tab面板
```js
<template>
  <!-- 装载是内容 -->
  <div class="xtx-tabs-panel" v-show="activeName === name">
    <slot />
  </div>
</template>
<script lang="ts" setup>
import { inject } from 'vue'

defineProps({
  // 标签页标题文章
  label: {
    type: String,
    default: '',
  },
  // 唯一标识
  name: {
    type: String,
    default: '',
  },
})

// 当前组件该不该显示，取决于xtx-tabs组件的activeName数据是否和props.name一样
const activeName = inject('activeName')
</script>

```
3. 使用组件
```js
  <!-- 头部导航 -->
  <div class="member-order-page">
    <GlobalTab v-model="activeName" @tab-click="Tabclick">
      <GlobalTabPanel v-for="item in orderStatus" :key="item.name" :label="item.label" :name="item.name">{{
        item.label
      }}</GlobalTabPanel>
    </GlobalTab>
  </div>
```
### 29.全局组件setp的封装
1. tsx封装
```js
import './step.less'

export default defineComponent({
  name: 'GlobalSteps',
  props: {
    active: {
      type: Number,
      default: 1,
    },
  },
  setup(props, { slots }) {
    const items = slots.default?.()
    const dynamicitems: any[] = []
    if (items && items?.length > 0) {
      items?.forEach((item) => {
        if (item.type.__name === 'global-step-item') {
          dynamicitems.push(item)
        } else {
          item.children?.forEach((com: any) => {
            dynamicitems.push(com)
          })
        }
      })
    }
    return () => (
      <div class="xtx-steps">
        {dynamicitems?.map((item, i) => {
          return (
            <div class={`xtx-steps-item ${i < props.active ? 'active' : ''}`}>
              <div class="step">
                <span>{i + 1}</span>
              </div>
              <div class="title">{item.props.title}</div>
              <div class="desc">{item.props.desc}</div>
            </div>
          )
        })}
      </div>
    )
  },
})

```
2. 封装子展示组件
```js
<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: '',
  },
  desc: {
    type: String,
    default: '',
  },
})
</script>

```
3. 使用组件
```js
<template>
  <div class="detail-steps" style="padding: 20px">
    <GlobalStep :active="order.orderState === 6 ? 1 : order.orderState">
      <GlobalStepItem title="提交订单" :desc="order.createTime" />
      <GlobalStepItem title="付款成功" :desc="order.payTime" />
      <GlobalStepItem title="商品发货" :desc="order.consignTime" />
      <GlobalStepItem title="确认收货" :desc="order.evaluationTime" />
      <GlobalStepItem title="订单完成" :desc="order.endTime" />
    </GlobalStep>
  </div>
</template>
<script lang="ts" setup>
defineProps({
  order: {
    type: Object,
    default: () => ({}),
  },
})
</script>
<style scoped lang="less"></style>

```
## 注意事项
### 1.元素隐式具有any类型，因为类型为string的表达式不能用于索引类型
```js
type stringKey = Record<string, any>
const accessDict: stringKey = {
    create: false,  // 创建
    receive: false,  // 接收
    ...
}

 for (const i of AccessList) {
      accessDict[i.authName] = true
  }

```
### 2.父组件通过ref调用子组件的方法
1. 语法糖子组件的方法要导出
```js
<template>
  <form>
    <slot name="rule" :errors="errors"></slot>
  </form>
</template>

<script setup lang="ts">
....

// 获取错误信息
const getErr = () => {
  for (let i in props.rule) {
    for (let j in props.form) {
      if (i === j) {
        errors.value[i] = props.rule[i](props.form[j])
        if (errors.value[i] === true) errors.value[i] = null
      }
    }
  }
}

// 清除错误信息
const clearErr = () => {
  for (let i in props.form) {
    errors.value[i] = null
  }
}
// 导出
defineExpose({ getErr, clearErr })
</script>


```
2. 父组件调用
```js
 <From class="form" :rule="rules" :form="form" ref="formErrors">
 </From>
//  调用子组件方法
 clearErrors.value.validate()
```



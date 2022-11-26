## Vue3
### 组合式API
#### 1.钩子函数steup
1. 函数的普通用法
```js
<script>
export default {
  setup() {

    return {}
  }
}
</script>

<template>
  
</template>
```
2. 简写使用setup
```js
<script setup>

</script>

<template>
 
</template>

```
#### 2.响应式API
1. ref函数
```js
<script setup>
import { ref } from 'vue'

const state = ref(0)
function increment() {
  state.value++
}
</script>

<template>
  <button @click="increment">
    {{ state }}
  </button>
</template>


```
2. reactive函数
```js
<script setup>
import { reactive } from 'vue'
const state = reactive({ count: 0 })
function increment() {
  state.count++
}
</script>

<template>
  <button @click="increment">
    {{ state.count }}
  </button>
</template>

```
#### 3.计算属性API
1. 单向响应
```js
<script setup>
import { computed,reactive } from 'vue'
const Person=reactive({X:'张',M:'三'})
 Person.XM=computed(()=>{
  return Person.X+'-'+Person.M
 })
</script>

<template>
  姓:<input v-model="Person.X"><br>
  名:<input v-model="Person.M"><br>
  单向响应:<input v-model="Person.XM">
</template>

```
2. 双向响应
```js
<script setup>
import { computed,reactive } from 'vue'
const Person=reactive({X:'张',M:'三'})
Person.AXM=computed({
  get(){
    return Person.X+'-'+Person.M
  },
  set(value){
    const arr=value.split('-')
    Person.X=arr[0]
    Person.M=arr[1]
  }
})
</script>

<template>
  姓:<input v-model="Person.X"><br>
  名:<input v-model="Person.M"><br>
  双向响应:<input v-model="Person.AXM">
</template>

```
#### 4.监听属性API
1. 监听整个对象
```js
<!--  // 监听整个对象,由于是浅拷贝，他们新旧指向的是通一个对象 -->
<script setup>
import {reactive,watch} from 'vue'
const Person=reactive({name:'张三',age:18, job:{salary:20}})
      watch(Person,(newVal,oldVal)=>{
         console.log('用户信息发生了变化',newVal,oldVal);
      })
</script>

<template>
 <h2>年龄：{{Person.age}}</h2>
 <button @click="Person.age++">+1</button>
</template>

```
2. 监听对象中单个属性
```js
<!-- 监听对象中单个属性,监听单个属性可以检测到新旧值 -->
<script setup>
import {reactive,watch} from 'vue'
const Person=reactive({name:'张三',age:18, job:{salary:20}})
      watch(()=>Person.age,(newVal,oldVal)=>{
         console.log('用户年龄发生了变化',newVal,oldVal);
      })
</script>

<template>
 <h2>年龄：{{Person.age}}</h2>
 <button @click="Person.age++">+1</button>
</template>

```
3. 监听多个对象
```js
<!-- 监听对象中多个个属性,监听单个属性可以检测到新旧值 -->
<script setup>
import {reactive,watch} from 'vue'
const Person=reactive({name:'张三',age:18, job:{salary:20}})
      watch([()=>Person.name,()=>Person.age],(newValue,oldValue)=>{
        console.log('person.name或者person.age的值变化了',newValue,oldValue);
      })
</script>

<template>
 <h2>姓名：{{Person.name}}</h2>
 <button @click="Person.name+='~'">修改</button>
 <h2>年龄：{{Person.age}}</h2>
 <button @click="Person.age++">+1</button>
</template>

```
4. 监听对象中对象(深度监听)
```js
<!-- 监听对象中对象,必须开启深度监听,一般情况不监听对象 -->
<script setup>
import {reactive,watch} from 'vue'
const Person=reactive({name:'张三',age:18, job:{salary:20}})
      watch(()=>Person.job,(newValue,oldValue)=>{
        console.log('person.job的值变化了',newValue,oldValue);
       },{
      deep:true
      })
</script>

<template>
 <h2>薪资：{{Person.job.salary}}K</h2>
 <button @click="Person.job.salary++">+1</button>
</template>


```
#### 5.高级监听API
1. 基本使用(默认执行一次)
```js
<!-- watchEffect所指定的回调中用到的数据只要发生变化，则直接重新执行回调。 -->
<script setup>
import {reactive,watchEffect} from 'vue'
const Person=reactive({
        name:'张三'
      })
     
     watchEffect(()=>{
     Person.name
     console.log('姓名发送了变化');
     })
</script>

<template>
 <h2>姓名：{{Person.name}}</h2>
 <button @click="Person.name+='~'">修改</button>
</template>


```
2. 监听御前处理oninvalidate参数
```js
<script setup lang="ts">
import { reactive, watchEffect } from "vue";
const Person = reactive({
  name: "张三",
});

watchEffect((oninvalidate) => {
  oninvalidate(() => {
    console.log("before");
  });
  Person.name;
  console.log("姓名发送了变化");
});
</script>

<template>
  <h2>姓名：{{ Person.name }}</h2>
  <button @click="Person.name += '~'">修改</button>
</template>
```
3. 停止监听
```js
<script setup lang="ts">
import { reactive, watchEffect } from "vue";
const Person = reactive({
  name: "张三",
});

const stop = watchEffect((oninvalidate) => {
  oninvalidate(() => {
    console.log("before");
  });
  Person.name;
  console.log("姓名发送了变化");
});
</script>

<template>
  <h2>姓名：{{ Person.name }}</h2>
  <button @click="Person.name += '~'">修改</button>
  <button @click="stop">停止</button>
</template>
```
#### 6.响应式对象解构API
1. toRef函数
```js
<script setup>
import {reactive,toRef} from 'vue'
const person=reactive({A:1,B:2})
const A=toRef(person,'A')
</script>

<template>
 <h2>姓名：{{A}}</h2>
 <button @click="person.A+='~'">修改</button>
</template>
```
2. toRefs
```js
<script setup lang="ts">
  import {reactive,toRefs} from 'vue'
  const person=reactive({A:1,B:2})
  const {A,B}=toRefs(person)
  </script>
  
  <template>
   <h2>姓名：{{A}}</h2>
   <button @click="A+=1">修改</button>
  </template>
```
#### 7.生命周期API
```js
<script setup>
  import {onBeforeMount,onMounted,onBeforeUpdate,onUpdated,onBeforeUnmount,onUnmounted,ref} from "vue";

  onBeforeMount(()=>{
    console.log('---挂载之前---');
   })
   onMounted(()=>{
    console.log('---挂载---');
   })
   onBeforeUpdate(()=>{
    console.log('---更新之前---');
   })
   onUpdated(()=>{
    console.log('---更新---');
   })
   onBeforeUnmount(()=>{
    console.log('---卸载之前---');
   })
   onUnmounted(()=>{
    console.log('---卸载---');
   })

</script>
```
#### 8.ref获取dom
```js
<template>
  <div>
    <div ref="box">我是div</div>
  </div>
</template>

<script>
import { ref,onMounted } from "vue";
export default {
  setup() {
    let box = ref(null); //本质是reactive({value:null})
    // 需要在生命周期获取
    onMounted(()=>{
      // 当界面挂载出来后就会自动执行
      console.log(box.value);
    })
    //接受的是null,原因是setup执行时机比mounted早,dom还没形成
    console.log(box.value);
    return { box };
  },
};
</script>


```
#### 9.Hooks
##### (1)官方hooks
1. useAttrs() 
```js
<!-- 父组件 -->
<template>
  <Acom a="456" title="789" />
</template>

<!-- 子组件 -->
<!-- 获取父组件传过来的全部参数 -->
<script setup lang="ts">
import { useAttrs } from 'vue'
let attr = useAttrs()
console.log(attr)
</script>

```
##### (2)自定hooks
1. 自定义hooks转换图片
```js
import { onMounted } from 'vue'

type Options = {
  el: string
}

export default function (options: Options): Promise<{ baseUrl: string }> {
  return new Promise(resolve => {
    onMounted(() => {
      const img: HTMLImageElement = document.querySelector(
        options.el
      ) as HTMLImageElement
      img.onload = () => {
        resolve({
          baseUrl: base64(img)
        })
      }
    })
    const base64 = (el: HTMLImageElement) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = el.width
      canvas.height = el.height
      ctx?.drawImage(el, 0, 0, canvas.width, canvas.height)
      return canvas.toDataURL('image/jpg')
    }
  })
}

```
2. 使用hooks
```js
<script setup lang="ts">
import BASE64 from './hooks'
BASE64({ el: '#img' }).then(resolve => {
  console.log(resolve.baseUrl)
})
</script>

```
##### (3)第三方hooks
1. 安装依赖```yarn add @vueuse/core```
2. 简单使用
```js
<script setup lang="ts">
import { ref } from 'vue'
import { useDraggable } from '@vueuse/core'

const el = ref<HTMLElement | null>(null)

// `style` will be a helper computed for `left: ?px; top: ?px;`
const { x, y, style } = useDraggable(el, {
  initialValue: { x: 40, y: 40 }
})
</script>

<template>
  <div ref="el" :style="style" style="position: fixed">
    Drag me! I am at {{ x }}, {{ y }}
  </div>
</template>


```
### 组件间通讯
#### 1.props父传子
1. 父组件
```js
<script setup >
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <HelloWorld msg="1"/>
</template>
```
2. 子组件
```js
<script setup>
// const props=defineProps(['msg'])
const props=defineProps({msg:String})
console.log(props.msg)
</script>
```
#### 2.emit子传父
1. 父组件
```js
<script setup >
import HelloWorld from './components/HelloWorld.vue'
const getuser=(a)=>{
  console.log(a)
}
</script>

<template>
  <HelloWorld @getuser="getuser"/>
</template>
```
2. 子组件
```js
<script setup lang="ts">
const emit = defineEmits(['getuser'])

function buttonClick() {
  emit('getuser',1)
}
  </script>

<template>
  <button @click="buttonClick">传输</button>
</template>

```
3. 自定义事件事件校检
```js
<script setup>
const emit = defineEmits({
  // 没有校验
  click: null,

  // 校验 submit 事件
  submit: ({ email, password }) => {
    if (email && password) {
      return true
    } else {
      console.warn('Invalid submit event payload!')
      return false
    }
  }
})

function submitForm(email, password) {
  emit('submit', { email, password })
}
</script>

```
#### 3.插槽通讯
##### (1)匿名插槽
1. 子组件
```js
<template>
  <!-- slot插槽占位 -->
 <slot></slot>
</template>
```
2. 父组件
```js
<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <HelloWorld>
     插槽传递
  </HelloWorld>
</template>
```
##### (2)具名插槽
1. 父组件
```js
<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";

</script>

<template>
  <HelloWorld>
    <!-- v-slot:简写# -->
    <template v-slot:btn>
      <button>具名插槽</button>
    </template>
  </HelloWorld>
</template>
```
2. 子组件
```js
<template>
  <!-- slot插槽占位 -->
 <slot name="btn"></slot>
</template>
```
##### (3)作用域插槽
1. 理解：<span style="color:red">数据在子组件的自身，但根据数据生成的结构需要父组件决定。</span>
2. 父组件
```js
<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
const person=[{name:'小明',age:18},{name:'小红',age:20}]
</script>

<template>
<HelloWorld :person="person">
  <template #tab="scope">
<tr v-for="(item,index) in scope.person" :key="index">
  <th>{{item.name}}</th>
  <th>{{item.age}}</th>
  <th><button >编辑</button></th>
</tr>
</template>
</HelloWorld>
</template>
```
3. 子组件
```js
<script setup lang="ts">
const props=defineProps<{person:{name:string,age:number}[]}>()
</script>

<template>
     <table border="1">
      <tr>
        <th>姓名</th>
        <th>年龄</th>
        <th>操作</th>
      </tr>
      <!-- 作用域插槽命名 -->
      <slot name="tab" :person="props.person"></slot>
     </table>
</template>
```
#### 4.依赖注入
1. 父组件(祖先组件)
```js
<!-- 依赖注入传的参可以在子组件中改变 -->
<template>
  <div class="App">
    <button>我是App</button>
    <A></A>
  </div>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue'
import A from './components/Acom.vue'
let flag = ref<number>(1)
provide('flag', flag)
</script>
```
2. 子组件(后代组件)
```js
<template>
  <div>
    我是B
    <div>{{ flag }}</div>
    <button @click="flag++">+1</button>
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
//  注入值，默认值(让其可以进行类型推断)
const flag = inject('flag', ref(1))
</script>

```
#### 5.兄弟传参
##### (1)父组件当成一个桥梁
##### (2)发布订阅模式
1. Bus传递
```js
type BusClass = {
  emit: (name: string) => void
  on: (name: string, callback: Function) => void
}

type PramsKey = string | number | symbol

type List = {
  [key: PramsKey]: Array<Function>
}
class Bus implements BusClass {
  list: List
  constructor() {
    this.list = {}
  }
  emit(name: string, ...args: Array<any>) {
    const evnentName: Array<Function> = this.list[name]
    evnentName.forEach(fn => {
      fn.apply(this, args)
    })
  }
  on(name: string, callback: Function) {
    const fn: Array<Function> = this.list[name] || []
    fn.push(callback)
    this.list[name] = fn
  }
}

export default new Bus()

```
2. A组件传递数值
```js
<script setup lang="ts">
import { ref } from 'vue'
import Bus from '../utils/Bus'

const flag = ref(1)
const Pass = () => {
  Bus.emit('pass', flag)
}
</script>

<template>
  <div>
    我是A
    <div>{{ flag }}</div>
    <button @click="Pass">Pass</button>
  </div>
</template>

<style scoped lang="less"></style>

```
3. B组件接收数值
```js
<script setup lang="ts">
import Bus from '../utils/Bus'
import { ref, type Ref } from 'vue'

const flag = ref(0)
Bus.on('pass', (Flag: Ref<number>) => {
  console.log(Flag)
  flag.value = Flag.value
})
</script>

<template>
  <div>
    我是B
    <div>{{ flag }}</div>
    <button @click="flag++">+</button>
  </div>
</template>

<style scoped lang="less"></style>

```
##### (3)第三方库mitt
1. 安装```yarn add mitt```
2. 全局挂载mit
```js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './assets/main.css'
import mitt from 'mitt'

const Mit = mitt()
const app = createApp(App)

// 类型声明
declare module 'vue' {
  export interface ComponentCustomProperties {
    $Bus: typeof Mit
  }
}

app.use(createPinia())
app.config.globalProperties.$Bus = Mit
app.mount('#app')

```
3. A组件传递数值
```js
<script setup lang="ts">
import { getCurrentInstance, ref } from 'vue'

const instance = getCurrentInstance()
const flag = ref(1)
const Pass = () => {
  instance?.proxy?.$Bus.emit('pass', flag)
}
</script>

<template>
  <div>
    我是A
    <div>{{ flag }}</div>
    <button @click="Pass">Pass</button>
  </div>
</template>

<style scoped lang="less"></style>

```
4. B组件接收数值
```js
<script setup lang="ts">
import { getCurrentInstance, ref, type Ref } from 'vue'

const instance = getCurrentInstance()
const flag = ref(0)
instance?.proxy?.$Bus.on('pass', Flag => {
  flag.value = (Flag as Ref<number>).value
})
</script>

<template>
  <div>
    我是B
    <div>{{ flag }}</div>
    <button @click="flag++">+</button>
  </div>
</template>

<style scoped lang="less"></style>

```
5. *监听事件
```js
<script setup lang="ts">
import { getCurrentInstance, ref, type Ref } from 'vue'

const instance = getCurrentInstance()
const flag = ref(0)
/**
 * type:事件名称
 * Flag:传递参数
 */
instance?.proxy?.$Bus.on('*', (type, Flag) => {
  flag.value = (Flag as Ref<number>).value
})
</script>


```
6. 取消监听事件
```js
<script setup lang="ts">
import { getCurrentInstance, ref, type Ref } from 'vue'

const instance = getCurrentInstance()
const flag = ref(0)
instance?.proxy?.$Bus.off('pass', Flag => {
  flag.value = (Flag as Ref<number>).value
})
</script>

```
7. 取消全部监听事件
```js
<script setup lang="ts">
import { getCurrentInstance, ref, } from 'vue'

const instance = getCurrentInstance()

instance?.proxy?.$Bus.all.clear()
</script>

```
#### 6.父组件调用子组件中属性
1. 子组件导出父组件要使用的方法(setup语法糖)
```html
<template>
  <GlobalDialog title="取消订单" v-model:flag="flag">
  ....
  </GlobalDialog>
</template>
<script lang="ts" setup>
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
defineExpose({
  show,
  hide,
})
</script>
```
2. 父组件中调用
```html
<template>
  ...
  <!-- 添加地址对话框 -->
  <PayAddressEdit ref="addredit"  />
   ...
</template>
<script lang="ts" setup>
import PayAddressCheck from '@/components/pay/components/pay-address-check.vue'

const ref:any=addrefit(null)
// 调用显示的方法
ref.show()
// 调用隐藏的方法
ref.hide()
</script>
```
### Typescript的支持

#### 1.全局接口的抽取
1. src下定义types文件夹命名xx.d.ts
2. 建立Person接口person.d.ts
```js
interface personInterface{
    name:string
    age:number
}
```
3. 组件中直接使用
```js
<script setup lang="ts">
const props=defineProps<{person:personInterface[]}>()
</script>

```
4. 如果不是在src下或src文件下的xx.d.ts文件则需要在tsconfig.json中配置
```json
{
  {
 ...
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"], //配置全局目录
  "references": [{ "path": "./tsconfig.node.json" }]
}

```
#### 2.类型增强
1. 使用环境：全局定义的数据，函数在vue组件中直接访问报错
2. index.html中定义数据
```html
<!DOCTYPE html>
<html lang="en">
  <head>
  ...
  </head>
  <script>
    const  global=1
  </script>
  <body>
    ...
  </body>
</html>

```
3. 定义类型增强
```js
// common.d.ts
declare const global:string;
```
4. 组件中直接读取
```js
<script setup lang="ts">
console.log(global)
</script>
```
#### 3.第三方库类型声明
1. 安装一个库
2. 安装库的ts类型声明@types/xxxx
#### 4.props组件通讯TS
1. 父组件
```js
<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <HelloWorld msg="1"/>
</template>
```
2. 子组件
```js
<script setup lang="ts">
interface msgIterface{
  msg:string
}
const props=defineProps<msgIterface>()
console.log(props.msg)
</script>
```
#### 5.emit组件通讯TS
1. 父组件
```js
<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
const getuser=(a:number)=>{
  console.log(a)
}
</script>

<template>
  <HelloWorld @getuser="getuser"/>
</template>

<style scoped>
</style>

```
2. 子组件
```js
<script setup lang="ts">

 const emit = defineEmits<{(e: 'getuser', id: number): void}>()
  // (e: 事件名, 键名：类型): void
function buttonClick() {
  emit('getuser',1)
}
  </script>

<template>
  <button @click="buttonClick">传输</button>
</template>

<style scoped>

</style>

```
#### 6.依赖注入类型推断
1. 父组件(祖先组件)
```js
<template>
  <div class="App">
    <button>我是App</button>
    <A></A>
  </div>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue'
import A from './components/Acom.vue'
let flag = ref<number>(1)
provide('flag', flag)
</script>
```
2. 子组件(后代组件)
```js
<template>
  <div>
    我是B
    <div>{{ flag }}</div>
    <button @click="flag++">+1</button>
  </div>
</template>

<script setup lang="ts">
import { inject, ref , type Ref} from 'vue'
//  注入值，默认值(让其可以进行类型推断)
const flag<Ref<number>> = inject('flag', ref(1))
</script>

```
#### 7.定义全局函数和全局函数的类型支持
```js
import { createApp } from 'vue'
...
const app = createApp(App)
type Fileter = {
  format: <T>(str: T) => string
}
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $filters: Fileter
    $env: string
  }
}

// 全局函数
app.config.globalProperties.$filters = {
  format<T>(str: T): string {
    return `真${str}`
  }
}

// 全局变量
app.config.globalProperties.$env = '全局变量'
...
```
### 脚手架Vite
#### 1.基本使用
1. 创建vue3的项目``` yarn create vite || npm init vite@latest```
2. 安装插件```Volar```
#### 2.配置项目路径
1. tsconfig.json中添加
```json
// 让ts可以识别这个路径
{
  "compilerOptions": {
   ...
    "baseUrl": "./",
    "paths": {
      "@/*":[
        "src/*"
      ]
    }
  },
  ...
}

```
2. vite.config.ts中添加
```js

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve:{
    alias:{
      "@":join(__dirname,'src')
    }
  }
})

```
#### 3.eslint和prettierrc的配置
1. .prettierrc.json
```json
{
    "semi": false,
    "singleQuote": true,
    "printWidth": 80,
    "trailingComma": "none",
    "arrowParens": "avoid"
  }
module.exports = {
  printWidth: 80, // 每行代码长度（默认80）
  tabWidth: 2, // 每个tab相当于多少个空格（默认2）
  useTabs: false, // 是否使用tab进行缩进（默认false）
  singleQuote: false, // 使用单引号（默认false）
  semi: true, // 声明结尾使用分号(默认true)
  trailingComma: 'es5', // 多行使用拖尾逗号（默认none）
  bracketSpacing: true, // 对象字面量的大括号间使用空格（默认true）
  jsxBracketSameLine: false, // 多行JSX中的>放置在最后一行的结尾，而不是另起一行（默认false）
  arrowParens: "avoid", // 只有一个参数的箭头函数的参数是否带圆括号（默认avoid）
};  
```
2. .eslintrc.cjs
```cjs
/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier'
  ],
  rules: {
    'vue/multi-word-component-names': 'off', // 关闭命名
    semi: 0 // 结尾无分号
  },
  parserOptions: {
    ecmaVersion: 'latest'
  }
}

```
#### 4.vite环境变量的配置
1. vite的环境在import中
```js
<script setup lang="ts">
console.log(import.meta.env)
</script>
```
2. 创建```.env.development .env.production```
3. package.json中配置运行生产环境,会自动注入
```json
{
  ...
  "scripts": {
    "dev": "vite --mode development",
    ...
  },
  
  
}
```
4. vite.config.ts中读取环境变量
```js
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import unocss from 'unocss/vite'
import vue from '@vitejs/plugin-vue'
import { presetIcons, presetAttributify, presetUno } from 'unocss'

// https://vitejs.dev/config/
export default ({ mode }: any) => {
  // 读取环境变量
  console.log(loadEnv(mode, process.cwd()))
  return defineConfig({
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  })
}

```
### 指令的重构
#### 1.v-model指令
##### (1)v-model实现组件间数据双向绑定
1. 父组件 
```js
<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import { ref } from "vue";
const num=ref(1)
</script>

<template>
  <HelloWorld v-model="num"/>
</template>

```
2. 子组件
```js
1.计算属性实现
<script setup lang="ts">
import { computed } from 'vue';
const props=defineProps<{modelValue:number}>()
const emit = defineEmits<{(e: 'update:modelValue', id: number): void}>()

// 计算属性实现修改数据的同步
const value=computed({
  get(){
    return +props.modelValue
  },
  set(value){
    emit('update:modelValue',+value)
  }
})
</script>

<template>
 <input type="text"  v-model="value">
</template>

2.普通方法实现
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

```
3. v-model的原理
```js
<template>
<!-- <HelloWorld v-model="num"/> -->
  <HelloWorld :modelValue="num" @update:modelValue="num = $event"/>
</template>

```
##### (2)v-model传递特定的名称
1. 父组件
```js
<script setup lang="ts">
import { ref } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
const num=ref(1)
</script>

<template>
  <!-- <HelloWorld :num="num @update:="num = $event""/> -->
  <HelloWorld v-model:num="num"/>
</template>

```
2. 子组件
```js
<script setup lang="ts">
import { computed } from 'vue';
const props=defineProps<{num:number}>()
const emit = defineEmits<{(e: 'update:num', id: number): void}>()

const value=computed({
  get(){
    return +props.num
  },
  set(value){
    emit('update:num',+value)
  }
})
</script>

<template>
 <input type="text"  v-model="value">
</template>

```
#### 2.自定义指令
##### (1)自定义指令的简单使用
1. 全局自定义指令
```js
// mian.ts
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const app=createApp(App)
app.directive('focus',{
    mounted(el){
     el.focus()
    }
   })
app.mount('#app')

```
2. 使用自定义指令
```js
<template>
 <input type="text"  v-model="value" v-focus>
</template>

```
3. 局部自定义指令
```js
<script setup>
// 在模板中启用 v-focus
const vFocus = {
  mounted: (el) => el.focus()
}
</script>

<template>
  <input v-focus />
</template>
```
##### (2)自定义指令详解
1. 自定义指令的生命周期
```js
<script setup lang="ts">
import type { Directive, DirectiveBinding } from 'vue'

type Dir = { background: string }
const vMove: Directive = {
  created() {}, //元素初始化的时候
  beforeMount() {}, //指令绑定到元素后调用 只调用一次
  mounted(el: HTMLElement, dir: DirectiveBinding<Dir>) {
    console.log(dir.value.background)
    el.style.background = dir.value.background
  }, //元素插入父级dom调用
  beforeUpdate() {}, //元素被更新之前调用
  updated() {}, //这个周期方法被移除 改用updated
  beforeUnmount() {}, //在元素被移除前调用
  unmounted() {} //指令被移除后调用 只调用一次
}
</script>

<template>
  <!-- 自定义指令，参数，修饰符 -->
  <div v-move:a.x="{ background: 'red' }">自定义指令</div>
</template>

<style scoped lang="less"></style>

```
2. 生命周期的简写
```js
<script setup lang="ts">
import type { Directive, DirectiveBinding } from 'vue'

type Dir = { background: string }
const vMove: Directive = (el: HTMLElement, dir: DirectiveBinding<Dir>) => {
  el.style.background = dir.value.background
}
</script>

<template>
  <!-- 自定义指令，参数，修饰符 -->
  <div v-move:a.x="{ background: 'red' }">自定义指令</div>
</template>

<style scoped lang="less"></style>

```
3. 自定义拖拽指令
```js
<script setup lang="ts">
import type { Directive } from 'vue'

const vMove: Directive = (el: HTMLElement) => {
  const move = (e: MouseEvent) => {
    console.log(e)
    el.style.left = e.clientX + 'px'
    el.style.top = e.clientY + 'px'
  }

  // 鼠标按下
  el.addEventListener('mousedown', () => {
    // 鼠标按下拖拽
    document.addEventListener('mousemove', move)
    // 鼠标松开
    document.addEventListener('mouseup', () => {
      // 清除事件
      document.removeEventListener('mousemove', move)
    })
  })
}
</script>

<template>
  <!-- 自定义指令，参数，修饰符 -->
  <div
    v-move
    style="
      background-color: red;
      width: 200px;
      height: 200px;
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    "
  >
    <div style="background-color: black; width: 200px; color: white">
      自定义指令
    </div>
  </div>
</template>

```
### 响应式原理
#### 1.了解Proxy
1. Proxy代理的get方法
```html
    <script>
        let obj={
            name:'Vue',
            age:8
        }
        let obj2=new Proxy(obj,{
            /*
            *target表示obj这个对象
            *property表示读取的属性的key
            */
            get(target,property){
                console.log('执行了get');
                return target[property]
            }
        })
        console.log(obj2.age)
    </script>
```
2. Proxy代理的set方法
```html
    <script>
        let obj={
            name:'Vue',
            age:8
        }
        let obj2=new Proxy(obj,{
            /*
            *target表示obj这个对象
            *property表示读取的属性的key
            *newValue表示设置的值
            */
            set(target,property,newValue){
                console.log('执行了set')
        target[property]=newValue
    }
        })
        obj2.age=7
        console.log(obj2.age)
    </script>
```
#### 2.了解Object.defineProperty
1. Object.defineProperty(对象.定义属性,用来为一个对象添加新属性)
```html
<script>
  let person = {
				name:'张三',
				sex:'男',
			}
			
			// 为 person对象 传输了一个新属性 “age”，并且设定它的值为 18
			Object.defineProperty(person,'age',{
				value=18
			})
			console.log(person)
</script>
```
2. Object.defineProperty属性的可枚举可修改的实现
```html
<script>
  let person = {
				name:'张三',
				sex:'男',
			}
			
			// 为 person对象 传输了一个新属性 “age”，并且设定它的值为 18
			Object.defineProperty(person,'age',{
        enumerable=true  // 可枚举
        writable=true   // 可修改
        configurable:true // 可删除
				value=18
			})
			console.log(person)
</script>
```
3. Object.defineProperty() 的get()方法
```html
 <script>
        let person = {
            name: '张三',
            sex: '男',
        }
        function Observer(obj) {
            const keys = Object.keys(obj)
            keys.forEach((key) => {
                Object.defineProperty(this,key,{
                    get() {
                        return obj[key]
                    }
                })
            })
        }
        const obs = new Observer(person)
        console.log(obs.sex);
    </script>
```
4. Object.defineProperty() 的set()方法
```html
 <script>
        let person = {
            name: '张三',
            sex: '男',
        }
        function Observer(obj) {
            const keys = Object.keys(obj)
            keys.forEach((key) => {
                Object.defineProperty(this,key,{
                
                    set(val) {
                        console.log('set方法调用了')
                        obj[key] = val
                    }
                })
            })
        }
        const obs = new Observer(person)
        obs.name=15
    </script>
```
#### 3.Vue双向绑定的实现的对比
1. Vue3的Proxy实现
```html
<body>
    <input type="text" id="ipt">
    <p id='op'></p>
    <script>
        function reactive(obj) {
            return new Proxy(obj,{
                get(target,property) {
                    return target[property]
                },
                set(target,property,newVal) {
                    target[property] = newVal
                }
            })
        }
        let newObj = reactive([1,2])
        console.log(newObj[1])
        const ipt = document.querySelector('#ipt')
        ipt.value = newObj[1]
        document.querySelector('#op').innerHTML = newObj[1]
        ipt.addEventListener('input',function (e) {
            newObj[1] = e.target.value
            document.querySelector('#op').innerHTML = newObj[1]
        })
    </script>
</body>
```
2. Vue2的Object.defineProperty实现
```html
<body>
    <input type="text" id="ipt">
    <p id='op'></p>
    <script>
        function Observer(obj) {
            const keys = Object.keys(obj)
            keys.forEach((key) => {
                Object.defineProperty(this,key,{
                    get() {
                        console.log('get方法被调用了');
                        return obj[key]
                    },
                    set(val) {
                        console.log('set方法调用了')
                        obj[key] = val
                    }
                })
            })
        }
        const obs = new Observer([1,2,3])
     
        const ipt = document.querySelector('#ipt')
        ipt.value = obs[1]
        document.querySelector('#op').innerHTML = obs[1]
        ipt.addEventListener('input',function (e) {
            obs[1] = e.target.value
            document.querySelector('#op').innerHTML = obs[1]
        })
    </script>
</body>
```
3. 上面的测试，Object.property是可以检测到通过索引改变数组的操作的，而Vue没有实现,Object.defineProperty表示这个锅我不背
### 内置组件
#### 1.内置组件
##### (1)Teleport组件
1. 可以将一个组件内部的一部分模板“传送”到该组件的 DOM 结构外层的位置去
2. 父组件
```js
<!-- 遮罩层组件传送到body下 -->
<script setup lang="ts">
import Acom from './components/Acom.vue'
</script>

<template>
<div class="app"></div>
<Acom/>
</template>

<style scoped >
.app{
  width: 200px;
  height: 200px;
  background-color: pink;
}
</style>

```
3. 子组件
```js
<script setup lang="ts">
  import { ref } from 'vue'
  
  const open = ref(false)
  </script>
  
  <template>
    <button @click="open=true">显示遮罩层</button>
    <!-- 传送到body -->
  <Teleport to="body">
    <div class="cover" v-show="open">
      <span @click="open=false"> X</span>
   </div>
  </Teleport>
  
  </template>
  
  <style scoped>
  .cover {
   position: absolute;
   z-index:2;
   top: 0;
   left: 0;
   bottom: 0;
   right: 0;
   background-color: rgba(0,0,0,0.5);
  }
  </style>
  

```
##### (2)Transition组件
1. 非命名动画
```js
<script setup lang="ts">
import { ref } from 'vue';

const show=ref(true)
</script>

<template>
<button @click="show=!show">显示/隐藏</button>
<Transition>
<div class="div" v-if="show"></div>
</Transition>

</template>

<style scoped>
.div{
  background-color: pink;
  width: 200px;
  height: 200px;
  margin: auto;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>

```
2. 命名动画
```js
<script setup lang="ts">
import { ref } from 'vue';

const show=ref(true)
</script>

<template>
<button @click="show=!show">显示/隐藏</button>
<Transition name="fade">
<div class="div" v-if="show"></div>
</Transition>

</template>

<style scoped>
.div{
  background-color: pink;
  width: 200px;
  height: 200px;
  margin: auto;
}
.fade-enter-active {
  transition: all 0.3s ease-out;
}

.fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter-from,
.fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>

```
3. 结合第三方库Animate.css
```js
<!--  yarn add animate.css -->
<script setup lang="ts">
import { ref } from 'vue'
import 'animate.css'
import Acom from './components/Acom.vue'
const show = ref(true)
</script>

<template>
  <transition
    leave-active-class="animate__animated animate__fadeOut"
    enter-active-class="animate__animated animate__fadeIn"
  >
    <Acom v-if="show"></Acom>
  </transition>

  <button @click="show = !show">显示/隐藏</button>
</template>

<style scoped lang="less"></style>

```
4. transition 生命周期
```js
<script setup lang="ts">
import { ref } from 'vue'
import 'animate.css'
import Acom from './components/Acom.vue'
const show = ref(true)
const beforeEnter = () => {
  console.log('进入之前')
}
const enter = (_, done: Function) => {
  console.log('过度曲线')
  setTimeout(() => {
    done()
  }, 3000)
}
const afterEnter = () => {
  console.log('过度完成')
}
const enterCancelled = () => {
  console.log('进入效果被打断')
}
const beforeLeave = () => {
  console.log('离开之前')
}
const leave = (_, done: Function) => {
  setTimeout(() => {
    done()
  }, 3000)
  console.log('过度曲线')
}
const afterLeave = () => {
  console.log('离开之后')
}
const leaveCancelled = () => {
  console.log('离开效果被打断')
}
</script>

<template>
  <transition
    leave-active-class="animate__animated animate__fadeOut"
    enter-active-class="animate__animated animate__fadeIn"
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @enter-cancelled="enterCancelled"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
    @leave-cancelled="leaveCancelled"
  >
    <Acom v-if="show"></Acom>
  </transition>

  <button @click="show = !show">显示/隐藏</button>
</template>


```
5. 生命周期结合第三方库gsap.js
```js
<!-- yarn add  gsap -->
<script setup lang="ts">
import { ref } from 'vue'
import Acom from './components/Acom.vue'
import gsap from 'gsap'
const show = ref(true)

// 进入之前
const beforeEnter = (el: Element) => {
  gsap.set(el, {
    width: 0,
    height: 0
  })
}
// 进入过度动画
const enter = (el: Element, done: gsap.Callback) => {
  gsap.to(el, {
    width: 200,
    height: 200,
    onComplete: done
  })
}
// 离开之前
const beforeLeave = (el: Element) => {
  gsap.set(el, {
    width: 200,
    height: 200
  })
}
// 进入过度动画
const leave = (el: Element, done: gsap.Callback) => {
  gsap.to(el, {
    width: 0,
    height: 0,
    onComplete: done
  })
}
</script>

<template>
  <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @before-leave="beforeLeave"
    @leave="leave"
  >
    <Acom v-if="show"></Acom>
  </transition>

  <button @click="show = !show">显示/隐藏</button>
</template>


```
6. 初始化动画
```js
<script setup lang="ts">
import { ref } from 'vue'
import Acom from './components/Acom.vue'

const show = ref(true)
</script>

<template>
  <transition
    appear-from-class="from"
    appear-active-class="active"
    appear-to-class="to"
    appear
  >
    <Acom v-if="show"></Acom>
  </transition>

  <button @click="show = !show">显示/隐藏</button>
</template>

<style scoped>
.from {
  /* 初始化之前 */
  width: 0;
  height: 0;
}
.active {
  /* 过度动画 */
  transition: all 2s ease;
}
.to {
  /* 初始化完成 */
  width: 200px;
  height: 200px;
}
</style>

```
7. 初始化动画结合Animate.css
```js
<script setup lang="ts">
import { ref } from 'vue'
import Acom from './components/Acom.vue'
import 'animate.css'
const show = ref(true)
</script>

<template>
  <transition appear-active-class="animate__animated animate__heartBeat" appear>
    <Acom v-if="show"></Acom>
  </transition>

  <button @click="show = !show">显示/隐藏</button>
</template>

<style scoped></style>

```
##### (3)transition-group过度列表
1. Transition组件无法对v-for的列表进行渲染
2. transition-group的tag属性
```js
<!-- tag属性可以让transition-group多加一层节点元素 -->
<template>
  <div class="wraps">
    <transition-group tag="session">
      <!-- 使用transition-group渲染的组件要有key-->
      <div class="item" v-for="item in 5" :key="item">{{ item }}</div>
    </transition-group>
  </div>
</template>

```
3. 添加列表时的动画效果
```js
<script setup lang="ts">
import { ref } from 'vue'
import 'animate.css'
const num = ref(5)
</script>

<template>
  <div class="wraps">
    <transition-group
      leave-active-class="animate__animated animate__fadeOut"
      enter-active-class="animate__animated animate__fadeIn"
    >
      <!-- 使用transition-group渲染的组件要有key-->
      <div class="item" v-for="item in num" :key="item">{{ item }}</div>
    </transition-group>
  </div>
  <button @click="num++">添加</button>
  <button @click="num--">删除</button>
</template>

<style scoped lang="less">
.wraps {
  display: flex;
  flex-wrap: wrap;
  word-break: break-all;
  border: 1px solid #ccc;
  .item {
    margin: 10px;
  }
}
</style>

```
4. 平移动画move-class
```js
<script setup lang="ts">
import { ref } from 'vue'
import _ from 'lodash'
// 建立9x9数组
let list = ref(
  Array.apply(null, { length: 81 } as number[]).map((_, index) => {
    return {
      id: index,
      number: (index % 9) + 1
    }
  })
)
// 打乱数组
const random = () => {
  list.value = _.shuffle(list.value)
}
console.log(list)
</script>

<template>
  <div>
    <button @click="random">打乱</button>
    <transition-group tag="div" class="wraps" move-class="move">
      <div v-for="item in list" :key="item.id" class="item">
        {{ item.number }}
      </div>
    </transition-group>
  </div>
</template>

<style scoped lang="less">
.wraps {
  display: flex;
  flex-wrap: wrap; // 换行
  width: calc(25px * 10 + 9px);
  .item {
    width: 25px;
    height: 25px;
    border: 1px solid #ccc;
    text-align: center;
  }
}
.move {
  transition: all 1s;
}
</style>

```
5. 状态过度(数字过度颜色过度)
```js
<script setup lang="ts">
import { reactive, watch } from 'vue'
import gsap from 'gsap'

const num = reactive({
  current: 0,
  tweenedNumber: 0
})

watch(
  () => num.current,
  newVal => {
    gsap.to(num, {
      duration: 1, // 过度时间
      tweenedNumber: newVal
    })
  }
)
</script>

<template>
  <div>
    <input type="text" v-model="num.current" step="20" />
    <div>
      <!-- 去掉小数点 -->
      {{ num.tweenedNumber.toFixed(0) }}
    </div>
  </div>
</template>

<style scoped lang="less"></style>

```
##### (4)keep-alive组件
1. 开启keep-alive 生命周期的变化
```
初次进入时： onMounted-> onActivated
退出后触发:  deactivated
```
2. 缓存数据
```js
<script setup lang="ts">
import { ref } from 'vue'
import Acom from './components/Acom.vue'

const show = ref(true)
</script>

<template>
  <keep-alive>
    <Acom v-if="show"></Acom>
  </keep-alive>
  <button @click="show = !show">显示/隐藏</button>
</template>

```
3. include属性和exclude属性
```js
<!-- 注意组件一定要命名才可以使用include -->
<script setup lang="ts">
import { ref } from 'vue'
import Acom from './components/Acom.vue'
import Bcom from './components/Bcom.vue'
const show = ref(true)
</script>

<template>
  <keep-alive :include="['Acom']" :exclude="['Bcom']">
    <Acom v-if="show"></Acom>
    <Bcom v-else></Bcom>
  </keep-alive>
  <button @click="show = !show">显示/隐藏</button>
</template>

<style scoped lang="less"></style>

```
##### (5)component组件
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
```html
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
```
#### 2.普通组件
##### (1)全局组件
1. 配置全局组件
```js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import Acom from './components/Acom.vue'
import './assets/main.css'

const app = createApp(App)

app.use(createPinia())

app.component('Acom', Acom)

app.mount('#app')

```
2. 使用组件
```js
<template>
  <div>
    <Acom></Acom>
  </div>
</template>
```
##### (2)异步组件
1. 子组件中发送了请求变成异步
```js
<script setup lang="ts">
interface ResItf {
  code: number
  data: { a: number; b: number }[]
  message: string
}

let p: Promise<ResItf> = new Promise(resolve => {
  setTimeout(() => {}, 3000)
  resolve({
    code: 0,
    data: [
      { a: 1, b: 2 },
      { a: 11, b: 22 }
    ],
    message: ''
  })
})
const a = await p
console.log(a)
</script>

<template>
  <div>异步组件</div>
  <div>异步组件</div>
  <div>异步组件</div>
</template>
```
2. 父组件异步调用组件
```js
<script setup lang="ts">
// 异步组件不能这样引入
// import Acom from './components/Acom.vue'
import { defineAsyncComponent } from 'vue'
const Acom = defineAsyncComponent(() => import('./components/Acom.vue'))
</script>

<template>
  <div>
    <Suspense>
      <template #default>
        <Acom></Acom>
      </template>

      <template #fallback> 加载中。。。 </template>
    </Suspense>
  </div>
</template>

<style scoped lang="less"></style>

```
### 语法糖组件命名问题
1. 安装依赖```yarn add vite-plugin-vue-setup-extend```
2. 直接命名
```js
<script lang="ts" setup name="xxx">

</script>
```
### 常用的CSS的功能
1. 样式穿透
```js
<style scoped lang="less">
:deep(input) {
  color: red;
}
</style>

```
2. 插槽选择器
```js
<template>
  <div>
    <slot name="nums" :nums="['1', '2', '3']"> </slot>
  </div>
</template>

<style scoped lang="less">
:slotted(.li) {
  color: red;
}
</style>

```
3. 全局选择器
```js
<script setup lang="ts"></script>

<template>
  <div>
    <slot name="nums" :nums="['1', '2', '3']"> </slot>
  </div>
</template>

<style scoped lang="less">
:global(.li) {
  color: red;
}
</style>

```
4. 动态CSS
```js
<script setup lang="ts">
import { reactive } from 'vue'
const style = reactive({
  color: 'red'
})
setTimeout(() => {
  style.color = 'blue'
}, 3000)
</script>

<template>
  <div class="div">动态css</div>
</template>

<style scoped lang="less">
.div {
  color: v-bind('style.color');
}
</style>


```
#### 1.CSS原子化
1. 安装unocss```yarn add unocss```
2. vite的配置文件中配置
```js
import { fileURLToPath, URL } from 'node:url'
import pxtoViewPort from 'postcss-px-to-viewport'
import { defineConfig } from 'vite'
import unocss from 'unocss/vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 配置的原子化
    unocss({
      rules: [
        ['flex', { display: 'flex' }],
        ['red', { color: 'red' }],
        [/^m-(\d+)$/, ([, d]) => ({ margin: `${Number(d) * 10}px` })]
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

```
3. main.ts中引入```import 'uno.css'```
4. 其他预设配置中引入
```js
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import unocss from 'unocss/vite'
import vue from '@vitejs/plugin-vue'
import { presetIcons, presetAttributify, presetUno } from 'unocss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    unocss({
      // 预设
      presets: [presetIcons(), presetAttributify(), presetUno()],
      rules: [
        ['flex', { display: 'flex' }],
        ['red', { color: 'red' }],
        [/^m-(\d+)$/, ([, d]) => ({ margin: `${Number(d) * 10}px` })]
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

```
5. 第一预设图标库
```js
npm i -D @iconify-json/ic
// 后缀ic是选择的图标库
```
6. 第二预设属性语义化 无须class
```js
 <div color="red">left</div>
```
7. 第三预设
```
默认的 @unocss/preset-uno 预设（实验阶段）是一系列流行的原子化框架的 通用超集，
包括了 Tailwind CSS，Windi CSS，Bootstrap，Tachyons 等。
例如，ml-3（Tailwind），ms-2（Bootstrap），ma4（Tachyons），mt-10px（Windi CSS）均会生效。
```
#### 5.Vue3集成Tailwind CSS
1. 安装依赖```yarn add -D tailwindcss@latest postcss@latest autoprefixer@latest```
2. 安装插件```tailwind css inteliSence```
3. 生成配置文件```npx tailwindcss init -p```
4. tailwind.config.js配置文件中添加
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: []
}

```
6. 创建index.css文件并且在mian.ts中引入
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
7. 使用tailwindcss的样式
```js
<script setup lang="ts"></script>

<template>
  <div
    class="w-screen h-screen bg-red-600 flex justify-center items-center text-8xl text-teal-50"
  >
    hello tailwind
  </div>
</template>

<style scoped lang="less"></style>

```
### 面试常用源码
#### 1.app.use()的源码实现
1. 实现myuse
```js
import type { App } from 'vue'
import { app } from '../main'

interface Use {
  install: (app: App, ...options: any[]) => void
}

// 插件注册的数组
const installList = new Set()

export function MyUse<T extends Use>(plugin: T, ...options: any[]) {
  if (installList.has(plugin)) {
    console.log('插件件已经注册')
    return
  }
  plugin.install(app, ...options)
  installList.add(plugin)
}

```
2. 使用myuse调用插件
```js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './assets/main.css'
import Loading from './components/Loading'
import { MyUse } from './utils/myuse'

export const app = createApp(App)
// 使用插件
// app.use(Loading)
MyUse(Loading)
app.use(createPinia())
app.mount('#app')

type Lod = {
  show: () => void
  hide: () => void
}
//编写ts loading 声明文件放置报错 和 智能提示
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $loading: Lod
  }
}

```
### 移动端适配
#### 1.第一种适配方案
1. 安装依赖```yarn add amfe-flexible  postcss postcss-pxtorem@5.1.1```
2. main.ts引入amfe-flexible```import "amfe-flexible"```
3. 根目录下创建postcss.config.js文件并配置
```js
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      // 能够把所有元素的px单位转成Rem
      // rootValue: 转换px的基准值。
      // 编码时, 一个元素宽是75px，则换成rem之后就是2rem
      rootValue: 37.5,
      propList: ['*']
    }
  }
}

```
#### 2.第二种适配方案
1. 安装依赖```yarn add postcss-px-to-viewport -D```
2. vite.config.ts内置```postcss.config.js```中修改配置
```js
import { fileURLToPath, URL } from 'node:url'
import pxtoViewPort from 'postcss-px-to-viewport'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    postcss: {
      plugins: [
     // postcss-px-to-viewport的配置
        pxtoViewPort({
          unitToConvert: 'px', // 要转化的单位
          viewportWidth: 750, // UI设计稿的宽度
          unitPrecision: 6, // 转换后的精度，即小数点位数
          propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
          viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
          fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
          selectorBlackList: ['ignore-'], // 指定不转换为视窗单位的类名，
          minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
          mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
          replace: true, // 是否转换后直接更换属性值
          landscape: false // 是否处理横屏情况
        })


      ]
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

```
3. 创建postcss-px-to-viewport.d.ts的声明文件
```js
declare module 'postcss-px-to-viewport' {
  type Options = {
    unitToConvert: 'px' | 'rem' | 'cm' | 'em'
    viewportWidth: number
    viewportHeight: number // not now used; TODO: need for different units and math for different properties
    unitPrecision: number
    viewportUnit: string
    fontViewportUnit: string // vmin is more suitable.
    selectorBlackList: string[]
    propList: string[]
    minPixelValue: number
    mediaQuery: boolean
    replace: boolean
    landscape: boolean
    landscapeUnit: string
    landscapeWidth: number
  }

  export default function (options: Partial<Options>): any
}

```
4. 在tsconfig.json中引入声明文件
```json
{
  "extends": "@vue/tsconfig/tsconfig.web.json",
  "include": ["env.d.ts", "src/**/*", "src/**/*.vue", "postcss-px-to-viewport.d.ts"],
  "compilerOptions": {
    "baseUrl": ".",
    "types": ["element-plus/global"],
    "paths": {
      "@/*": ["./src/*"]
    }
  },

  "references": [
    {
      "path": "./tsconfig.config.json"
    }
  ]
}

```
5. 注意:如果外面用到了```postcss.config.js```，在```postcss.config.js```中添加配置文件
```js
// 要禁用vite.config.ts内置postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-px-to-viewport': {
      unitToConvert: 'px', // 要转化的单位
      viewportWidth: 320 // UI设计稿的宽度
      // unitPrecision: 6, // 转换后的精度，即小数点位数
      // propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
      // viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
      // fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
      // selectorBlackList: ['wrap'], // 指定不转换为视窗单位的类名，
      // minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
      // mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
      // replace: true, // 是否转换后直接更换属性值
      // exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
      // landscape: false // 是否处理横屏情况
    }
  }
}

```
### VUE其他知识点
#### 1.全局函数和全局变量
1. 全局函数
```js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './assets/main.css'

const app = createApp(App)
type Fileter = {
  format: <T>(str: T) => string
}
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $filters: Fileter
  }
}

// 全局函数
app.config.globalProperties.$filters = {
  format<T>(str: T): string {
    return `真${str}`
  }
}
app.use(createPinia())
app.mount('#app')

```
2. 全局变量
```js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './assets/main.css'

const app = createApp(App)
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $env: string
  }
}

// 全局变量
app.config.globalProperties.$env = '全局变量'
app.use(createPinia())
app.mount('#app')

```
#### 2.自定义插件
1. 封装插件的样式，抛出插件的显示隐藏方法
```js
<script setup lang="ts">
import { ref } from 'vue'

const isShow = ref(false)
// 控制load显示
const show = () => {
  console.log(111)
  isShow.value = true
}
const hide = () => {
  isShow.value = false
}
// 这里抛出的东西会在插件声明文件中调用
defineExpose({
  show,
  hide
})
</script>

<template>
  <div v-if="isShow" class="loading">loading....</div>
</template>

<style scoped lang="less"></style>

```
2. 创建接收调用插件的方法
```js
import { render, type App, type VNode } from 'vue'
import Loading from './index.vue'
import { createVNode } from 'vue'

/*
可以在外面定义函数来引入props等信息
*/
 // 变成div
const Vnode: VNode = createVNode(Loading)
 // 挂载
render(Vnode, document.body)

export default {
  install(app: App) {
    // 对插件的方法进行全局挂载
    app.config.globalProperties.$loading = {
      show: Vnode.component?.exposed?.show,
      hide: Vnode.component?.exposed?.hide
    }
  }
}

```
3. main.ts中挂载上面的方方法
```js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './assets/main.css'
import Loading from './components/Loading'

const app = createApp(App)
// 使用插件
app.use(Loading)
app.use(createPinia())
app.mount('#app')

```
4. 对插件的方法进行声明
```js
type Lod = {
  show: () => void
  hide: () => void
}
//编写ts loading 声明文件放置报错 和 智能提示
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $loading: Lod
  }
}
```
5. 使用插件
```js
<script setup lang="ts">
import { getCurrentInstance } from 'vue'

const instance = getCurrentInstance()
// 调用插件
instance?.proxy?.$loading.show()
// 5秒关闭插件
setTimeout(() => {
  instance?.proxy?.$loading.hide()
}, 5000)
</script>

<template>
  <div></div>
</template>

<style scoped lang="less"></style>

```
#### 3.函数式编程
1. h函数
```
h 接收三个参数
1.type 元素的类型
2.propsOrChildren 数据对象, 这里主要表示(props, attrs, dom props, class 和 style)
3.children 子节点
```
2. h函数的多种组合
```js
// 除类型之外的所有参数都是可选的
h('div')
h('div', { id: 'foo' })
 
//属性和属性都可以在道具中使用
//Vue会自动选择正确的分配方式
h('div', { class: 'bar', innerHTML: 'hello' })
 
// props modifiers such as .prop and .attr can be added
// with '.' and `^' prefixes respectively
h('div', { '.name': 'some-name', '^width': '100' })
 
// class 和 style 可以是对象或者数组
h('div', { class: [foo, { bar }], style: { color: 'red' } })
 
// 定义事件需要加on 如 onXxx
h('div', { onClick: () => {} })
 
// 子集可以字符串
h('div', { id: 'foo' }, 'hello')
 
//如果没有props是可以省略props 的
h('div', 'hello')
h('div', [h('span', 'hello')])
 
// 子数组可以包含混合的VNode和字符串
h('div', ['hello', h('span', 'hello')])
```
3. 使用props传递参数
```js
<template>
    <Btn text="按钮"></Btn>
</template>
  
<script setup lang='ts'>
import { h, } from 'vue';
type Props = {
    text: string
}
const Btn = (props: Props, ctx: any) => {
    return h('div', {
        class: 'p-2.5 text-white bg-green-500 rounded shadow-lg w-20 text-center inline m-1',
 
    }, props.text)
}
</script>
```
4. 接收emit
```js
<template>
    <Btn @on-click="getNum" text="按钮"></Btn>
</template>
  
<script setup lang='ts'>
import { h, } from 'vue';
type Props = {
    text: string
}
const Btn = (props: Props, ctx: any) => {
    return h('div', {
        class: 'p-2.5 text-white bg-green-500 rounded shadow-lg w-20 text-center inline m-1',
        onClick: () => {
            ctx.emit('on-click', 123)
        }
    }, props.text)
}
 
const getNum = (num: number) => {
    console.log(num);
}
</script>
```
5. 定义插槽
```js
<template>
    <Btn @on-click="getNum">
        <template #default>
            按钮slots
        </template>
    </Btn>
</template>
  
<script setup lang='ts'>
import { h, } from 'vue';
type Props = {
    text?: string
}
const Btn = (props: Props, ctx: any) => {
    return h('div', {
        class: 'p-2.5 text-white bg-green-500 rounded shadow-lg w-20 text-center inline m-1',
        onClick: () => {
            ctx.emit('on-click', 123)
        }
    }, ctx.slots.default())
}
 
const getNum = (num: number) => {
    console.log(num);
}
</script>
```
#### 4.vue的自动引入的配置
##### (1)基本配置
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
##### (2)解决eslint报错问题
1. 第一种方法```安装依赖 yarn add vue-global-api -D```
```js
// 配置.eslintrc.cjs
module.exports = {
...
  extends: [
  ...
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
##### (3)解决TS2304警告问题
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

#### 4.vue性能优化

##### (1)跑分和打包体积
1. 跑分vue开发工具Lighthouse
```
从Performance页的表现结果来看，得分37分，并提供了很多的时间信息，我们来解释下这些选项代表的意思：

FCP (First Contentful Paint)：首次内容绘制的时间，浏览器第一次绘制DOM相关的内容，也是用户第一次看到页面内容的时间。

Speed Index: 页面各个可见部分的显示平均时间，当我们的页面上存在轮播图或者需要从后端获取内容加载时，这个数据会被影响到。

LCP (Largest Contentful Paint)：最大内容绘制时间，页面最大的元素绘制完成的时间。

TTI（Time to Interactive）：从页面开始渲染到用户可以与页面进行交互的时间，内容必须渲染完毕，交互元素绑定的事件已经注册完成。

TBT（Total Blocking Time）：记录了首次内容绘制到用户可交互之间的时间，这段时间内，主进程被阻塞，会阻碍用户的交互，页面点击无反应。

CLS（Cumulative Layout Shift）：计算布局偏移值得分，会比较两次渲染帧的内容偏移情况，可能导致用户想点击A按钮，但下一帧中，A按钮被挤到旁边，导致用户实际点击了B按钮。

```
2. 打包后rollup的插件```yarn add rollup-plugin-visualizer```
```js
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import unocss from 'unocss/vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default ({ mode }: any) => {
  console.log(loadEnv(mode, process.cwd()))
  return defineConfig({

    plugins: [vue(), 
    // 配置rollup的插件
    visualizer({ open: true })],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  })
}

```
3. vite配置文件中vite的优化
```js
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default  defineConfig({
    ...
    build: {
      chunkSizeWarningLimit: 2000,
      cssCodeSplit: true, //css 拆分
      sourcemap: false, //不生成sourcemap
      minify: 'terser', //是否禁用最小化混淆，esbuild打包速度最快，terser打包体积最小。
      assetsInlineLimit: 5000 //小于该值 图片将打包成Base64
    }
  })

```
##### (2)PWA离线存储技术
1. 安装依赖```yarn add vite-plugin-pwa -D```
2. 配置
```js
import { fileURLToPath, URL } from "node:url";
import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    VitePWA({
      workbox: {
        cacheId: "key", //缓存名称
        runtimeCaching: [
          {
            urlPattern: /.*\.js.*/, //缓存文件
            handler: "StaleWhileRevalidate", //重新验证时失效
            options: {
              cacheName: "XiaoMan-js", //缓存js，名称
              expiration: {
                maxEntries: 30, //缓存文件数量 LRU算法
                maxAgeSeconds: 30 * 24 * 60 * 60, //缓存有效期
              },
            },
          },
        ],
      },
    }),
  ],
  ....
});

```
##### (3)其他性能优化
1. 图片懒加载
```js
import { createApp } from 'vue'
import App from './app'
import lazyPlugin from 'vue3-lazy'

const app = createApp(App)
app.use(lazyPlugin, {
  loading: 'loading.png',
  error: 'error.png'
})
app.mount('#app')


<img v-lazy="user.avatar" >
```
2. 虚拟列表实现
```
后台返回多数据
展示可视区的dom
```
3. 多线程 使用  new Worker 创建
```js
// worker脚本与主进程的脚本必须遵守同源限制。他们所在的路径协议、域名、端口号三者需要相同

const myWorker1 = new Worker("./calcBox.js");
// 都使用postMessage发送消息

worker.postMessage(arrayBuffer, [arrayBuffer]);
// 都使用onmessage接收消息

self.onmessage = function (e) {
// xxx这里是worker脚本的内容
};
关闭

worker.terminate();    
```
4. 防抖节流


## Vuex
### 1.vuex的基本使用
1. vuex的解读(vuex的3版本)
```js
Actions(存放dispatch的动作函数:服务员)   

Mutations(存放commot的动作函数,进行加工:后厨)

State(数据存在这里,接收mutate修改成功,进行重新渲染:菜品)

VueComponents(调用dispatch('A',2)触发动作函数:客人)

stort(dispatch函数和commot函数是stort身上的)
```
2. 封装vuex
```js
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)
//1.准备action---响应组件动作
const actions = {
  add(context, value) {
    context.commit('ADD', value) //把要处理的数据发送给mutations
  },
}
//2.准备mutations---操作数据
const mutations = {
  ADD(state, value) {
    state.sum += value
  },
}
//3.准备state---用于存储数据
const state = {
  sum: 0,
}
//4.准备getters---用于将state里的数据进行加工(像计算属性，公共计算属性)
const getters = {
  sumString(state) {
    return state.sum + '0'
  },
}
const store = new Vuex.Store({
  actions,
  mutations,
  state,
  getters,
})

export default store

```
3. 入口文件中引入
```js
import store from './store'
...
new Vue({
  render(creatElement) {
    return creatElement(App)
  },
  store,
}).$mount('#app')
``` 
4. vuex的基本使用
```js
<template>
	<div>
		{{sum}}
	</div>
</template>

<script>
import { mapState } from 'vuex' 

export default {
	computed: {
		sum() {
			return this.$store.state.sum
		},
	}
}
</script>
```
### 2.vuex获取数据
1. 获取state中的数据
```js
<template>
	<div>
		{{sum}}
	</div>
</template>

<script>
import { mapState } from 'vuex' 

export default {
	computed: {
		// 函数形式
		sum() {
			return this.$store.state.sum
		},
		// 数组形式
		...mapState(['sum']),
		// 对象形式
		...mapState({ sum: 'sum' })
	}
}
</script>
```
2. 获取getters中的数据
```js
<template>
	<div>
		{{sumString}}
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
	computed: {
    // 普通方法
		sumString() {
			return this.$store.getters.sumString
		},
		// 对象
		...mapGetters({ sumString: 'sumString' }),
		// 数组
		...mapGetters(['sumString'])
	}
  }
</script>
```
### 3.vuex修改数据
1. 直接通过commit修改
```js
<template>
	<div>
		{{sum}}
		<button @click="add(1)">+1</button>
	</div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
	computed: {
		sum() {
			return this.$store.state.sum
	},
	},
	methods: {
		// 普通写法
		add(value) {
			this.$store.commit('ADD', value)
		},
    // (解构的不够灵活，使用时要传递参数)
		// 数组
		...mapMutations(['ADD']),
		// 对象
		...mapMutations({ add: 'ADD' })
	}
}
</script>
```
2. 间接通过dispatch修改
```js
<template>
	<div>
		{{sum}}
		<button @click="add(1)">+1</button>
	</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
	computed: {
		sum() {
			return this.$store.state.sum
	},
	},
	methods: {
		// 普通写法
		add(value) {
			this.$store.dispatch('add', value)
		},
     // (解构的不够灵活，使用时要传递参数)
		// 数组
		...mapActions(['add']),
		// 对象
		...mapActions({ add: 'add' })
	}
}
```
### 4.vuex的模块化
#### 1.不开启命名空间(只有state受空间约束)
1. 模块化配置项
```js
export const countOptions = {
  // namespaced: true,
  actions: {
    add(context, value) {
      context.commit('ADD', value)
    },
  },
  mutations: {
    ADD(state, value) {
      state.sum += value
    },
  },
  state: {
    sum: 0,
  },
  getters: {
    sumString(state) {
      return state.sum + '0'
    },
  },
}

```
2. 引入state入口文件
```js
import Vue from 'vue'
import Vuex from 'vuex'
import { countOptions } from './Count'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    countOptions,
  },
})

export default store

```
3. 基本使用
```js
<template>
	<div>
		{{sum}}--{{sumString}}
		<button @click="add(1)">+1</button>
	</div>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'

export default {
	computed: {
		// 普通写法
		sum() {
			return this.$store.state.countOptions.sum
		},
		// 通过回调函数(无数组和对象写法)
		...mapState({ sum: state => state.countOptions.sum }),
		// 不开启命名空间，除了state受影响，其他部分无影响
		sumString() {
			return this.$store.getters.sumString
		}
	},
	methods: {
		add() {
			this.$store.commit('ADD', 1)
		}
	}
}
</script>

```
#### 2.开启命名空间
1. 模块化配置
```js
export const countOptions = {
  // 开启
  namespaced: true,
  actions: {
    add(context, value) {
      context.commit('ADD', value)
    },
  },
  mutations: {
    ADD(state, value) {
      state.sum += value
    },
  },
  state: {
    sum: 0,
  },
  getters: {
    sumString(state) {
      return state.sum + '0'
    },
  },
}

```
##### (1)获取数据
1. 获取state的数据
```js
<template>
	<div>
		{{sum}}
	</div>
</template>

<script>
import {  mapState} from 'vuex'

export default {
	computed: {
		// 普通写法
		sum() {
			return this.$store.state.countOptions.sum
		},
		// 通过回调函数
		...mapState({ sum: state => state.countOptions.sum }),
		// 数组
		...mapState('countOptions', ['sum']),
		// 对象
		...mapState('countOptions', {sum:'sum'}),
	},
}
</script>
```
2. 获取getters的数据
```js
<template>
	<div>
	 {{sumString}}
	</div>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'

export default {
	computed: {
		sumString() {
			return this.$store.getters['countOptions/sumString']
		},
		// 数组
		...mapGetters('countOptions', ['sumString']),
		// 对象
		...mapGetters('countOptions', { sumString: 'sumString' })
	},
}
</script>

```
##### (2)修改数据
1. 通过commit修改
```js
<template>
	<div>
		{{sum}}--{{sumString}}
		<button @click="add(1)">+1</button>
	</div>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'

export default {
	computed: {
		sum() {
			return this.$store.state.countOptions.sum
		},
		sumString() {
			return this.$store.getters['countOptions/sumString']
		},
	},
	methods: {
		add() {
			this.$store.commit('countOptions/ADD', 1)
		},
		...mapMutations('countOptions',['ADD']),
		...mapMutations('countOptions',{add:'ADD'})
	}
}
</script>
```
2. 通过dispatch修改
```js
<template>
	<div>
		{{sum}}--{{sumString}}
		<button @click="add(1)">+1</button>
	</div>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'

export default {
	computed: {
		sum() {
			return this.$store.state.countOptions.sum
		},
		sumString() {
			return this.$store.getters['countOptions/sumString']
		},
	},
	methods: {
		add() {
			this.$store.dispatch('countOptions/add', 1)
		},
		...mapActions('countOptions',['add']),
		...mapActions('countOptions',{add:'add'})
	}
}
</script>

```
## Router
### 1.基本使用
1. 安装vue-router，命令：```npm i vue-router```
2. 应用插件：```Vue.use(VueRouter)```
3. 编写router配置项:
```js
   //引入VueRouter
   import VueRouter from 'vue-router'
   //引入Luyou 组件
   import About from '../components/About'
   import Home from '../components/Home'
   
   //创建router实例对象，去管理一组一组的路由规则
   const router = new VueRouter({
   	routes:[
   		{
   			path:'/about',
   			component:About
   		},
   		{
   			path:'/home',
   			component:Home
   		}
   	]
   })
   
   //暴露router
   export default router
```
4. 实现切换（active-class可配置高亮样式）
```vue
  <router-link active-class="active" to="/about">About</router-link>
```
5. 指定展示位置
```vue
  <router-view></router-view>
```
### 2.几个注意点
1. 路由组件通常存放在```pages```文件夹，一般组件通常存放在```components```文件夹。
2. 通过切换，“隐藏”了的路由组件，默认是被销毁掉的，需要的时候再去挂载。
3. 每个组件都有自己的```$route```属性，里面存储着自己的路由信息。
4. 整个应用只有一个router，可以通过组件的```$router```属性获取到。
### 3.多级路由
1. 配置路由规则，使用children配置项：
```js
   routes:[
   	{
   		path:'/about',
   		component:About,
   	},
   	{
   		path:'/home',
   		component:Home,
   		children:[ //通过children配置子级路由
   			{
   				path:'news', //此处一定不要写：/news
   				component:News
   			},
   			{
   				path:'message',//此处一定不要写：/message
   				component:Message
   			}
   		]
   	}
   ]
```
2. 跳转（要写完整路径）
```vue
   <router-link to="/home/news">News</router-link>
```
### 4.路由的query参数
1. 传递参数
```vue
   <!-- 跳转并携带query参数，to的字符串写法 -->
   <router-link :to="/home/message/detail?id=666&title=你好">跳转</router-link>
   				
   <!-- 跳转并携带query参数，to的对象写法 -->
   <router-link 
   	:to="{
   		path:'/home/message/detail',
   		query:{
   		   id:666,
               title:'你好'
   		}
   	}"
   >跳转</router-link>
```
2. 接收参数(其他页面)
```js
   $route.query.id
   $route.query.title
```
### 5.命名路由
1. 给路由命名：
```js
      {
      	path:'/demo',
      	component:Demo,
      	children:[
      		{
      			path:'test',
      			component:Test,
      			children:[
      				{
                            name:'hello' //给路由命名
      					path:'welcome',
      					component:Hello,
      				}
      			]
      		}
      	]
      }
```
2. 通过路由名跳转
```vue
      <!--简化前，需要写完整的路径 -->
      <router-link to="/demo/test/welcome">跳转</router-link>
      
      <!--简化后，直接通过名字跳转 -->
      <router-link :to="{name:'hello'}">跳转</router-link>
      
      <!--简化写法配合传递参数 -->
      <router-link 
      	:to="{
      		name:'hello',
      		query:{
      		   id:666,
                  title:'你好'
      		}
      	}"
      >跳转</router-link>
```
### 6.路由的params参数
1. 配置路由，声明接收params参数
```js
   {
   	path:'/home',
   	component:Home,
   	children:[
   		{
   			path:'news',
   			component:News
   		},
   		{
   			component:Message,
   			children:[
   				{
   					name:'xiangqing',
   					path:'detail/:id/:title', //使用占位符声明接收params参数
   					component:Detail
   				}
   			]
   		}
   	]
   }
```
2. 传递参数
```vue
   <!-- 跳转并携带params参数，to的字符串写法 -->
   <router-link :to="/home/message/detail/666/你好">跳转</router-link>
   				
   <!-- 跳转并携带params参数，to的对象写法 -->
   <router-link 
   	:to="{
   		name:'xiangqing',
   		params:{
   		   id:666,
               title:'你好'
   		}
   	}"
   >跳转</router-link>
```
> 特别注意：路由携带params参数时，若使用to的对象写法，则不能使用path配置项，必须使用name配置！
3. 接收参数：
```js
   $route.params.id
   $route.params.title
```
### 7.路由的props配置
​1. 让路由组件更方便的收到参数
```js
{
	name:'xiangqing',
	path:'detail/:id',
	component:Detail,
	//第一种写法：props值为对象，该对象中所有的key-value的组合最终都会通过props传给Detail组件
	// props:{a:900}
	//第二种写法：props值为布尔值，布尔值为true，则把路由收到的所有params参数通过props传给Detail组件
	// props:true
	//第三种写法：props值为函数，该函数返回的对象中每一组key-value都会通过props传给Detail组件
	props(route){
		return {
			id:route.query.id,
			title:route.query.title
		}
	}
}
```
### 8.```<router-link>```的replace属性
1. 作用：控制路由跳转时操作浏览器历史记录的模式
2. 浏览器的历史记录有两种写入方式：分别为```push```和```replace```，```push```是追加历史记录，```replace```是替换当前记录。路由跳转时候默认为```push```
3. 如何开启```replace```模式：```<router-link replace .......>News</router-link>```
### 9.编程式路由导航
1. 作用：不借助```<router-link> ```实现路由跳转，让路由跳转更加灵活
2. 具体编码：
```js
   //$router的两个API
   this.$router.push({
   	name:'xiangqing',
   		params:{
   			id:xxx,
   			title:xxx
   		}
   })
   
   this.$router.replace({
   	name:'xiangqing',
   		params:{
   			id:xxx,
   			title:xxx
   		}
   })
   this.$router.forward() //前进
   this.$router.back() //后退
   this.$router.go() //可前进也可后退
```
### 10.缓存路由组件
1. 作用：让不展示的路由组件保持挂载，不被销毁。
2. 具体编码：
```vue
   <keep-alive include="News"> 
       <router-view></router-view>
   </keep-alive>
```
### 11.两个新的生命周期钩子
1. 作用：路由组件所独有的两个钩子，用于捕获路由组件的激活状态。
2. 具体名字：
```js
   activated:路由组件被激活时触发。
   deactivated:路由组件失活时触发。
```
### 12.路由守卫
1. 作用：对路由进行权限控制
2. 分类：全局守卫、独享守卫、组件内守卫
3. 全局守卫:
```js
   //全局前置守卫：初始化时执行、每次路由切换前执行
   router.beforeEach((to,from,next)=>{
   	console.log('beforeEach',to,from)
   	if(to.meta.isAuth){ //判断当前路由是否需要进行权限控制
   		if(localStorage.getItem('school') === 'atguigu'){ //权限控制的具体规则
   			next() //放行
   		}else{
   			alert('暂无权限查看')
   			// next({name:'guanyu'})
   		}
   	}else{
   		next() //放行
   	}
   })
   
   //全局后置守卫：初始化时执行、每次路由切换后执行
   router.afterEach((to,from)=>{
   	console.log('afterEach',to,from)
   	if(to.meta.title){ 
   		document.title = to.meta.title //修改网页的title
   	}else{
   		document.title = 'vue_test'
   	}
   })
```
4. 独享守卫:
```js
   beforeEnter(to,from,next){
   	console.log('beforeEnter',to,from)
   	if(to.meta.isAuth){ //判断当前路由是否需要进行权限控制
   		if(localStorage.getItem('school') === 'atguigu'){
   			next()
   		}else{
   			alert('暂无权限查看')
   			// next({name:'guanyu'})
   		}
   	}else{
   		next()
   	}
   }
```
5. 组件内守卫：
```js
   //进入守卫：通过路由规则，进入该组件时被调用
   beforeRouteEnter (to, from, next) {
   },
   //离开守卫：通过路由规则，离开该组件时被调用
   beforeRouteLeave (to, from, next) {
   }
```
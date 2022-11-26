### 路由传参
1.params传参
+ params参数:属于路径的一部分,接收方要用:字符进行占位，也称为参数路由
+ params传参时用对象写法不能用path进行跳转，否则就拿不到parasm参数
+ params可以指定传值还是不传，在(:占位符？)后加一个？即可，保证路径不会出问题
+ 如果params传的是空串，则传的参数后加||undefined就不会影响路径
+ 路由组件可以传递props数据，要在路由配置中开启
```js
//  1.布尔值写法，对应路由组件只能拿到params中的参数
props:true
//  2.对象写法,额外的给路由组件传递一下props
props:{a:1,b:2}
//  3.函数写法，可以把params参数和query参数传递给路由组件
props:($route)=>{
  return {keyword:$route.params.keyword,k:$route.query.k}
}
```
2.query传参
+ query参数:是进行查询字符串传参，在axios中params中参数就是query参数
  

3.编程式导航push同一路径抛出异常问题
```js
   // 1.多次传递同一个关键字会有异常,push是返回一个promis对象，给他成功和失败的回调就可解决
   this.$router.push({ name:'search',params:{keyword:this.keyword||undefined},
   query:{k:this.keyword}},()=>{},()=>{})
  //  2.重写Vuerouter原型对象上的push方法

```
### 分割组件
1.注册全局组件(三级联动菜单)
```js
import TypeNav from './views/Home/TypeNav' //注册三级联动菜单组件
Vue.component(TypeNav.name,TypeNav) //第一个参数:全局组件名字，第二个参数:那一个组件
Vue.config.productionTip = false
```
### axios的请求
1.axios的二次封装
```js
// 对axios进行二次封装
import axios from 'axios'
const ajax=axios.create({
  baseURL: 'http://gmall-h5-api.atguigu.cn/api',
  timeout:2000  
})
// 请求拦截器
ajax.interceptors.request.use((config) => {
  // config配置对象，里面headers请求头
  return config
})
// 响应拦截器
ajax.interceptors.response.use((res) => {
   return res.data
}, (error) => {
  return Promise.reject(error)
})
export default ({ url, method = 'GET', params = {}, data = {}, headers = {} }) =>
  ajax({
    url,
    method,
    params,
    data,
    headers
  })
```
2.nprogress请求进度条插件
```yarn add nprogress   ```
```js
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
// 进度条开始
  nprogress.start()
// 进度条结束
  nprogress.done()
```
### vuex
1.vuex的数据作用
```js
state,// 存储数据
mutations,// 修改state数据的唯一手段
actions,// 发送给mutations,处理异步
getters,// 相当于计算属性，简化仓库数组
```
2.vuex的写法</br>
2.1 store中
```js
const state={count:1}// 存储数据
const mutations = {
  ADD(state) {
    state.count++
  }
}// 修改state数据的唯一手段
const actions = {
  add({commit}) {// 参数 store,context解构出commit
    commit("ADD")
  }
}// 发送给mutations,处理异步
const getters={}// 相当于计算属性，简化仓库数组
```
2.2 组件中
```js
import {mapState} from 'vuex'
import {mapActions} from 'vuex'
methods:{
add(){
  // 1.第一种方法派发action
  this.$store.dispatch('add')
  // 2.直接引入
  this.add()
},
...mapActions(['add'])
},
computed:{
  ...mapState(['count'])
}
```
3.vuex的模块化开发
```js
import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex)
// 引入小仓库
import home from './home';
import login from './login';
export default new Vuex.Store(
  {
    modules: {
      home,
      login
   }
  }
)
```
### 防抖与节流
1.节流
```js
// 用户操作很频繁，但是只会执行一次
    let timer;
      const input=document.querySelector('input')
      input.addEventListener('input',()=>{
          clearTimeout(timer);
          timer=setTimeout(()=>{
          console.log('发送请求');
          },1000)
      })
```
2.防抖
```js
// 用户操作很频繁但是把频繁操作变成少量操作
  const span =document.querySelector('span')
    const btn=document.querySelector('button')
    let count=0
    let pre=0// 开始时间 
    let wait=1000 // 一秒钟只能触发一次
    //  时间戳版本
     btn.addEventListener('click',function(){
       var now = Date.now();// 现在时间
       if (now - pre > wait) {
       count++;
       span.innerHTML=count
       pre = now;// 时间改变
       }
     })

    // 定时器版本
    let timer
    btn.addEventListener('click',function(){
  if(!timer){
    timer=setTimeout(()=>{
   timer=null
   count++;
       span.innerHTML=count
    },1000)
  }
    })
```
### 三级联动菜单数据过多问题
1.使用声明式到航会出现卡顿(太多组件)</br>
2.直接使用事件会出现太多回调(循环执行了回调)</br>
3.解决方法，事件委派+编程式导航
```js
	// 使用声明式到航会出现卡顿()
			// 问题：1.怎么获取联动菜单的a 2.怎么确定是a标签
			// 1.给a标签添加不同的属性存储id 2.给a标签添加自定义属性,dataset可以获取自定义属性和属性值
			let element = e.target
			let { categoryname, category1id, category2id, category3id } = element.dataset
			if (categoryname) {
				let location = { name: 'search' }
				let query = { categoryName: categoryname }
				if (category1id) {
					//  一级菜单
					query.category1id = category1id
				} else if (category2id) {
					query.category2id = category2id
				} else if (category3id) {
					query.category3id = category3id
				}
                location.query=query
                this.$router.push(location)
			}
```
### mockjs模拟数据
1.src文件夹下创建mock</br>
2.准备数据</br>
3.在mock文件夹中创建一个server.js文件</br>
注意：在server.js文件当中对于banner.json||floor.json的数据没有暴露，但是可以在server模块中使用。</br>
对于webpack当中一些模块：图片、json，不需要对外暴露，因为默认就是对外暴露。</br>
4.通过mock模块模拟出数据</br>
5.通过Mock.mock方法进行模拟数据</br>
6.回到入口文件，引入serve.js</br>
### 监视路由
```js
//可以监视路由的变化，从而解决路由传参变化问题
watch:{
    deep:true,
    $route:{
        handler(){
         this.searchparams.category1Id= this.$route.query.category1id
  this.searchparams.category1Id= this.$route.query.category1id
  this.searchparams.category1Id= this.$route.query.category1id
  this.searchparams.categoryName=this.$route.query.categoryName
  this.searchparams.keyword=this.$route.params.keyword
    this.getData()
        }
    }
}
```
### 全局事件总线复习
1.mian.js中加</br>
```js
new Vue({
  router,
  store,
  beforeCreate () {
    Vue.prototype.$bus = this
  },
  render: h => h(App)
}).$mount('#app')

```
2.传输方
```js
 methods: {
   sendStudentName(){
   this.$bus.$emit('getStuName', this.myName);
   }
 },
```
3.接收方
```js
mounted() {
  this.$bus.$on('getStuName',(val)=>{
    console.log('我收到了来自stu的信息',val);
  })
},
```
### 自定义事件复习
1.父组件中为子组件绑定自定义事件并写出事件触发的位置在父组件中
```js
// 绑定自定义事件
	<SearchSelector @trademarkInfo="trademarkInfo"/>
  // 自定义事件触发的位置
   trademarkInfo(value){
      console.log(value);
    }
```
2.子组件中设置一个点击等方法触发自定义事件，事件存在this.$emit中
```js
 <li v-for="item in trademarkList" :key="item.tmId"   @click="SeartrademarkList(item)">{{item.tmName}}</li>
//  触发自定义事件
   SeartrademarkList(item){
      this.$emit('trademarkInfo',item)
    }
```
### 分页组件的封装
1.通用的分页组件
```js
<template>
  <div class="pagination">
    <button>上一页</button>
     <button>1</button>
    <button>···</button>

    <button>3</button>
    <button>4</button>
    <button>5</button>
    <button>6</button>
    <button>7</button>
    
    <button>···</button>
    <button>9</button>
    <button>下一页</button>
    <button style="margin-left: 30px">共 60 条</button>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
  }
</script>

<style lang="less" scoped>
  .pagination {
    text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>
```
2.知道一页多少条，总的数据数，连续的页码数5|7</br>
3.调试好的分页组件
```js
<template>
	<div class="pagination">
		<button
			:disabled="pageNo==1"
			@click="$emit('getPageNo',pageNo-1)"
		>上一页</button>
		<button
			v-show="startNumAndEndNum.start>=2"
			@click="$emit('getPageNo',1)"
		>1</button>

		<button v-show="startNumAndEndNum.start>2">···</button>
		<button
			v-for="(item,index) in startNumAndEndNum.end"
			:key="index"
			v-show="item>=startNumAndEndNum.start"
      @click="$emit('getPageNo',item)"
      :class="{active:item==pageNo}"
		>{{item}}</button>
		<button v-show="startNumAndEndNum.end<totalpage-1">···</button>

		<button
			v-show="startNumAndEndNum.end<totalpage"
			@click="$emit('getPageNo',totalpage)"
		>{{totalpage}}</button>
		<button
			:disabled="pageNo==totalpage"
			@click="$emit('getPageNo',pageNo+1)"
		>下一页</button>
		<button style="margin-left: 30px">共 {{total}} 条</button>
	</div>
</template>

<script>
export default {
	name: 'Pagination',
	props: ['pageNo', 'pageSize', 'total', 'continues'],
	computed: {
		// 总的页码数
		totalpage() {
			return Math.ceil(this.total / this.pageSize)
		},
		// 计算出起始数据和结束数据
		startNumAndEndNum() {
			let start = 0,
				end = 0
			// 页码不够时，如只要5页
			if (this.continues > this.totalpage) {
				start = 1
				end = this.totalpage
			} else {
				// 正常现象
				start = this.pageNo - parseInt(this.continues / 2)
				end = this.pageNo + parseInt(this.continues / 2)
				//  start出现不正常现象
				if (start < 1) {
					start = 1
					end = parseInt(this.continues)
				} else if (end > this.totalpage) {
					start = this.totalpage - this.continues + 1
					end = this.totalpage
				}
			}
			return { start, end }
		}
	}
}
</script>

<style lang="less" scoped>
.pagination {
	text-align: center;
	button {
		margin: 0 5px;
		background-color: #fff;
		color: #050a14;
		outline: none;
		border-radius: 2px;
		padding: 0 4px;
		vertical-align: top;
		display: inline-block;
		font-size: 13px;
		min-width: 35.5px;
		height: 28px;
		line-height: 28px;
		cursor: pointer;
		box-sizing: border-box;
		text-align: center;
		border: 0;

		&[disabled] {
			color: #c0c4cc;
			cursor: not-allowed;
		}

		&.active {
			cursor: not-allowed;
			background-color: #409eff;
			color: #fff;
		}
	}
}
</style>
```
### 购物车的各种问题(数据检测原理)
1.勾选与全选相互应
```js
// 判断是否全选
     const arr=[
            {id:1,name:'西瓜',state:true},
            {id:1,name:'苹果',state:true},
            {id:1,name:'香蕉',state:true}
        ]
        //每一项都满足条件是true
        const result=arr.every(item=>item.state);
        console.log(result);
```
2.商品总价不要用数组的filter方法进行筛选，否则会掉入坑中
```js
 goodsPrice(){
        let sum=0
        this.cartInfoList.forEach(item=>{
          if(item.isChecked==1){ //只要被选择的商品才会计算价格
          sum+=item.skuPrice*item.skuNum
          }
        })
        return sum
      }
```
3.改变数组里面的对象而引出的检测数据的原理
```js
// 数据检测实质是数据代理通过 Object.defineProperty
    keys.forEach((key)=>{
      Object.defineProperty(this,key,{
         get(){  
         },
         set(val){
         obj[key]=val;
         }
      })
    })
    }
// 数组的检测



```
### vuex中的伪计算属性和vue中计算属性的坑
1.state中的请求数据还没有拿到等情况导致计算属性处理的一个undefined数据
```js
// 数据中state中初始值为空返回的是一个数组嵌套的对象
// 为了简化派发情况的嵌套可会用getters对数据进行处理，当它嵌套不只有一层时，切记只能处理一层，
// 多层处理无法确定上一个值是否返回了，如果是undefined就会继续报错，我们要一层层处理，没处理一层用或(||)取消undefined的返回
```
2.在处理计算属性的值时不要用数组的filter方法进行筛选，否则会掉入坑中
### vuex中拿数据的坑
1.组件中的计算属性是有vuex中state或者gettes组成的它受组件的返回数据的影响
2.返回的数据要重新派发要在派发的函数前加async和await以保障拿到的是新的数据
### 登陆注册
1.用户信息的展示
```js
// 因为用户的信息是从vuex中获取的每次获取要派发每个页面要展示
// 1.App组件中派发，但是App组件只会刷新一次，登陆后就是展示空的
// 2.每个组件中都派发，麻烦
// 3.导航守卫中处理
each.beforeEach(async (to, from, next) => {
  // to:可获取到你跳转的路由信息
  // from:跳转之前的路由位置
  let token = store.state.user.token
  let name=store.state.user.userInfo.name
  if (token) {
    if (to.path == '/login') {
      next('/home')
    } else {
      // 如果没有用户名就派发
      if (name) {
        next()
      } else {
        try {
          // 每次获取用户信息在头上显示
          await store.dispatch('getUserInfo')
          next()
        } catch (e) {
          // token过期，清除token跳到登陆
       await store.dispatch('getLogout')   
        }
      }
    } 
  } else {
    next() 
  }
})
```
### 排他思想
点击时全部为0，点的那个为1
```js
 changeDefault(add,address){
      // 全部0,点击的为1
      address.forEach(item=>item.isDefault=0)
      add.isDefault=1
      }
```
### 数组中常用的方法
### main中通一引入api
```js
import * as API from '@/api'
beforeCreate(){
  Vue.prototype.$API=API //相当于$bus
}

```
### 根据字符串生成二微码qrcode
安装```yarn add -g qrcode ```
### 表单验证插件
1.vee-validate 基本使用</br>
2.插件安装与引入
```JS
cnpm i vee-validate@2 --save  安装的插件安装2版本的
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'   // 引入中文 message
Vue.use(VeeValidate)
```
3.提示信息
```JS
VeeValidate.Validator.localize('zh_CN', {
messages: {
...zh_CN.messages,
is: (field) => `${field}必须与密码相同` // 修改内置规则的 message，让确认密码和密码相同
},
attributes: { // 给校验的 field 属性名映射中文名称
phone: '手机号',
code: '验证码',
password:'密码',
password1:'确认密码',
isCheck:'协议'
}
})
```
4.基本使用
```JS
<input
          placeholder="请输入你的手机号"
          v-model="phone"
          name="phone"
          v-validate="{ required: true, regex: /^1\d{10}$/ }"
          :class="{ invalid: errors.has('phone') }"
        />
<span class="error-msg">{{ errors.first("phone") }}</span>

const success = await this.$validator.validateAll(); //全部表单验证
//自定义校验规则
//定义协议必须打勾同意
VeeValidate.Validator.extend('agree', {
validate: value => {
return value
},
getMessage: field => field + '必须同意'
})
```
### 打包注意点
1. 去掉map后缀文件
vue.config.js中加入 productionSourceMap:false <br/>

### nginx项目部署实现请求代理

```js
 server {
        listen       80; // 项目部署的地址
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / { // 监听项目运行的地址
            proxy_pass http://localhost:8080;
        }
        location /api{ // /api开头的请求代理发送
            proxy_pass http://gmall-h5-api.atguigu.cn;
        }
```


## Vue2基础   
### 1. MVVM模型
```js
MVVM模型
       
						1. M：模型(Model) ：data中的数据
						2. V：视图(View) ：模板代码
						3. VM：视图模型(ViewModel)：Vue实例
			观察发现：
						1.data中所有的属性，最后都出现在了vm身上。
						2.vm身上所有的属性 及 Vue原型上所有属性，在Vue模板中都可以直接使用。
    MVVM是vue实现数据驱动视图的和双向数据绑定的核心原理
           Model表示渲染数据所依赖的数据源
           View表示当前页面所渲染的DOM结构
         ViewModel表示vue的实例，是核心他把上面两者绑定在一起
```
### 2. vue中的数据代理
1. vue数据代理的原理
```js
    1.Vue中的数据代理：
    	  通过vm对象来代理data对象中属性的操作（读/写）
    2.Vue中数据代理的好处：
          更加方便的操作data中的数据
    3.基本原理：
          通过Object.defineProperty()把data对象中所有属性添加到vm上。
          为每一个添加到vm上的属性，都指定一个getter/setter。
          在getter/setter内部去操作（读/写）data中对应的属性。
```
2. Object.defineProperty()实现数据代理
```js
<body>
    <!-- 数组的响应 -->
    <input type="text" id="ipt">
    <p id='op'></p>
    <!-- 对象的响应  -->
    <input type="text" id="iptj">
    <p id='opj'></p>
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

     const obj = new Observer({a:1,b:2})
     
     const iptj = document.querySelector('#iptj')
     iptj.value = obj.a
     document.querySelector('#opj').innerHTML = obj.a
     iptj.addEventListener('input',function (e) {
         obj.a = e.target.value
         document.querySelector('#opj').innerHTML = obj.a
     })
    </script>
</body>
```
#### (1)vue2中数据代理数组
1. 代理的数组无法触发响应
```html
<template>
  <div>
    数组:{{ arr }}
    <br />
    <button @click="changeArr">改变数组</button>
  </div>
</template>

<script>
export default {
  name: "School",
  data() {
    return {
      arr: [], // 数组
    };
  },
  methods: {
    changeArr() {
      this.arr[1] = 1;
    },
  },
};
</script>
```
2. 解决办法this.$set
```html
<template>
  <div>
    数组:{{ arr }}
    <br />
    <button @click="changeArr">改变数组</button>
  </div>
</template>

<script>
export default {
  name: "School",
  data() {
    return {
      arr: [], // 数组
    };
  },
  methods: {
    changeArr() {
      // 通过this.$set添加 this.arr[1] = 1;
      this.$set(this.arr, 0, 1);
      // 添加通过push等方法
    }, 
  },
};
</script>
```
#### (2)vue2中数据代理对象
1. 代理对象的问题(对象无初始值,vue3常用ref({}))
```html
<!-- 修改无初值的对象无法检测到(相当于对象添加值) -->
<template>
  <div>
    对象:{{ obj }}
    <br />
    <button @click="changeObj">改变对象</button>
  </div>
</template>

<script>
export default {
  name: "School",
  data() {
    return {
      obj: {
        A: "",
      }, // 对象
    };
  },
  methods: {
    changeObj() {
      // 无响应
      this.obj.B = 2;
    },
  },
};
</script>
```
2. 代理对象的问题(对象有初始值)
```html
<!-- 相当于解决对象无法检测的一种方法 -->
<template>
  <div>
   对象:{{ obj }}
    <br />
    <button @click="changeObj">改变对象</button>
  </div>
</template>

<script>
export default {
  name: "School",
  data() {
    return {
      obj: {
        A: "",
      }, // 对象
    };
  },
  methods: {
    changeObj() {
      // 可以检测到改变
      this.obj.A = 1;
    },
  },
};
</script>
```
3. 使用this.$set
```html
<!-- 一般而言修改对象的一个函数中添加一个this.$set就可以引起页面的更新 -->
<template>
  <div>
   对象:{{ obj }}
    <br />
    <button @click="changeObj">改变对象</button>
  </div>
</template>

<script>
export default {
  name: "School",
  data() {
    return {
      obj: {}, // 对象
    };
  },
  methods: {
    changeObj() {
      // 向空对象中添加若干个变量
      this.obj.A = 1;
      this.obj.B = 2;
      this.obj.C = 3;
      this.$set(this.obj, "D", 4);
    },
  },
};
</script>
```
### 3. vue中常用的事件处理
1. 常用的事件修饰符
```html
 <!-- 
				Vue中的事件修饰符：
						1.prevent：阻止默认事件（常用）；
						2.stop：阻止事件冒泡（常用）；
						3.once：事件只触发一次（常用）；
						4.capture：使用事件的捕获模式；
						5.self：只有event.target是当前操作的元素时才触发事件；
						6.passive：事件的默认行为立即执行，无需等待事件回调执行完毕；
		-->
 <h1>Hello {{name}}</h1>
    <!-- 阻止默认提交行为 -->
    <a href="https://www.baidu.com" @click.prevent="showInfo">点我提示</a>
    <!-- 阻止冒泡 -->
    <div class="demo1" @click="showInfo"><button @click.stop="showInfo">点我提示</button></div>
    <!-- 事件只触发一次 -->
    <button @click.once="showInfo">点我提示</button>
    <!-- 使用事件的捕获模式(捕获阶段就处理事件)-->
    <div class="box1" @click.capture="showMsg(1)">
      div1
      <div class="box2" @click="showMsg(2)">
        div2
      </div>
    </div>
    <!--只有event.target是当前操作的元素时才触发事件(点击按钮时候冒泡到div上不会触发)  -->
    <div class="demo1" @click.self="showInfo"><button @click="showInfo">点我提示</button></div>
    <!-- 事件的默认行为立即执行，无需等待事件回调执行完毕； -->
    <ul class="list" @wheel.passive="demo"> 
      <!-- scroll滚动条的滚动，wheel鼠标滚轮滚动 -->
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
    </ul>
  </div>
```
2. 常用的按键修饰符
```js
	1.Vue中常用的按键别名：
				回车 => enter
				删除 => delete (捕获“删除”和“退格”键)
				退出 => esc
				空格 => space
				换行 => tab (特殊，必须配合keydown去使用)
				上 => up
				下 => down
				左 => left
				右 => right
	2.Vue未提供别名的按键，可以使用按键原始的key值去绑定，但注意要转为kebab-case（短横线命名）
	3.系统修饰键（用法特殊）：ctrl、alt、shift、meta(win键)
				(1).配合keyup使用：按下修饰键的同时，再按下其他键，随后释放其他键，事件才被触发。
				(2).配合keydown使用：正常触发事件。
                (3).系统修饰键可以组合ctrl.y
```
### 4. vue2中选项式属性
#### (1)计算属性
1. 非响应式
```js
 computed:{
    //只用set
      fullName(){
       return this.firstName+'-'+this.lastName;
      } 
    }
```
2. 响应式
```js
computed:{
      fullName:{
        get(){
          console.log("get被调用了");
          return this.firstName+'-'+this.lastName;
         },
         set(value){
           console.log("set被调用了");
           const arr=value.split('-');
           this.firstName=arr[0];
           this.lastName=arr[1];
         }
      } 
    }
```
#### (2)监听属性
1. 监听的配置
```js
 watch:{
  // number是data中的值
     number:{
        // 深度监听
       deep:true,
        // 第一次就监听
       immediate: true, 
       handler(){
         console.log('number改变了');
       }
     }
    }

```
2. 监听属性的属性方式
```js
		watch:{
				//正常写法
				/* isHot:{
					// immediate:true, //初始化时让handler调用一下
					// deep:true,//深度监视
					handler(newValue,oldValue){
						console.log('isHot被修改了',newValue,oldValue)
					}
				}, */
				//简写
				isHot(newValue,oldValue){
					console.log('isHot被修改了',newValue,oldValue)
				} 
			}
```
#### (3)生命周期
1. 构造
```js
   beforeCreate() {},
	 created() {console.log(this.n);},
```
2. 挂载
```js
   beforeMount() {},
	 mounted() {console.log(this.$el instanceof HTMLElement);},
```
3. 更新
```js
   beforeUpdate() {console.log(this.$el );},
	 updated() {},
```
4. 卸载
```js
  beforeDestroy() {},
	destroyed() {},
```
### 5. vue2的组合式实现
1. 下载插件
```js
// 实现vue的setup语法糖
 yarn add unplugin-vue2-script-setup 
// 实现vue3的组合式APi
 yarn add @vue/composition-api
```
2. 使用组合式API插件和setup语法糖配置
```js
// main.js
import VueCompositionAPI from "@vue/composition-api";
Vue.use(VueCompositionAPI);

// vue.config.js
const ScriptSetup = require('unplugin-vue2-script-setup/webpack').default

module.exports = {
  parallel: false, // disable thread-loader, which is not compactible with this plugin
  configureWebpack: {
    plugins: [
      ScriptSetup({ /* options */ }),
    ],
  },
}
```
3. 简单使用
```html
<template>
  <div>
    数组:{{ arr }} 对象:{{ obj }}
    <br />
    <button @click="changeObj" ref="a">改变对象</button>
    <button @click="changeArr">改变数组</button>
  </div>
</template>

<script setup>
import { ref } from "@vue/composition-api";
let arr = ref([]);
let obj = ref({});
const changeArr = () => {};

const changeObj = () => {};
</script>

```
## Vue2组件
### 1.常用内置组件
#### (1)component组件
```html
<template>
  <div>
    <component :is="component"></component>
    <button @click="changeFn">切换</button>
  </div>
</template>

<script>
// 引入组件
import School from "./components/School.vue";
import Stu from "./components/Stu.vue";
export default {
  name: "App",
  components: {
    School,
    Stu,
  },
  data() {
    return {
      component: "School",
    };
  },
  methods: {
    changeFn() {
      this.component === "Stu"
        ? (this.component = "School")
        : (this.component = "Stu");
    },
  },
};
</script>
```
#### (2)transition组件
1. 介绍
```js
v-enter：定义进入过渡的开始状态(开始状态和离开过度的结束状态一致)

v-enter-active：定义进入过渡生效时的状态(写进入的动画)

v-enter-to：2.1.8 版及以上定义进入过渡的结束状态。

v-leave：定义离开过渡的开始状态。

v-leave-active：定义离开过渡生效时的状态(写离开的动画)

v-leave-to：2.1.8 版及以上定义离开过渡的结束状态(开始状态和离开过度的结束状态一致)
```
2. 基本使用
```html
<template>
  <div>
    <transition name="fade">
      <School v-if="flag" />
    </transition>
    <button @click="flag = !flag">toggle</button>
  </div>
</template>

<script>
import { School, Stu } from "./components";

export default {
  name: "",
  props: {},
  data() {
    return {
      flag: true,
    };
  },
  components: { School, Stu },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
/* 或者使用动画 */
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
```
3. 结合第三方动画库
```html
<!-- 主要使用  enter-active-class leave-active-class -->
<template>
  <div>
    <transition
      enter-active-class="animate__animated animate__bounceInDown"
      leave-active-class="animate__animated animate__bounceOutDown"
    >
      <School v-if="flag" />
    </transition>
    <button @click="flag = !flag">toggle</button>
  </div>
</template>

<script>
import { School, Stu } from "./components";
import "animate.css";

export default {
  name: "",
  props: {},
  data() {
    return {
      flag: true,
    };
  },
  components: { School, Stu },
  methods: {},
  watch: {},
  computed: {},
};
</script>

```
4. transition的构子函数
```html
<template>
  <div>
    <transition
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:after-enter="afterEnter"
      v-on:enter-cancelled="enterCancelled"
      v-on:before-leave="beforeLeave"
      v-on:leave="leave"
      v-on:after-leave="afterLeave"
      v-on:leave-cancelled="leaveCancelled"
    >
      <School v-if="flag" />
    </transition>
    <button @click="flag = !flag">toggle</button>
  </div>
</template>

<script>
import { School, Stu } from "./components";
import "animate.css";

export default {
  name: "",
  props: {},
  data() {
    return {
      flag: true,
    };
  },
  components: { School, Stu },
  methods: {
    // 进入
    beforeEnter() {},
    enter() {},
    afterEnter() {},
    // 打断进入效果
    enterCancelled() {},
    // 离开
    beforeLeave() {},
    leave() {},
    afterLeave() {},
     // 打断离开效果(连续点击)
    leaveCancelled() {},
  },
  watch: {},
  computed: {},
};
</script>
```
5. 使用gsap实现过度
```html
<template>
  <div>
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @before-leave="beforeLeave"
      @leave="leave"
    >
      <div class="box" v-if="flag"></div>
    </transition>
    <button @click="flag = !flag">toggle</button>
  </div>
</template>

<script>
import { School, Stu } from "./components";
import { gsap } from "gsap";

export default {
  name: "",
  props: {},
  data() {
    return {
      flag: true,
    };
  },
  components: { School, Stu },
  methods: {
    // 进入
    beforeEnter(el) {
      gsap.set(el, {
        duration: 3,
        width: 0,
        height: 0,
      });
      console.log(1);
    },
    enter(el, done) {
      gsap.to(el, {
        // duration: 3,
        width: 200,
        height: 200,
        onComplete: done,
      });
      console.log(1);
    },

    // 离开
    beforeLeave(el, done) {
      gsap.set(el, {
        width: 200,
        height: 200,
      });
      console.log(1);
    },
    leave(el, done) {
      gsap.to(el, {
        width: 0,
        height: 0,
        onComplete: done,
      });
      console.log(1);
    },
  },
  watch: {},
  computed: {},
};
</script>

<style>
.box {
  background-color: red;
}
</style>

```
#### (3)transition-group组件
1. 平移属性move-class
```js
<template>
	<div>
		<button @click="random">打乱</button>
		<transition-group
			tag="div"
			class="wraps"
			move-class="move"
		>
			<div
				v-for="item in arr"
				:key="item.id"
				class="item"
			>
				{{ item.number }}
			</div>
		</transition-group>
	</div>
</template>

<script>
import { School, Stu } from './components'
import _ from 'lodash'

export default {
	name: '',
	props: {},
	data() {
		return {
			arr: []
		}
	},
	components: { School, Stu },
	mounted() {
		// 建立9x9数组
		this.arr = Array.apply(null, { length: 81 }).map((_, index) => {
			return {
				id: index,
				number: (index % 9) + 1
			}
		})
	},
	methods: {
		random() {
			this.arr = _.shuffle(this.arr)
		}
	},
	watch: {},
	computed: {}
}
</script>

<style lang="less" scoped>
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
2. 状态过度(数字过度颜色过度)
```js
<template>
	<div>
		<h1>{{num.tweenedNumber.toFixed(0)}}</h1>
		<input
			type="text"
			v-model="num.current"
		>
	</div>
</template>

<script>
import { School, Stu } from './components'
import _ from 'lodash'
import gsap from 'gsap'

export default {
	name: '',
	props: {},
	data() {
		return {
			num: {
				current: 0, // 输入框中
				tweenedNumber: 0 // 过度效果
			}
		}
	},
	components: { School, Stu },
	methods: {},
	watch: {
		num: {
			deep: true,
			handler(newVal) {
				gsap.to(this.num, {
					duration: 1, // 过度时间
					tweenedNumber: newVal.current
				})
				// this.$set()
			}
		}
	},
	computed: {}
}
</script>

```
#### (4)keep-alive组件
1. props
```js
include - 字符串或正则表达式。只有名称匹配的组件会被缓存。

exclude - 字符串或正则表达式。任何名称匹配的组件都不会被缓存。

max - 数字。最多可以缓存多少组件实例。
```
2. 基本使用
```js
<template>
	<div>
		<keep-alive :include="['A']">
			<A v-if="flag"></A>
		</keep-alive>
		<button @click="flag=!flag">显示/隐藏</button>
	</div>
</template>

<script>
import { A } from './components'
export default {
	props: {},
	data() {
		return {
			flag: true
		}
	},
	components: { A }
}
</script>
```
3. 生命周期变化
```js
  activated() {
		console.log('组件被激活了');
	},
	deactivated() {
		console.log('组件被缓存了');
	},
```
### 2.组件间通讯
#### 1.props父传子
1. 父组件传递值
```js
<template>
  <div>
    <A title="向子组件传值"></A>
  </div>
</template>

<script>
import {A,B} from './components'
export default {
  components:{A,B},
};
</script>

<style lang="less"></style>
```
2. 子组件接受值
```js
<template>
	<div>A组件</div>
</template>

<script>
export default {
	props: {
		title: {
			type: String
		}
	},
	mounted() {
		console.log(this.title)
	}
}
</script>
```
#### 2.emit子传父
1. 父组件给子组件绑定事件
```html
<template>
	<div>
		<A @getChild="getChild"></A>
	</div>
</template>

<script>
import { A, B } from './components'
export default {
	components: { A, B },
	methods: {
		getChild(value) {
			console.log(value)
		}
	}
}
</script>
```
2. 子组件触发父组件的事件
```html
<template>
	<div @click="$emit('getChild',100)">A组件</div>
</template>
```
##### (1)props和emit实现简单的双向据绑定
1. 父组件
```js
<template>
	<div>
    父组件{{value}}
    <br>
		<A :value="value" @setValue="setValue"></A>
	</div>
</template>

<script>
import { A, B } from './components'
export default {
	components: { A, B },
	data() {
		return {
			value: 1
		}
	},
	methods: {
    setValue(value){
      this.value=value
    }
  }
}
</script>
```
2. 子组件
```js
<template>
<div>
  子组件:
	<input
		type="text"
		v-model="modelValue"
	>
</div>

</template>

<script>
export default {
	props: {
		value: {
			type: Number
		}
	},
	computed: {
    // 计算属性
		modelValue: {
			get() {
				return this.value
			},
			set(value) {
				this.$emit('setValue', +value)
			}
		}
	}
}
</script>
```
##### (2)mixin混入拆分双向数据绑定
1. 混入属性
```js
export const mixinModel = {
  computed: {
		modelValue: {
			get() {
				return this.value
			},
			set(value) {
				this.$emit('setValue', +value)
			}
		}
	}
}
```
2. 子组件引入混入
```js
<template>
	<div>
		子组件:
		<input
			type="text"
			v-model="modelValue"
		>
	</div>

</template>

<script>
import mixinModel from '../mixin'

export default {
	props: {
		value: {
			type: Number
		}
	},
	mixin: [mixinModel]
}
</script>

```
#### 3.插槽通信
##### (1)默认插槽
1. 父组件
```js
<template>
  <div>
    <A><h1>默认插槽</h1></A>
  </div>
</template>

<script>
import {A} from './components'
export default {
  components:{A},
};
</script>
```
2. 子组件
```js
<template>
  <div> 
    <!-- 默认插槽占位 -->
    <slot></slot>
  </div>
</template>

```
##### (2)具名插槽
1. 父组件
```js
<template>
	<div>
		<A>
			<template #name>
				<h1 >具名插槽</h1>
			</template>
		</A>
	</div>
</template>

<script>
import { A } from './components'
export default {
	components: { A }
}
</script>
```
2. 子组件
```js
<template>
	<div>
		<!-- 具名插槽占位 -->
		<slot name="name"></slot>
	</div>
</template>

```
##### (3)作用域插槽(scope传值重点)
1. 理解:<span style="color:red">数据在子组件的自身，但根据数据生成的结构需要父组件决定。</span>
2. 子组件
```js
<template>
	<div>
		<!-- 作用域插槽占位，slot传的值最后会被#name="scoped" scoped会接受list-->
		<slot name="name" :list="list"></slot>
	</div>
</template>

<script>
export default {
	data() {
		return {
			list: ['作', '用', '域', '插', '槽']
		}
	},
}
</script>
```
3. 父组件
```js
<template>
	<div>
		<!-- 作用域插槽占位，slot传的值最后会被#name="scoped" scoped会接受list-->
		<slot name="name" :list="list"></slot>
	</div>
</template>

<script>
export default {
	data() {
		return {
			list: ['作', '用', '域', '插', '槽']
		}
	},
}
</script>
```
#### 4.全局事件总线
1. 挂载$bus
```js
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render(creatElement) {
  return   creatElement(App)
  },
  // 安装全局事件总线
  beforeCreate() {
    Vue.prototype.$bus=this
  }
}).$mount('#app')

```
2. A组件
```js
<template>
	<div>
		A组件
		<button @click="sendB">发生信息给B</button>
	</div>
</template>

<script>
export default {
	methods: {
		sendB() {
			this.$bus.$emit('getB', 'A组件发生信息给B组件')
		}
	}
}
</script>

```
3. B组件
```js
<template>
	<div></div>
</template>

<script>
export default {
	mounted() {
		this.$bus.$on('getB', value => {
			console.log(value)
		})
	},
	beforeDestroy() {
		this.$bus.$off('getB')
	}
}
</script>
```
##### (1)实现简单的发布和订阅模式
1. 发布订阅的实现
```js
class Bus {
  list
  constructor() {
    this.list = {}
  }
  // 添加发布函数
  on(name, callback) {
    // 没有发布为空数组
    const fn = this.list[name] || []
    // 数组中添加回调函数
    fn.push(callback)
    // 数组赋值给list(name对应回调)
    this.list[name] = fn
  }
  // 执行函数
  emit(name, ...args) {
    // 取出回调函数
    const evnentName = this.list[name]
    // 遍历执行函数
    evnentName.forEach(fn => {
      fn.apply(this, args)
    })
  }
  // 移除函数
  off(name) {
   delete this.list[name]
  }
  
}

export default new Bus()
```
2. A组件
```js
<template>
	<div>
		A组件
		<button @click="sendB">发生信息给B</button>
	</div>
</template>

<script>
import bus from '../utils'

export default {
	methods: {
		sendB() {
			bus.emit('getB', 'A组件发生信息给B组件')
		}
	}
}
</script>
```
3. B组件
```js
<template>
	<div></div>
</template>

<script>
import bus from '../utils'
export default {
	mounted() {
		bus.on('getB', value => {
			console.log(value)
		})
	},
	beforeDestroy() {
		bus.off('getB')
	}
}
</script>
```
#### 5.ref调用
1. 子组件
```js
<template>
	<div>
		A组件
	</div>
</template>

<script>
export default {
	data() {
		return {
			childVal: '父组件可以通过ref调用它'
		}
	},
	methods: {
		childrenFn() {
			console.log('父组件可以通过ref调用它')
		}
	}
}
</script>
```
2. 父组件
```js
<template>
	<div>
		<A ref="Ac"></A>
	</div>
</template>

<script>
import { A } from './components'
export default {
	props: {},
	components: { A },
	mounted() {
		// 拿到子组件的值
		console.log(this.$refs.Ac.childVal)
		// 调用子组件的函数
		console.log(this.$refs.Ac.childrenFn)
	}
}
</script>
```
## 自定义的配置
### 1. 自定义指令
#### (1)局部自定义指令
1. 基本使用
```js
<template>
	<div>
		<input
			type="text"
			v-focus
		>
	</div>
</template>

<script>
import {} from './components'
export default {
	directives: {
		focus: {
			bind(el, binding, vnode) {
				console.log('指令第一次绑定到元素时')
			},
			inserted(el, binding, vnode) {
				el.focus()
				console.log('被绑定元素插入父节点时调用')
			},
			update(el, binding, vnode, oldVnode) {
				console.log('所在组件的 VNode 更新时调用')
			},
			componentUpdated(el, binding, vnode) {
				console.log('指令所在组件的 VNode 及其子 VNode 全部更新后调用')
			},
			unbind(el, binding, vnode) {
				console.log('只调用一次，指令与元素解绑时调用')
			}
		}
	}
}
</script>
```
2. 自定义托拽指令的实现
```js
<template>
	<div>
		<div
			style="position: absolute;
	width: 100px;
	height: 100px;
	background-color: red;"
			v-move
		></div>
	</div>
</template>

<script>
import {} from './components'
export default {
	data() {
		return {
			value: 1
		}
	},
	directives: {
		move: {
			inserted: (el, binding, vnode) => {
				const move = e => {
					console.log(parseInt(el.style.width))
					el.style.left = e.clientX - parseInt(el.style.width)/2 + 'px'
					el.style.top = e.clientY - parseInt(el.style.height)/2 + 'px'
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
		}
	}
}
</script>
```
#### (2)全局自定义指令
1. 入口文件中定义
```js
import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;
// 全局自定义指令
Vue.directive('focus', {
  inserted(el) {
    el.focus()
  }
})
export const vm = new Vue({
  render(creatElement) {
    return creatElement(App);	
	},
	beforeCreate() {
		Vue.prototype.$A = '全局变量'
		Vue.prototype.$func = () => {
			console.log('全局函数');
		}
  }//安装全局事件总线
}).$mount("#app");

```
2. 组件中使用
```js
<template>
	<div>
		<input
			type="text"
			v-focus='value'
		>
	</div>
</template>

```
### 2. 全局变量
1. 定义全局变量
```js
import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

export const vm = new Vue({
  render(creatElement) {
    return creatElement(App);	
	},
	beforeCreate() {
		Vue.prototype.$A = '全局变量'
		Vue.prototype.$func = () => {
			console.log('全局函数');
		}
  }
}).$mount("#app");

```
2. 使用全局变量
```js
<script>
import {} from './components'
export default {
	mounted() {
		console.log(this.$A)
		console.log(this.$func)
	}
}
</script>
```
### 3. 自定义插件
#### (1)简单的使用
1. 定义组件
```js
<template>
	<div v-if="flag">
		我是自定的插件组件
	</div>
</template>

<script>
export default {
	data() {
		return {
			flag: false
		}
	},
	methods: {
		// 控制显示的方法
		show() {
			this.flag = true
		},
		// 控制隐藏的方法
		hide() {
			this.flag = false
		}
	}
}
</script>
```
2. 挂载插件到Vue上(样式挂载到body上,方法挂载到全局)
```js
import C from './components/C.vue'
import Vue from 'vue'

// 1.获取构造函数
const contructor = Vue.extend(C)
// 2. 实例化组件对象
const instance = new contructor()
// 3. 创建页面元素
const div = document.createElement('div')
// 4. 将组件挂载到页面元素上
instance.$mount(document.body.appendChild(div))
export default {
  install(Vue) {
    Vue.prototype.$C = {
      hide: instance.hide,
      show: instance.show,
    }
  },
}

```
3. 入口文件中引入插件
```js
import plugin from './plugin'

Vue.use(plugin)
```
#### (2)封装Message提示插件
1. 定义组件
```js
<template>
	<div
		class="xtx-message"
		:style="style[type]"
		v-if="flag"
	>
		<!-- 上面绑定的是样式 -->
		<!-- 不同提示图标会变 -->
		<i
			class="iconfont"
			:class="[style[type].icon]"
		></i>
		<span class="text">{{ text }}</span>
	</div>
</template>
<script>
export default {
	props: {
		text: {
			type: String,
			default: ''
		},
		type: {
			type: String,
			// warn 警告  error 错误  success 成功
			default: 'warn'
		}
	},
	data() {
		return {
			style: {
				warn: {
					icon: 'icon-warning',
					color: '#E6A23C',
					backgroundColor: 'rgb(253, 246, 236)',
					borderColor: 'rgb(250, 236, 216)'
				},
				error: {
					icon: 'icon-shanchu',
					color: '#F56C6C',
					backgroundColor: 'rgb(254, 240, 240)',
					borderColor: 'rgb(253, 226, 226)'
				},
				success: {
					icon: 'icon-queren2',
					color: '#67C23A',
					backgroundColor: 'rgb(240, 249, 235)',
					borderColor: 'rgb(225, 243, 216)'
				}
			}, // 样式
			flag: false // 控制信息提示组件的显示和隐藏
		}
	},
	methods: {
		show() {
			this.flag = true
		},
		hide() {
			this.flag = false
		}
	}
}
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
2. 挂载插件到Vue上(样式挂载到body上,方法挂载到全局)
```js
import Message from './components/Message.vue'
import Vue from 'vue'
const MessageFn = (message) => {
  // 1.获取构造函数
  const contructor = Vue.extend(Message)
  // 2. 实例化组件对象propsData开发环境
  const instance = new contructor({propsData:message})
  console.log(instance)
  // 3. 创建页面元素
  instance.$mount(document.createElement('div'))
  // 4. 将组件挂载到页面元素上
  document.body.appendChild(instance.$el)
  // 5. 获取组件的显示函数
  const show = instance.show
  // 6. 获取组件的隐藏函数
  const hide = instance.hide
  // 显示
  show()
  // 3秒后隐藏
  setTimeout(() => {
    hide()
  }, 3000)
}

export default {
  install(Vue) {
    Vue.prototype.$Message = MessageFn
  },
}

```
3. 入口文件中引入插件
```js
import plugin from './plugin'

Vue.use(plugin)
```
4. 使用插件
```js

<script>
import {} from './components'
export default {
	mounted() {
		console.log(this.$Message({ type: 'success', text: '注册组件成功' }))
	}
}
</script>

```
## 移动端适配
### 1.第一种适配方案
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
### 2.第二种适配方案
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






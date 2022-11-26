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

##  Vuex原理

![](D:\VUE\Vue尚硅谷\vue脚手架\21数据的求和案例vuex版\vuex.png)



Action是知道动作，在从服务器中拿数据的过程，在发送请求时不可少

vue2中要用vuex的3版本，vue3中要用vuex的4版本，两者不可以交叉使用

1. Actions(类型：Object， 存放dispatch的动作函数 A:function(val)，触发commot('A',2)函数提交)   

     （服务员）

2. Mutations( 类型：Object ，存放commot的动作函数 A:function(val)，进行加工，mutate动作)

     （后厨）

3. State(类型：Object ，数据存在这里，接收mutate修改成功，进行重新渲染)

      （菜品）

4. Vue Components(组件，调用dispatch('A',2)触发动作函数)

     （客人）

5. stort(是1,2,3的管理，dispatch函数和commot函数是stort身上的)

<template>
  <div>
    <h1>当前求和是：{{sum}}</h1>
      <h1>当前求和放大10倍是：{{bigSum}}</h1>
         <h1>我在{{school}},学习{{subject}}</h1>
      <select v-model.number="n">
<option value="1">1</option>
<option value="2">2</option>
<option value="3">3</option>
<option value="4">4</option>
     </select>
     <button @click="increment(n)">+</button>
     <button @click="decrement(n)">-</button>
     <button @click="incrementOdd(n)">当前为奇数在加</button>
     <button @click="incrementWait(n)">等一等在加</button>
  </div>

</template>

<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'//生成便捷的计算属性
export default {
name:'Count',
data() {
  return {
    n:1,//用户选择数据
  
  }
},
methods: {
  /*
  increment(){
//  this.$store.dispatch('add', this.n);
this.$store.commit('ADD', this.n);
  },
decrement(){
  // this.$store.dispatch('sub',this.n)
  this.$store.commit('SUB', this.n);
},*/
// 1.它生成的函数是要求传入参数 decrement(value)对象写法
...mapMutations({increment:'ADD',decrement:'SUB'}),
// 2.(数组写法)两者方法名字相同



/*
incrementOdd(){
  this.$store.dispatch('addodd',this.n)
},
incrementWait(){
this.$store.dispatch('addwait', this.n);
},
*/
...mapActions({incrementOdd:'addodd',incrementWait:'addwait'})

},
computed:{
...mapState(['sum','school','subject']),
...mapGetters(['bigSum'])
},
mounted() {
  

},
}
</script>

<style>
button{
  margin-left: 5px;
}
</style>
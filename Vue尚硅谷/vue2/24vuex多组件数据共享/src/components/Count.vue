<template>
  <div class="count">
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
<h3>Persons组件最后一个人是：{{personList[personList.length-1].name}}</h3>
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
 
...mapMutations({increment:'ADD',decrement:'SUB'}),

...mapActions({incrementOdd:'addodd',incrementWait:'addwait'})

},
computed:{
...mapState(['sum','school','subject','personList']),
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
.count{
  background-color: deeppink;
  padding: 10px;
}

</style>
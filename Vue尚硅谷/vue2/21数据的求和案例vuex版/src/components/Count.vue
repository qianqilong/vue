<template>
  <div>
      <h1>当前求和是：{{$store.state.sum}}</h1>
      <h1>当前求和放大10倍是：{{$store.getters.bigSum}}</h1>
   
      <select v-model.number="n">
<option value="1">1</option>
<option value="2">2</option>
<option value="3">3</option>
<option value="4">4</option>
     </select>
     <button @click="increment">+</button>
     <button @click="decrement">-</button>
     <button @click="incrementOdd">当前为奇数在加</button>
     <button @click="incrementWait">等一等在加</button>
  </div>

</template>

<script>
export default {
name:'Count',
data() {
  return {
    n:1,//用户选择数据
  
  }
},
methods: {
  increment(){
//  this.$store.dispatch('add', this.n);
this.$store.commit('ADD', this.n);
  },
decrement(){
  // this.$store.dispatch('sub',this.n)
  this.$store.commit('SUB', this.n);

},
incrementOdd(){
  this.$store.dispatch('addodd',this.n)
},
incrementWait(){

this.$store.dispatch('addwait', this.n);
 
},
},
}
</script>

<style>
button{
  margin-left: 5px;
}
</style>
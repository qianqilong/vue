<template>
  <div class="Persons">
    <h3>Count组件求和为：{{sum}}</h3>
    <h1>人员列表</h1>
    <input type="text" placeholder="请输入名字" v-model="val">
    <button @click="addPresons(val)" >添加</button>
    <ul>
      <li v-for="(item,index) in personList" :key="index">{{item.name}}</li>
    </ul>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
name:'Persons',
data() {
  return {
    val:'',
  }
},
// 方法
methods: {
  // ...mapActions({addPresons:'addPresons'})
  addPresons(value){
   this.$store.dispatch('addPresons',value)
  }
},
//计算属性
computed:{
// ...mapState(['personList']),//人员列表
personList(){
  return this.$store.state.personList;
},
sum(){
  return this.$store.state.sum;
}
}
}
</script>

<style>
.Persons{
  background-color: aqua;
  padding: 10px;
}
</style>
<template>
  <div class="Persons">
    <h3>Count组件求和为：{{sum}}</h3>
    <h1>人员列表</h1>
    <h3>列表中第一个人的名字是 {{firstName}} </h3>
    <input type="text" placeholder="请输入名字" v-model="val">
    <button @click="addPresons(val)" >添加</button>
    <button @click="addLIU">添加姓刘</button>
    <button @click="addServer">添加随机名字</button>
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
   this.$store.commit('personOptions/addPresons',value)
   //确保分类名
  },
  addLIU(){
    this.$store.dispatch('personOptions/addPresonsWang',this.val)
  },
  addServer(){
    this.$store.dispatch('personOptions/addPresonServer')
  }
},
//计算属性
computed:{
// ...mapState(['personList']),//人员列表
personList(){
  return this.$store.state.personOptions.personList;
},
sum(){
  return this.$store.state.countOptions.sum;
},
firstName(){
  return this.$store.getters['personList/firstPersonsName'];
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
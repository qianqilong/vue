<template>
 <h1>一个人的信息</h1>
 姓：<input type="text" v-model="person.firstname"><br>
 名：<input type="text" v-model="person.lastname">
 <br>
 <span>全名：{{person.fullName}}</span>
 <br>
 全名：<input type="text" v-model="person.fullNameone">
</template>
<script>
import {reactive,computed} from 'vue';
export default {
  name: 'App',
 /* computed:{
  fullName(){
    return this.person.firstname+'-'+this.person.lastname
  }
  },*/
  setup() {
    // 数据
    let person=reactive({
     firstname:'张',
    lastname:'三'
    })
    // 计算属性--简写
    person.fullName=computed(()=>{
       return person.firstname+'-'+person.lastname 
    })

    // 计算属性--完整写法(可被修改,)
    person.fullNameone=computed(
      {
        get(){
         return person.firstname+'-'+person.lastname 
        },
        set(value){
          const nameArr=value.split('-');
          person.firstname=nameArr[0];
          person.lastname=nameArr[1];
        }
      }
    )
    return {
     person,
    
    }
   
  }, 
  

}
</script>

<style>

</style>

<template>
   <section class="jumbotron">
          <h3 class="jumbotron-heading">Search Github Users</h3>
          <div>
            <input
              type="text"
              placeholder="enter the name you search"
              v-model="keyword"
            />&nbsp;
            <button @click="searchUser">Search</button>
          </div>
  </section>
</template>

<script>
import axios from 'axios'
export default {
name:'Search',
data() {
  return {
    keyword:''
  }
},
methods: {
async searchUser(){
    //更新list数据,功能和axios一样
    this.$bus.$emit('updatUsers',{isFirst:false, isLoading:true,errMsg:'',users:[]})
     const {data}=await this.$http.get('https://api.github.com/search/users',{
    params:{q:this.keyword}
    })
  //  this.$bus.$emit('getUsers',data)
    this.$bus.$emit('updatUsers',{ isLoading:false,errMsg:'',users:data.items})
  }
},
}
</script>

<style>

</style>
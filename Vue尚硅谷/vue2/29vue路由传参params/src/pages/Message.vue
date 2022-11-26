<template>
  <div>
    <ul>
      <li v-for="item in messageList" :key="item.id">
        <!-- 路由跳转携带params参数，to的字符串写法 -->
        <!-- <router-link :to="`/home/message/detail/${item.id}/${item.title}`">{{item.title}}</router-link>&nbsp;&nbsp; -->
        


        <!-- 路由跳转携带params参数，to的对象写法,(必须使用用命名路由进行跳转)-->
       
 <router-link :to="{
name:'detail',
params:{
  id:item.id,
  title:item.title
} 

}">
  {{item.title}}
  </router-link>
      </li>
    </ul>
    <hr>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name:'Message',
 data() {
   return {
     messageList:[
        {
          id:'001',
          title:'message001'
        },
         {
          id:'002',
          title:'message002'
        },
         {
          id:'003',
          title:'message003'
        }
     ]
   }
 },
}
</script>

<style>
</style>
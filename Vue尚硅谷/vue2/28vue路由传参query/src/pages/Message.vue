<template>
  <div>
    <ul>
      <li v-for="item in messageList" :key="item.id">
        <!-- 路由跳转携带query参数，to的字符串写法 -->
        <!-- <router-link :to="`/home/message/detail?id=${item.id}&title=${item.title}`">{{item.title}}</router-link>&nbsp;&nbsp;
         -->


        <!-- 路由跳转携带query参数，to的对象写法-->
<router-link :to="{
path:'/home/message/detail',
query:{
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
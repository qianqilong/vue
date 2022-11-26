<template>
  <div class="demo">
    <h2>学校地址：{{address}}</h2>   
  </div>
</template>

<script>
import pubsub from 'pubsub-js'
export default {
 
  name:'School',
  data() {
    return {
      school: '安徽科技学院',
      address: '龙子湖校区'
    }
  },
mounted() {
this.pubId= pubsub.subscribe('hello',(msgName,data)=>{//订阅消息，第一个是消息名，第二个是消息数据

    console.log('有人发布了hello消息！',data);
  })
},
beforeDestroy() {
  pubsub.unsubscribe(this.pubId)
},
}
</script>

<style>
.demo {
  background-color: aqua;
}
</style>
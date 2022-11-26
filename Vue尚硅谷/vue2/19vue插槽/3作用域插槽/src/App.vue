
<template>
  <div>
    <div class="container">
  
      <Category  title="游戏" :listData="games">
        <template scope="list">
    <ul>
      <li v-for="(item,index) in list.listData" :key="index">{{item}}</li>
    </ul>
  </template>
        
      </Category>
     <Category  title="游戏" :listData="games">
       <template scope="list">
          <ol>
      <li v-for="(item,index) in list.listData" :key="index">{{item}}</li>
    </ol>
       </template>
      </Category>
       <Category  title="游戏" :listData="games">
        <template scope="list">
            <h4 v-for="(item,index) in list.listData" :key="index">{{item}}</h4>
        </template>
      </Category>
    </div>
  </div>
</template>

<script>
import Category from './components/Category.vue'
export default {
  name: 'App',
  components: {Category },
  data() {
    return {
     
			games:['红色警戒','穿越火线','劲舞团','超级玛丽'],
		
    }
  },
}
</script>

<style scoped>
.container,a,.cce{
  display: flex;
  justify-content: space-around;
}

</style>
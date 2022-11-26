<template>
    <div class="row">
      <!-- 展示用户列表 -->
          <div v-show="info.users.length" class="card" v-for="item in info.users" :key="item.login" >
            <a
              :href="item.html_url"
              target="_blank"
            >
              <img
                :src="item.avatar_url"
                style='width: 100px'
              />
            </a>
            <p class="card-text">{{item.login}}</p>
          </div>
          <!-- 展示欢迎词 -->
          <h1 v-show="info.isFirst">欢迎使用！</h1>
           <!-- 展示加载中 -->
           <h1  v-show="info.isLoading">加载中。。。。</h1>
            <!-- 展示错误信息 -->
            <h1 v-show="info.errMsg">{{info.errMsg}}</h1>
    </div>
</template>

<script>
export default {
name:'List',
data() {
  return {
    info:{isFirst:true,
    isLoading:false,
    errMsg:'',
    users:[]
    }
  }
},
methods: {
 
},
mounted() {
  this.$bus.$on('updatUsers',( dataObj)=>{
  console.log('我收到了请求');
   this.info={...this.info,...dataObj};
  // this.users=users.items;
  // this.isFirst=isFirst;
  // this.isLoading=isLoading;
  // this.errMsg=errMsg
  })
},
}
</script>

<style scoped>
.album {
  min-height: 50rem; /* Can be removed; just added for demo purposes */
  padding-top: 3rem;
  padding-bottom: 3rem;
  background-color: #f7f7f7;
}

.card {
  float: left;
  width: 33.333%;
  padding: 0.75rem;
  margin-bottom: 2rem;
  border: 1px solid #efefef;
  text-align: center;
}

.card > img {
  margin-bottom: 0.75rem;
  border-radius: 100px;
}

.card-text {
  font-size: 85%;
}
</style>
<template>
<div>
<!-- 头部
fixed固定定位
 -->
 <div>
   <van-nav-bar fixed>
     <!-- 第一个插槽 -->
     <template v-slot:left>
       <div>
         <img src="@/assets/logo.png" alt="" class="logo">
       </div>
     </template>
     <template #right>
       <!-- 无法替换行内rem,搜索按钮 -->
       <van-icon name="search" size="0.48rem" color='#fff' @click="moveSearchPageFn"/>
     </template>
  </van-nav-bar>
 </div>
 <!-- tab导航栏
 1.van-tabs一行容器
 2.vant-tab每个tab栏
 3.缺点：直接在父组件去渲染的每次都会去请求数据，导致每次切换时都会重新渲染数据
 4.解决：外面用的是同一组数据(多组数据使用同一的数组，应该让数组在子组件的内部，外面负责传入id)
 -->
 <div class="tab" >
   <van-tabs v-model="channelId" animated sticky  offset-top="1.2266667rem" @click="changeChangeFn" >
  <van-tab
   v-for="item in Userchannels"
   :key="item.id"
   :title="item.name"
   :name="item.id"
   >
    <ArticleList :channelId="channelId"></ArticleList>
  </van-tab>
  </van-tabs>
  <!-- 编辑频道的图标 -->
  <van-icon name="plus" size="0.37333334rem" class="moreChannels" @click="show=true"/>
  <!-- 频道管理弹出层 -->
  <van-popup v-model="show"  position="right" :style="{ width: '100%', height:'100%' }"  >
 <ChannelEdit
 :Userchannels="Userchannels"
 :unCheckChannelList="unCheckChannelList"
 @addChannlEV="addChannlFn"
 @removeChannelEV="removeChannelFn"
 @closeEV="closeFn"
 ref="editRef"
 v-model="channelId"
  ></ChannelEdit>
  </van-popup>
 </div>
</div>
</template>

<script>
import ArticleList from './components/ArticleList.vue'
import { getUserChannelsAPI, getAllChannelsAPI, updateChannelsAPI, removeChannelAPI } from '@/api'
import ChannelEdit from './ChannelEdit.vue'

export default {
  name: 'Home',
  components: {
    ArticleList,
    ChannelEdit
  },
  data () {
    return {
      channelId: 0,
      Userchannels: [], // 用户已选频道
      AllChannels: [], // 所有频道列表
      articleList: [], // 文章列表
      show: false, // 控制编辑层的显示
      // 组件缓存，data中的变量不会被释放
      channelScrollTobj: {}// 保存每个频道的id和其滚动的距离

    }
  },
  methods: {
    // 更新添加频道方法
    async addChannlFn (Channleobj) {
      this.Userchannels.push(Channleobj)
      await updateChannelsAPI({ channels: this.Userchannels })
    },
    // 移除频道的方法
    async removeChannelFn (ChannelsId) {
      this.Userchannels.some((item, index) => {
        if (item.id === ChannelsId) {
          this.Userchannels.splice(index, 1)
        }
      })
      // await updateChannelsAPI({ channels: this.Userchannels })
      await removeChannelAPI(ChannelsId)
    },
    // 关闭编辑层
    closeFn (flag) {
      this.show = flag
      this.$refs.editRef.show = false
    },
    // 搜索页面跳转按键
    moveSearchPageFn () {
      this.$router.push('/search')
    },
    // 缓存页面滚动的方法
    scrollFn () {
 this.$route.meta.scrollT = document.documentElement.scrollTop || document.body.scrollTop// 保存首页滚动位置
//  保存当前频道的滚动距离
 this.channelScrollTobj[this.channelId] = document.documentElement.scrollTop || document.body.scrollTop
    },
  // tab发送切换时触发调整滚动条位置
    changeChangeFn () {
      // 在tab切换时组件内部会把切走容器的高度设置为0，滚动条没有高度所以回到了顶部
      // 切换来一瞬间高度为0设置滚动位置没有效果，所以要延迟执行

      this.$nextTick(() => {
 document.documentElement.scrollTop = this.channelScrollTobj[this.channelId]
   // 兼容问题
 document.body.scrollTop = this.channelScrollTobj[this.channelId]
      })
    }
  /* 这里有缺点
    async channelChangeFN () {
      const res = await getAllarticleListAPI({
        channel_id: this.channelId,
        timestamp: (new Date()).getTime()
      })
      this.articleList = res.data.data.results
    } */
  },
  async created () {
    // 获取频道列表
    const res = await getUserChannelsAPI()
    this.Userchannels = res.data.data.channels
    // 获取文章列表
    // this.channelChangeFN()
    const res2 = await getAllChannelsAPI()
    // console.log(res2)
    this.AllChannels = res2.data.data.channels
  },
  // 激活生命钩子
  activated () {
    // window和document是监听网页滚动的事件
    // html标签获取scrollTop滚动的距离，和设置滚动的位置
    window.addEventListener('scroll', this.scrollFn)
    // 激活设置滚动条的位置
  document.documentElement.scrollTop = this.$route.meta.scrollT
  // 兼容问题
   document.body.scrollTop = this.channelScrollTobj[this.channelId]
  },
  deactivated () {
   window.removeEventListener('scroll', this.scrollFn) // 清除全局事件
  },
  computed: {
    unCheckChannelList () {
      return this.AllChannels.filter((item) => {
        if (this.Userchannels.findIndex(index => index.id === item.id) > -1) {
          return false
        } else {
          return true
        }
      })
    }
  }
}
</script>

<style  scoped lang="less">
.logo{
  width: 100px;
  height: 30px;
}
.tab{
  padding-top:40px;
}
// 设置 tabs 容器的样式
/deep/ .van-tabs__wrap {
  padding-right: 30px;
  background-color: #fff;
}

// 设置小图标的样式
.moreChannels {
  position: fixed;
  top: 62px;
  right: 8px;
  z-index: 999;
}
</style>

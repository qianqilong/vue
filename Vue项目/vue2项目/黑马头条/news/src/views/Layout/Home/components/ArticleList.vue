<template>
  <div>
    <!-- 每项文章列表 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
<van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
  offset="50"
>
 <Articleitem 
 v-for="item in list" 
 :key="item.art_id" 
 :artObj="item" 
 @disLikeEV="disLikeFn" 
 @reportsEV='reportsFn' 
 :isShow="true"
 	@click.native="itemClickFn(item.art_id)"
 ></Articleitem>
</van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import Articleitem from '@/components/Articleitem.vue'
import { getAllarticleListAPI, deislikeArticleAPI, reportsArticelAPI } from '@/api'
import Dialog from '@/utils/Dialog.js'
export default {
  name: 'ArticleList',
  components: { Articleitem },
  props: {
    // list: Array, // 文章列表
    channelId: Number// 频道id
  },
  /**
   * 1.网页刚刚打开created里请求和onload里请求同时发送，请求的是最新的数据
   * 2.onload中两个相同时间的数据合并造成数据重复报错
   * 3.vant-list组件第一次没有高度就触底了，导致onload上来就触发
   */
  data () {
    return {
      list: [], // 文章数组
      loading: false, // 是否在加载中
      finished: false, // 是否加载完成
      thisTime: (new Date()).getTime(),
      isLoading: false// 顶部的加载状态
    }
  },
  methods: {
    async getArticleListFn () {
      const res = await getAllarticleListAPI({
        channel_id: this.channelId,
        timestamp: this.thisTime
      })
      this.list = [...res.data.data.results, ...this.list]
      // 保存下一个时间戳
      this.thisTime = res.data.data.pre_timestamp
      this.loading = false// 关闭加载状态
      if (res.data.data.pre_timestamp === null) {
        this.finished = true// 是否刷新完成
      }
      // 顶部加载状态
      this.isLoading = false
    },
    // 底部加载
    onLoad () {
      this.getArticleListFn()
    },
    // 上面加载
    onRefresh () {
    // 清空list数组，重新填写数组
      this.list = []
      this.thisTime = new Date().getTime()
      this.getArticleListFn()
    },
    // 反馈不感兴趣
    async disLikeFn ({ target }) {
      // try只能捕获同步流程的错误,内部错误不打印
      try {
        await deislikeArticleAPI({ target })// 等待这句话的结果，让try可以捕获
        Dialog.alert({
          message: '反馈成功'
        })
      } catch (err) {

      }
    },
    // 举报文章
    async reportsFn ({ target, type, remark }) {
      try {
        await reportsArticelAPI({ target, type, remark })
        Dialog.alert({
          message: '举报成功'
        })
      } catch (err) {

      }
    },
    // 进入文章详情
    itemClickFn (id) {
		this.$router.push({
			path: '/detail',
	  	query: {
				id
			}
		})
		}
  }
  // 因为onload第一次触底会发生刷新所有created无需请求数据
  // async created () {
  //   const res = await getAllarticleListAPI({
  //     channel_id: this.channelId,
  //     timestamp: this.thisTime
  //   })
  //   this.list = res.data.data.results
  //   // 保存下一个时间戳
  //   this.thisTime = res.data.data.pre_timestamp
  // }
}
</script>

<style>

</style>

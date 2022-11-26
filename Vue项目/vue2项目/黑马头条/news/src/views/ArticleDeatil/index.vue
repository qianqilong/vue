<template>
  <div class="ArticleList">
     <!-- Header 区域 -->
    <van-nav-bar fixed title="文章详情" left-arrow @click-left="$router.back()" />
    <div v-if="JSON.stringify(ArticleObj) !== '{}'">
  
    <!-- 文章信息区域 -->
    <div class="article-container">
      <!-- 文章标题 -->
      <h1 class="art-title">{{ArticleObj.title}}</h1>

      <!-- 用户信息 -->
      <van-cell center :title="ArticleObj.aut_name" :label="formatDate">
        <template #icon>
          <img :src="ArticleObj.aut_photo" alt="" class="avatar">
        </template>
        <template #default>
          <div>
            <van-button type="info" size="mini" v-if="ArticleObj.is_followed" @click="followFn(true)">已关注</van-button>
            <van-button icon="plus" type="info" size="mini" plain v-else @click="followFn(false)">关注</van-button>
          </div>
        </template>
      </van-cell>

      <!-- 分割线 -->
      <van-divider></van-divider>

      <!-- 文章内容 -->
      <div class="art-content" v-html="ArticleObj.content"></div>

      <!-- 分割线 -->
      <van-divider>End</van-divider>

      <!-- 点赞 attitude: -1: 无态度，0-不喜欢，1-点赞 -->
      <div class="like-box">
        <van-button icon="good-job" type="danger" size="small" v-if="ArticleObj.attitude===1" @click="loveFn(true)">已点赞</van-button>
        <van-button icon="good-job-o" type="danger" plain size="small" v-else @click="loveFn(false)">点赞</van-button>
      </div>
    </div>
    <!-- 文章评论部分 -->
    <CommentenList></CommentenList>
    </div>
    <!-- 等待加载 -->
    <van-loading type="spinner" color="#1989fa" v-else>加载中...</van-loading>
  </div>
</template>

<script>
import { detailArticeAPI, focusOnUsersAPI, blurOnUsersAPI, praiseArticleAPI, unpraiseArticleAPI } from '@/api'
import CommentenList from './CommentList.vue'
import { timeAgo } from '@/utils/date.js'
export default {
name: 'ArticleDeatil',
 components: { CommentenList },
data () {
  return {
    ArticleObj: {} // 保存了文章对象
  }
},
methods: {
  // 关注的操作
 async followFn (flag) {
    if (flag === true) {
    // 点击true,取关，显示关注
     this.ArticleObj.is_followed = false
     // 调用取关接口
      await blurOnUsersAPI({ id: this.ArticleObj.aut_id })
    } else {
      // 是 false ,关注，显示已关注
       this.ArticleObj.is_followed = true
      //  调用关注接口
      await focusOnUsersAPI({ id: this.ArticleObj.aut_id })
    }
  },
  // 点赞取消
 async loveFn (flag) {
    if (flag === true) {
      // 取消点赞,显示点赞
       this.ArticleObj.attitude = 0 // -1: 无态度，0-不喜欢，1-点赞 
       // 调用取消点赞接口
        await unpraiseArticleAPI({ id: this.ArticleObj.art_id })
    } else {
        this.ArticleObj.attitude = 1
        // 调用点赞接口
    await praiseArticleAPI({ id: this.ArticleObj.art_id })
    }
  }
},
// 请求了文章的数据
async created () {
  const res = await detailArticeAPI(
    {
      id: this.$route.query.id
    }
  )
  // console.log(res)
this.ArticleObj = res.data.data
},

computed: {
  // 时间的计算属性
  formatDate () {
    return timeAgo(this.ArticleObj.pubdate)
  }
}

}
</script>

<style scoped lang="less">

.article-container {
  padding: 10px;
  margin-top: 46px;
}
.art-title {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
}

.art-content {
  font-size: 12px;
  line-height: 24px;
  width: 100%;
  overflow-x: scroll;
  word-break: break-all;
    /deep/ img{
    	width: 100%;
  	}
    /deep/ pre {
        white-space: pre-wrap;
        word-wrap: break-word;
    }
}

.van-cell {
  padding: 5px 0;
  &::after {
    display: none;
  }
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f8f8f8;
  margin-right: 5px;
  border: none;
}

.like-box {
  display: flex;
  justify-content: center;
}
.van-loading{
  text-align: center;
  padding-top:46px;
}
</style>

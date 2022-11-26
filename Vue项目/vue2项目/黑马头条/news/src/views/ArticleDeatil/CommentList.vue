<template>
	<div>
		<!-- 评论列表 -->
		<div
			class="cmt-list"
     :class="{'art-cmt-container-1':iSshowComment,'art-cmt-container-2':!iSshowComment}"
     
		>
    <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多评论了"
  @load="onLoad"
  :immediate-check="false"
>
			<!-- 评论的 Item 项 -->
			<div class="cmt-item" 	v-for="(item,index) in commentListArr"
			:key="item.com_id">
				<!-- 头部区域 -->
				<div class="cmt-header">
					<!-- 头部左侧 -->
					<div class="cmt-header-left">
						<img
							:src="item.aut_photo"
							alt=""
							class="avatar"
						>
						<span class="uname">{{item.aut_name}}</span>
					</div>
					<!-- 头部右侧 -->
					<div class="cmt-header-right">
						<van-icon
							name="like"
							size="16"
							color="red"
							v-if="item.is_liking===true"
							@click="likeFn(index,true,item.com_id)"
						/>
						<van-icon
							name="like-o"
							size="16"
							color="gray"
							v-else
							@click="likeFn(index,false,item.com_id)"
						/>
					</div>
				</div>
				<!-- 主体区域 -->
				<div class="cmt-body">
					{{item.content}}
				</div>
				<!-- 尾部区域 -->
				<div class="cmt-footer">{{DateFn(item.pubdate)}}</div>
			</div>
      </van-list>
		</div>
		<!-- 发布评论 -->
    <div>
		<!-- 底部添加评论区域 - 1 -->
		<div class="add-cmt-box van-hairline--top" v-if="iSshowComment">
			<van-icon
				name="arrow-left"
				size="0.48rem"
				@click="$router.back()"
			/>
			<div class="ipt-cmt-div" @click="isShowCmtInput">发表评论</div>
			<div class="icon-box">
				<van-badge   :content="totalCount===0 ? '' :totalCount" max="99">
					<van-icon
						name="comment-o"
						size="0.53333334rem"
            @click="scrollToCmtList"
					/>
				</van-badge>
				<van-icon
					name="star-o"
					size="0.53333334rem"
				/>
				<van-icon
					name="share-o"
					size="0.53333334rem"
          @click="showShare = true"
				/>
			</div>
		</div>

		<!-- 底部添加评论区域 - 2 -->
		<div class="cmt-box van-hairline--top" v-else  >
			<textarea placeholder="友善评论、理性发言、阳光心灵"  
      v-fofo
      @blur="blurFn"
      v-model.trim="comText"
      ></textarea>
			<van-button
				type="default"
				:disabled="comText.length===0"
        @click="sendFn()"
			>发布</van-button>
		</div>
    </div>
    <!-- 分享文章 -->
    <van-share-sheet
  v-model="showShare"
  title="立即分享给好友"
  :options="options"
  @select="onSelect"
/>
	</div>
</template>

<script>
import { commentsListAPI, commentLikeAPI, uncommentLikeAPI, publishACommentAPI } from '@/api'
import { timeAgo } from '@/utils/date.js'
export default {
	name: 'CommentList',
	data () {
		return {
			offset: null, // 评论偏移量的id
			commentListArr: [], // 评论列表
      totalCount: 0, // 评论列表
      iSshowComment: true,
      comText: '', // 评论的内容
      loading: false,
      finished: false,
      lastId: null, // 下一页的ID
       showShare: false,
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' }
      ]
		}
	},
  // 初次请求
	async created () {
		const res = await commentsListAPI({
			id: this.$route.query.id
		})
		this.commentListArr = res.data.data.results
    this.totalCount = res.data.data.total_count
    this.lastId = res.data.data.last_id
    // 如果网页打开没有评论
    	if (this.commentListArr.length === 0) this.finished = true
	},
	methods: {
		// 对评论进行点赞
		async likeFn (index, flag, id) {
			if (flag === true) {
				// 1. 让点赞图标隐藏
				this.commentListArr[index].is_liking = false
				// 注意：在对象中添加新的属性会导致vue无法直接检测到，但是修改对象的值可以检测，但是修改数组中某个元素无法被检测到
				//  2. 调用取消点赞接口
				await uncommentLikeAPI({ id })
			} else {
				// 1. 让点赞图标显示
				this.commentListArr[index].is_liking = true
				//  2. 调用点赞接口
				await commentLikeAPI({ id })
			}
		},
    // 对评论取消点赞
		DateFn (pubdate) {
			return timeAgo(pubdate)
		},
    // 显示评论输入框
    isShowCmtInput () {
   this.iSshowComment = false
    },
    // 失去焦点就会隐藏输入框
    blurFn () {
      // 要延迟执行，因为直接执行会影响发布按键
      setTimeout(() => {
 this.iSshowComment = true
      })
    },
    // 评论按键滑动
    scrollToCmtList () {
        // const now = window.scrollY // 已(卷起)的Y值(每次都变)
      // const dist = document.querySelector('.article-container').offsetHeight // 文章高度-就是你要滚动的距离(每次固定)
      // const step = (dist - now) / 10 // 剩余要走的值/10 (10可以随便写, 但是10左右效果最好的) - 剩余要走的这次步长
      // // 第一次now: 0, dist: 1000, step: 100
      // // 第二次now: 100, dist:1000, step: 90
      // // 第三次now: 190, dist:1000, step: 81
      // // .......  step: 0.6 一直不动了
      // setTimeout(() => {
      //   if (step < 1) { // 判断是否滚动结束
      //     window.scrollTo(0, dist) // 动画停止了, 把文章高度设置为卷入值(精度对准)
      //     return
      //   }
      //   window.scrollTo(0, now + step) // 在上一次滚动的距离+本次要滚的
      //   this.scrollToCmtList() // 递归->为了下次再滚动一次
      // }, 10)
        // 真实DOM都在document(所以不再一个vue文件内), 也是可以获取的

        // 让原生标签滚动到最上方
    document.querySelector('.like-box').scrollIntoView({
        behavior: 'smooth'
    })
    },
    // 发布评论
   async sendFn () {
      // 1.调用接口
 const res = await publishACommentAPI({
      target: this.$route.query.id,
    content: this.comText
    })
      // 清空comText
      this.comText = ''
      this.totalCount++
      this.commentListArr.unshift(res.data.data.new_obj)
      this.scrollToCmtList()// 滚动到第一条评论
    },
    // 下拉刷新
   async onLoad () {
    if (this.commentListArr.length > 0) {
        // 请求下一页数据
      	const res = await commentsListAPI({
			id: this.$route.query.id,
      offset: this.lastId
		})
  this.commentListArr = [...this.commentListArr, ...res.data.data.results]
    this.totalCount = res.data.data.total_count
    this.lastId = res.data.data.last_id
    this.loading = false
    if (res.data.data.last_id === null) this.finished = true
    } else {
      this.loading = false
      } 
      },
      // 分享的后续操作
      onSelect (option) {
        // 思路对应平台开发者平台申请权限
      console.log(option.name)
      this.showShare = false
    }
	}
    }

</script>

<style scoped lang="less">
.cmt-list {
	padding: 10px;
	.cmt-item {
		padding: 15px 0;
		+ .cmt-item {
			border-top: 1px solid #f8f8f8;
		}
		.cmt-header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			.cmt-header-left {
				display: flex;
				align-items: center;
				.avatar {
					width: 40px;
					height: 40px;
					background-color: #f8f8f8;
					border-radius: 50%;
					margin-right: 15px;
				}
				.uname {
					font-size: 12px;
				}
			}
		}
		.cmt-body {
			font-size: 14px;
			line-height: 28px;
			text-indent: 2em;
			margin-top: 6px;
			word-break: break-all;
		}
		.cmt-footer {
			font-size: 12px;
			color: gray;
			margin-top: 10px;
		}
	}
}
/*美化 - 文章详情 - 底部的评论页面 */
// 外层容器
.art-cmt-container-1 {
  padding-bottom: 46px;
}
.art-cmt-container-2 {
  padding-bottom: 80px;
}

// 发布评论的盒子 - 1
.add-cmt-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46px;
  line-height: 46px;
  padding-left: 10px;
  .ipt-cmt-div {
    flex: 1;
    border: 1px solid #efefef;
    border-radius: 15px;
    height: 30px;
    font-size: 12px;
    line-height: 30px;
    padding-left: 15px;
    margin-left: 10px;
    background-color: #f8f8f8;
  }
  .icon-box {
    width: 40%;
    display: flex;
    justify-content: space-evenly;
    line-height: 0;
  }
}

.child {
  width: 20px;
  height: 20px;
  background: #f2f3f5;
}

// 发布评论的盒子 - 2
.cmt-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  padding-left: 10px;
  box-sizing: border-box;
  background-color: white;
  textarea {
    flex: 1;
    height: 66%;
    border: 1px solid #efefef;
    background-color: #f8f8f8;
    resize: none;
    border-radius: 6px;
    padding: 5px;
  }
  .van-button {
    height: 100%;
    border: none;
  }
}
</style>

<template>
  <div class="goods-comment">
    <div class="head">
      <div class="data">
        <p>
          <span>{{ commentList.salesCount }}</span
          ><span>人购买</span>
        </p>
        <p>
          <span>{{ commentList.praisePercent }}</span
          ><span>好评率</span>
        </p>
      </div>
      <div class="tags">
        <div class="dt">大家都在说：</div>
        <div class="dd">
          <a
            @click="changeTag(i)"
            v-for="(item, i) in commentList.tags"
            :key="i"
            :class="{ active: currTagIndex === i }"
            >{{ item.title }}（{{ item.tagCount }}）</a
          >
        </div>
      </div>
    </div>
    <div class="sort">
      <span>排序：</span>
      <a @click="changeSort('null')" :class="{ active: reqParams.sortField === 'null' }">默认</a>
      <a @click="changeSort('praiseCount')" :class="{ active: reqParams.sortField === 'praiseCount' }">最热</a>
      <a @click="changeSort('createTime')" :class="{ active: reqParams.sortField === 'createTime' }">最新</a>
    </div>
    <!-- 列表 -->
    <div class="list" v-if="commentInfoList.length !== 0">
      <div class="item" v-for="item in commentInfoList" :key="item.id">
        <div class="user">
          <img :src="item.member.avatar" alt="" />
          <span>{{ item.member.nickname }}</span>
        </div>
        <div class="body">
          <div class="score">
            <i v-for="i in item.score" :key="i + '1'" class="iconfont icon-wjx01"></i>
            <i v-for="i in 5 - item.score" :key="i + '2'" class="iconfont icon-wjx02"></i>
            <span class="attr">{{ formatSpecs(item.orderInfo.specs) }}</span>
          </div>
          <div class="text">
            {{ item.content }}
          </div>
          <!-- 图片 -->
          <GoodsCommentImage v-if="item.pictures.length" :pictures="item.pictures" />
          <div class="time">
            <span>{{ item.createTime }}</span>
            <span class="zan"><i class="iconfont icon-dianzan"></i>{{ item.praiseCount }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <GlobalPagination
      :pageNo="reqParams.page"
      :pageSize="reqParams.pageSize"
      :dataTotal="counts"
      :showBtn="5"
      @changePage="changePage" />
  </div>
</template>
<script lang="ts" setup>
import { inject, reactive, ref, watch, type Ref } from 'vue'
import type { commentListItem, commentResult } from '@/api/types'
import { useRoute } from 'vue-router'
import { getCommentListByGoodsAPI } from '@/api'
import GoodsCommentImage from './goods-comment-image.vue'
// 评论tab列表
const commentList: Ref<commentResult> = inject('commentList') as Ref<commentResult>
// 切换筛选tab
const currTagIndex = ref(0)
// 数据总条数
const counts = ref()
const route = useRoute()
// 筛选条件准备
const reqParams = reactive({
  page: 1,
  pageSize: 10,
  hasPicture: false,
  tag: '',
  sortField: 'null',
})

// 改变排序
const changeSort = (keyword: string) => {
  reqParams.sortField = keyword
}
// 改变tag
const changeTag = (i: number) => {
  currTagIndex.value = i
  const currTag = commentList.value.tags[i]
  if (currTag.type === 'img') {
    reqParams.hasPicture = true
  } else {
    reqParams.tag = currTag.title
  }
}
// 评论信息列表
const commentInfoList: Ref<Array<commentListItem>> = ref([])
// 监听筛选条件的变化
watch(
  () => reqParams,
  async () => {
    counts.value = (await getCommentListByGoodsAPI(route.params.id as string, reqParams)).result.counts
    commentInfoList.value = (await getCommentListByGoodsAPI(route.params.id as string, reqParams)).result.items
  },
  { immediate: true, deep: true },
)
// 对数据处理
const formatSpecs = (spec: Array<any>) => {
  return spec.reduce((pre, item) => `${pre}  ${item.name}:${item.nameValue}`, '')
}
// 改变页码
const changePage = (newPage: number) => {
  reqParams.page = newPage
}
</script>
<style scoped lang="less">
.goods-comment {
  .head {
    display: flex;
    padding: 30px 0;
    .data {
      width: 340px;
      display: flex;
      padding: 20px;
      p {
        flex: 1;
        text-align: center;
        span {
          display: block;
          &:first-child {
            font-size: 32px;
            color: @priceColor;
          }
          &:last-child {
            color: #999;
          }
        }
      }
    }
    .tags {
      flex: 1;
      display: flex;
      border-left: 1px solid #f5f5f5;
      .dt {
        font-weight: bold;
        width: 100px;
        text-align: right;
        line-height: 42px;
      }
      .dd {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        > a {
          width: 132px;
          height: 42px;
          margin-left: 20px;
          margin-bottom: 20px;
          border-radius: 4px;
          border: 1px solid #e4e4e4;
          background: #f5f5f5;
          color: #999;
          text-align: center;
          line-height: 40px;
          &:hover {
            border-color: @xtxColor;
            background: lighten(@xtxColor, 50%);
            color: @xtxColor;
          }
          &.active {
            border-color: @xtxColor;
            background: @xtxColor;
            color: #fff;
          }
        }
      }
    }
  }
  .sort {
    height: 60px;
    line-height: 60px;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    margin: 0 20px;
    color: #666;
    > span {
      margin-left: 20px;
    }
    > a {
      margin-left: 30px;
      &.active,
      &:hover {
        color: @xtxColor;
      }
    }
  }
  .list {
    padding: 0 20px;
    .item {
      display: flex;
      padding: 25px 10px;
      border-bottom: 1px solid #f5f5f5;
      .user {
        width: 160px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
        }
        span {
          padding-left: 10px;
          color: #666;
        }
      }
      .body {
        flex: 1;
        .score {
          line-height: 40px;
          .iconfont {
            color: #ff9240;
            padding-right: 3px;
          }
          .attr {
            padding-left: 10px;
            color: #666;
          }
        }
      }
      .text {
        color: #666;
        line-height: 24px;
      }
      .time {
        color: #999;
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
      }
    }
  }
}
</style>

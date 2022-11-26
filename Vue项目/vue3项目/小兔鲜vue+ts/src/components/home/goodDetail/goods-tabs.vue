<template>
  <div class="goods-tabs">
    <nav>
      <a :class="{ active: activeComponent === markRaw(GoodsDetail) }" @click="activeComponent = markRaw(GoodsDetail)"
        >商品详情</a
      >
      <a :class="{ active: activeComponent === markRaw(GoodsComment) }" @click="activeComponent = markRaw(GoodsComment)"
        >商品评价<span>{{ commentList.salesCount + '+' }}</span></a
      >
    </nav>

    <!-- 切换内容的地方 -->
    <Suspense>
      <template #default>
        <component :is="activeComponent" />
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import { provide, markRaw, type Ref, ref } from 'vue'
import GoodsDetail from './components/goods-detail.vue'
import GoodsComment from './components/goods-comment.vue'
import { getCommentInfoByGoodsAPI } from '@/api'
import type { commentResult } from '@/api/types'
import { useRoute } from 'vue-router'
// 默认清空下是详情
const activeComponent = ref(markRaw(GoodsDetail))

const route = useRoute()

const getComment = async () => {
  const data = (await getCommentInfoByGoodsAPI(route.params.id as string)) as any
  data.tags.unshift({
    type: 'all',
    title: '全部评价',
    tagCount: data.evaluateCount,
  })
  data.tags.unshift({
    type: 'img',
    title: '有图',
    tagCount: data.hasPictureCount,
  })
  return data
}

const commentList: Ref<commentResult> = ref(await getComment())

provide('commentList', commentList)
</script>

<style scoped lang="less">
.goods-tabs {
  min-height: 600px;
  background: #fff;
  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;
      > span {
        color: @priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
      &:first-child {
        border-right: 1px solid #f5f5f5;
      }
      &.active {
        &::before {
          content: '';
          position: absolute;
          left: 40px;
          bottom: -1px;
          width: 72px;
          height: 2px;
          background: @xtxColor;
        }
      }
    }
  }
}
</style>

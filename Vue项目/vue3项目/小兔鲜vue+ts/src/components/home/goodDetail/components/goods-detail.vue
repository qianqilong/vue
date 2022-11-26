<template>
  <div class="goods-detail" v-if="JSON.stringify(goodDetailList) !== '{}'">
    <ul class="attrs">
      <li v-for="item in goodDetailList.details.properties" :key="item.value">
        <span class="dt">{{ item.name }}</span>
        <span class="dd">{{ item.value }}</span>
      </li>
    </ul>

    <img v-for="item in goodDetailList.details.pictures" :key="item" :src="item" alt="" />
  </div>
</template>

<script setup lang="ts">
import type { goodDetailResult } from '@/api/types'
import { inject, type Ref } from 'vue'

const goodDetailList: Ref<goodDetailResult> = inject('goodDetailList') as Ref<goodDetailResult>
</script>

<style scoped lang="less">
.goods-detail {
  padding: 40px;
  .attrs {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;
    li {
      display: flex;
      margin-bottom: 10px;
      width: 50%;
      .dt {
        width: 100px;
        color: #999;
      }
      .dd {
        flex: 1;
        color: #666;
      }
    }
  }
  > img {
    width: 100%;
  }
}
</style>

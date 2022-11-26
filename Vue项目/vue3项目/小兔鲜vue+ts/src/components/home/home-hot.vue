<template>
  <div ref="box">
    <HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
      <ul ref="pannel" class="goods-list">
        <li v-for="item in HotList" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="" />
            <p class="name">{{ item.title }}</p>
            <p class="desc">{{ item.alt }}</p>
          </RouterLink>
        </li>
      </ul>
    </HomePanel>
  </div>
</template>

<script lang="ts" setup>
import HomePanel from './components/home-panel.vue'
import { getHotAPI } from '@/api'
import { ref } from 'vue'
import { useLazyData } from '@/hooks'
import type { HotResult } from '@/api/types'

const box = ref(null)
const HotList = useLazyData<Array<HotResult>>(box, getHotAPI).List
</script>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>

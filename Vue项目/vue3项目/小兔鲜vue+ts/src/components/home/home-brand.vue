<template>
  <div ref="box">
    <HomePanel title="热门品牌" sub-title="国际经典 品质保证">
      <template v-slot:right>
        <a class="iconfont icon-angle-left prev" @click="index = 0" :class="{ disabled: index === 0 }"></a>
        <a class="iconfont icon-angle-right next" @click="index = 1" :class="{ disabled: index === 1 }"></a>
      </template>
      <div class="box" ref="box">
        <ul class="list" :style="{ transform: `translateX(${-index * 1240}px)` }">
          <li v-for="item in BrandList" :key="item.id">
            <RouterLink to="/">
              <img :src="item.picture" alt="" />
            </RouterLink>
          </li>
        </ul>
      </div>
    </HomePanel>
  </div>
</template>

<script lang="ts" setup>
import HomePanel from './components/home-panel.vue'
import { getBrandAPI } from '@/api'
import { ref } from 'vue'
import { useLazyData } from '@/hooks'
import type { BrandResult } from '@/api/types'

const box = ref(null)

// 获取懒加载数据
const BrandList = useLazyData<Array<BrandResult>>(box, () => getBrandAPI('10')).List

// 改变页数
const index = ref(0)
</script>

<style scoped lang="less">
.home-panel {
  background: #f5f5f5;
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @xtxColor;
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px;
  }
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;

  .list {
    width: 200%;
    display: flex;
    transition: all 1s;
    li {
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}
</style>

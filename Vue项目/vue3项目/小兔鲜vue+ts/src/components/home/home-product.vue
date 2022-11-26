<template>
  <div class="home-product" ref="box">
    <HomePanel :title="item.name" v-for="item in Goodslist" :key="item.id">
      <template v-slot:right>
        <div class="sub">
          <RouterLink to="/" v-for="sub in item.children" :key="sub.id">{{ sub.name }}</RouterLink>
        </div>
        <Globalmove />
      </template>
      <div class="box">
        <RouterLink class="cover" to="/">
          <img :src="item.picture" alt="" />
          <strong class="label">
            <span>{{ item.name }}馆</span>
            <span>{{ item.saleInfo }}</span>
          </strong>
        </RouterLink>
        <ul class="goods-list">
          <li v-for="sub in item.goods" :key="sub.id">
            <HomeGoods :goods="sub" />
          </li>
        </ul>
      </div>
    </HomePanel>
  </div>
</template>

<script lang="ts" setup>
import HomePanel from './components/home-panel.vue'
import HomeGoods from './components/home-goods.vue'
import { getGoodsAPI } from '@/api'
import { useLazyData } from '@/hooks'
import { ref } from 'vue'
import type { GoodsResult } from '@/api/types'

const box = ref(null)

const Goodslist = useLazyData<Array<GoodsResult>>(box, getGoodsAPI).List
console.log()
</script>

<style scoped lang="less">
.home-product {
  background: #fff;
  height: 2900px;
  .sub {
    margin-bottom: 2px;
    a {
      padding: 2px 12px;
      font-size: 16px;
      border-radius: 4px;
      &:hover {
        background: @xtxColor;
        color: #fff;
      }
      &:last-child {
        margin-right: 80px;
      }
    }
  }
  .box {
    display: flex;
    .cover {
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .label {
        width: 188px;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0);
        span {
          text-align: center;
          &:first-child {
            width: 76px;
            background: rgba(0, 0, 0, 0.9);
          }
          &:last-child {
            flex: 1;
            background: rgba(0, 0, 0, 0.7);
          }
        }
      }
    }
    .goods-list {
      width: 990px;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;
        &:nth-last-child(-n + 4) {
          margin-bottom: 0;
        }
        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>

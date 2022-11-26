<template>
  <div class="sub-sort">
    <div class="sort">
      <a :class="{ active: sort.sortField === '' }" @click="changeSort('')">默认排序</a>
      <a :class="{ active: sort.sortField === 'publishTime' }" @click="changeSort('publishTime')">最新商品</a>
      <a :class="{ active: sort.sortField === 'orderNum' }" @click="changeSort('orderNum')">最高人气</a>
      <a :class="{ active: sort.sortField === 'evaluateNum' }" @click="changeSort('evaluateNum')">评论最多</a>
      <a @click="changeSort('price')">
        价格排序
        <i :class="{ active: sort.sortField === 'price' && sort.sortMethod === 'asc' }" class="arrow up" />
        <i :class="{ active: sort.sortField === 'price' && sort.sortMethod === 'desc' }" class="arrow down" />
      </a>
    </div>
    <div class="check">
      <categoryCheckedVue v-model="sort.InStockFlag">仅显示有货商品</categoryCheckedVue>
      <categoryCheckedVue v-model="sort.ExGratiaFlag">仅显示特惠商品</categoryCheckedVue>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
import categoryCheckedVue from './category-checked.vue'

// 定义义数件
const emit = defineEmits<{
  (
    e: 'sort',
    sort: {
      sortField: string
      InStockFlag: boolean
      ExGratiaFlag: boolean
      sortMethod: string
    },
  ): void
}>()
const sort = reactive({
  sortField: '', // 排序规则
  InStockFlag: false, // 有货
  ExGratiaFlag: false, // 特惠
  sortMethod: 'asc',
})

// 改变排序的方法
const changeSort = (sortVal: string) => {
  if (sortVal === 'price') {
    sort.sortMethod = sort.sortMethod === 'desc' ? 'asc' : 'desc'
  }
  sort.sortField = sortVal
  emit('sort', sort)
}
</script>
<style scoped lang="less">
.sub-sort {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .sort {
    display: flex;
    a {
      height: 30px;
      line-height: 28px;
      border: 1px solid #e4e4e4;
      padding: 0 20px;
      margin-right: 20px;
      color: #999;
      border-radius: 2px;
      position: relative;
      transition: all 0.3s;
      &.active {
        background: @xtxColor;
        border-color: @xtxColor;
        color: #fff;
      }
      .arrow {
        position: absolute;
        border: 5px solid transparent;
        right: 8px;
        &.up {
          top: 3px;
          border-bottom-color: #bbb;
          &.active {
            border-bottom-color: @xtxColor;
          }
        }
        &.down {
          top: 15px;
          border-top-color: #bbb;
          &.active {
            border-top-color: @xtxColor;
          }
        }
      }
    }
  }
  .check {
    .xtx-checkbox {
      margin-left: 20px;
      color: #999;
    }
  }
}
</style>

<template>
  <div class="goods-comment-image">
    <div class="list">
      <a
        href="javascript:;"
        :class="{ active: currImage === item }"
        @click="currImage = item"
        v-for="(item, i) in pictures"
        :key="i">
        <img :src="item" alt="" />
      </a>
    </div>
    <div class="preview" v-if="currImage">
      <img :src="currImage" alt="" @click="currImage = ''" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
defineProps<{ pictures: string[] }>()
// 存放图片的url地址
const currImage = ref('')
</script>
<style scoped lang="less">
.goods-comment-image {
  .list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    a {
      width: 120px;
      height: 120px;
      border: 1px solid #e4e4e4;
      margin-right: 20px;
      margin-bottom: 10px;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      &.active {
        border-color: @xtxColor;
      }
    }
  }
}
</style>

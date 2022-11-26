<template>
  <!-- 筛选区 -->
  <div class="sub-filter" v-if="filterList">
    <transition-group
      leave-active-class="animate__animated animate__bounceOutRight"
      enter-active-class="animate__animated animate__bounceInLeft">
      <div class="item" :key="'sub'">
        <div class="head">品牌：</div>
        <div class="body">
          <a
            :class="{ active: filterList.selectedBrand === item.id }"
            v-for="item in filterList.brands"
            @click="filterList.selectedBrand = item.id"
            :key="item.id"
            >{{ item.name }}</a
          >
        </div>
      </div>

      <div class="item" v-for="item in filterList.saleProperties" :key="item.id">
        <div class="head">{{ item.name }}：</div>
        <div class="body">
          <a
            :class="{ active: item.selectedProp === sub.id }"
            v-for="sub in item.properties"
            :key="sub.id"
            @click="item.selectedProp = sub.id"
            >{{ sub.name }}</a
          >
        </div>
      </div>
    </transition-group>
  </div>
</template>
<script lang="ts" setup>
import { getSubCategoryFilter } from '@/api'
import type { filterResult } from '@/api/types'
import { type Ref, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import 'animate.css'

interface filterTyep extends filterResult {
  selectedBrand?: any
}
const route = useRoute()
const filterList = ref() as Ref<filterTyep>

watch(
  () => route.params.id,
  async () => {
    if (!route.path.includes('sub')) return
    filterList.value = (await getSubCategoryFilter(route.params.id)) as filterResult
    // 品牌
    filterList.value.selectedBrand = 'brand'
    filterList.value.brands.unshift({
      id: 'brand',
      name: '全部',
      nameEn: '',
      logo: '',
      picture: '',
      desc: '',
      place: '',
    })
    // 销售属性
    filterList.value.saleProperties.forEach((p) => {
      p.selectedProp = 'sale'
      p.properties.unshift({ id: 'sale', name: '全部' })
    })
  },
  {
    immediate: true,
  },
)
</script>
<style scoped lang="less">
// 筛选区
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;
        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>

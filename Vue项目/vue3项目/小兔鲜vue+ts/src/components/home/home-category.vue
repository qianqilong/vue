<template>
  <div class="home-category">
    <ul class="menu">
      <li
        v-for="item in cateList"
        :key="item.id"
        :class="{ active: categoryId === item.id }"
        @mouseenter="categoryId = item.id">
        <RouterLink to="/">{{ item.name }}</RouterLink>
        <template v-if="item.children">
          <RouterLink to="/" v-for="sub in item.children" :key="sub.id">{{ sub.name }}</RouterLink>
        </template>
        <div class="layer" v-if="currCategory && categoryId === item.id">
          <h4>{{ categoryId === 'brand' ? '品牌' : '分类' }}推荐 <small>根据您的购买或浏览记录推荐</small></h4>
          <ul>
            <li v-for="item in currCategory.goods" :key="item.id">
              <RouterLink to="/">
                <img :src="item.picture" alt="" />
                <div class="info">
                  <p class="name ellipsis-2">{{ item.name }}</p>
                  <p class="desc ellipsis">{{ item.desc }}</p>
                  <p class="price"><i>¥</i>{{ item.price }}</p>
                </div>
              </RouterLink>
            </li>
          </ul>
          <ul v-if="categoryId === 'brand'">
            <li class="brand" v-for="item in category.brandList" :key="item.id">
              <RouterLink to="/">
                <img :src="item.picture" alt="" />
                <div class="info">
                  <p class="place"><i class="iconfont icon-dingwei"></i>{{ item.place }}</p>
                  <p class="name ellipsis">{{ item.nameEn }}</p>
                  <p class="desc ellipsis-2">{{ item.name }}</p>
                </div>
              </RouterLink>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import useStore from '@/stores'
import type { BrandResult } from '@/api/types'

const { category } = useStore()

// 三级导航的数组
const cateList = computed(() => {
  const list = category.categoryList.map((item) => {
    return {
      id: item.id,
      name: item.name,
      children: item.children && item.children.slice(0, 2),
      goods: item.goods,
      brand: [] as Array<BrandResult>,
    }
  })
  list.push({
    id: 'brand',
    name: '品牌',
    children: [
      {
        id: 'brand-chilren',
        name: '品牌推荐',
        picture: '',
      },
    ],
    goods: [],
    brand: category.brandList,
  })
  return list
})

//记录鼠标经过的id
const categoryId = ref('')

// 当前鼠标经过的商品信息
const currCategory = computed(() => {
  if (categoryId.value === '') return
  return cateList.value.find((item) => item.id === categoryId.value)
})
</script>

<style scoped lang="less">
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.7);
  position: relative;
  z-index: 99;

  .menu {
    .layer {
      width: 990px;
      height: 500px;
      background: rgba(255, 255, 255, 0.8);
      position: absolute;
      left: 250px;
      top: 0;
      display: none;
      padding: 0 15px;
      li.brand {
        height: 180px;
        a {
          align-items: flex-start;
          img {
            width: 120px;
            height: 160px;
          }
          .info {
            p {
              margin-top: 8px;
            }
            .place {
              color: #999;
            }
          }
        }
      }
      h4 {
        font-size: 20px;
        font-weight: normal;
        line-height: 80px;
        small {
          font-size: 16px;
          color: #666;
        }
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          width: 310px;
          height: 120px;
          margin-right: 15px;
          margin-bottom: 15px;
          border: 1px solid #eee;
          border-radius: 4px;
          background: #fff;
          &:nth-child(3n) {
            margin-right: 0;
          }
          a {
            display: flex;
            width: 100%;
            height: 100%;
            align-items: center;
            padding: 10px;
            &:hover {
              background: #e3f9f4;
            }
            img {
              width: 95px;
              height: 95px;
            }
            .info {
              padding-left: 10px;
              line-height: 24px;
              width: 190px;
              .name {
                font-size: 16px;
                color: #666;
              }
              .desc {
                color: #999;
              }
              .price {
                font-size: 22px;
                color: @priceColor;
                i {
                  font-size: 16px;
                }
              }
            }
          }
        }
      }
    }
    &:hover {
      .layer {
        display: block;
      }
    }
    li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;
      &.active {
        background: @xtxColor;
      }
      a {
        margin-right: 8px;
        color: #fff;
        &:first-child {
          font-size: 16px;
        }
      }
    }
  }
}
</style>

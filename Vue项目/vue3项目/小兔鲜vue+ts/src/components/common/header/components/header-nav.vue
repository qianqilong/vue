<template>
  <!-- 头部组件品牌 -->
  <ul class="app-header-nav">
    <li class="home"><RouterLink to="/">首页</RouterLink></li>
    <li v-for="item in category.categoryList" :key="item.id" @mouseenter="show(item.id)" @mouseleave="hide(item.id)">
      <RouterLink :to="`/category/${item.id}`" @click="hide(item.id)"> {{ item.name }}</RouterLink>
      <div class="layer" :class="{ open: item.open }">
        <ul>
          <li v-for="sub in item.children" :key="sub.id">
            <RouterLink :to="`/category/sub/${sub.id}`" @click="hide(item.id)">
              <img :src="sub.picture" alt="" />
              <p>{{ sub.name }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import useStore from '@/stores'

// 读取仓库
const { category } = useStore()

// 控制二级显示
const show = (id: string) => {
  // console.log(id)
  category.categoryList.find((item) => id === item.id)?.open !== undefined
    ? (category.categoryList.find((item) => id === item.id)!.open = true)
    : ''
}

// 控制二级隐藏
const hide = (id: string) => {
  category.categoryList.find((item) => id === item.id)?.open !== undefined
    ? (category.categoryList.find((item) => id === item.id)!.open = false)
    : ''
}
</script>

<style scoped lang="less">
.app-header-nav {
  width: 820px;
  display: flex;
  justify-content: space-around;
  padding-left: 40px;
  position: relative;
  z-index: 998;
  > li {
    margin-right: 40px;
    width: 38px;
    text-align: center;
    > a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
    }
    &:hover {
      > a {
        color: @xtxColor;
        border-bottom: 1px solid @xtxColor;
      }
      // > .layer {
      //   height: 132px;
      //   opacity: 1;
      // }
    }
  }
}
.layer {
  width: 1240px;
  background-color: #fff;
  position: absolute;
  left: -200px;
  top: 56px;
  height: 0;
  overflow: hidden;
  opacity: 0;
  box-shadow: 0 0 5px #ccc;
  transition: all 0.2s 0.1s;
  &.open {
    height: 132px;
    opacity: 1;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 70px;
    align-items: center;
    height: 132px;
    li {
      width: 110px;
      text-align: center;
      img {
        width: 60px;
        height: 60px;
      }
      p {
        padding-top: 10px;
      }
      &:hover {
        p {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>

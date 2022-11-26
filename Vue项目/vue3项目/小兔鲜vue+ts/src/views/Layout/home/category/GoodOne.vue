<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <categoryBreadVue :categorygoods="categorygoods" v-if="categorygoods !== undefined" />
      <!--
index:第几个图片
length:图片数组的长度
autoPlay:是否开启自动播放
time:自动播放切换时间

@prevFn:点击上一个按键(传递一个参数改变index)
@nestFn:点击下一个按键(传递一个参数改变index)
@@pointFn:点击下面的点(传递一个参数改变index)

#bann:作用域插槽的名称
      -->
      <Globalcarousel
        style="height: 500px"
        :index="index"
        :length="category.bannerList.length"
        :autoPlay="true"
        :time="+2000"
        @prevFn="changeFn"
        @nestFn="changeFn"
        @pointFn="changeFn">
        <!-- 插槽中的图片 ,下面可以封装成一个单独的组件-->
        <li
          class="carousel-item"
          v-for="(item, i) in category.bannerList"
          :key="item.id"
          :class="{ fade: index === i }">
          <router-link :to="item.hrefUrl">
            <img v-lazyload="item.imgUrl" alt="" />
          </router-link>
        </li>
      </Globalcarousel>
      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="item in categorylist?.children" :key="item.id">
            <a href="javascript:;">
              <img :src="item.picture" />
              <p>{{ item.name }}</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 分类关联商品 -->
      <Suspense>
        <template #default>
          <CategoryOne></CategoryOne>
        </template>
        <template #fallback> 加载中。。。。。。 </template>
      </Suspense>
    </div>
  </div>
</template>
<script lang="ts" setup name="GoodsOne">
import useStore from '@/stores'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { defineAsyncComponent } from 'vue'
import categoryBreadVue from '@/components/home/category/category-bread.vue'

const CategoryOne = defineAsyncComponent(() => import('@/components/home/category/category-one.vue'))
// 第几张轮播图
const index = ref(0)
// pinia的实例
const { category } = useStore()
// 改变index
const changeFn = (i: number) => {
  index.value = i
}
// 获取路由上的信息对应仓库中的数据
const route = useRoute()

const categorylist = computed(() => {
  return category.categoryList.find((item) => item.id === route.params.id)
})

const categorygoods = computed(() => {
  if (categorylist.value) {
    return { id: categorylist.value.id, name: categorylist.value.name, sub: { id: '', name: '' } }
  }
  return { id: '', name: '', sub: { id: '', name: '' } }
})
</script>
<style scoped lang="less">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
}
</style>

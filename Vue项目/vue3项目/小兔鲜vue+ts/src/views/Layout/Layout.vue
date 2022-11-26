<template>
  <!-- <nav>顶部通栏</nav> -->
  <topVue />
  <headerVue />
  <headerStickyVue />
  <main>
    <!-- 二级路由 -->
    <router-view></router-view>
  </main>
  <footerVue />
</template>

<script setup lang="ts" name="Layout">
import topVue from '@/components/common/top.vue'
import headerVue from '@/components/common/header/header.vue'
import headerStickyVue from '@/components/common/header/header-sticky.vue'
import footerVue from '@/components/common/footer.vue'
import useStore from '@/stores'
import { onMounted } from 'vue'

const { category, cart } = useStore()

// 发送请求
onMounted(() => {
  category.getAllCategory()
  cart.getCartList()
})
</script>

<style scoped lang="less"></style>

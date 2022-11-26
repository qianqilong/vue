<template>
  <div class="container">
    <UserAside />
    <article class="article">
      <RouterView />
    </article>
  </div>
</template>
<script lang="ts" setup>
import UserAside from '@/components/user/user-aside.vue'
</script>
<style scoped lang="less">
.container {
  display: flex;
  padding-top: 20px;
  .article {
    width: 1000px;
  }
}
</style>

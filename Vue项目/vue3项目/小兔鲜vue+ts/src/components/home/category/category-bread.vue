<template>
  <Globalbread>
    <GlobalbreadItem to="/">首页</GlobalbreadItem>
    <transition name="fade-right" mode="out-in">
      <GlobalbreadItem :key="categorygoods.id" :to="`/category/${categorygoods.id}`">{{
        categorygoods.name
      }}</GlobalbreadItem>
    </transition>
    <transition
      name="fade-right"
      mode="out-in"
      v-if="(route.path.includes('product') || route.path.includes('sub')) && categorygoods.sub">
      <GlobalbreadItem :key="categorygoods.sub.id">{{ categorygoods.sub.name }}</GlobalbreadItem>
    </transition>

    <transition
      name="fade-right"
      mode="out-in"
      v-if="
        (route.path.includes('product') || route.path.includes('sub')) && categorygoods.sub && categorygoods.sub.Detail
      ">
      <GlobalbreadItem :key="categorygoods.sub.Detail.id">{{ categorygoods.sub.Detail.name }}</GlobalbreadItem>
    </transition>
  </Globalbread>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
type subType = {
  id: string
  name: string
  sub?: {
    id: string
    name: string
    Detail?: {
      id: string
      name: string
    }
  }
}

defineProps<{ categorygoods: subType }>()
const route = useRoute()
</script>

<style scoped lang="less"></style>

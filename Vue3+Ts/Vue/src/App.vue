<template>
  <router-view #default="{ route, Component }">
    <transition
      :enter-active-class="`animate__animated ${route.meta.transition}`"
    >
      <Component :is="Component"></Component>
    </transition>
  </router-view>
</template>

<script setup lang="ts"></script>

<style scoped lang="less"></style>

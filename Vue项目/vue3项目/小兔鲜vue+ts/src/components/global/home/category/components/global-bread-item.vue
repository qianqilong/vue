<template>
  <div class="xtx-bread-item">
    <RouterLink :to="to"><slot /></RouterLink>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  to: {
    type: String,
    default: '/',
  },
})
</script>

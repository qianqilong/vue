<template>
  <input :type="type" :value="modelValue" @input="input" />
</template>

<script setup lang="ts">
defineProps({
  type: {
    type: String,
    default: 'text',
  },
  modelValue: {
    type: String,
    default: '',
  },
})

const emit = defineEmits<{ (e: 'update:modelValue', data: string): void }>()

const input = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<style scoped lang="less"></style>

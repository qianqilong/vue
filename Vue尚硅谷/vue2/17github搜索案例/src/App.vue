
<template>
  <div>
    <div class="container">
      <Search></Search>
      <List></List>
    </div>
  </div>
</template>

<script>
import Search from './components/Search.vue'
import List from './components/List.vue'
export default {
  name: 'App',
  components: { Search, List }
}
</script>

<style scoped>
</style>
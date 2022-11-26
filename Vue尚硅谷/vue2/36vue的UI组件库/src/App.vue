<template>
   <div>
 <button>原生</button><br>
 <input type="text">
<el-row>
  <el-button type="danger">危险按钮</el-button>
</el-row>

 <el-date-picker
      v-model="value1"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
  </div>
</template>

<script>

export default {
  name: 'App',
data() {
  return {
    value1:''
  }
},

}
</script>

<style scoped>
 
</style>
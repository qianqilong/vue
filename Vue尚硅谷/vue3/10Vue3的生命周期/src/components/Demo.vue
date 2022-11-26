<template>
 <h2>当前求和为：{{sum}}</h2>
 <button @click="sum++">+1</button>

</template>
<script>
import {ref,onBeforeMount,onMounted,onBeforeUpdate,onUpdated,onBeforeUnmount,onUnmounted} from 'vue';
export default {
  name: 'App',
  
  setup() {
    let sum=ref(0);
   
   //通过组合式Api形式使用生命周期构子
onBeforeMount(()=>{
console.log('onBeforeMount');
})
onMounted(()=>{
console.log('onMounted');
})
onBeforeUpdate(() => {
  console.log('onBeforeUpdate');
})
onUpdated(() => {
  console.log('onUpdated');
})
onBeforeUnmount(() => {
  console.log('onBeforeUnmount');
})
onUnmounted(() => {
  console.log('onUnmounted');
})
    return {
     sum,
    }
   
  }, 
  /*
  beforeCreate() {
    console.log('--beforeCreate--');
  },
  created() {
     console.log('--created--');
  },
  beforeMount() {
     console.log('--beforeMount--');
  },
  mounted() {
     console.log('--mounted--');
  },
  beforeUpdate() {
     console.log('--beforeUpdate--');
  },
  updated() {
     console.log('--updated--');
  },
  beforeUnmount() {
     console.log('--beforeUnmount--');
  },
  unmounted() {
     console.log('--unmounted--');
  },
*/
}
</script>

<style>

</style>

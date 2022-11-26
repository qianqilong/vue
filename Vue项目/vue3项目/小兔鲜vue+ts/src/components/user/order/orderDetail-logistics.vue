<template>
  <div class="detail-logistics" v-if="logistics && order">
    <p>
      <span>{{ logistics.list[0].time }}</span>
      <span>{{ logistics.list[0].text }}</span>
    </p>
    <a href="javascript:;" @click="logisticsOrderCom.show(order?.id)">查看物流</a>
  </div>
  <!-- 查看物流组件 -->

  <orderLogisticsVue ref="logisticsOrderCom" />
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { logisticsOrderAPI } from '@/api'
import orderLogisticsVue from './order-logistics.vue'

const props = defineProps({
  order: {
    type: Object,
  },
})
// 物流信息
const logistics = ref()
onMounted(async () => {
  if (props.order && props.order.id) {
    const data = await logisticsOrderAPI(props.order.id)
    console.log(props.order.id)
    logistics.value = data
  }
})
const logisticsOrderCom: any = ref(null)
</script>
<style scoped lang="less">
.detail-logistics {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  background-color: #f5f5f5;
  margin: 30px 50px 0;
  > p {
    flex: 1;
    span {
      color: #999;
      &:first-child {
        margin-right: 30px;
      }
    }
  }
  > a {
    color: @xtxColor;
    text-align: center;
  }
}
</style>

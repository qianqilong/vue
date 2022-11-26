<template>
  <div class="xtx-pagination">
    <!-- 如果当前页码数为1,禁用 -->
    <a :class="{ disabled: pageNo === 1 }" @click="pageNo > 1 ? emit('changePage', pageNo - 1) : ''">上一页</a>
    <!-- 当前起始页码大于1时显示1号按键方便跳转-->
    <a v-if="startEndPage.start > 1" @click="changePage(1)">1</a>
    <!-- 当前起始页码大于2时显示... -->
    <span v-if="startEndPage.start > 2">...</span>
    <!-- 遍历按键数组，如果当前页等于数组某一项高显 -->
    <a :class="{ active: pageNo === item }" v-for="item in startEndPage.btnArr" :key="item" @click="changePage(item)">
      {{ item }}
    </a>
    <!-- 如果页码总数大于结束页码数加1显示 -->
    <span v-if="pageTotal > startEndPage.end + 1">...</span>
    <!-- 如果页码总数大于结束页码显示最后一页方便跳转 -->
    <a v-if="pageTotal > startEndPage.end" @click="changePage(pageTotal)">{{ pageTotal }}</a>
    <!-- 当前页码为最后一页禁用 -->
    <a :class="{ disabled: pageNo === pageTotal }" @click="pageNo < pageTotal ? emit('changePage', pageNo + 1) : ''"
      >下一页</a
    >
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'

// 需要pageNo:当前页,pageSize:每页显示数据,dataTotal:数据总数,showbtnCount:显示按键
const props = defineProps({
  pageNo: {
    type: Number,
    default: 1,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  dataTotal: {
    type: Number,
    default: 100,
  },
  showBtn: {
    type: Number,
    default: 5,
  },
})
const emit = defineEmits<{ (e: 'changePage', newPage: number): void }>()
// 1.计算出总页数
const pageTotal = computed(() => {
  return Math.ceil(props.dataTotal / props.pageSize)
})
// 2.计算起始页码
const startEndPage = computed(() => {
  // 1.理想情况
  //   起始页码是当前页码-(按键总数/2)向下取整
  let start = props.pageNo - Math.floor(props.showBtn / 2)
  // 结束页码是起始页码+按键数+1
  let end = start + props.showBtn - 1

  //   2.如果开始页码小于1
  if (start < 1) {
    start = 1
    // 如果结束页计算后大于总页数结果就是总页数
    end = start + props.showBtn - 1 > pageTotal.value ? pageTotal.value : start + props.showBtn - 1
  }

  // 3.如果结束页码大于总页数
  if (end > pageTotal.value) {
    end = pageTotal.value
    // 如果开始页码计算后小于1
    start = end - props.showBtn + 1 < 1 ? 1 : end - props.showBtn + 1
  }
  // 生成起始页码和结束页码的数组
  const btnArr = []
  for (let i = start; i <= end; i++) {
    btnArr.push(i)
  }
  return { start, end, btnArr }
})
// 3.改变当前页码
const changePage = (newPage: number) => {
  emit('changePage', newPage)
}
</script>
<style scoped lang="less">
.xtx-pagination {
  display: flex;
  justify-content: center;
  padding: 30px;
  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;
    &:hover {
      color: @xtxColor;
    }
    &.active {
      background: @xtxColor;
      color: #fff;
      border-color: @xtxColor;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        color: #333;
      }
    }
  }
  > span {
    margin-right: 10px;
  }
}
</style>

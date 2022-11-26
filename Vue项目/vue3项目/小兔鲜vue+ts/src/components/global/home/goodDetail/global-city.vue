<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="open" :class="{ active }">
      <span class="placeholder" v-if="changeResult.fullLocation == ''">请选择配送地址</span>
      <span class="value">{{ changeResult.fullLocation }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="active">
      <div v-if="loading" class="loading"></div>
      <template v-else>
        <span class="ellipsis" v-for="item in currList" :key="item.code" @click="changeItem($event, item)">{{
          item.name
        }}</span>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeUnmount, reactive, ref, type Ref } from 'vue'
import { getCityDataAPI } from '@/api'
import type { cityObject, AreaList2, AreaList } from '@/api/types'

const props = defineProps<{ fullLocation: string }>()
const emit = defineEmits<{ (e: 'changeCity', city: any): void }>()
// 控制城市列表的显示和隐藏
const active = ref(false)
// 是否处于加载中
const loading = ref(false)
// 城市列表的数组
const cityData: Ref<cityObject[]> = ref([]) as Ref<cityObject[]>
// 城市选择的对象信息
const changeResult = reactive({
  provinceCode: '',
  provinceName: '',
  cityCode: '',
  cityName: '',
  countyCode: '',
  countyName: '',
  fullLocation: props.fullLocation,
})

// 第一次打开列表缓存到window中
const getCityData = () => {
  return new Promise<Array<cityObject>>((resolve) => {
    if (window.cityData) {
      resolve(window.cityData)
    } else {
      getCityDataAPI().then((res) => {
        window.cityData = res as Array<cityObject>
        resolve(window.cityData)
      })
    }
  })
}

// 控制选择地址的切换和隐藏
const open = (event: Event) => {
  let key: keyof {
    provinceCode: string
    provinceName: string
    cityCode: string
    cityName: string
    countyCode: string
    countyName: string
    fullLocation: string
  }
  for (key in changeResult) {
    changeResult[key] = ''
  }
  event.stopPropagation()
  loading.value = true
  getCityData().then((res) => {
    active.value = !active.value
    cityData.value = res
    loading.value = false
  })
}

// 选择城市信息
const changeItem = (event: Event, item: any) => {
  event.stopPropagation()
  if (item.level === 0) {
    changeResult.provinceCode = item.code
    changeResult.provinceName = item.name
  }
  // 市
  if (item.level === 1) {
    changeResult.cityCode = item.code
    changeResult.cityName = item.name
  }
  // 区
  if (item.level === 2) {
    changeResult.countyCode = item.code
    changeResult.countyName = item.name
    changeResult.fullLocation = `${changeResult.provinceName} ${changeResult.cityName} ${changeResult.countyName}`
    active.value = false
    emit('changeCity', changeResult)
  }
}

// 定义计算属性
const currList = computed({
  get() {
    // 省份
    let currList: cityObject[] | AreaList[] | AreaList2[] = cityData.value
    // 城市
    if (changeResult.provinceCode && currList) {
      currList = currList.find((p) => p.code === changeResult.provinceCode)?.areaList as AreaList2[]
    }
    // 地区
    if (changeResult.cityCode) {
      currList = (currList as AreaList2[]).find((c) => c.code === changeResult.cityCode)?.areaList as AreaList[]
    }
    return currList
  },
  set(value) {
    currList.value = value
  },
})

// 点击外面关闭
window.addEventListener('click', () => {
  active.value = false
})

// 点击外面关闭
onBeforeUnmount(() => {
  window.removeEventListener('click', () => {
    active.value = false
  })
})
</script>
<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    .loading {
      height: 290px;
      width: 100%;
      background: url(@/assets/images/loading.gif) no-repeat center;
    }
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>

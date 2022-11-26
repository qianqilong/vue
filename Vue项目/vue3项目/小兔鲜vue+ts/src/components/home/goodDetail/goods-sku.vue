<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="sub in item.values" :key="sub.id">
          <img
            :class="{ selected: sub.selected }"
            :src="sub.picture"
            @click="clickSpecs(item, sub)"
            v-if="sub.picture"
            disabled />
          <span :class="{ selected: sub.selected }" @click="clickSpecs(item, sub)" v-else>{{ sub.name }}</span>
        </template>
      </dd>
    </dl>
  </div>
</template>
<script lang="ts" setup>
import type { Skus, Spec, Value } from '@/api/types'
import { ref, watch, type Ref } from 'vue'
import getPowerSet from '@/utils/A'
type stringKey = Record<string, any>

const path = ref({}) as Ref<stringKey>
const props = defineProps<{ goods: { skus: Array<Skus>; specs: Array<Spec> }; skuId: string }>()
const emit = defineEmits<{ (e: 'changeSku', skuid: Skus | undefined): void }>()
// 得到当前选中规格集合
const getSelectedArr = (specs: Array<Spec>) => {
  const selectedArr: Array<Value | string> = []
  specs.forEach((spec) => {
    const selectedVal = spec.values.find((val) => val.selected)
    selectedArr.push(selectedVal ? selectedVal.name : '')
  })
  return selectedArr
}
// 生成有效的spu
const createSpu = () => {
  if (props.goods.skus) {
    const pathMap: stringKey = {}
    // 选中规格的集合
    props.goods.skus.forEach((sku) => {
      // sku有效
      if (sku.inventory) {
        // 得到sku属性值数组
        const specsArr = sku.specs.map((item) => item.valueName)
        getPowerSet(specsArr).forEach((set) => {
          const key = set.join(spliter)
          if (pathMap[key]) {
            // 已经有key往数组追加
            pathMap[key].push(sku.id)
          } else {
            // 没有key设置一个数组
            pathMap[key] = [sku.id]
          }
        })
      }
    })
    path.value = pathMap
    // 更新按钮的禁用状态
    const selectedArr = getSelectedArr(props.goods.specs) // 当前选中的数组集合
    props.goods.specs.forEach((item, i) => {
      if (item.name === selectedArr[i]) return false
      // 没有选中替换值
      selectedArr[i] = item.name
      // 过滤掉为''的值
      const key = selectedArr.filter((item) => item).join(spliter)
      // 禁用，没有在幂集中的组合禁用
      item.disabled = !pathMap[key]
    })
  }
}

// 生成有效的spu
onMounted(() => {
  createSpu()
})
onBeforeUpdate(() => {
  createSpu()
})
// 点击选择事件
const clickSpecs = (item: Spec, sub: Value) => {
  // if (!item.disabled) {
  //   return false
  // }
  if (sub.selected) {
    sub.selected = false
  } else {
    item.values.forEach((item) => (item.selected = false))
    sub.selected = true
  }
  const selectedArr = getSelectedArr(props.goods.specs) // 当前选中的数组集合

  if (selectedArr.length === props.goods.specs.length) {
    // 把选中数组拼接成路径的索引
    let skuIds = path.value[selectedArr.join(spliter)]
    // 找到对应skuid的信息
    const sku = props.goods.skus.find((sku) => sku.id === skuIds[0])
    emit('changeSku', sku)
  }
}

// 初始化选中状态
if (props.goods.skus) {
  watch(
    () => props.goods,
    () => {
      const sku = props.goods.skus.find((item) => item.id === props.skuId)
      if (sku) {
        props.goods.specs.forEach((item, i) => {
          // 如果存在默认值则，找出对应的名字
          const value = sku.specs[i].valueName
          item.values.forEach((sub) => {
            // 更新sub的默认选中
            sub.selected = sub.name === value
          })
        })
      }
    },
    { immediate: true },
  )
}
const spliter = '★'
</script>
<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>

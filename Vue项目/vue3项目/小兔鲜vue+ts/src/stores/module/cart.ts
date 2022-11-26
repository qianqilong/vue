import { deleteCartAPI, getCartListAPI, insertCartAPI, mergeCartAPI } from '@/api'
import type { Skus } from '@/api/types'
import useStore from '@/stores'
import { defineStore } from 'pinia'
export type listType = {
  id: string
  skuId: string
  name: string
  picture: string
  price: number
  nowPrice: number
  count: number
  attrsText: string
  selected: boolean
  isEffective: boolean
  stock: number
}

export const useCartStore = defineStore('cart', {
  state: () => {
    return {
      list: [] as Array<listType>,
    }
  },
  getters: {
    // 有效商品列表
    validList(): Array<listType> {
      if (this.list.length !== 0)
        return this.list.filter((item) => {
          if (item) {
            return item.stock > 0 && item.isEffective
          }
        })
      return [] as Array<listType>
    },
    // 商品总数量
    totalCount(): number {
      return this.validList.reduce((pre, item) => pre + item.count, 0)
    },
    // 商品总价格
    totalPrice(): number {
      return this.validList.reduce((pre, item) => pre + item.nowPrice * item.count, 0).toFixed(2) as unknown as number
    },

    // 无效商品
    unvalidList(): Array<listType> {
      return this.validList.filter((item) => !(item.stock > 0 && item.isEffective))
    },
    // 选中商品
    selectList(): Array<listType> {
      return this.validList.filter((item) => item.selected)
    },

    // 选中商品价格
    selectListPrice(): number {
      return this.selectList.reduce((pre, item) => pre + item.nowPrice * item.count, 0).toFixed(2) as unknown as number
    },
    //选中商品数量
    selectListCount(): number {
      return this.selectList.reduce((pre, item) => pre + item.count, 0)
    },
  },
  actions: {
    // 加入购物车的方法
    async addCartList(good: listType) {
      const { user } = useStore()
      if (user.user.token !== '') {
        // 登录
        const goodlist = await insertCartAPI({ skuId: good.skuId, count: good.count })
        goodlist instanceof Array ? (this.list = goodlist) : this.list.unshift(goodlist as listType)
      } else {
        // 找到good在list中的索引
        const Index = this.list.findIndex((item) => item.skuId === good.skuId)
        //   如果索引存在
        if (Index >= 0) {
          good.count = this.list[Index].count + good.count
          // 删除原商品，让其置顶
          this.list.splice(Index, 1)
        }
        this.list.unshift(good)
      }
    },

    // 获取购物车信息
    async getCartList() {
      const { user } = useStore()
      // 判断是否登录
      if (user.user.token !== '') {
        const goodlist = await getCartListAPI()
        this.list = goodlist as listType[]
      }
    },

    // 删除购物车的方法
    async deleteCarList(skuid: string) {
      const { user } = useStore()
      if (user.user.token !== '') {
        // 登录
        await deleteCartAPI([skuid])
      }
      const Index = this.list.findIndex((item) => item.skuId === skuid)
      this.list.splice(Index, 1)
    },
    //  删除选中商品
    async deleteCartSelectList() {
      const { user } = useStore()
      if (user.user.token !== '') {
        const arr: string[] = []
        this.selectList.forEach((item) => {
          arr.push(item.skuId)
        })
        // 登录
        const goodlist = await deleteCartAPI(arr)
        goodlist === null
          ? this.$reset()
          : goodlist instanceof Array
          ? (this.list = goodlist)
          : this.list.unshift(goodlist as listType)
      } else {
        this.selectList.forEach((item) => {
          this.deleteCarList(item.skuId)
        })
      }
    },
    // 删除无效商品
    deleteunvalidList() {
      this.unvalidList.forEach((item) => {
        this.deleteCarList(item.skuId)
      })
    },
    // 更新商品
    async updataList(skuid: string, sku: Skus) {
      const { user } = useStore()
      if (user.user.token !== '') {
        // 登录情况下
        const Index = this.list.findIndex((item) => item.skuId === skuid)
        const oldsku = this.list[Index]
        const { id: skuId, price: nowPrice, inventory: stock } = sku
        const attrsText = sku.specs.reduce((pre, item) => pre + item.name + ':' + item.valueName, '')
        const newGoods = { ...oldsku, skuId, nowPrice: +nowPrice, stock, attrsText }
        this.deleteCarList(skuid)

        const I = this.list.findIndex((item) => item.skuId === newGoods.skuId)
        if (I >= 0) {
          newGoods.count = this.list[I].count + newGoods.count
        } else {
          this.addCartList(newGoods)
        }
      } else {
        // 1.删除旧的商品(原来的商品信息)
        const Index = this.list.findIndex((item) => item.skuId === skuid)
        const oldsku = this.list[Index]
        const { id: skuId, price: nowPrice, inventory: stock } = sku
        const attrsText = sku.specs.reduce((pre, item) => pre + item.name + ':' + item.valueName, '')
        const newGoods = { ...oldsku, skuId, nowPrice: +nowPrice, stock, attrsText }
        // 2.加入新的商品

        const I = this.list.findIndex((item) => item.skuId === newGoods.skuId)
        if (I >= 0) {
          newGoods.count = this.list[I].count + newGoods.count
          this.list.splice(Index, 1, newGoods)
          this.list.splice(I, 1)
        } else {
          this.list.splice(Index, 1, newGoods)
        }
      }
    },

    // 合并购物车
    async mergeCart() {
      const cartlist = this.validList.map(({ skuId, selected, count }) => {
        return { skuId, selected, count }
      })
      // 合并购物车操作
      await mergeCartAPI(cartlist)
      // 清空原来的购物车
      this.$reset()
    },
  },
})

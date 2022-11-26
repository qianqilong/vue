import { defineStore } from 'pinia'
import { topCategory, getAllCategoryAPI, getBrandAPI, getBannerAPI } from '@/api'
import type { category, BrandResult, BannerResult } from '@/api/types'

export const useCategoryStore = defineStore('category', {
  state: () => {
    return {
      // 商品信息
      categoryList: topCategory.map((item) => ({
        name: item,
      })) as unknown as category[],
      // 品牌信息
      brandList: [] as Array<BrandResult>,
      // 轮播图信息
      bannerList: [] as Array<BannerResult>,
    }
  },
  getters: {},
  actions: {
    // 获取分类列表
    async getAllCategory() {
      const list = (await getAllCategoryAPI()) as category[]
      list.forEach((item) => {
        item.open = false
      })
      this.categoryList = list
      // 调用获取品牌
      this.getBrand()
      // 调用获取轮播图片
      this.getBanner()
    },

    // 获取品牌信息
    async getBrand() {
      const brandList = await getBrandAPI('6')
      this.brandList = brandList as Array<BrandResult>
    },

    // 获取轮播图图片
    async getBanner() {
      const banner = await getBannerAPI()
      this.bannerList = banner as Array<BannerResult>
    },
  },
})

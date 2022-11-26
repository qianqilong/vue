<template>
  <div>
    <!-- 搜索页面头部 -->
    <div class="search-header">
      <!-- 后退按钮 -->
      <van-icon name="arrow-left" color="white" size="0.48rem" class="goback" @click="$router.back()"/>
      <!-- 搜索组件 -->
      <van-search
      v-fofo placeholder="请输入搜索关键词"
      background="#007BFF"
      shape="round"
       v-model.trim="kw"
      @input="inputFn"
      @search="searchFn(kw)"
       />
    </div>
    <!-- 搜索展示列表 -->
    <div class="sugg-list" v-if="kw.length!==0">
    <div class="sugg-item"  v-for="(item,index) in searchList" :key="index" @click="suggestClickFn(item)"  v-html="lightFn(item,kw)">
    </div>
    </div>
    <!-- 搜索历史 -->
    <div class="search-history" v-else>
    <!-- 标题 -->
    <van-cell title="搜索历史">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
      <van-icon name="delete" class="search-icon" @click="clearFn" />
        </template>
    </van-cell>

    <!-- 历史列表 -->
    <div class="history-list" >
        <span class="history-item" v-for="(item,index) in history" :key="index" @click="historyClickFn(item)">{{item}}</span>
    </div>
    </div>
  </div>
</template>

<script>

import { suggestListAPI } from '@/api'
export default {
  name: 'Search',
  data () {
    return {
      kw: '', // 搜索关键字
      timer: null, // 存储防抖定时器
      searchList: [], // 搜索存储列表
      history: JSON.parse(localStorage.getItem('his')) || []// 获取值为undfefind会导致报错，如果为空就是一个空数组
    }
  },
  methods: {
    // 监听内容变化的方法
    inputFn () {
      clearTimeout(this.timer)// 清除上一次输入的定时器
      if (this.kw.length === 0) this.searchList = []// 如果为空清除数组
      else {
        this.timer = setTimeout(async () => {
          const res = await suggestListAPI({ keyword: this.kw })
          this.searchList = res.data.data.options// 存入搜索列表
        }, 200)
      }
      // 防抖操作：延时执行逻辑代码，事件再次触发时清除上一个定时器
    },
    // 处理关键字高亮
    /**
     originStr：原来字符串
     替换后的值不能用target因为大小写都被替换了
    */
    lightFn (originStr, target) {
      if (originStr === null) return
      const reg = new RegExp(target, 'ig')
      return originStr.replace(reg, (match) => `<span style="color:red;">${match}</span>`)
    },
    /**
* 跳转搜索结果页面
 * 1.输入框回车
 * 2.点击搜索列表
 * 3.点击历史
 */
    intoSearch (kw) {
      // 坑：延迟执行，能让侦听器监听到数组的变化
      setTimeout(() => {
        this.$router.push(
          {
            path: `/search_results/${kw}`
          }
        )
      })
    },
    // 1.输入框回车(存入历史记录)
    searchFn (kw) {
      if (this.kw.length > 0) {
        this.history.push(kw)
        this.intoSearch(kw)
      }
    },
    // 2.点击搜索列表(存入历史记录)
    suggestClickFn (str) {
      this.history.push(str)
      this.intoSearch(str)
    },
    // 3.点击历史按键
    historyClickFn (str) {
      this.intoSearch(str)
    },
    // 清除历史记录
    clearFn () {
      this.history = []
    }
  },
  // 监听历史数组的变化
  watch: {
    history: {
      deep: true,
      handler () {
        const arr = Array.from(new Set(this.history))// 应该在存入时候去重，而不是在读取时去重
        // 覆盖式保存
        localStorage.setItem('his', JSON.stringify(arr))
      }
    }
  }
}
</script>

<style scoped lang="less">
.search-header {
  height: 46px;
  display: flex;
  align-items: center;
  background-color: #007bff;
  overflow: hidden;
  /*后退按钮*/
  .goback {
    padding-left: 14px;
  }
  /*搜索组件*/
  .van-search {
    flex: 1;
  }
}
.sugg-list {
  .sugg-item {
    padding: 0 15px;
    border-bottom: 1px solid #f8f8f8;
    font-size: 14px;
    line-height: 50px;
    // 实现省略号的三行代码
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
/**搜索历史 */
.search-icon {
  font-size: 16px;
  line-height: inherit;
}

.history-list {
  padding: 0 10px;
  .history-item {
    display: inline-block;
    font-size: 12px;
    padding: 8px 14px;
    background-color: #efefef;
    margin: 10px 8px 0px 8px;
    border-radius: 10px;
  }
}
</style>

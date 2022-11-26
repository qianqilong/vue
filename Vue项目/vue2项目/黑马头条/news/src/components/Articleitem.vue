<template>
<div >
  <!-- 一条文章单元格 -->
  <van-cell>
    <!-- 标题区域的插槽 -->
    <template #title>
      <div class="title-box">
        <!-- 标题 -->
        <span>{{artObj.title}}</span>
        <!-- 单图 -->
        <img
        class="thumb"
        v-if="artObj.cover.type===1"
        v-lazy="artObj.cover.images"
        >
      </div>
      <!-- 多图 -->
      <div class="thumb-box"  v-if="artObj.cover.type > 1">
       <img
       v-for="(item,index) in artObj.cover.images"
        v-lazy="item"
       :key="index" class="thumb">
      </div>
    </template>
    <!-- label 区域的插槽 -->
    <template #label>
      <div class="label-box">
        <div>
          <span>{{artObj.aut_name}}</span>
          <span>{{artObj.comm_count}}评论</span>
          <span>{{forTime}}</span>
        </div>
        <!-- 反馈按钮 -->
        <van-icon name="cross" @click.stop="show=true" v-if="propsShow" />
      </div>
    </template>
  </van-cell>
<!-- 反馈面板 -->
  <van-action-sheet v-model="show"
  :actions="actions"
   @select="onSelect"
   @cancel="cancelFn"
   @closed="closeFn"
  :cancel-text="bottomText"
  get-container="body"/>
</div>
</template>
<script>
import { timeAgo } from '@/utils/date.js'
import { firstActions, secondActions } from '@/api/report.js'
export default {
  name: 'Articleitem',
  props: {
    artObj: Object, // 文章对象
    isShow: Boolean // 是否显示
  },
  data () {
    return {
      propsShow: this.isShow,
      show: false, // 是否显示遮罩层和选项卡
      actions: firstActions, // 选项卡内容
      bottomText: '取消'
    }
  },
  methods: {
    /**
     * item是绑定的action数组中的配置项
     * index是数组的索引值
     */
    onSelect (item, index) {
      if (item.name === '反馈垃圾内容') {
        // 切换action中的数据
        this.actions = secondActions
        this.bottomText = '返回'
      } else if (item.name === '不感兴趣') {
        this.$emit('disLikeEV', { target: this.artObj.art_id })
        this.show = false// 反馈成功让面板消失
      } else {
        this.$emit('reportsEV', { target: this.artObj.art_id, type: index, remark: 'item.name' })
        this.show = false// 反馈面板消失
        setTimeout(() => {
          this.actions = firstActions // 并退回上一级面板
        }, 1000)
      }
    },
    // 点击反馈面板返回按键
    cancelFn () {
      if (this.bottomText === '返回') {
        this.show = true// 让它无法隐藏
        this.actions = firstActions
        this.bottomText = '取消'
      }
    },
    /**
     * 关闭面板后时回到一级目录
     */
    closeFn () {
      this.actions = firstActions
    }
  },
  computed: {
    forTime () {
      return timeAgo(this.artObj.pubdate)// 返回时间
    }
  }
}
</script>

<style scoped lang="less">
/* 标题样式 */
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/* label描述样式 */
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 文章信息span */
.label-box span{
    margin: 0 3px;
    &:first-child{
        margin-left: 0;
    }
}
/* 图片的样式, 矩形黄金比例：0.618 */
.thumb {
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}

/* 三图, 图片容器 */
.thumb-box {
  display: flex;
  justify-content: space-between;
}
</style>

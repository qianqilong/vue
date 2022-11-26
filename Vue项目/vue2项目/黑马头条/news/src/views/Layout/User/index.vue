<template>
  <div class="user-container">
    <!-- 用户基本信息面板 -->
    <div class="user-card">
      <!-- 用户头像、姓名 -->
      <van-cell>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #icon>
          <img :src="$store.state.userPhoto" alt="" class="avatar">
        </template>
        <template #title>
          <span class="username">{{myUserInfo.name}}</span>
        </template>
        <template #label>
          <van-tag color="#fff" text-color="#007bff">申请认证</van-tag>
        </template>
      </van-cell>
      <!-- 动态、关注、粉丝 -->
      <div class="user-data">
        <div class="user-data-item">
          <span>{{myUserInfo.art_count}}</span>
          <span>动态</span>
        </div>
        <div class="user-data-item">
          <span>{{myUserInfo.follow_count}}</span>
          <span>关注</span>
        </div>
        <div class="user-data-item">
          <span>{{myUserInfo.like_count}}</span>
          <span>粉丝</span>
        </div>
      </div>
    </div>

    <!-- 操作面板 -->
    <van-cell-group class="action-card">
      <van-cell icon="edit" title="编辑资料" is-link to="/user_edit" />
      <van-cell icon="chat-o" title="小思同学" is-link to="/chat"/>
      <van-cell icon="warning-o" title="退出登录" is-link @click="signOutFn" />
    </van-cell-group>
  </div>
</template>

<script>
import { myUserInfoAPI } from '@/api'
import Dialog from '@/utils/Dialog.js'
import { removeToken } from '@/utils/token.js'
// import { mapMutations } from 'vuex'// 映射调用mutations
export default {
name: 'User',
data () {
  return {
    myUserInfo: {}// 用户展示的信息
  }
},
// 保存用户信息
async created () {
  try {
 const res = await myUserInfoAPI()
  this.myUserInfo = res.data.data
  // 1.调用vuex中的值用commit
  // this.$store.commit('SET_USERPHOTO', this.myUserInfo.photo)
  // 2.映射引入
  // this.SET_USERPHOTO(this.myUserInfo.photo)
//  3.action中转
this.$store.dispatch('setPhoto', this.myUserInfo.photo)
  } catch (err) {
  }
},
methods: {
  // ...mapMutations(['SET_USERPHOTO']),//映射引入vuex
  // 退出登陆的功能
  signOutFn () {
    Dialog.confirm({
  title: '确定退出登陆吗？'
})
  .then(() => {
    // 清除token,跳转页面
removeToken()
this.$router.replace('/login')
  })
  .catch(() => {
    // on cancel
  })
  }
}
}
</script>

<style scoped lang="less">
.user-container {
  .user-card {
    background-color: #007bff;
    color: white;
    padding-top: 20px;
    .van-cell {
      background: #007bff;
      color: white;
      &::after {
        display: none;
      }
      .avatar {
        width: 60px;
        height: 60px;
        background-color: #fff;
        border-radius: 50%;
        margin-right: 10px;
      }
      .username {
        font-size: 14px;
        font-weight: bold;
      }
    }
  }
  .user-data {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-size: 14px;
    padding: 30px 0;
    .user-data-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 33.33%;
    }
  }
}
</style>

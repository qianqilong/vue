<template>
  <LoginHeader>欢迎登录</LoginHeader>
  <section class="login-section">
    <div class="wrapper">
      <nav>
        <a @click="show = 0" :class="{ active: show === 0 }">账户登录</a>
        <a @click="show = 1" :class="{ active: show === 1 }">扫码登录</a>
      </nav>
      <!-- 表单 -->
      <div class="account-box" v-if="show === 0">
        <Loginform />
      </div>
      <!-- 二维码 -->
      <div class="qrcode-box" v-if="show === 1">
        <img src="@/assets/images/qrcode.jpg" alt="" />
        <p>打开 <a href="javascript:;">小兔鲜App</a> 扫码登录</p>
      </div>
    </div>
  </section>
  <LoginFooter />
</template>
<script lang="ts" setup>
import LoginHeader from '@/components/Login/login-header.vue'
import LoginFooter from '@/components/Login/login-footer.vue'
import Loginform from '@/components/Login/login-form-my.vue'
import useStore from '@/stores'

// 0表示表单登录，1表示二维码登录
const show = ref(0)
// 存储回调地址，提供将来QQ回调页使用  setup中
const { user } = useStore()
const route = useRoute()
user.redirectUrl = route.query.redirectUrl as string
</script>
<style scoped lang="less">
.login-section {
  background: url(@/assets/images/login-bg.png) no-repeat center / cover;
  height: 488px;
  position: relative;
  .wrapper {
    width: 380px;
    background: #fff;
    min-height: 400px;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    // 二维码容器
    .qrcode-box {
      text-align: center;
      padding-top: 40px;
      p {
        margin-top: 20px;
        a {
          color: @xtxColor;
          font-size: 16px;
        }
      }
    }
    nav {
      height: 55px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;
      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        &:first-child {
          border-right: 1px solid #f5f5f5;
          text-align: left;
        }
        &.active {
          color: @xtxColor;
          font-weight: bold;
        }
      }
    }
  }
}
</style>

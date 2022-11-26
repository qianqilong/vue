<template>
  <LoginHeader>联合登录</LoginHeader>
  <section class="container" v-if="isBind">
    <div class="unbind">
      <div class="loading"></div>
    </div>
  </section>
  <section class="container" v-else>
    <nav class="tab">
      <a @click="hasAccount = true" :class="{ active: hasAccount }" href="javascript:;">
        <i class="iconfont icon-bind" />
        <span>已有小兔鲜账号，请绑定手机</span>
      </a>
      <a @click="hasAccount = false" :class="{ active: !hasAccount }" href="javascript:;">
        <i class="iconfont icon-edit" />
        <span>没有小兔鲜账号，请完善资料</span>
      </a>
    </nav>
    <div class="tab-content" v-if="hasAccount">
      <LoginCallbackBind :unionId="unionId" />
    </div>
    <div class="tab-content" v-else>
      <LoginCallbackPatch />
    </div>
  </section>
  <LoginFooter />
</template>

<script lang="ts" setup>
import LoginHeader from '@/components/Login/login-header.vue'
import LoginFooter from '@/components/Login/login-footer.vue'
import LoginCallbackBind from '@/components/Login/login-callback-bind.vue'
import LoginCallbackPatch from '@/components/Login/login-callback-patch.vue'
import { userQQLoginAPI } from '@/api'
import useStore from '@/stores'
import type { LoginResult } from '@/api/types'

const hasAccount = ref(true)
// unionId的信息传递进版定
const unionId = ref('')
// 假设已经绑定，默认会去做一次登录，如果登录失败证明未绑定。
const isBind = ref(true)
const { user, cart } = useStore()
const router = useRouter()
const instance = getCurrentInstance()
// 1. 获取QQ互联的openId也就是后台需要的unionId
// 2. 根据QQ互联的openId去进行登录，准备一个接口
// 检查QQ是否登录
if (window.QC.Login.check()) {
  // 获取登录的unionid
  window.QC.Login.getMe(async (openId: string) => {
    // 保存后放入其他组件
    unionId.value = openId
    try {
      // 登录成功获取用户的信息
      const { account, avatar, mobile, nickname, token } = (await userQQLoginAPI(openId)) as LoginResult
      // 存入仓库
      user.setState({ account, nickname, avatar, token, mobile })
      // 跳转地址
      router.push(user.redirectUrl)
      cart.mergeCart()
      // 成功提示
      instance?.proxy?.$Message({ type: 'success', text: '登录成功' })
    } catch (e) {
      // 登录失败把第一次登录改为false
      isBind.value = false
    }
  })
}
</script>

<style scoped lang="less">
.container {
  padding: 25px 0;
  position: relative;
  height: 730px;
  .unbind {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 25px 0;
    z-index: 99;
    .loading {
      height: 100%;
      background: #fff url(../../assets/images/load.gif) no-repeat center / 100px 100px;
    }
  }
}
.tab {
  background: #fff;
  height: 80px;
  padding-top: 40px;
  font-size: 18px;
  text-align: center;
  a {
    color: #666;
    display: inline-block;
    width: 350px;
    line-height: 40px;
    border-bottom: 2px solid #e4e4e4;
    i {
      font-size: 22px;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
      margin-left: 4px;
    }
    &.active {
      color: @xtxColor;
      border-color: @xtxColor;
    }
  }
}
.tab-content {
  min-height: 600px;
  background: #fff;
}
</style>

<template>
  <div class="account-box">
    <div class="toggle">
      <a @click="isMsgLogin = false" href="javascript:;" v-if="isMsgLogin">
        <i class="iconfont icon-user"></i> 使用账号登录
      </a>
      <a @click="isMsgLogin = true" href="javascript:;" v-else> <i class="iconfont icon-msg"></i> 使用短信登录 </a>
    </div>
    <From class="form" :rule="rules" :form="form" ref="formErrors">
      <!-- 作用域插槽 -->
      <template #rule="{ errors }">
        <!-- 密码登录的表单 -->
        <template v-if="!isMsgLogin">
          <div class="form-item">
            <div class="input">
              <i class="iconfont icon-user"></i>
              <Field
                :class="{ error: errors.username }"
                name="username"
                type="text"
                placeholder="请输入用户名或手机号"
                v-model="form.username" />
            </div>
            <!-- 错误提示 -->
            <div class="error" v-if="errors.username"><i class="iconfont icon-warning" />{{ errors.username }}</div>
          </div>
          <div class="form-item">
            <!-- 密码隐藏 -->
            <div class="input" v-show="showPass === false">
              <i class="iconfont icon-lock"></i>
              <Field
                :class="{ error: errors.password }"
                name="password"
                type="password"
                placeholder="请输入密码"
                v-model="form.password"
                autocomplete="off" />
              <svg
                @click="showPass = true"
                t="1665455426550"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="5857"
                width="16"
                height="16">
                <path
                  d="M917.333333 573.866667l-87.466666-87.466667c34.133333-32 66.133333-68.266667 91.733333-108.8 8.533333-14.933333 4.266667-34.133333-10.666667-44.8-14.933333-8.533333-34.133333-4.266667-44.8 10.666667-76.8 125.866667-209.066667 200.533333-356.266666 200.533333-145.066667 0-279.466667-74.666667-354.133334-198.4-8.533333-14.933333-29.866667-19.2-44.8-10.666667-14.933333 8.533333-19.2 29.866667-10.666666 44.8 25.6 40.533333 55.466667 76.8 91.733333 108.8l-85.333333 85.333334c-12.8 12.8-12.8 32 0 44.8 6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333l91.733333-91.733334c38.4 25.6 81.066667 46.933333 125.866667 59.733334l-34.133333 130.133333c-4.266667 17.066667 6.4 34.133333 23.466666 38.4 2.133333 0 6.4 2.133333 8.533334 2.133333 14.933333 0 27.733333-8.533333 29.866666-23.466666l36.266667-132.266667c25.6 4.266667 51.2 6.4 78.933333 6.4 27.733333 0 55.466667-2.133333 83.2-6.4l36.266667 132.266667c4.266667 14.933333 17.066667 23.466667 29.866667 23.466666 2.133333 0 6.4 0 8.533333-2.133333 17.066667-4.266667 27.733333-21.333333 23.466667-38.4L661.333333 584.533333c44.8-12.8 85.333333-34.133333 123.733334-59.733333l91.733333 91.733333c6.4 6.4 14.933333 8.533333 23.466667 8.533334s17.066667-2.133333 23.466666-8.533334c6.4-10.666667 6.4-29.866667-6.4-42.666666z"
                  p-id="5858"></path>
              </svg>
            </div>
            <!-- 错误提示信息 -->
            <div class="error" v-if="errors.password"><i class="iconfont icon-warning" />{{ errors.password }}</div>

            <!-- 密码显示 -->
            <div class="input" v-show="showPass === true">
              <i class="iconfont icon-lock"></i>
              <Field
                :class="{ error: errors.password }"
                name="password"
                type="text"
                placeholder="请输入密码"
                v-model="form.password" />
              <svg
                @click="showPass = false"
                t="1665455395730"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="4883"
                width="16"
                height="16">
                <path
                  d="M512 384a128.853333 128.853333 0 0 0-128 128c0 70.058667 57.941333 128 128 128 70.016 0 128-57.941333 128-128 0-70.016-57.984-128-128-128z"
                  fill=""
                  p-id="4884"></path>
                <path
                  d="M512 213.333333c-325.674667 0-423.552 282.325333-424.448 285.184a42.410667 42.410667 0 0 0 0 27.008C88.448 528.341333 186.325333 810.666667 512 810.666667s423.552-282.325333 424.448-285.184a42.410667 42.410667 0 0 0 0-27.008C935.552 495.658667 837.674667 213.333333 512 213.333333z m0 512c-228.309333 0-316.757333-164.096-338.176-213.333333C195.328 462.592 283.818667 298.666667 512 298.666667c228.309333 0 316.757333 164.096 338.176 213.333333-21.504 49.408-109.994667 213.333333-338.176 213.333333z"
                  fill=""
                  p-id="4885"></path>
              </svg>
            </div>
            <!-- 错误提示信息 -->
            <div class="error" v-if="errors.password && showPass === true">
              <i class="iconfont icon-warning" />{{ errors.password }}
            </div>
          </div>
        </template>
        <!-- 验证码登录的表单 -->
        <template v-else>
          <div class="form-item">
            <div class="input">
              <i class="iconfont icon-user"></i>
              <Field
                :class="{ error: errors.mobile }"
                name="mobile"
                type="text"
                placeholder="请输入手机号"
                v-model="form.mobile" />
            </div>
            <!-- 错误提示 -->
            <div class="error" v-if="errors.mobile"><i class="iconfont icon-warning" />{{ errors.mobile }}</div>
          </div>
          <div class="form-item">
            <div class="input">
              <i class="iconfont icon-code"></i>
              <Field
                :class="{ error: errors.code }"
                name="code"
                type="text"
                placeholder="请输入验证码"
                v-model="form.code" />
              <span class="code" @click="getCode" v-if="count == 60">发送验证码</span>
              <span class="code" v-else>{{ count }}秒后发送</span>
            </div>
            <!-- 错误提示 -->
            <div class="error" v-if="errors.code"><i class="iconfont icon-warning" />{{ errors.code }}</div>
          </div>
        </template>
        <div class="form-item">
          <div class="agree">
            <CategoryChecked v-model="form.isAgree" />
            <span>我已同意</span>
            <a href="javascript:;">《隐私条款》</a>
            <span>和</span>
            <a href="javascript:;">《服务条款》</a>
          </div>
        </div>
        <a href="javascript:;" class="btn" @click="login">登录</a>
      </template>
    </From>
    <div class="action">
      <a
        href="https://graph.qq.com/oauth2.0/show?which=Login&display=pc&client_id=100556005&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback">
        <img src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt="" />
      </a>

      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { userAccountLoginAPI, userMobileLoginAPI, userMobileLogincodeAPI } from '@/api'
import type { LoginResult } from '@/api/types'
import CategoryChecked from '@/components/home/category/category-checked.vue'
import { ruleUsername, rulePassword, ruleMobile, ruleCode, ruleIsAgree } from '@/utils/form-rules'
import From from './components/From.vue'
import Field from './components/Field.vue'
import useStore from '@/stores'
// 是否显示密码
const showPass = ref(false)
// 什么方式登录
const isMsgLogin = ref(false)
// 登录要求
const form = reactive({
  username: 'xiaotuxian001', // 用户名
  password: '123456', // 密码
  mobile: '', // 手机号
  code: '', // 验证码
  isAgree: true, // 是否同意协议
})
// 自定义的校检规则
const rules = {
  username: ruleUsername, // 用户名
  password: rulePassword, // 密码
  mobile: ruleMobile, // 手机号
  code: ruleCode, // 验证码
  isAgree: ruleIsAgree, // 是否同意协议
}
// From组件上的ref
const formErrors: any = ref(null)
// 监听表单登录方式的变化
watch(isMsgLogin, () => {
  form.isAgree = true
  formErrors.value.clearErr()
})

// 获取验证码时间
const count = ref(60)
// 获取验证码函数
const getCode = async () => {
  if (ruleMobile(form.mobile) === true) {
    let timer: number = 1
    // 清除定时器
    clearInterval(timer)
    // 设置定时器
    timer = setInterval(() => {
      count.value--
      if (count.value == 0) {
        clearInterval(timer)
        count.value = 60
      }
    }, 1000)
    try {
      form.code = (await userMobileLogincodeAPI(form.mobile)) as string
    } catch (e) {
      // 清除定时器
      clearInterval(timer)
      // 隐藏读秒
      count.value = 60
      instance?.proxy?.$Message({ type: 'error', text: '该用户不存在请先注册' })
    }
    return
  }
  instance?.proxy?.$Message({ type: 'error', text: '请输入正确的手机号' })
}

const instance = getCurrentInstance()
// 用户仓库
const { user, cart } = useStore()
const router = useRouter()
const route = useRoute()

// 需要在点击登录的时候对整体表单进行校验
const login = async () => {
  formErrors.value.getErr()
  if (!isMsgLogin.value) {
    try {
      const { account, nickname, avatar, token, mobile } = (await userAccountLoginAPI({
        account: form.username,
        password: form.password,
      })) as LoginResult
      // 给仓库中赋值
      user.setState({ account, nickname, avatar, token, mobile })
      cart.mergeCart()
      instance?.proxy?.$Message({ type: 'success', text: '登录成功' }) // 给出信息提示

      router.push((route.query.redirectUrl as string) || '/')
    } catch (e) {
      instance?.proxy?.$Message({ type: 'error', text: '登录失败' })
    }
    // 密码登录
  } else {
    try {
      const { account, nickname, avatar, token, mobile } = (await userMobileLoginAPI({
        mobile: form.mobile,
        code: form.code,
      })) as LoginResult
      // 给仓库中赋值
      user.setState({ account, nickname, avatar, token, mobile })
      cart.mergeCart()
      // 给出信息提示
      instance?.proxy?.$Message({ type: 'success', text: '登录成功' })
      router.push((route.query.redirectUrl as string) || '/')
    } catch (e) {
      instance?.proxy?.$Message({ type: 'error', text: '登录失败' })
    }
  }
}
</script>
<style lang="less">
// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: @xtxColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        > .icon {
          position: absolute;
          right: 4px;
          top: 10px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: @priceColor;
          }
          &.active,
          &:focus {
            border-color: @xtxColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>

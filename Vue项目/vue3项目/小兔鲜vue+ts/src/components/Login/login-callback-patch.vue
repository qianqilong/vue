<template>
  <From class="xtx-form" :form="form" :rule="rule" ref="FromRef">
    <template #rule="{ errors }">
      <div class="xtx-form-item">
        <div class="field">
          <i class="icon iconfont icon-user"></i>
          <Field
            :class="{ err: errors.username }"
            class="input"
            type="text"
            placeholder="请输入用户名"
            v-model="form.username" />
        </div>
        <div class="error" v-if="errors.username">{{ errors.username }}</div>
      </div>
      <div class="xtx-form-item">
        <div class="field">
          <i class="icon iconfont icon-phone"></i>
          <Field
            :class="{ err: errors.mobile }"
            class="input"
            type="text"
            placeholder="请输入手机号"
            v-model="form.mobile" />
        </div>
        <div v-if="errors.mobile" class="error">{{ errors.mobile }}</div>
      </div>
      <div class="xtx-form-item">
        <div class="field">
          <i class="icon iconfont icon-code"></i>
          <Field
            :class="{ err: errors.code }"
            class="input"
            type="text"
            placeholder="请输入验证码"
            v-model="form.code" />
          <span class="code" @click="getCode" v-if="count === 60">发送验证码</span>
          <span class="code" v-else>{{ count }}秒后发送</span>
        </div>
        <div v-if="errors.code" class="error">{{ errors.code }}</div>
      </div>
      <div class="xtx-form-item">
        <div class="field">
          <i class="icon iconfont icon-lock"></i>
          <Field
            :class="{ err: errors.password }"
            class="input"
            type="password"
            placeholder="请输入密码"
            v-model="form.password"
            autocomplete="off" />
        </div>
        <div v-if="errors.password" class="error">{{ errors.password }}</div>
      </div>
      <div class="xtx-form-item">
        <div class="field">
          <i class="icon iconfont icon-lock"></i>
          <Field
            :class="{ err: repasswordInfo.err !== '' }"
            class="input"
            type="password"
            placeholder="请确认密码"
            v-model="repasswordInfo.repassword"
            autocomplete="off" />
        </div>
        <div class="error" v-if="repasswordInfo.err !== ''">{{ repasswordInfo.err }}</div>
      </div>
      <a href="javascript:;" class="submit" @click="submit">立即提交</a>
    </template>
  </From>
</template>

<script lang="ts" setup>
import From from './components/From.vue'
import Field from './components/Field.vue'
import { ruleUsername, rulePassword, ruleMobile, ruleCode } from '@/utils/form-rules'
import { userregisterAPI, userregisterCodeAPI } from '@/api'
import type { LoginResult } from '@/api/types'
import useStore from '@/stores'

// 表单验证
const form = reactive({
  username: '', // 用户名
  mobile: '', // 手机号
  code: '', // 验证码
  password: '', // 密码
})
// 样子规则
const rule = {
  username: ruleUsername,
  mobile: ruleMobile,
  code: ruleCode,
  password: rulePassword,
}
// 确认密码
const repasswordInfo = reactive({
  repassword: '',
  err: '',
})
// 监听密码的变化
watch(
  [() => repasswordInfo.repassword, () => form],
  () => {
    repasswordInfo.repassword !== form.password ? (repasswordInfo.err = '密码不一致') : (repasswordInfo.err = '')
  },
  { deep: true },
)

// 读秒
const count = ref(60)
// 获取验证码
const getCode = async () => {
  let timer = 1
  clearInterval(timer)
  if (ruleMobile(form.mobile) === true) await userregisterCodeAPI(form.mobile)
  form.code = '123456'
  timer = setInterval(() => {
    count.value--
    if (count.value === 0) {
      count.value = 60
      clearInterval(timer)
    }
  }, 1000)
}
const instance = getCurrentInstance()
const FromRef: any = ref(null)
const { user } = useStore()
const router = useRouter()
// 登录注册
const submit = async () => {
  if (FromRef.value.getErr() && repasswordInfo.err === '') {
    // 登录成功获取用户的信息
    const { account, avatar, mobile, nickname, token } = (await userregisterAPI({
      account: form.username,
      password: form.password,
      code: form.code,
      mobile: form.mobile,
    })) as LoginResult
    // 存入仓库
    user.setState({ account, nickname, avatar, token, mobile })
    // 跳转地址
    router.push(user.redirectUrl)
    // 成功提示
    instance?.proxy?.$Message({ type: 'success', text: '登录成功' })
  }
}
</script>

<style scoped lang="less">
.code {
  position: absolute;
  right: 0;
  top: 0;
  line-height: 50px;
  width: 80px;
  color: #999;
  &:hover {
    cursor: pointer;
  }
}
</style>

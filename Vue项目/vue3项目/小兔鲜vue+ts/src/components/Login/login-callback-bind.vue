<template>
  <From class="xtx-form" :rule="rules" :form="form" ref="getErr">
    <template #rule="{ errors }">
      <div class="user-info">
        <img src="http://qzapp.qlogo.cn/qzapp/101941968/57C7969540F9D3532451374AA127EE5B/50" alt="" />
        <p>Hi，{{ nickname }} 欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~</p>
      </div>
      <div class="xtx-form-item">
        <div class="field">
          <i class="icon iconfont icon-phone"></i>
          <Field
            :class="{ err: errors.mobile }"
            class="input"
            type="text"
            placeholder="绑定的手机号"
            v-model="form.mobile" />
        </div>
        <div v-if="errors.mobile" class="error">{{ errors.mobile }}</div>
      </div>
      <div class="xtx-form-item">
        <div class="field">
          <i class="icon iconfont icon-code"></i>
          <Field :class="{ err: errors.code }" class="input" type="text" placeholder="短信验证码" v-model="form.code" />
          <span class="code" @click="sendCode" v-if="second === 60">发送验证码</span>
          <span class="code" v-else>{{ second }}秒后发送</span>
        </div>
        <div v-if="errors.code" class="error">{{ errors.code }}</div>
      </div>
      <a href="javascript:;" class="submit" @click="submit">立即绑定</a>
    </template>
  </From>
</template>

<script lang="ts" setup>
import From from '@/components/Login/components/From.vue'
import Field from '@/components/Login/components/Field.vue'
import { ruleMobile, ruleCode } from '@/utils/form-rules'
import { userQQLoginBindAPI, userQQLoginCodeAPI } from '@/api'
import type { LoginResult } from '@/api/types'
import useStore from '@/stores'

const props = defineProps({
  unionId: {
    type: String,
    default: '',
  },
})

// 自定义的校检规则
const rules = {
  mobile: ruleMobile, // 手机号
  code: ruleCode, // 验证码
}
// 表单参数
const form = reactive({
  mobile: '',
  code: '',
})
const nickname = ref('')
const avatar = ref('')
// 如果已经登录成功
if (window.QC.Login.check()) {
  // 获取登录的用户信息
  window.QC.api('get_user_info').success((res: any) => {
    avatar.value = res.data.figureurl_1
    nickname.value = res.data.nickname
  })
}
const instance = getCurrentInstance()

// 验证读秒参数
const second = ref(60)

// 获取验证码
const sendCode = async () => {
  let timer = 1
  clearInterval(timer)
  // 校检手机号
  const flag = ruleMobile(form.mobile)
  if (flag === true && second.value === 60) {
    timer = setInterval(() => {
      second.value--
      if (second.value === 0) {
        second.value = 60
        clearInterval(timer)
      }
    }, 1000)
    try {
      // 获取短信验证码
      await userQQLoginCodeAPI(form.mobile)
    } catch (e) {
      instance?.proxy?.$Message({ type: 'error', text: '获取验证码失败' })
    }
  } else {
    instance?.proxy?.$Message({ type: 'warn', text: flag as string })
  }
}

// 表单的实例
const getErr: any = ref(null)
const { user } = useStore()
const router = useRouter()
// 绑定账号信息
const submit = async () => {
  // 调用表单的错误信息
  getErr.value.getErr()
  try {
    // 登录成功获取用户的信息
    const { account, avatar, mobile, nickname, token } = (await userQQLoginBindAPI(
      props.unionId,
      form.mobile,
      form.code,
    )) as LoginResult
    // 存入仓库
    user.setState({ account, nickname, avatar, token, mobile })
    // 跳转地址
    router.push(user.redirectUrl)
    // 成功提示
    instance?.proxy?.$Message({ type: 'success', text: '登录成功' })
  } catch (e) {
    instance?.proxy?.$Message({ type: 'error', text: '用户信息不存在' })
  }
}
</script>

<style scoped lang="less">
.user-info {
  width: 320px;
  height: 70px;
  margin: 0 auto;
  display: flex;
  background: #f2f2f2;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 25px;
  img {
    background: #f2f2f2;
    width: 50px;
    height: 50px;
  }
  p {
    padding-left: 10px;
  }
}
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

import { defineComponent, reactive, ref } from 'vue'
import XtxCheckbox from '../xtx-checkbox/xtx-checkbox'
import schema from '@/utils/vee-validate-schema'
import XtxMessage from '../xtx-message/xtx-message'
import Message from '@/utils/Message'
import './login-form.less'
import { userAccountLoginAPI, userMobileLoginMsgAPI } from '@/api'
import store from '@/store'
import { useRoute, useRouter } from 'vue-router'
export default defineComponent({
  name: 'login-form',
  setup () {
    const activeName = ref('MsgLogin')
    const time = ref(0)
    // 表单信息
    const form:any = reactive({
      checked: true,
      account: 'xiaotuxian001',
      password: '123456',
      mobile: null,
      code: null
    })
    const route = useRoute()
    const router = useRouter()
    // 错误信息
    const errors:any = reactive({
      account: '',
      password: '',
      mobile: '',
      code: '',
      isAgree: ''
    })
    // 提交信息
    const subSchemea = () => {
      errors.account = (schema.account(form.account))
      errors.password = (schema.password(form.password))
      errors.mobile = (schema.mobile(form.mobile))
      errors.code = (schema.code(form.code))
      errors.isAgree = (schema.isAgree(form.checked))
      if (errors.isAgree === true) {
        if (errors.account === true && errors.password === true) {
          userAccountLoginAPI(form.account, form.password).then((res:any) => {
            const { id, account, nickname, avatar, token, mobile } = res.result
            store.commit('user/setUser', { id, account, nickname, avatar, token, mobile })
            Message({ type: 'success', text: '登录成功' })
            const path:any = route.query.redirectUrl
            router.push(path || '/')
          })
        } else if (errors.mobile === true && errors.code === true) {
          console.log('提交成功')
        }
      }
    }
    // 切换登录情况
    const switchFn = (value:string) => {
      activeName.value = value
      form.checked = true
      form.account = null
      form.password = null
      form.mobile = null
      form.code = null
    }
    // 点击记时
    const setTime = () => {
      const timer = setInterval(() => {
        if (time.value === 0) {
          time.value = 60
        }
        time.value--
      }, 1000)
      setTimeout(() => {
        clearInterval(timer)
      }, 60 * 1000)
      if (form.mobile !== '') {
        userMobileLoginMsgAPI(form.mobile).then((res:any) => {
          console.log(res)
        })
      }
    }
    return () => (
    <div class="account-box">
      {/* 切换按键 */}
    <div class="toggle">
        {
           activeName.value === 'MsgLogin'
             ? <a onClick={() => switchFn('isMsgLogin')}>
                <i class="iconfont icon-msg"></i> 使用短信登录
               </a>
             : <a onClick={() => switchFn('MsgLogin')}>
                <i class="iconfont icon-user"></i> 使用账号登录
               </a>
        }
    </div>
    <form class="form">
    {
    activeName.value === 'MsgLogin'
      ? <div>
             <div class="form-item">
               <div class="input">
                 <i class="iconfont icon-user"></i>
                 <input style={{ border: (errors.account !== '' && errors.account !== true ? '1px solid red' : '') }} type="text" placeholder="请输入用户名或手机号" v-model={form.account}/>
               </div>
               {
                errors.account !== '' && errors.account !== true
                  ? <XtxMessage text={errors.account}/>
                  : ''
               }
             </div>
             <div class="form-item">
               <div class="input">
                 <i class="iconfont icon-lock"></i>
                 <input style={{ border: (errors.password !== '' && errors.password !== true ? '1px solid red' : '') }} type="password" placeholder="请输入密码" v-model={form.password} autocomplete="off"/>
               </div>
               {
                errors.password !== '' && errors.password !== true
                  ? <XtxMessage text={errors.password}/>
                  : ''
               }
             </div>
    </div>
      : <div>
             <div class="form-item">
               <div class="input">
                 <i class="iconfont icon-user"></i>
                 <input style={{ border: (errors.mobile !== '' && errors.mobile !== true ? '1px solid red' : '') }} type="text" placeholder="请输入手机号" v-model={form.mobile}/>
               </div>
               {
                 errors.mobile !== '' && errors.mobile !== true
                   ? <XtxMessage text={errors.mobile}/>
                   : ''
               }
             </div>
             <div class="form-item">
               <div class="input">
                 <i class="iconfont icon-code"></i>
                 <input style={{ border: (errors.code !== '' && errors.code !== true ? '1px solid red' : '') }} type="password" placeholder="请输入验证码" v-model={form.code}/>
                 <span class="code" onClick={setTime}>{time.value === 0 ? '发送验证码' : `${time.value}秒后发送`}</span>
               </div>
               {
                 errors.code !== '' && errors.code !== true
                   ? <XtxMessage text={errors.code}/>
                   : ''
               }
             </div>
    </div>
    }
      <div class="form-item">
        <div class="agree">
          <XtxCheckbox v-model:checked={form.checked}/>
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
        {
        errors.isAgree !== '' && errors.isAgree !== true
          ? <XtxMessage text={errors.isAgree}/>
          : ''
        }
      </div>
      <a href="javascript:;" class="btn" onClick={subSchemea}>登录</a>
    </form>
    <div class="action">
      <img src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt=""/>
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
    )
  }

})

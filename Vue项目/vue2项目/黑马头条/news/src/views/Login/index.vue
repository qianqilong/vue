<template>
<div>
  <!-- 标题 -->
  <van-nav-bar
  title="黑马头条-登陆"/>
  <!-- 表单目录
  1.收集值以后调用接口，查看登陆结果
  2.点击登陆加载，实现防抖
   -->
  <div>
    <van-form @submit="onSubmit">
      <!--
      van-field输入框
      name：{"用户名"："页面值"}
      rules：表单校检规则
      labal：属性输入框的左侧文本
      required：不填会出现*
      pattern:配置正则
       -->
  <van-field
    v-model="user.mobile"
    name="mobile"
    label="手机号"
    required
    placeholder="请输入手机号"
    :rules="[{ required: true, message: '请填写11位手机号' ,pattern:/^1[3-9]\d{9}$/}]"
  />
  <van-field
    v-model="user.code"
    type="text"
    required
    name="code"
    label="验证码"
    placeholder="请输入验证码"
    :rules="[{ required: true, message: '请填写正确验证码' ,pattern:/^\d{6}$/}]"
  >  <template #button>
    <van-button size="small" type="primary">发送验证码</van-button>
  </template></van-field>
  <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit" :loading="isLoading" loading-text="登陆中......" :disabled="isLoading">登陆</van-button>
  </div>
</van-form>
  </div>
</div>
</template>

<script>
import Dialog from '@/utils/Dialog.js'
import { loginAPI } from '@/api'
import { setToken } from '@/utils/token.js'
export default {
  name: 'Login',
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: ''// 密码246810
      },
      isLoading: false// 登陆按键的加载状态
    }
  },
  methods: {
    async  onSubmit (values) {
      // 收集的参数名和值
      // console.log('submit', values)
      this.isLoading = true
      try {
        const res = await loginAPI(values)
        Dialog({ message: '登陆成功' })
        // 存储token
        setToken(res.data.data.token)
        // 续约token
        localStorage.setItem('refresh_token', res.data.data.refresh_token)
        /* 跳转页面
        1.this.$router.push压栈
        2.this.$router.replace
      */
        this.$router.replace({
          path: this.$route.query.path || '/layout/home'// 页面未遂的跳转
        })
      } catch (err) {
        Dialog({ message: '验证码错误' })
      }
      this.isLoading = false
    }
  }

}
</script>

<style scoped lang="less">
/*基本不用的方式
// .van-nav-bar{
//    background: #007bff;
// }
//  此选择器是van-nav-bar组件内的标签
// scoped尝试把此选择器后属性选择器匹配当前页面标签，选不中组件内部的标签
// 结论：要修改组件内样式，用了scoped就要在选择器前加/deep/
//

// /deep/.van-nav-bar__title{
// color: white;
// }*/

</style>

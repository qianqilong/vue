<template>
  <div class="user-edit-container">
    <!-- Header 区域 -->
    <van-nav-bar title="编辑资料" left-arrow @click-left="$router.back()" fixed />

    <!-- 用户资料 -->
    <van-cell-group class="action-card">
      <van-cell title="头像" is-link center>
        <template #default>
          <van-image round class="avatar" :src="userInfo.photo" @click="imageClickFn"/>
           <!-- file 选择框，视觉上隐藏还可以使用 -->
        <input
               type="file"
               ref="iptFile"
               v-show="false"
               accept="image/*"
               @change="onFileChange"
               />
        </template>
      </van-cell>
      <van-cell title="名称" is-link v-model="userInfo.name" @click="updateName"  />
      <van-cell title="生日" is-link v-model="userInfo.birthday" @click="modifyYourBirthday" />
    </van-cell-group>
    <!-- 姓名修改的弹窗 -->
    <van-dialog v-model="show" title="标题" show-cancel-button  :before-close="beforeClose">
  <input type="text"  v-fofo v-model="thename" style="text-align: center" >
</van-dialog>
<!-- 生日修改弹窗 -->
<van-popup v-model="showDate" position="bottom" :style="{ height: '50%' }" round >
<van-datetime-picker
  v-model="currentDate"
  type="date"
  title="选择年月日"
  :min-date="minDate"
  :max-date="maxDate"
  @confirm="finishedEditingFn"
  @cancel="cancelTheModificationFn"
/>
</van-popup>
  </div>
</template>

<script>
import { userInfoAPI, updatePhotoAPI, updateBasicInformationAPI } from '@/api'
import { Toast } from 'vant'
import dayjs from 'dayjs'
export default {
  name: 'UserEdit',
  data () {
    return {
      userInfo: {}, // 用户信息
      show: false, // 控制姓名修改输入框的显示和隐藏
      thename: '', // 修改姓名的名字
       minDate: new Date(1950, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(2021, 0, 17), // 用户响应的时间
      showDate: false // 控制时间选择器的显示
    }
  },
  methods: {
    // 更头像的方法
   async onFileChange (e) {
     const theFd = new FormData()
     theFd.append('photo', e.target.files[0])
     const res = await updatePhotoAPI(theFd)
     this.userInfo.photo = res.data.data.photo
    //  保存的vuex中
    this.$store.dispatch('setPhoto', res.data.data.photo)
    },
    // 模拟点击表单
    imageClickFn () {
       this.$refs.iptFile.click()
    },

// 修改姓名
    updateName () {
     this.show = true
     this.thename = this.userInfo.name
    //  调用接口
    },
    // 姓名校检---关闭修改姓名弹出层的函数
   async beforeClose (action, done) {
      if (action === 'confirm') { // 点击确定
    const reg = /^[a-zA-Z0-9\u4e00-\u9fa5]{1,7}$/
     if (reg.test(this.thename)) {
       await updateBasicInformationAPI({ name: this.thename })
       this.userInfo.name = this.thename
      done()// 关闭弹窗
    } else {
      done(false)
      Toast('请输入正确的姓名！')
    }
   } else {
     done()// 关闭弹窗
   }
    },

// 修改生日
    modifyYourBirthday () {
     this.showDate = true
     this.currentDate = new Date(this.userInfo.birthday)
    },
    // 点击确认按键的操作
   async finishedEditingFn () {
   const formatDate = dayjs(this.currentDate).format('YYYY-MM-DD') // 格式化时间
    await updateBasicInformationAPI({ birthday: formatDate }) // 调用修改的接口
   this.userInfo.birthday = formatDate 
      this.showDate = false
    },
    // 点击取消按键的操作
    cancelTheModificationFn () {
        this.showDate = false
    }
  },
  // 获取用户数据
 async created () {
   try {
   const res = await userInfoAPI()
   this.userInfo = res.data.data
   } catch (e) {
   }
     }
}
</script>

<style lang="less" scoped>
.user-edit-container {
  padding-top: 46px;
  .avatar {
    width: 50px;
    height: 50px;
  }
}
::v-deep .van-dialog__content{
 
  text-align: center ;
  input{
   border: none;
  }
}
</style>

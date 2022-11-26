<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="user.user.token">
          <li>
            <RouterLink to="/user/home"><i class="iconfont icon-user"></i>{{ user.user.account }}</RouterLink>
          </li>
          <li><a href="javascript:;" @click="outLogin">退出登录</a></li>
        </template>
        <template v-else>
          <li><RouterLink to="/login">请先登录</RouterLink></li>
          <li><a href="javascript:;">免费注册</a></li>
        </template>
        <li><a href="javascript:;">我的订单</a></li>
        <li><a href="javascript:;">会员中心</a></li>
        <li><a href="javascript:;">帮助中心</a></li>
        <li><a href="javascript:;">关于我们</a></li>
        <li>
          <a href="javascript:;"><i class="iconfont icon-phone"></i>手机版</a>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script lang="ts" setup>
import useStore from '@/stores'

const { user } = useStore()
const instance = getCurrentInstance()
// 退出登录
const outLogin = () => {
  user.cleatState()
  instance?.proxy?.$Message({ type: 'success', text: '退出登录成功' })
}
</script>
<style scoped lang="less">
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover {
          color: @xtxColor;
        }
      }
      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>

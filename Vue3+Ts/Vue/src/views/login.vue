<template>
  <div>
    <h1>登录</h1>
    <form>
      user:<input type="text" v-model="userinfo.user" /><br />
      password:<input
        type="password"
        autocomplete="tel"
        v-model="userinfo.password"
      /><br />
    </form>
    <button @click="login">登录</button>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userinfo = reactive({
  user: '',
  password: ''
})
const login = () => {
  const ajax = new XMLHttpRequest()
  ajax.open(
    'get',
    `http://localhost:9000/login?user=${userinfo.user}&password=${userinfo.password}`
  )
  ajax.send()
  ajax.onreadystatechange = function () {
    if (ajax.readyState == 4 && ajax.status == 200) {
      console.log(JSON.parse(ajax.responseText).route) //输入相应的内容
      JSON.parse(ajax.responseText).route.forEach((item: any) => {
        router.addRoute({
          path: item.path,
          name: item.name,
          component: () => import(`../components/${item.component}`)
        })
        router.push('/home')
        console.log(router.getRoutes())
      })
    }
  }
}
</script>

<style scoped lang="less"></style>

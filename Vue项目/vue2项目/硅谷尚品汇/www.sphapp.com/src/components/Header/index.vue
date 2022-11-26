<template>
  <header class="header">
            <!-- 头部的第一行 -->
            <div class="top">
                <div class="container">
                    <div class="loginList">
                        <p>尚品汇欢迎您！</p>
                        <p v-if="!userName">
                            <span>请</span>
                            <router-link to="/login">登录</router-link>
                            <router-link to="/register" class="register">免费注册</router-link>
                        </p>
                        <p v-else>
                            <a >{{userName}}</a>
                            <a class="register" @click="logout">退出登陆</a>
                        </p>
                    </div>
                    <div class="typeList">
                        <router-link to="/center/myorder">我的订单</router-link>
                        <router-link to="/shopcart">我的购物车</router-link>
                        <router-link to="#">我的尚品汇</router-link>
                        <router-link to="#">尚品汇会员</router-link>
                        <router-link to="#">企业采购</router-link>
                        <router-link to="#">关注尚品汇</router-link>
                        <router-link to="#">合作招商</router-link>
                        <router-link to="#">商家后台</router-link>
                    </div>
                </div>
            </div>
            <!--头部第二行 搜索区域-->
            <div class="bottom">
                <h1 class="logoArea">
                    <router-link class="logo" title="尚品汇" to="/home">
                           <img src="./image/logo.png">
                    </router-link>
                </h1>
                <div class="searchArea">
                    <form action="###" class="searchForm">
                        <input type="text" id="autocomplete" class="input-error input-xxlarge"  v-model="keyword"/>
                        <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">搜索</button>
                    </form>
                </div>
            </div>
        </header>
</template>

<script>
export default {
name:'Header',
data() {
    return {
        keyword:''
    }
},
methods:{
    // 搜索按键的回调
    goSearch(){
          // 路由传参
         // 1.字符串写法
         // this.$router.push(`/search/${this.keyword}?k=1`)
         // 2.对象写法,多次传递同一个关键字会有异常,push是返回一个promis对象，给他成功和失败的回调就可解决
         if(this.$route.query){
            let location={ name:'search',params:{keyword:this.keyword||undefined},query:this.$route.query}
     this.$router.push(location)
         }
        this.$bus.$emit('reqgetData', this.keyword);
        this.keyword=''
    },
    // 退出登陆清除token
    logout(){
    //    清除token
    try{
  this.$store.dispatch('getLogout')
this.$router.push('/login') 
    }catch(e){
        alert()
    }
  
    }
},
computed:{
    // 用户名信息
    userName(){
      
return this.$store.state.user.userInfo.name
    }
},
 
}
</script>

<style scoped lang="less">
.header {
        &>.top {
            background-color: #eaeaea;
            height: 30px;
            line-height: 30px;

            .container {
                width: 1200px;
                margin: 0 auto;
                overflow: hidden;

                .loginList {
                    float: left;

                    p {
                        float: left;
                        margin-right: 10px;

                        .register {
                            border-left: 1px solid #b3aeae;
                            padding: 0 5px;
                            margin-left: 5px;
                        }
                    }
                }

                .typeList {
                    float: right;

                    a {
                        padding: 0 10px;

                        &+a {
                            border-left: 1px solid #b3aeae;
                        }
                    }

                }

            }
        }

        &>.bottom {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .logoArea {
                float: left;

                .logo {
                    img {
                        width: 175px;
                        margin: 25px 45px;
                    }
                }
            }

            .searchArea {
                float: right;
                margin-top: 35px;

                .searchForm {
                    overflow: hidden;

                    input {
                        box-sizing: border-box;
                        width: 490px;
                        height: 32px;
                        padding: 0px 4px;
                        border: 2px solid #ea4a36;
                        float: left;

                        &:focus {
                            outline: none;
                        }
                    }

                    button {
                        height: 32px;
                        width: 68px;
                        background-color: #ea4a36;
                        border: none;
                        color: #fff;
                        float: left;
                        cursor: pointer;

                        &:focus {
                            outline: none;
                        }
                    }
                }
            }
        }
    }
</style>
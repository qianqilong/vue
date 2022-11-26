<template>
	<div id="app">
		<Header />
		<router-view></router-view>
		<Footer v-show="$route.meta.show" />
		<!-- footer在home和search是显示的，在登陆注册是隐藏的 -->
	</div>
</template>

<script>
import Header from '@/components/Header'
import Footer from './components/Footer'
export default {
	name: 'App',
	components: {
		Header,
		Footer
	},

	mounted(){
			// 通知vuex发送请求获取数据
		this.$store.dispatch('categoryList')
		this.$store.dispatch('BannerList')
		this.$store.dispatch('FloorList')
	// this.$store.dispatch('getUserInfo'
  this.$store.dispatch('getaddress')
      this.$store.dispatch('getOrder')
    
	}
}
</script>

<style>
</style>

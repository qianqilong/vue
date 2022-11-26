<template>
	<div>
		<!-- 搜索结果页-头部导航 -->
		<div class="search-result-container">
			<!-- 点击实现后退效果 -->
			<van-nav-bar
				title="搜索结果"
				left-arrow
				@click-left="$router.go(-1)"
				fixed
			/>
		</div>
		<!-- 文章列表 -->
		<div>

			<!-- 下拉刷新 -->
			<van-list
				v-model="loading"
				:finished="finished"
				finished-text="没有更多了"
				@load="onLoad"
				:immediate-check="false"
			>
				<Articleitem
					v-for="item in articleList"
					:key="item.art_id"
					:artObj="item"
					:isShow="false"
					@click.native="itemClickFn(item.art_id)"
				></Articleitem>
			</van-list>

		</div>
	</div>
</template>

<script>
import { searchResultAPI } from '@/api'
import Articleitem from '@/components/Articleitem.vue'
export default {
	name: 'SearchResult',
	components: { Articleitem },
	data () {
		return {
			page: 1, // 页码
			articleList: [], // 文章列表
			loading: false, // 是否在加载中
			finished: false // 是否加载完成
		}
	},
	methods: {
		async onLoad () {
			if (this.articleList.length > 0) {
				this.page++
				const res = await searchResultAPI({
					page: this.page,
					q: this.$route.params.kw // node中参数路由参数是存在req.params,路由
				})
				if (res.data.data.results.length === 0) {
					this.finished = true
					return
				}
				this.articleList = [...this.articleList, ...res.data.data.results]
				this.loading = false
			}
		},
		// 对于后端node和vue而言query中是查询字符串，params是参数路由
		// 对于axios等请求库发送get请求而言是将查询字符串放入params，两者不可以弄混
		// 进入列表
		itemClickFn (id) {
		this.$router.push({
			path: '/detail',
	  	query: {
				id
			}
		})
		}
	},
	async created () {
		const res = await searchResultAPI({
			page: this.page,
			q: this.$route.params.kw // node中参数路由参数是存在req.params,路由
		})
		this.articleList = res.data.data.results
	}
}
</script>

<style lang="less" scoped>
.search-result-container {
	padding-top: 46px;
}
</style>

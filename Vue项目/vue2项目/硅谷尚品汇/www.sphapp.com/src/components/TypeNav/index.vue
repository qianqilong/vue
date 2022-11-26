<template>
	<div>
		<!-- 商品分类导航 -->
		<div class="type-nav">
			<div class="container" 	@mouseleave="leaveHide">
				<h2
					class="all"
					
					@mouseenter="enterShow"
				>全部商品分类</h2>
				<nav class="nav">
					<a href="###">服装城</a>
					<a href="###">美妆馆</a>
					<a href="###">尚品汇超市</a>
					<a href="###">全球购</a>
					<a href="###">闪购</a>
					<a href="###">团购</a>
					<a href="###">有趣</a>
					<a href="###">秒杀</a>
				</nav>
				<transition name="sort">
					<div
						class="sort"
						@click="goSearch($event)"
						v-show="show"
					>
						<div
							class="all-sort-list2"
						
						>
							<div
								class="item"
								@mouseenter="changeIndex(item.categoryId)"
								@mouseleave="laveIndex"
								v-for="item in categoryList"
								:key='item.categoryId'
								:class="{cur:cateId==item.categoryId}"
							>
								<h3>
									<a
										:data-categoryName="item.categoryName"
										:data-category1id="item.categoryId"
									>{{item.categoryName}} </a>
								</h3>
								<!-- 二三级分类 -->
								<div
									class="item-list clearfix"
									:style="{display:cateId==item.categoryId?'block':'none'}"
								>
									<div class="subitem">
										<dl
											class="fore"
											v-for="item1 in item.categoryChild"
											:key="item1.categoryId"
										>
											<dt>
												<a
													:data-categoryName="item1.categoryName"
													:data-category2id="item1.categoryId"
												>{{item1.categoryName}}</a>
											</dt>
											<dd>
												<em
													v-for="item2 in item1.categoryChild"
													:key="item2.categoryId"
												>
													<a
														:data-categoryName="item2.categoryName"
														:data-category3id="item2.categoryId"
													>{{item2.categoryName}}</a>
												</em>
											</dd>
										</dl>
									</div>
								</div>
							</div>
						</div>
					</div>
				</transition>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import throttle from 'lodash/throttle'
export default {
	name: 'TypeNav',

	data() {
		return {
			cateId: -1,
			pretime: 0,
			show: true
		}
	},
	methods: {
		// 属性移入时列表显示
		enterShow() {
			if (this.$route.path != '/home') {
				this.show = true
			}
		},
		leaveHide() {
			if (this.$route.path != '/home') {
				this.show = false
			}
		},
		// 鼠标放上执行
		changeIndex: throttle(function (id) {
			this.cateId = id
		}, 50),
		// 鼠标移除执行
		laveIndex() {
			this.cateId = -1
		},
		goSearch(e) {
			// 使用声明式到航会出现卡顿()
			// 问题：1.怎么获取联动菜单的a 2.怎么确定是a标签
			// 1.给a标签添加不同的属性存储id 2.给a标签添加自定义属性,dataset可以获取自定义属性和属性值
			let element = e.target
			let { categoryname, category1id, category2id, category3id } = element.dataset
			if (categoryname) {
				let location = { name: 'search' }
				let query = { categoryName: categoryname }
				if (category1id) {
					//  一级菜单
					query.category1id = category1id
				} else if (category2id) {
					query.category2id = category2id
				} else if (category3id) {
					query.category3id = category3id
				}
				//判断有无params参数
				if(this.$route.params){
					location.params=this.$route.params
				}
				location.query = query
				this.$router.push(location)
			}
		}
	},
	// 组件挂载完毕，可以发请求
	mounted() {
	
		if (this.$route.path != '/home') {
			this.show = false
		}
	},
	computed: {
		// 函数形式时右侧需要的是一个函数，当使用这个计算属性时，右侧函数会立即执行一次
		// 注入一个参数state,其实为大仓库是大仓库中的数据
		...mapState({
			categoryList: state => state.home.categoryList
		})
	}
}
</script>

<style scoped lang="less">
.type-nav {
	border-bottom: 2px solid #e1251b;

	.container {
		width: 1200px;
		margin: 0 auto;
		display: flex;
		position: relative;

		.all {
			width: 210px;
			height: 45px;
			background-color: #e1251b;
			line-height: 45px;
			text-align: center;
			color: #fff;
			font-size: 14px;
			font-weight: bold;
		}

		.nav {
			a {
				height: 45px;
				margin: 0 22px;
				line-height: 45px;
				font-size: 16px;
				color: #333;
			}
		}

		.sort {
			position: absolute;
			left: 0;
			top: 45px;
			width: 210px;
			height: 470px;
			position: absolute;
			background: #fafafa;
			z-index: 999;

			.all-sort-list2 {
				.item {
					h3 {
						line-height: 30px;
						font-size: 14px;
						font-weight: 400;
						overflow: hidden;
						padding: 0 20px;
						margin: 0;

						a {
							color: #333;
						}
					}

					.item-list {
						display: none;
						position: absolute;
						width: 734px;
						min-height: 460px;
						background: #f7f7f7;
						left: 210px;
						border: 1px solid #ddd;
						top: 0;
						z-index: 9999 !important;

						.subitem {
							float: left;
							width: 650px;
							padding: 0 4px 0 8px;

							dl {
								border-top: 1px solid #eee;
								padding: 6px 0;
								overflow: hidden;
								zoom: 1;

								&.fore {
									border-top: 0;
								}

								dt {
									float: left;
									width: 54px;
									line-height: 22px;
									text-align: right;
									padding: 3px 6px 0 0;
									font-weight: 700;
								}

								dd {
									float: left;
									width: 415px;
									padding: 3px 0 0;
									overflow: hidden;

									em {
										float: left;
										height: 14px;
										line-height: 14px;
										padding: 0 8px;
										margin-top: 5px;
										border-left: 1px solid #ccc;
									}
								}
							}
						}
					}

					// &:hover {
					//     .item-list {
					//         display: block;
					//     }
					// }
				}
				.cur {
					background-color: skyblue;
				}
			}
		}
		// 过渡动画样式
		.sort-enter{
			height: 0;
		
		}
		.sort-enter{
			height: 461px;
				
		}
		.sort-enter-active{
			transition: all 1s linear;
		}
	}
}
</style>
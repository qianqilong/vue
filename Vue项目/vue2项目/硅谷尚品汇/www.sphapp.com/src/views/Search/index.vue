<template>
	<div>
		<TypeNav />
		<div class="main">
			<div class="py-container">
				<!--bread-->
				<div class="bread">
					<ul class="fl sui-breadcrumb">
						<li>
							<a href="#">全部结果</a>
						</li>
					</ul>
					<ul class="fl sui-tag">
						<!-- 导航的面包屑 -->
						<li
							class="with-x"
							v-if="searchparams.categoryName"
							id="1"
						>{{searchparams.categoryName}}<i @click="removeCategorryName">×</i></li>
						<!--  关键字的面包屑-->
						<li
							class="with-x"
							v-if="searchparams.keyword"
							id="2"
						>{{searchparams.keyword}}<i @click="removeKeyword">×</i></li>
						<!--  品牌的面包屑-->
						<li
							class="with-x"
							v-if="searchparams.trademark"
							id="2"
						>{{searchparams.trademark.split(':')[1]}}<i @click="removeTrademark">×</i></li>
						<!-- 售卖属性的面包屑导航 -->
						<li
							class="with-x"
							v-for="(item3,index) in searchparams.props"
							:key='index'
							id="2"
						>{{item3.split(':')[1]}}<i @click="removeattr(index)">×</i></li>
					</ul>
				</div>

				<!--selector-->
				<SearchSelector
					@trademarkInfo="trademarkInfo"
					@attrlistInfo="attrlistInfo"
				/>

				<!--details-->
				<div class="details clearfix">
					<div class="sui-navbar">
						<div class="navbar-inner filter">
							<ul class="sui-nav">
								<li
									:class="{active:searchparams.order.indexOf('1')!==-1}"
									@click="changeOrder(1)"
								>
									<a>综合<span v-show="searchparams.order.indexOf('1')!==-1&&searchparams.order.indexOf('asc')==-1">⬇</span>
										<span v-show="searchparams.order.indexOf('1')!==-1&&searchparams.order.indexOf('desc')==-1">⬆</span></a>
								</li>

								<li
									:class="{active:searchparams.order.indexOf('2')!==-1}"
									@click="changeOrder(2)"
								>
									<a>价格 <span v-show="searchparams.order.indexOf('2')!==-1&&searchparams.order.indexOf('asc')==-1">⬇</span>
										<span v-show="searchparams.order.indexOf('2')!==-1&&searchparams.order.indexOf('desc')==-1">⬆</span></a>

								</li>
							</ul>
						</div>
					</div>
					<!-- 销售产品列表 -->
					<div class="goods-list">
						<ul class="yui3-g">
							<li
								class="yui3-u-1-5"
								v-for="item in goodsList"
								:key=item.id
							>
								<div class="list-wrap">
									<div class="p-img">
										<router-link :to="`/detail/${item.id}`"
										><img :src="item.defaultImg" /></router-link>
									</div>
									<div class="price">
										<strong>
											<em>¥</em>
											<i>{{item.price}}.00</i>
										</strong>
									</div>
									<div class="attr">
										<a
											title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
											v-html="item.title"
										>
										</a>
									</div>
									<div class="commit">
										<i class="command">已有<span>2000</span>人评价</i>
									</div>
									<div class="operate">
										<a
											href="success-cart.html"
											target="_blank"
											class="sui-btn btn-bordered btn-danger"
										>加入购物车</a>
										<a
											href="javascript:void(0);"
											class="sui-btn btn-bordered"
										>收藏</a>
									</div>
								</div>
							</li>
						</ul>
					</div>
					<!-- 分页器
					pageNo:第几页
					pageSize:每页显示数据
					total:页码总数 -->
					<Pagination
						:pageNo="searchparams.pageNo"
						:pageSize="searchparams.pageSize"
						:total="total"
						continues="5"
						@getPageNo="getPageNo"
					/>
				</div>
			</div>
		</div>

	</div>

</template>

<script>
import SearchSelector from './SearchSelector/SearchSelector'
import { mapGetters, mapState } from 'vuex'
export default {
	name: 'Search',
	components: {
		SearchSelector
	},
	data() {
		return {
			searchparams: {
				category1Id: '',
				category2Id: '',
				category3Id: '',
				categoryName: '',
				keyword: '',
				order: '1:desc',
				pageNo: 1,
				pageSize: 3,
				props: [],
				trademark: ''
			}
		}
	},
	methods: {
		// 通知vuex发送网络请求
		getData() {
			this.$store.dispatch('getSearchList', this.searchparams)
		},
		//  删除searchparams的id信息
		removeID() {
			this.searchparams.category1Id = undefined
			this.searchparams.category2Id = undefined
			this.searchparams.category3Id = undefined
		},
		//  改变对应的查询信息
		changeName() {
			this.searchparams.category1Id = this.$route.query.category1id
			this.searchparams.category2Id = this.$route.query.category2id
			this.searchparams.category3Id = this.$route.query.category2id
			this.searchparams.categoryName = this.$route.query.categoryName
			this.searchparams.keyword = this.$route.params.keyword
		},
		// 导航的面包屑
		removeCategorryName() {
			this.searchparams.categoryName = undefined
			this.getData()
			// 每次请求应该清除3级菜单id
			this.removeID()
			// 修改路径
			if (this.$route.params) this.$router.push({ name: 'search', params: this.$route.params })
		},
		// 关键字面包屑
		removeKeyword() {
			this.searchparams.keyword = ''
			if (this.$route.query) this.$router.push({ name: 'search', query: this.$route.query })
		},
		removeTrademark() {
			this.searchparams.trademark = undefined
			this.getData()
		},

		// 自定义事件品牌信息
		trademarkInfo(value) {
			// 品牌: "ID:品牌名称"
			this.searchparams.trademark = `${value.tmId}:${value.tmName}`
			this.getData()
		},
		// 自定义售卖属性信息
		attrlistInfo(value, attrValue) {
			let props = `${value.attrId}:${attrValue}:${value.attrName}`
			if (this.searchparams.props.indexOf(props) == -1) {
				this.searchparams.props.push(props)
				this.getData()
			}

			//  this.searchparams.props= Array.from(new Set(this.searchparams.props))
		},
		// 自定义事件改变页签位置的回调
   getPageNo(page){
     this.searchparams.pageNo=page
     this.getData()
  },

		// 删除售卖属性面包屑导航
		removeattr(index) {
			this.searchparams.props.splice(index, 1)
			this.getData()
		},
		// 改变排序
		changeOrder(flag) {
			// let originOrder=this.searchparams.order
			let orderFlag = this.searchparams.order.split(':')[0]
			let orderSort = this.searchparams.order.split(':')[1]
			if (flag == orderFlag) {
				// 点击时综合
				this.searchparams.order = `${flag}:${orderSort == 'desc' ? 'asc' : 'desc'}` // 改变排序
				this.getData()
			} else if (flag != orderFlag) {
				// 动态的把flag传递过去
				this.searchparams.order = `${flag}:${orderSort == 'desc' ? 'asc' : 'desc'}` // 改变排序
				this.getData()
			}
		}
	},
	beforeMount() {
		this.changeName()
	},

	mounted() {
		this.getData()
		//       this.$bus.$on('reqgetData',(val)=>{
		//       console.log(val);
		//  this.searchparams.keyword=val
		// this.getData()
		//    // 每次请求应该清除3级菜单id
		// this.removeID()
		//       })
	},
	computed: {
		...mapGetters(['goodsList', 'attrsList', 'trademarkList']),
		...mapState({
			total: state => state.search.SearchList.total
		})
	},
	watch: {
		$route: {
			handler() {
				this.changeName()
				this.getData()
				// 每次请求应该清除3级菜单id
				this.removeID()
			}
		}
	}
}
</script>

<style lang="less" scoped>
.main {
	margin: 10px 0;

	.py-container {
		width: 1200px;
		margin: 0 auto;

		.bread {
			margin-bottom: 5px;
			overflow: hidden;

			.sui-breadcrumb {
				padding: 3px 15px;
				margin: 0;
				font-weight: 400;
				border-radius: 3px;
				float: left;

				li {
					display: inline-block;
					line-height: 18px;

					a {
						color: #666;
						text-decoration: none;

						&:hover {
							color: #4cb9fc;
						}
					}
				}
			}

			.sui-tag {
				margin-top: -5px;
				list-style: none;
				font-size: 0;
				line-height: 0;
				padding: 5px 0 0;
				margin-bottom: 18px;
				float: left;

				.with-x {
					font-size: 12px;
					margin: 0 5px 5px 0;
					display: inline-block;
					overflow: hidden;
					color: #000;
					background: #f7f7f7;
					padding: 0 7px;
					height: 20px;
					line-height: 20px;
					border: 1px solid #dedede;
					white-space: nowrap;
					transition: color 400ms;
					cursor: pointer;

					i {
						margin-left: 10px;
						cursor: pointer;
						font: 400 14px tahoma;
						display: inline-block;
						height: 100%;
						vertical-align: middle;
					}

					&:hover {
						color: #28a3ef;
					}
				}
			}
		}

		.details {
			margin-bottom: 5px;

			.sui-navbar {
				overflow: visible;
				margin-bottom: 0;

				.filter {
					min-height: 40px;
					padding-right: 20px;
					background: #fbfbfb;
					border: 1px solid #e2e2e2;
					padding-left: 0;
					border-radius: 0;
					box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

					.sui-nav {
						position: relative;
						left: 0;
						display: block;
						float: left;
						margin: 0 10px 0 0;

						li {
							float: left;
							line-height: 18px;

							a {
								display: block;
								cursor: pointer;
								padding: 11px 15px;
								color: #777;
								text-decoration: none;
							}

							&.active {
								a {
									background: #e1251b;
									color: #fff;
								}
							}
						}
					}
				}
			}

			.goods-list {
				margin: 20px 0;

				ul {
					display: flex;
					flex-wrap: wrap;

					li {
						height: 100%;
						width: 20%;
						margin-top: 10px;
						line-height: 28px;

						.list-wrap {
							.p-img {
								padding-left: 15px;
								width: 215px;
								height: 255px;

								a {
									color: #666;

									img {
										max-width: 100%;
										height: auto;
										vertical-align: middle;
									}
								}
							}

							.price {
								padding-left: 15px;
								font-size: 18px;
								color: #c81623;

								strong {
									font-weight: 700;
								}
							}

							.attr {
								padding-left: 15px;
								width: 85%;
								overflow: hidden;
								margin-bottom: 8px;
								min-height: 38px;
								cursor: pointer;
								line-height: 1.8;
								display: -webkit-box;
								-webkit-box-orient: vertical;
								-webkit-line-clamp: 2;

								a {
									color: #333;
									text-decoration: none;
								}
							}

							.commit {
								padding-left: 15px;
								height: 22px;
								font-size: 13px;
								color: #a7a7a7;

								span {
									font-weight: 700;
									color: #646fb0;
								}
							}

							.operate {
								padding: 12px 15px;

								.sui-btn {
									display: inline-block;
									padding: 2px 14px;
									box-sizing: border-box;
									margin-bottom: 0;
									font-size: 12px;
									line-height: 18px;
									text-align: center;
									vertical-align: middle;
									cursor: pointer;
									border-radius: 0;
									background-color: transparent;
									margin-right: 15px;
								}

								.btn-bordered {
									min-width: 85px;
									background-color: transparent;
									border: 1px solid #8c8c8c;
									color: #8c8c8c;

									&:hover {
										border: 1px solid #666;
										color: #fff !important;
										background-color: #666;
										text-decoration: none;
									}
								}

								.btn-danger {
									border: 1px solid #e1251b;
									color: #e1251b;

									&:hover {
										border: 1px solid #e1251b;
										background-color: #e1251b;
										color: white !important;
										text-decoration: none;
									}
								}
							}
						}
					}
				}
			}
		}
	}
}
</style>
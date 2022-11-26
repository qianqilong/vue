<template>
	<div>
		<el-row :gutter="10">
			<el-col :span="6">
				<el-card>
					<Deatil
						title="总销售额"
						price="￥ 126560"
					>
						<template
							slot="charts"
							class="slot"
						>
							<span class="charts">周同比 56.67% &nbsp;<svg
									t="1657778569985"
									class="icon"
									viewBox="0 0 1024 1024"
									version="1.1"
									xmlns="http://www.w3.org/2000/svg"
									p-id="9943"
									width="16"
									height="16"
								>
									<path
										d="M522.439258 279.608186 69.730643 732.316801 975.145827 732.316801Z"
										p-id="9944"
										fill="#d81e06"
									/>
								</svg></span>
							<span class="charts">日同比 19.96% &nbsp; <svg
									t="1657778547420"
									class="icon"
									viewBox="0 0 1024 1024"
									version="1.1"
									xmlns="http://www.w3.org/2000/svg"
									p-id="8906"
									width="16"
									height="16"
								>
									<path
										d="M192 384l320 384 320-384H192z"
										p-id="8907"
										fill="#1afa29"
									/>
								</svg></span>
						</template>
						<template slot="footer">
							<span>日销售额￥ 126560</span>
						</template>
					</Deatil>
				</el-card>

			</el-col>
			<el-col :span="6">
				<el-card>
					<Deatil
						title="访问量"
						price="88460"
					>

						<template slot="charts">
							<Linecharts />
						</template>
						<template slot="footer">
							<span>日销访问量 1234</span>
						</template>
					</Deatil>
				</el-card>

			</el-col>
			<el-col :span="6">
				<el-card>
					<Deatil
						title="支付笔数"
						price="88460"
					>
						<template slot="charts">
							<Barcharts />
						</template>
						<template slot="footer">
							<span>转换率 65%</span>
						</template>
					</Deatil>
				</el-card>

			</el-col>
			<el-col :span="6">
				<el-card>
					<Deatil
						title="运营活动效果"
						price="78%"
					>
          <template slot="charts">
            <el-progress :percentage="78" stroke-width="15" color="red"></el-progress>
          </template>
						<template
							slot="footer"
							class="slot"
						>
							<span class="charts">周同比 56.67% &nbsp;<svg
									t="1657778569985"
									class="icon"
									viewBox="0 0 1024 1024"
									version="1.1"
									xmlns="http://www.w3.org/2000/svg"
									p-id="9943"
									width="16"
									height="16"
								>
									<path
										d="M522.439258 279.608186 69.730643 732.316801 975.145827 732.316801Z"
										p-id="9944"
										fill="#d81e06"
									/>
								</svg></span>
							<span>日同比 19.96% &nbsp; <svg
									t="1657778547420"
									class="icon"
									viewBox="0 0 1024 1024"
									version="1.1"
									xmlns="http://www.w3.org/2000/svg"
									p-id="8906"
									width="16"
									height="16"
								>
									<path
										d="M192 384l320 384 320-384H192z"
										p-id="8907"
										fill="#1afa29"
									/>
								</svg></span>
						</template>
					</Deatil>
				</el-card>

			</el-col>
		</el-row>
	</div>
</template>

<script>
import Barcharts from './Barcharts.vue'
import Linecharts from './Linecharts.vue'
import Deatil from './Deatil'
export default {
	name: 'Card',
	components: { Deatil, Linecharts, Barcharts },
	data() {
		return {}
	},

	mounted() {},

	methods: {}
}
</script>

<style  scoped>
.charts {
	margin-right: 15px;
}
</style>

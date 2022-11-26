<template>
	<!-- 矩形图 -->
	<div class="app">
		<el-row :gutter="10">
			<el-col :span="16">
				<div
					ref="main"
					class="main"
				>&nbsp;
				</div>
			</el-col>
			<el-col :span="8">
				<div>
					<h3>门店{{ title }}排行</h3>
					<ul>
						<li>
							<span class="rindex">1</span>
							<span>肯德基</span>
							<span>323,234</span>
						</li>
						<li>
							<span  class="rindex">2</span>
							<span> 麦当劳</span>
							<span> 299,132</span>
						</li>
						<li>
							<span  class="rindex">3</span>
							<span> 海底捞</span>
							<span>266,223</span>
						</li>
						<li>
							<span>4</span>

							<span> 西贝筱面村</span>
							<span> 223,445 </span>
						</li>
						<li>
							<span>5</span>
							<span> 汉堡王</span>
							<span> 219,663 </span>
						</li>
						<li>
							<span>6</span>
							<span> 真功夫</span>
							<span> 200,997</span>
						</li>
						<li>
							<span>7</span>
							<span> 必胜客</span>
							<span> 200,998</span>
						</li>
					</ul>
				</div>
			</el-col>

		</el-row>
	</div>

</template>

<script>
import echarts from 'echarts'
export default {
	name: 'Barcharts',
	props: ['title'],
	mounted() {
		const mian = echarts.init(this.$refs.main)
		this.$nextTick(() => {
			mian.setOption({
				title: {
					text: `${this.title}趋势`
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'shadow'
					}
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				xAxis: [
					{
						type: 'category',
						data: ['Mo', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', '8', '8', '8', '8', '8'],
						axisTick: {
							alignWithLabel: true
						}
					}
				],
				yAxis: [
					{
						type: 'value'
					}
				],
				series: [
					{
						name: 'Direct',
						type: 'bar',
						barWidth: '60%',
						data: [10, 52, 200, 334, 390, 330, 220, 232, 323, 323, 323, 323, 212]
					}
				]
			})
		})
	}
}
</script>

<style scoped>
.app {
	width: 100%;
	height: 100%;
}
.main {
	width: 100%;
	height: 300px;
}
.rindex {
	background-color: black;
	color: #fff;
}
ul {
	padding: 0;
	list-style: none;
	width: 100%;
	height: 300px;
}
ul li {
	height: 12%;
}
ul li span {
	margin-right: 60px;
}
ul li span:first-child {
	display: inline-block;
	width: 16px;
	height: 16px;
	border-radius: 50%;
	text-align: center;
	line-height: 16px;
}
ul li span:nth-child(3) {
float: right;	
}
</style>

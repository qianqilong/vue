<template>
	<div>
		<div class="header">
			<span>{{ title }}</span>
			<svg
				t="1657847134277"
				class="icon cion"
				viewBox="0 0 1024 1024"
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				p-id="2264"
				width="16"
				height="16"
			>
				<path
					d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
					p-id="2265"
					fill="#8a8a8a"
				/>
				<path
					d="M512 336m-48 0a48 48 0 1 0 96 0 48 48 0 1 0-96 0Z"
					p-id="2266"
					fill="#8a8a8a"
				/>
				<path
					d="M536 448h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"
					p-id="2267"
					fill="#8a8a8a"
				/>
			</svg>
		</div>
		<div class="content">
			<span class="price">
				{{ price }}
			</span>
			<span class="num">{{ num }}
				<slot name="top" />
			</span>
		</div>
		<div class="footer">
      	<div
				ref="charts"
				class="charts"
			/>
    </div>
	</div>
</template>

<script>
import echarts from 'echarts'
export default {
	name: 'Linecharts',
	props: ['title', 'price', 'num'],
	data() {
		return {}
	},

	mounted() {
		const lincharts = echarts.init(this.$refs.charts)
		lincharts.setOption({
			xAxis: {
				show: false,
				type: 'category'
			},
			yAxis: {
				show: false
			},
			series: [
				{
					type: 'line',
					data: [1, 6, 5, 2, 6, 2, 6, 3, 5],
					itemStyle: {
						opacity: 0
					},
					lineStyle: {
						color: 'purple'
					},

					areaStyle: {
						color: {
							type: 'linear',
							x: 0,
							y: 0,
							x2: 0,
							y2: 1,
							colorStops: [
								{
									offset: 0,
									color: 'purple' // 0% 处的颜色
								},
								{
									offset: 1,
									color: '#fff' // 100% 处的颜色
								}
							],
							global: false // 缺省为 false
						}
					}
				}
			],
			grid: {
				top: 0,
				left: 0,
				right: 0,
				bottom: 0
			}
		})
	},

	methods: {}
}
</script>

<style  scoped>
.header {
	font-size: 14px;
	display: flex;
}
.cion {
	margin-left: 20px;
}
.content {
	margin-top: 25px;
}
.price {
	font-size: 20px;
	margin-right: 30px;
}
.charts {
	height: 60px;
}
.footer{
  margin-top:10px;
}
</style>

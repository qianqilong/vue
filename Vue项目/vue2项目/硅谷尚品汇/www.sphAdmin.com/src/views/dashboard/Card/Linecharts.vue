<template>
	<div
		ref="charts"
		class="main"
	/>
</template>

<script>
import echarts from 'echarts'
export default {
	name: 'Linecharts',

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
					data: [1, 7, 2, 10, 2, 6, 3, 10],
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

<style lang="scss" scoped>
.main {
	width: 100%;
	height: 100%;
}
</style>

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
					type: 'bar',
					data: [1, 7, 2, 10, 2, 6, 3, 10, 20, 21, 8, 9],
					color: 'pink'
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

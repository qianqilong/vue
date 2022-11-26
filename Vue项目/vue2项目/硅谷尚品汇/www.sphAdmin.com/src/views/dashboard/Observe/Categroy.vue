<template>
	<div>
		<div class="header">
			<div class="cateheader">
				<span>销售额类别占比</span>
				<el-radio-group
					v-model="value"
					size="small"
				>
					<el-radio-button label="全部渠道" />
					<el-radio-button label="线上" />
					<el-radio-button label="门店" />
				</el-radio-group>
			</div>

		</div>
		<div
			ref="charts"
			class="charts"
		/>
	</div>
</template>

<script>
import echarts from 'echarts'
export default {
	name: 'Categroy',

	data() {
		return {
			value: '全部渠道'
		}
	},

	mounted() {
		const mycharts = echarts.init(this.$refs.charts)
		mycharts.setOption({
			title: {
				text: '视频',
				subtext: 1048,
				left: 'center',
				top: 'center'
			},
			tooltip: {
				trigger: 'item'
			},

			series: [
				{
					name: 'Access From',
					type: 'pie',
					radius: ['40%', '70%'],
					avoidLabelOverlap: false,
					itemStyle: {
						borderRadius: 10,
						borderColor: '#fff',
						borderWidth: 2
					},
					label: {
						show: true,
						position: 'outsize'
					},

					labelLine: {
						show: true
					},
					data: [
						{ value: 1048, name: 'Search Engine' },
						{ value: 735, name: 'Direct' },
						{ value: 580, name: 'Email' },
						{ value: 484, name: 'Union Ads' },
						{ value: 300, name: 'Video Ads' }
					]
				}
			]
		})
		mycharts.on('mouseover', params => {
			// 获取鼠标移动上的数据
			const { name, value } = params.data
			// 重新设置标题
			mycharts.setOption({
				title: {
					text: name,
					subtext: value
				}
			})
		})
	},

	methods: {}
}
</script>

<style  scoped>
.cateheader {
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid;
}
.charts {
	height: 300px;
}
</style>

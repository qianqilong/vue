<template>
	<div class="app">
		<el-card
			class="box-card"
			style="margin: 10px 0px"
		>
			<div
				slot="header"
				class="clearfix"
			>
				<!--  @tab-click="handleClick" -->
				<!-- 头部左侧内容 -->
				<el-tabs
					v-model="activeName"
					class="tab"
				>
					<el-tab-pane
						label="销售额"
						name="销售额"
					>
						<!-- 销售额报表 -->

						<Barcharts
							v-if="activeName==='销售额'"
							:title="activeName"
						/>
					</el-tab-pane>
					<el-tab-pane
						label="访问量"
						name="访问量"
					>
						<!-- 访问量报表 -->
						<Barcharts
							v-if="activeName==='访问量'"
							:title="activeName"
						/>
					</el-tab-pane>
				</el-tabs>
				<!-- 头部右侧内容 -->
				<div class="right">
					<span @click="getDate">今日</span>
					<span @click="getWeek">本周</span>
					<span @click="getMoon">本月</span>
					<span @click="getYear">本年</span>
					<!--    v-model="value1" -->
					<el-date-picker
						v-model="date"
						class="date"
						type="daterange"
						range-separator="-"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						value-format="yyyy-MM-dd"
					/>
				</div>
				<!--  -->

			</div>

		</el-card>
	</div>
</template>

<script>
import Barcharts from './Barcharts.vue'
import dayjs from 'dayjs'
// 引入echarts
export default {
	name: '',
	components: { Barcharts },
	data() {
		return {
			activeName: '销售额',
			date: [] //
		}
	},
	methods: {
		getDate() {
			const day = dayjs(new Date()).format('YYYY-MM-DD')
			this.date = [day, day]
		},
		getWeek() {
			const start = dayjs().day(1).format('YYYY-MM-DD')
			const end = dayjs().day(7).format('YYYY-MM-DD')
			this.date = [start, end]
		},
		getMoon() {
			const start = dayjs().startOf('month').format('YYYY-MM-DD')
			const end = dayjs().endOf('month').format('YYYY-MM-DD')
			this.date = [start, end]
		},
		getYear() {
      	const start = dayjs().startOf('year').format('YYYY-MM-DD')
			const end = dayjs().endOf('year').format('YYYY-MM-DD')
			this.date = [start, end]
    }
	}
}
</script>

<style scoped>
.clearfix {
	position: relative;
	display: flex;
	justify-content: space-between;
}
.tab {
	width: 100%;
}
.right {
	position: absolute;
	right: 0px;
}
.date {
	width: 250px;
	margin: 0px 20px;
}
.right span {
	font-size: 14px;
	margin: 0px 10px;
}
.chart-show-container {
	height: 285px;
	width: 355px;
}
</style>

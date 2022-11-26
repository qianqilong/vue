<template>
	<div class="pagination">
		<button
			:disabled="pageNo==1"
			@click="$emit('getPageNo',pageNo-1)"
		>上一页</button>
		<button
			v-show="startNumAndEndNum.start>=2"
			@click="$emit('getPageNo',1)"
		>1</button>

		<button v-show="startNumAndEndNum.start>2">···</button>
		<button
			v-for="(item,index) in startNumAndEndNum.end"
			:key="index"
			v-show="item>=startNumAndEndNum.start"
      @click="$emit('getPageNo',item)"
      :class="{active:item==pageNo}"
		>{{item}}</button>
		<button v-show="startNumAndEndNum.end<totalpage-1">···</button>

		<button
			v-show="startNumAndEndNum.end<totalpage"
			@click="$emit('getPageNo',totalpage)"
		>{{totalpage}}</button>
		<button
			:disabled="pageNo==totalpage"
			@click="$emit('getPageNo',pageNo+1)"
		>下一页</button>
		<button style="margin-left: 30px">共 {{total}} 条</button>
	</div>
</template>

<script>
export default {
	name: 'Pagination',
	props: ['pageNo', 'pageSize', 'total', 'continues'],
	computed: {
		// 总的页码数
		totalpage() {
			return Math.ceil(this.total / this.pageSize)
		},
		// 计算出起始数据和结束数据
		startNumAndEndNum() {
			let start = 0,
				end = 0
			// 页码不够时，如只要5页
			if (this.continues > this.totalpage) {
				start = 1
				end = this.totalpage
			} else {
				// 正常现象
				start = this.pageNo - parseInt(this.continues / 2)
				end = this.pageNo + parseInt(this.continues / 2)
				//  start出现不正常现象
				if (start < 1) {
					start = 1
					end = parseInt(this.continues)
				} else if (end > this.totalpage) {
					start = this.totalpage - this.continues + 1
					end = this.totalpage
				}
			}
			return { start, end }
		}
	}
}
</script>

<style lang="less" scoped>
.pagination {
	text-align: center;
	button {
		margin: 0 5px;
		background-color: #fff;
		color: #050a14;
		outline: none;
		border-radius: 2px;
		padding: 0 4px;
		vertical-align: top;
		display: inline-block;
		font-size: 13px;
		min-width: 35.5px;
		height: 28px;
		line-height: 28px;
		cursor: pointer;
		box-sizing: border-box;
		text-align: center;
		border: 0;

		&[disabled] {
			color: #c0c4cc;
			cursor: not-allowed;
		}

		&.active {
			cursor: not-allowed;
			background-color: #409eff;
			color: #fff;
		}
	}
}
</style>
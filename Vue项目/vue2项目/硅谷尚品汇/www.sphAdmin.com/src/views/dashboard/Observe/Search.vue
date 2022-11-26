<template>
	<div>
		<div class="header">
			<div class="searcheader">
				<span>线上热门搜索</span>
				<el-dropdown>
					<span class="el-dropdown-link">
						<i class="el-icon-more" />
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>黄金糕</el-dropdown-item>
						<el-dropdown-item>狮子头</el-dropdown-item>
						<el-dropdown-item>螺蛳粉</el-dropdown-item>
						<el-dropdown-item disabled>双皮奶</el-dropdown-item>
						<el-dropdown-item divided>蚵仔煎</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>

			</div>

		</div>
		<div class="content">
			<el-row :gutter="10">
				<el-col :span="12">
					<Linecharts
						title="搜索用户数"
						:num="17.1"
						:price="12321"
					>
						<template slot="top">
							<svg
								t="1657847918342"
								class="icon"
								viewBox="0 0 1024 1024"
								version="1.1"
								xmlns="http://www.w3.org/2000/svg"
								p-id="4160"
								width="16"
								height="16"
							>
								<path
									d="M522.439258 279.608186 69.730643 732.316801 975.145827 732.316801Z"
									p-id="4161"
									fill="#d81e06"
								/>
							</svg>
						</template>
					</Linecharts>
				</el-col>
				<el-col :span="12">
					<Linecharts
						title="人均搜索次数"
						:num="26.2"
						:price="2.7"
					>
						<template slot="top">
							<svg
								t="1657848647284"
								class="icon"
								viewBox="0 0 1024 1024"
								version="1.1"
								xmlns="http://www.w3.org/2000/svg"
								p-id="9302"
								width="16"
								height="16"
							>
								<path
									d="M192 384l320 384 320-384H192z"
									p-id="9303"
									fill="#1afa29"
								/>
							</svg>
						</template>
					</Linecharts>
				</el-col>
			</el-row>
		</div>
    <div class="footer">
    <el-table
    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'descending'}"
    >
    <el-table-column
      prop="date"
      label="排行"
      width="80"
      type="index">
    </el-table-column>
     <el-table-column
      prop="date"
      label="搜索关键字"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="用户数"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="周涨幅"
        sortable
      :formatter="formatter">
    </el-table-column>
  </el-table>
   <el-pagination
   class="pagi"
    layout="prev, pager, next"
    :total="1000">
  </el-pagination>
    </div>
	</div>
</template>

<script>
import Linecharts from './linecharts.vue'
export default {
	name: 'Search',
	components: { Linecharts },
	data() {
		return {}
	},

	mounted() {
	
	},

	methods: {}
}
</script>

<style  scoped>
.header {
	padding-bottom: 5px;
	border-bottom: 1px solid gray;
}
.searcheader {
	display: flex;
	justify-content: space-between;
}
.content {
	padding-top: 40px;
}
.footer{
  height: 150px;
}
.pagi{
  float: right;
}
</style>

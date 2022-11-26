<template>
	<div>
		<el-row :gutter="30">
			<el-col :span="12">
				<el-card>
					<Search />
				</el-card>
			</el-col>
			<el-col :span="12">
				<el-card>
					<Categroy />
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import Search from './Search.vue'
import Categroy from './Categroy.vue'
export default {
	name: 'Observe',
	components: { Search, Categroy },
	data() {
		return {}
	},

	mounted() {},

	methods: {}
}
</script>

<style lang="scss" scoped>
</style>

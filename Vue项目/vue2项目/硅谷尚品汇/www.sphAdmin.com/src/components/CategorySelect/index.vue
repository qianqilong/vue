<template>
	<div>
		<el-card style="margin:20px 0px">
			<el-form
				:inline="true"
				class="demo-form-inline"
			>
				<el-form-item label="一级分类">
					<el-select
						v-model="CategoryList.Category1"
						placeholder="请选择"
						@change="getCategory2List"
						:disabled="disabled"
					>
						<el-option
							v-for="item in category1"
							:key="item.id"
							:label="item.name"
							:value="item.id"
						/>
					</el-select>
				</el-form-item>
				<!-- 二级分类 -->
				<el-form-item label="二级分类">
					<el-select
						v-model="CategoryList.Category2"
						placeholder="请选择"
						@change="getCategory3List"
							:disabled="disabled"
					>
						<el-option
							v-for="item in category2"
							:key="item.id"
							:label="item.name"
							:value="item.id"
						/>
					</el-select>
				</el-form-item>
				<!-- 三级分类 -->
				<el-form-item label="三级分类">
					<el-select
						v-model="CategoryList.Category3"
						placeholder="请选择"
						@change="getAttrAllList"
							:disabled="disabled"
					>
						<el-option
							v-for="item in category3"
							:key="item.id"
							:label="item.name"
							:value="item.id"
						/>
					</el-select>
				</el-form-item>
			</el-form>
		</el-card>

	</div>
</template>

<script>
export default {
	name: 'CategorySelect',
	props: ['category1', 'category2', 'category3', 'CategoryList', 'disabled'],

	methods: {
		// 二级分类触发事件传递给父组件
		getCategory2List() {
			const id = this.CategoryList.Category1
			this.$emit('getCategory2List', id)
		},
		// 获取三级分类的信息
		getCategory3List() {
			const id = this.CategoryList.Category2
			this.$emit('getCategory3List', id)
		},
		getAttrAllList() {
			const data = {
				id1: this.CategoryList.Category1,
				id2: this.CategoryList.Category2,
				id3: this.CategoryList.Category1
			}
			this.$emit('getAttrAllList', data)
		}
	}
}
</script>

<style lang="scss" scoped>
</style>

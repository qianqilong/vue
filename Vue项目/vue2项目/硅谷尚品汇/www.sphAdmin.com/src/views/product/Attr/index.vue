<template>
	<div>
		<CategorySelect
			:category1="Category1"
			:category2="Category2"
			:category3="Category3"
			:category-list="CategoryList"
			:disabled="disabled"
			@getCategory2List="getCategory2List"
			@getCategory3List="getCategory3List"
			@getAttrAllList="getAttrAllList"
		/>

		<el-card>
			<!-- 显示商品属性的表单 -->
			<div v-show="isshowTable">
				<el-button
					type="primary"
					icon="el-icon-plus"
					style="margin:10px 0"
					:disabled="CategoryList.Category3===''"
					@click="addAttr"
				>添加属性</el-button>

				<el-table
					style="width: 100%"
					border
					:data="attrList"
				>
					<el-table-column
						type="index"
						label="序号"
						width="80"
						align="center"
					/>
					<el-table-column
						label="属性名称"
						prop="attrName"
					/>
					<el-table-column label="属性值列表">
						<template slot-scope="{row}">
							<el-tag
								v-for="item in row.attrValueList"
								:key="item.id"
								type="success"
								style="margin: 0 10px"
							>{{ item.valueName }}</el-tag>
						</template>
					</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="{row}">
							<el-button
								type="warning"
								icon="el-icon-edit"
								size="mini"
								@click="updateAttr(row)"
							>修改</el-button>
							<el-button
								type="danger"
								icon="el-icon-delete"
								size="mini"
								@click="DELETEAttr(row.id)"
							>删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<!-- 添加和修改属性的操作 -->
			<div v-show="!isshowTable">
				<el-form
					ref="form"
					:inline="true"
					:model="attrInfo"
					label-width="80px"
				>
					<el-form-item label="属性名">
						<el-input
							v-model="attrInfo.attrName"
							placeholder="请输入属性名"
						/>
					</el-form-item>
				</el-form>
				<el-button
					type="primary"
					icon="el-icon-plus"
					@click="addAttrValue"
				>添加属性值</el-button>
				<el-button @click="cancelAdd">取消</el-button>
				<el-table
					style="width:100%;margin:20px 0"
					border
					:data="attrInfo.attrValueList"
				>
					<el-table-column
						label="序号"
						type="index"
						align="center"
						width="80"
					/>
					<el-table-column
						label="属性值名称"
						width="width"
					>
						<template slot-scope="{row,$index}">
							<el-input
								v-show="row.flag"
								:ref="$index"
								v-model="row.valueName"
								placeholder="请输入属性值名称"
								size="mini"
								@blur="toLook(row)"
								@keyup.native.enter="toLook(row)"
							/>
							<span
								v-show="!row.flag"
								@click="onBlur(row,$index)"
							>{{ row.valueName }}</span>
						</template>
					</el-table-column>
					<el-table-column
						label="操作"
						width="width"
					>
						<template slot-scope="{row,$index}">
							<el-popconfirm
								title="确定删除吗？"
								@onConfirm="deleteAttr($index)"
							>
								<el-button
									slot="reference"
									type="danger"
									icon="el-icon-delete"
									size="mini"
								>删除</el-button>
							</el-popconfirm>
						</template>
					</el-table-column>
				</el-table>
				<el-button
					type="primary"
					@click="KeepAttr"
				>保存</el-button>
				<el-button @click="cancelAdd">取消</el-button>
			</div>
		</el-card>
	</div>
</template>

<script>
export default {
	name: 'Attr',
	data() {
		return {
			isshowTable: true, // 控制显示表单的显示
			disabled: false, // 控制三级分类的禁用
			Category1: [],
			Category2: [],
			Category3: [],
			CategoryList: {
				Category1: '',
				Category2: '',
				Category3: ''
			},
			attrList: [],
			attrInfo: {
				attrName: '',
				attrValueList: [],
				categoryId: 0, // 三级分类的id
				categoryLevel: 3
			}
		}
	},

	mounted() {
		this.getCategory1List()
	},

	methods: {
		// 渲染数据
		updateTable() {
			const info = {
				id1: this.CategoryList.Category1,
				id2: this.CategoryList.Category2,
				id3: this.CategoryList.Category1
			}
			this.getAttrAllList(info)
		},
		// 获取一级分类的id
		async getCategory1List() {
			const { data } = await this.$api.attr.getCategory1API()
			this.Category1 = data
		},
		// 获取二级分类的id
		async getCategory2List(id) {
			this.CategoryList.Category2 = ''
			this.CategoryList.Category3 = ''
			const res = await this.$api.attr.getCategory2API(id)
			if (res.code === 200) {
				this.Category2 = res.data
			}
		},
		// 获取三级分类
		async getCategory3List(id) {
			this.CategoryList.Category3 = '' // 发送变化时清除
			const res = await this.$api.attr.getCategory3API(id)
			if (res.code === 200) {
				this.Category3 = res.data
			}
		},
		// 获取全部商品的信息
		async getAttrAllList(data) {
			const res = await this.$api.attr.getAttrAllAPI(data)
			if (res.code === 200) {
				this.attrList = res.data
			}
		},
		// 点击添加属性按键
		addAttr() {
			this.isshowTable = false
			this.disabled = true
			this.attrInfo = {
				//
				attrName: '',
				attrValueList: [],
				categoryId: this.CategoryList.Category3, // 三级分类的id
				categoryLevel: 3
			}
		},
		// 点击更新按键
		updateAttr(row) {
			this.isshowTable = false
			this.disabled = true
			this.attrInfo = row
			this.attrInfo.attrValueList.forEach(item => {
				this.$set(item, 'flag', false)
			})
		},
		// 添加属性面板中的取消按键
		cancelAdd() {
			this.isshowTable = true
			this.disabled = false
			this.updateTable() // 重新渲染数据
		},
		// 添加属性面板点击添加属性值
		addAttrValue() {
			this.attrInfo.attrValueList.push({
				attrId: this.attrInfo.id, // 属性id
				valueName: '',
				flag: true
			})
		},
		// 查看与输入切换
		toLook(row) {
			if (row.valueName.trim() === '') {
				this.$message({
					message: '属性值不能为空！！！',
					type: 'warning'
				})
				return
			}
			const isRepat = this.attrInfo.attrValueList.some(item => {
				if (row !== item) {
					return row.valueName === item.valueName
				}
			})
			if (isRepat) {
				this.$message({
					message: '属性值不能重复！！！',
					type: 'warning'
				})
				return
			}
			row.flag = false
		},
		// 失去焦点
		onBlur(row, index) {
			row.flag = true
			this.$nextTick(() => {
				this.$refs[index].focus()
			})
		},
		// 删除属性值
		deleteAttr(index) {
			this.attrInfo.attrValueList.splice(index, 1)
		},
		// 点击保存按键
		async KeepAttr() {
			const data = this.attrInfo
			data.attrValueList = data.attrValueList.filter(item => {
				if (item.valueName !== '') {
					delete item.flag
					return true
				}
			})
			const res = await this.$api.attr.SavaAttrInfoAPI(data)
			if (res.code === 200) {
				this.$message({
					type: 'success',
					message: '保存数据成功！！！'
				})
			} else {
				this.$message({
					type: 'warning',
					message: '保存数据失败！！！'
				})
				return
			}
			this.isshowTable = true
			this.disabled = false
			this.updateTable() // 重新渲染数据
		},
		// 删除数据
		async DELETEAttr(id) {
			const res = await this.$api.attr.DeleteAttrInfoAPI(id)
			if (res.code === 200) {
				this.$message({
					type: 'success',
					message: '删除数据成功！！！'
				})
				this.updateTable()
			}
		}
	}
}
</script>

<style>
</style>

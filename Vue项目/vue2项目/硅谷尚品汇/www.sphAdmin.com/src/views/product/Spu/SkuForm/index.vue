<template>
	<div>
		<el-form label-width="80px">
			<el-form-item label="SPU名称">
				{{ spu.spuName }}
			</el-form-item>
			<el-form-item label="SKU名称">
				<el-input
					v-model="skuInfo.skuName"
					placeholder="SKU名称"
				/>
			</el-form-item>
			<el-form-item label="价格(元)">
				<el-input
					v-model="skuInfo.price"
					placeholder="价格(元)"
					type="number"
				/>
			</el-form-item>
			<el-form-item label="重量(千克)">
				<el-input
					v-model="skuInfo.weight"
					placeholder="重量(千克)"
				/>
			</el-form-item>
			<el-form-item label="规格描述">
				<el-input
					v-model="skuInfo.skuDesc"
					type="textarea"
					rows="4"
				/>
			</el-form-item>
			<el-form-item label="平台属性">
				<el-form :inline="true">
					<el-form-item
						v-for="attr in attrInfoList"
						:key="attr.id"
						:label="attr.attrName"
					>
						<el-select
							v-model="attr.attrIdAndValueId"
							placeholder="请选择"
						>
							<el-option
								v-for="attrVal in attr.attrValueList"
								:key="attrVal.id"
								:label="attrVal.valueName"
								:value="`${attr.id}:${attrVal.id}`"
							/>
						</el-select>
					</el-form-item>
				</el-form>
			</el-form-item>
			<el-form-item label="销售属性">
				<el-form :inline="true">
					<el-form-item
						v-for="sale in spuSaleList"
						:key="sale.id"
						:label="sale.saleAttrName"
					>
						<el-select
							v-model="sale.saleIdAndvalId"
							placeholder="请选择"
						>
							<el-option
								v-for="saleVal in sale.spuSaleAttrValueList"
								:key="saleVal.id"
								:label="saleVal.saleAttrValueName"
								:value="`${sale.id}:${saleVal.id}`"
							/>
						</el-select>
					</el-form-item>
				</el-form>
			</el-form-item>
			<el-form-item label="图片列表">
				<el-table
					style="width:100%"
					:border="true"
					:data="spuImageList"
					@selection-change="handleSelectionChange"
				>
					<el-table-column
						width="80"
						type="selection"
					/>
					<el-table-column
						label="图片"
						width="width"
					>
						<template slot-scope="{row}">
							<img
								:src="row.imgUrl"
								style="width:100px"
							>
						</template>
					</el-table-column>
					<el-table-column
						label="名称"
						prop="imgName"
						width="width"
					/>
					<el-table-column
						label="操作"
						prop="prop"
						width="width"
					>
						<template slot-scope="{row}">
							<el-button
								v-if="row.isDefault===0"
								type="primary"
								size="mini"
								@click="changeDefault(row)"
							>设置默认</el-button>
							<el-tag
								v-else
								type="success"
							>默认</el-tag>

						</template>
					</el-table-column>
				</el-table>
			</el-form-item>
			<el-form-item>
				<el-button
					type="primary"
					@click="saveSpu"
				>完成</el-button>
				<el-button @click="cancelSpu">取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
	name: '',
	data() {
		return {
			spuImageList: [], // 存放图片信息
			spuSaleList: [], // 存放销售属性
			attrInfoList: [], // 平台属性
			spu: {},
			imageList: [], // 收集图片的字段，缺少isDefalut
			skuInfo: {
				// 父组件给的
				category3Id: 0,
				spuId: 0,
				tmId: 0,
				//  双向绑定给的
				skuName: '',
				price: 0,
				weight: '',
				skuDesc: '',
				// 自己定义的
				//  收集图片字段
				skuImageList: [
					// {
					// 	imgName: 'string',
					// 	imgUrl: 'string',
					// 	isDefault: 'string',
					// 	spuImgId: 0
					// }
				],
				// 默认图片
				skuDefaultImg: '',
				// 销售属性列表
				skuSaleAttrValueList: [
					// {
					// 	saleAttrId: 0,
					// 	saleAttrValueId: 0,
					// }
				],
				// 平台属性
				skuAttrValueList: [
					// {
					// 	attrId: 0,
					// 	valueId: 0
					// }
				]
			}
		}
	},
	methods: {
		// 获取sku数据
		async getData(category1Id, category2Id, row) {
			// 收集父组件给的信息
			this.skuInfo.category3Id = row.category3Id
			this.skuInfo.spuId = row.id
			this.skuInfo.tmId = row.tmId
			this.spu = row
			// 获取图片的信息
			const { data } = await this.$api.spu.getSpuImageAPI(row.id)
			const list = data
			list.forEach(item => {
				item.isDefault = 0 // 1表示默认
			})
			this.spuImageList = list
			// 获取销售属性
			const { data: data1 } = await this.$api.spu.getSpuSaleAPI(row.id)
			this.spuSaleList = data1
			//  获取平台属性
			const { data: data2 } = await this.$api.spu.getarrSpuInfoAPI(category1Id, category2Id, row.category3Id)
			this.attrInfoList = data2
		},
		// table复选框
		handleSelectionChange(params) {
			// 获取用户选择图片的信息
			this.imageList = params
		},
		// 改变图片默认值
		changeDefault(row) {
			// 全部为0，自己为1
			this.spuImageList.forEach(item => {
				item.isDefault = 0
			})
			row.isDefault = 1
			// 收集默认图信息
			this.skuInfo.skuDefaultImg = row.imgUrl
		},
		// 取消自定义事件
		cancelSpu() {
			this.$emit('cancelSpu')
			// 清除数据
			Object.assign(this._data, this.$options.data())
		},
		// 保存操作
		async saveSpu() {
			// 整理参数
			const { attrInfoList, skuInfo, spuSaleList, imageList } = this
			// 平台属性收集
			skuInfo.skuAttrValueList = attrInfoList.reduce((prev, item) => {
				if (item.attrIdAndValueId) {
					const [attrId, valueId] = item.attrIdAndValueId.split(':')
					prev.push({ attrId, valueId })
				}
				return prev
			}, [])
			// 销售属性收集
			skuInfo.skuSaleAttrValueList = spuSaleList.reduce((prev, item) => {
				if (item.saleIdAndvalId) {
					const [saleAttrId, saleAttrValueId] = item.saleIdAndvalId.split(':')
					prev.push({ saleAttrId, saleAttrValueId })
				}
				return prev
			}, [])
			// 整理图片信息
			skuInfo.skuImageList = imageList.map(item => {
				return {
					imgName: item.imgName,
					imgUrl: item.imgUrl,
					isDefault: item.isDefault,
					spuImgId: item.id
				}
			})
			// 发送请求保存数据
			const res = await this.$api.spu.addSpuinfo(skuInfo)
			if (res.code === 200) {
				this.$message({
					type: 'success',
					message: '保存数据成功！'
				})
				this.$emit('cancelSpu')
				// 清除数据
				Object.assign(this._data, this.$options.data())
			}
		}
	}
}
</script>

<style>
</style>

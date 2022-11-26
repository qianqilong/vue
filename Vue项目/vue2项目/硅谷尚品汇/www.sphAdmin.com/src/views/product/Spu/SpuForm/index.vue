<template>
  <div>
    <el-form label-width="80px">
      <el-form-item label="SPU名称">
        <el-input
          v-model="spuInfo.spuName"
          placeholder="SPU名称"
        />
      </el-form-item>
      <el-form-item label="品牌">
        <el-select
          v-model="spuInfo.tmId"
          placeholder="请选择品牌"
        >
          <el-option
            v-for="item in SpubrandList"
            :key="item.id"
            :label="item.tmName"
            :value="item.id"
          />

        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          v-model="spuInfo.description"
          type="textarea"
          rows="5"
          placeholder="SPU描述"
        />
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload
          action="/api/admin/product/fileUpload"
          list-type="picture-card"
          :on-success="handleAvatarSuccess"
          :file-list="spuphoto"
        >
          <i
            slot="default"
            class="el-icon-plus"
          />
          <div
            slot="file"
            slot-scope="{file}"
          >
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.imgUrl"
            >
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
              >
                <i class="el-icon-zoom-in" />
              </span>

              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <i class="el-icon-delete" />
              </span>
            </span>
          </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img
            width="100%"
            :src="dialogImageUrl"
            alt=""
          >
        </el-dialog>

      </el-form-item>
      <el-form-item label="销售属性">
        <el-select
          v-model="SpuSales"
          :placeholder="`还有${Choicelength}项未选择`"
        >
          <el-option
            v-for="item in noChoice"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />

        </el-select>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addSpuSales"
        >添加销售属性</el-button>
      </el-form-item>
      <!-- 表格 -->
      <el-form-item>
        <el-table
          style="width:100%;margin:20px 0"
          border
          :data="spuInfo.spuSaleAttrList"
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
            prop="saleAttrName"
          />
          <el-table-column
            label="属性值名称"
            width="width"
            prop="spuSaleAttrValueList"
          >
            <template slot-scope="{row}">
              <el-tag
                v-for="item in row.spuSaleAttrValueList"
                :key="item.id"
                closable
                :disable-transitions="false"
                type="success"
                @close="handleClose(item)"
              >
                {{ item.saleAttrValueName }}
              </el-tag>
              <el-input
                v-if="row.showInput"
                ref="saveTagInput"
                v-model="inputValue"
                class="input-new-tag"
                size="small"
                @keyup.enter.native="handleInputConfirm(row)"
                @blur="handleInputConfirm(row)"
              />
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInput(row)"
              >添加</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="width"
          >
            <template slot-scope="{row,$index}">
              <el-popconfirm
                title="确定删除吗？"
                @onConfirm="deleteSpu($index)"
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
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="KeepSpu"
        >保存</el-button>
        <el-button @click="SpuCancel">取消</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
	name: 'SpuForm',
	props: ['spuid', 'category3'],
	data() {
		return {
			inputValue: '',
			dialogImageUrl: '',
			dialogVisible: false,
			disabled: false,
			SpuSales: '', // 上传的销售属性
			SpubrandList: [], // 品牌列表
			SpuSalesList: [], // 销售属性列表

			spuInfo: {
				spuName: '', // spu名字
				description: '', // spu描述
				category3Id: 0, // 三级分类id
				tmId: 0, // 品牌id
				spuSaleAttrList: [],
				spuImageList: [] // 收集图片的信息
			}, // spu的数据信息
			spuphoto: [] // spu的图片信息
			// spuTag: [] //
		}
	},
  
	computed: {
		// 未选择项的长度
		Choicelength() {
			const arr = this.spuInfo.spuSaleAttrList || []
			return 3 - arr.length
		},
		// 未选择的选项
		noChoice() {
			const arr1 = this.SpuSalesList
			const arr = this.spuInfo.spuSaleAttrList
			for (var i in arr) {
				for (var k in arr1) {
					if (arr[i].saleAttrName === arr1[k].name) {
						arr1.splice(k, 1)
					}
				}
			}
			return arr1
		}
	},
	mounted() {
		this.getSpubrand()
		this.getSpuSales()
		this.getSpuInfo()
		this.getSpuPoto()
	},
	methods: {
		// 删除标签
		handleClose(tag) {
			this.spuInfo.spuSaleAttrList.forEach(item => {
				const index = item.spuSaleAttrValueList.indexOf(tag)
				if (index > -1) {
					item.spuSaleAttrValueList.splice(index, 1) // 第二个参数为删除的次数，设置只删除一次
				}
			})
		},
		// 添加按键输入框
		showInput(row) {
			row.showInput = true
			this.$nextTick(_ => {
				this.$refs.saveTagInput.$refs.input.focus()
			})
		},
		// 添加销售属性
		addSpuSales() {
			const baseSaleAttrId = this.SpuSales
			if (baseSaleAttrId === 1) {
				var saleAttrName = '颜色'
			} else if (baseSaleAttrId === 2) {
				saleAttrName = '版本'
			} else {
				saleAttrName = '尺码'
			}
			this.spuInfo.spuSaleAttrList.push({
				spuId: 5,
				baseSaleAttrId,
				saleAttrName,
				spuSaleAttrValueList: [],
				showInput: false
			})
		},
		// 输入框失去焦点
		handleInputConfirm(row) {
			const baseSaleAttrId = this.SpuSales
			if (baseSaleAttrId === 1) {
				var saleAttrName = '颜色'
			} else if (baseSaleAttrId === 2) {
				saleAttrName = '版本'
			} else {
				saleAttrName = '尺码'
			}
			const inputValue = this.inputValue
			if (inputValue.trim() === '') {
				this.$message('属性值不能为空')
				return
			}
			if (
				!row.spuSaleAttrValueList.every(item => {
					return item.saleAttrValueName !== inputValue
				})
			) {
				this.$message('属性值不能重复')
				return
			}
			row.spuSaleAttrValueList.push({ spuId: 4, baseSaleAttrId, saleAttrValueName: inputValue, saleAttrName, isChecked: null })
			row.showInput = false
			this.inputValue = ''
		},
		// 删除图片
		handleRemove(file) {
			const index = this.spuphoto.indexOf(file)
			if (index > -1) {
				this.spuphoto.splice(index, 1) // 第二个参数为删除的次数，设置只删除一次
			}
		},
		// 展示图片
		handlePictureCardPreview(file) {
			this.dialogImageUrl = file.imgUrl
			this.dialogVisible = true
		},
		handleAvatarSuccess(res, file) {
			const imageUrl = URL.createObjectURL(file.raw)
			this.spuphoto.push({ spuId: this.spuid, imgName: '', imgUrl: imageUrl, uid: 1657611360258, status: 'success' })
		},
		// 点击取消
		SpuCancel() {
			this.$emit('SpuCancel', 1)
		},
		// 获取品牌的列表
		async getSpubrand() {
			const res = await this.$api.spu.getSpubrandAPI()
			this.SpubrandList = res.data
		},
		// 获取销售属性
		async getSpuSales() {
			const { data } = await this.$api.spu.getSpuSalesAPI()
			this.SpuSalesList = data
		},
		// 获取spu的信息
		async getSpuInfo() {
			const res = await this.$api.spu.getSpuInfoAPI(this.spuid)
			res.data.spuSaleAttrList.forEach(item => {
				item.showInput = false
			})

			this.spuInfo = res.data
		},
		// 获取图片信息
		async getSpuPoto() {
			const res = await this.$api.spu.getSpuPotoAPI(this.spuid)
			this.spuphoto = res.data
		},
		// 删除spu
		deleteSpu($index) {
			this.spuInfo.spuSaleAttrList.splice($index, 1)
		},
		// 完成上传
		async KeepSpu() {
			this.spuInfo.spuImageList = this.spuphoto
			this.spuInfo.category3Id = this.category3
      this.spuInfo.spuSaleAttrList.forEach(item => {
        delete item.showInput
      })
			const spuInfo = this.spuInfo
			console.log(spuInfo)
			const res = await this.$api.spu.updateSpuInfoAPI(spuInfo)
			console.log(res)
		}
	}
}
</script>

<style scoped>
.el-tag + .el-tag {
	margin-left: 10px;
}
.button-new-tag {
	margin-left: 10px;
	height: 32px;
	line-height: 30px;
	padding-top: 0;
	padding-bottom: 0;
}
.input-new-tag {
	width: 90px;
	margin-left: 10px;
	vertical-align: bottom;
}
.avatar-uploader .el-upload {
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
}
.avatar-uploader .el-upload:hover {
	border-color: #409eff;
}
.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 178px;
	height: 178px;
	line-height: 178px;
	text-align: center;
}
.avatar {
	width: 178px;
	height: 178px;
	display: block;
}
</style>

<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin:10px 0"
      @click="showDialog"
    >添加</el-button>
    <!-- 添加的对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
    >
      <!-- 第一个输入框 -->
      <el-form
        ref="ruleForm"
        style="width:80%"
        :model="{tmName,logoUrl}"
        :rules="rules"
      >
        <el-form-item
          label="品牌名称"
          label-width="100px"
          prop="tmName"
        >
          <el-input
            v-model="tmName"
            autocomplete="off"
          />
        </el-form-item>
        <!-- 第二个输入框 -->
        <el-form-item
          style="marginLeft:12px"
          label="品牌LOGO"
          label-width="100px"
          prop="logoUrl"
        >
          <!-- action	必选参数，上传的地址	 -->
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="logoUrl"
              :src="logoUrl"
              class="avatar"
            >
            <i
              v-else
              class="el-icon-plus avatar-uploader-icon"
            />
          </el-upload>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addTrade(title)"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- border表格添加边框
		label标题名称
	-->
    <el-table
      style="width: 100%"
      border
      :data="records"
    >
      <el-table-column
        type="index"
        label="序号"
        width="80"
      />
      <el-table-column
        prop="tmName"
        label="品牌名称"
      />
      <el-table-column
        prop="id"
        label="品牌LOGO"
      >
        <!-- row是上面回传的数据名字不能改变 -->
        <template slot-scope="{row}">
          <!-- <template> -->
          <img
            :src="`http://139.198.127.41:9000/sph/20220709/${row.id}.jpg`"
            style="width:50px"
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="date"
        label="操作"
      >
        <template slot-scope="{row,$index}">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="updeteTrade($index,row.id)"
          >修改</el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteTrade(row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页
  page-size	每页显示条目个数
	total	总条目数
		-->
    <el-pagination
      style="margin-top:20px;textAlign:center"
      :total="total"
      :current-page="page"
      :page-size="limit"
      :page-sizes="[3,5,10]"
      layout="prev, pager, next, jumper,->,sizes, total"
      @current-change="pagechangeFn"
      @size-change="sizechangeFn"
    />
  </div>
</template>

<script>
export default {
	// eslint-disable-next-line indent
	name: 'TradeMark',
	data() {
		return {
			page: 1, // 第几页
			limit: 3, // 每页数据个数
			records: [], // 数据数组
			total: 0, // 总的条数
			dialogFormVisible: false, // 控制对话框显示
			title: '添加品牌',
			tmName: '', // 品牌名
			logoUrl: '', // 图片
			id: '', // 品牌ID
			rules: {
				tmName: [
					{ required: true, message: '请输入品牌名称', trigger: 'blur' },
					{ min: 2, max: 7, message: '长度在 2 到 7 个字符', trigger: 'change' }
				],
				logoUrl: [{ required: true, message: '请选择品牌的图片' }]
			}
		}
	},
	mounted() {
		this.getPageList()
	},
	methods: {
		// 获取品牌列表的数据
		async getPageList() {
			const { page, limit } = this
			const { data } = await this.$api.tradeMark.TradeMarkAPI({ page, limit })
			this.total = data.total
			this.records = data.records
		},
		// 当前页码发生改变时触发
		pagechangeFn(page) {
			this.page = page
			this.getPageList()
		},
		// 当展示条数发生变化时触发
		sizechangeFn(size) {
			this.limit = size
			this.getPageList()
		},
		// 添加数据
		showDialog() {
			this.title = '添加品牌'
			// 添加之前清空数据
			this.tmName = '' // 品牌名
			this.logoUrl = '' // 图片
			this.dialogFormVisible = true
		},
		// 确定添加|修改
		addTrade(title) {
			// 判断数据是否是空
			const { id, tmName, logoUrl } = this
			this.$refs.ruleForm.validate(async success => {
				if (success) {
					if (title === '添加品牌') {
						// 判断是否为添加品牌
						const res = await this.$api.tradeMark.addTradeAPI({ tmName, logoUrl })
						if (res.code === 200) {
							this.$message({
								message: '添加品牌成功！',
								type: 'success'
							})
							this.dialogFormVisible = false
							this.getPageList()
						} else {
							this.$message({
								message: '添加品牌失败！',
								type: 'warning'
							})
							this.dialogFormVisible = false
						}
					} else if (title === '修改品牌') {
						const res = await this.$api.tradeMark.updataTradeAPI({ id, tmName, logoUrl })
						if (res.code === 200) {
							this.$message({
								message: '修改品牌成功！',
								type: 'success'
							})
							this.dialogFormVisible = false
							this.getPageList()
						} else {
							this.$message({
								message: '修改品牌失败！',
								type: 'warning'
							})
							this.dialogFormVisible = false
						}
					}
				} else {
					this.$message({
						message: '请输入正确的品牌和LOGO！',
						type: 'warning'
					})
				}
			})
		},
		// 修改品牌
		updeteTrade(index, id) {
			this.tmName = this.records[index].tmName
			this.logoUrl = `http://139.198.127.41:9000/sph/20220709/${id}.jpg`
			this.id = id
			console.log(this.tmName)
			this.title = '修改品牌'
			this.dialogFormVisible = true
		},
		// 删除品牌
		async deleteTrade(id) {
			const res = await this.$api.tradeMark.deleteTradeAPI({ id })
			if (res.code === 200) {
				this.$message({
					message: '删除数据成功',
					type: 'success'
				})
				this.getPageList()
				console.log(this.records)
				if (this.records.length === 1) { // 如果一页的数据被删完跳到上一页
					this.page = this.page - 1
					this.getPageList()
				}
			} else {
				this.$message({
					message: '删除数据失败',
					type: 'warning'
				})
			}
		},
		// 图片上传成功
		handleAvatarSuccess(res, file) {
			// 收集图片的数据
			this.logoUrl = URL.createObjectURL(file.raw)
		},
		// 图片上传前操作
		beforeAvatarUpload(file) {
			const isJPG = file.type === 'image/jpeg'
			const isLt2M = file.size / 1024 / 1024 < 2
			if (!isJPG) {
				this.$message.error('上传头像图片只能是 JPG 格式!')
			}
			if (!isLt2M) {
				this.$message.error('上传头像图片大小不能超过 2MB!')
			}
			return isJPG && isLt2M
		}
	}
}
</script>

<style scoped>
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

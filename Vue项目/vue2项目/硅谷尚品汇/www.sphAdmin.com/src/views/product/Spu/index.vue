
<template>
  <div>
    <CategorySelect
      :disabled="disabled"
      :category1="Category1"
      :category2="Category2"
      :category3="Category3"
      :category-list="CategoryList"
      @getCategory2List="getCategory2List"
      @getCategory3List="getCategory3List"
      @getAttrAllList="getAttrAllList"
    />

    <!-- 表单 -->

    <div v-if="isshowTable==1">
      <el-button
        type="primary"
        icon="el-icon-plus"
        style="margin:10px 0"
        :disabled="CategoryList.Category3===''"
        @click="addSpu"
      >添加SPU</el-button>

      <el-table
        style="width: 100%"
        border
        :data="SpuList"
      >
        <el-table-column
          type="index"
          label="序号"
          width="80"
          align="center"
        />
        <el-table-column
          label="SPU名称"
          prop="spuName"
        />
        <el-table-column
          label="SPU描述"
          prop="description"
        />
        <el-table-column label="操作">
          <template slot-scope="{row}">
            <el-button
              type="success"
              icon="el-icon-plus"
              size="mini"
              @click="addSku(row)"
            />
            <el-button
              type="warning"
              icon="el-icon-edit"
              size="mini"
              @click="updateSpu(row)"
            />
            <el-button
              type="info"
              icon="el-icon-info"
              size="mini"
              @click="hangler(row)"
            />
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteSpu(row)"
            />
          </template>
        </el-table-column>
      </el-table>
      <!-- 对话框 -->
      <el-dialog
        :title="`${title}的SKU列表`"
        :visible.sync="dialogTableVisible"
        :before-close="closeFn"
      >
        <el-table
          v-loading="loading"
          :data="skuList"
        >
          <el-table-column
            label="名称"
            prop="skuName"
          />
          <el-table-column
            label="价格"
            prop="price"
          />
          <el-table-column
            label="重量"
            prop="weight"
          />
          <el-table-column label="默认图片">
            <template slot-scope="{row}">
              <img
                :src="row.skuDefaultImg"
                style="width:100px"
              >
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
      <!--分页 -->
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

    <!-- spu管理模块 -->
    <SpuForm
      v-else-if="isshowTable==2"
      :spuid="Spuid"
      :category3="CategoryList.Category3"
      @SpuCancel="SpuCancel"
    />

    <SkuForm
      v-show="isshowTable==3"
      ref="sku"
      @cancelSpu="isshowTable=1"
    />
    <el-card />
  </div>
</template>

<script>
import SpuForm from './SpuForm'
import SkuForm from './SkuForm'
export default {
	name: 'Spu',
	components: { SpuForm, SkuForm },
	data() {
		return {
			loading: true,
			skuList: [], // sku列表的数据
			dialogTableVisible: false, // 控制对话框的显示和隐藏
			title: '',
			disabled: false,
			isshowTable: 1,
			Category1: [],
			Category2: [],
			Category3: [],
			CategoryList: {
				Category1: '',
				Category2: '',
				Category3: ''
			},
			SpuList: [],
			// 分页数据
			page: 1,
			limit: 3,
			total: 0, // 总数据
			pages: 0, // 总页数
			// spu数据
			Spuid: ''
		}
	},

	mounted() {
		this.getCategory1List()
	},

	methods: {
		// 删除spu
		async deleteSpu(row) {
			const res = await this.$api.spu.deleteSpu(row.id)
			if (res.code === 200) {
				this.getSpulist()
				this.$message({
					type: 'success',
					message: '删除数据成功！'
				})
			}
		},
		// 关闭对话框
		closeFn(done) {
			this.loading = true
			this.skuList = []
			done()
		},
		// 获取sku列表
		async hangler(row) {
			this.dialogTableVisible = true
			this.title = row.spuName
			const res = await this.$api.spu.getSkulist(row.id)
			if (res.code === 200) {
				this.skuList = res.data
				this.loading = false
			}
		},
		// 渲染数据
		async getSpulist() {
			const { page, limit } = this
			const category3Id = this.CategoryList.Category3
			const { data } = await this.$api.spu.getSpuListAPI({ page, limit, category3Id })
			this.pages = data.pages
			this.total = data.total
			this.SpuList = data.records
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
		//  全部确认后触发
		getAttrAllList() {
			this.getSpulist()
		},
		// 添加spu
		addSpu() {
			this.disabled = true
			this.isshowTable = 2
		},
		// 修改spu
		updateSpu(row) {
			this.disabled = true
			this.isshowTable = 2
			this.Spuid = row.id
		},
		// 页码变化触发
		pagechangeFn(page) {
			this.page = page
			this.getSpulist()
		},
		// 展示数据改变触发
		sizechangeFn(limit) {
			this.limit = limit
			this.getSpulist()
		},
		// 点击子组件的取消按键触发
		SpuCancel(flag) {
			this.isshowTable = flag
		},
		// 	添加sku
		addSku(row) {
			this.isshowTable = 3
			// 调用子组件的方
			this.$refs.sku.getData(this.CategoryList.Category1, this.CategoryList.Category2, row)
		}
	}
}
</script>

<style>
</style>

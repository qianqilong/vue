<template>
  <div>
    <el-table
      :data="records"
      border
      style="width:100%"
    >
      <el-table-column
        type="index"
        label="序号"
        width="80"
        align="center"
      />
      <el-table-column
        label="名称"
        prop="skuName"
      />
      <el-table-column
        label="描述"
        prop="skuDesc"
      />
      <el-table-column
        label="默认图片"
        width="110"
      >
        <template slot-scope="{row}">
          <img
            :src="row.skuDefaultImg"
            style="width:80px"
          >
        </template>
      </el-table-column>
      <el-table-column
        label="重量(KG)"
        width="80"
        prop="weight"
      />
      <el-table-column
        label="价格(元)"
        width="80"
        prop="price"
      />
      <el-table-column label="操作">
        <template slot-scope="{row}">
          <el-button
            v-if="row.isSale==0"
            type="success"
            icon="el-icon-bottom"
            size="mini"
            @click="getSale(row)"
          />
          <el-button
            v-else
            type="success"
            icon="el-icon-top"
            size="mini"
            @click="getcancel(row)"
          />
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
          />
          <el-button
            type="info"
            icon="el-icon-info"
            size="mini"
            @click="getSku(row)"
          />
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
          />
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
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
    <!-- 抽屉-->
    <el-drawer
      :visible.sync="drawer"
      :show-close="false"
      size="50%"
    >
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuinfo.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ skuinfo.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ skuinfo.price }}元</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <template>
            <el-tag
              v-for="attr in skuinfo.skuAttrValueList"
              :key="attr.id"
              type="success"
            >{{ attr.attrName }}-{{ attr.valueName}}</el-tag>
          </template>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel height="400px">
            <el-carousel-item
              v-for="item in skuinfo.skuImageList"
              :key="item.id"
            >
             <img :src="item.imgUrl" style="width:100%">
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
	name: 'Sku',
	data() {
		return {
			total: 0,
			page: 1,
			limit: 5,
			records: [],
			skuinfo: {},
			drawer: false
		}
	},
	mounted() {
		this.getSkulist()
	},
	methods: {
		// 获取sku详情
		async getSku(row) {
			this.drawer = true
			const res = await this.$api.sku.getSkuAPI(row.id)
			if (res.code === 200) {
				this.skuinfo = res.data
			}
		},
		// 上架
		async getSale(row) {
			const res = await this.$api.sku.getSaleAPI(row.id)
			if (res.code === 200) {
				this.$message({
					type: 'success',
					message: '上架成功！！！'
				})
				// eslint-disable-next-line require-atomic-updates
				row.isSale = 1
			}
		},
		// 下架
		async getcancel(row) {
			const res = await this.$api.sku.getcancelAPI(row.id)
			if (res.code === 200) {
				this.$message({
					type: 'success',
					message: '下架成功！！！'
				})
				// eslint-disable-next-line require-atomic-updates
				row.isSale = 0
			}
		},
		pagechangeFn(page) {
			this.page = page
			this.getSkulist()
		},
		sizechangeFn(limit) {
			this.limit = limit
			this.getSkulist()
		},
		async getSkulist() {
			const { page, limit } = this
			const { data } = await this.$api.sku.getSkulistAPI(page, limit)
			this.total = data.total
			this.records = data.records
		}
	}
}
</script>

<style scoped>
/* >>>深度选择器 */
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
	
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
		 	border: 1px solid gray;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
		 	border: 1px solid gray;
  }
	>>>.el-carousel__button{
		width: 10px;
		height: 10px;
		background-color: red;
		border-radius:50%;
	}
.el-col-5 {
	font-size: 18px;
	text-align: right;
	font-weight: 700;
}
.el-col-16 {
	font-size: 10px;
	color: gray;
}
.el-col {
	margin: 10px 10px;
}
</style>

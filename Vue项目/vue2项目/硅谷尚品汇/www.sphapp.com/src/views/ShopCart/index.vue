<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="item in cartInfoList" :key="item.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="item.isChecked==1" @change="changeChoose(item)">
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl">
            <div class="item-msg">{{item.skuName}}</div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">&nbsp;</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{item.skuPrice}}.00</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="changeNum('-',-1,item)">-</a>
            <input autocomplete="off" type="number" :value="item.skuNum" minnum="1" class="itxt" @change="changeNum('',$event.target.value*1,item)">
            <a href="javascript:void(0)" class="plus" @click="changeNum('+',1,item)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{item.skuPrice*item.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a  class="sindelet" @click="deleteCarId(item)">删除</a>
            <br>
            <a >移到收藏</a>
          </li>
        </ul>

      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="whetherToChoose" @click="changeAllChoose">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deletechoose">删除选中的商品</a>
        <a >移到我的关注</a>
        <a >清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{goodsNum}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费）: {{goodsPrice}}</em>
          <i class="summoney"></i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
  export default {
    name: 'ShopCart',
    data() {
      return {
       timer:0
      }
    },
    mounted(){
  this.getData()
    },
  methods:{
    getData(){
     this.$store.dispatch('getCarlist')  
    },
    // 删除一个商品
   async deleteCarId(item){
    const res= await  this.$store.dispatch('getDeleteCarAPI',item.skuId)
    console.log(res);
    },
    // 改变输入框的选择
   async changeChoose(item){
      // 发送请求通知服务器
      // 改变数据
    
      let req=0
      if(item.isChecked==1){
        req=0
      }else req=1
  await this.$store.dispatch('getcheckCartAPI',{skuId:item.skuId,isChecked:req})
      this.getData()
     
    },
    // 改变商品数量
    changeNum(type,skuNum,item){
    var now = Date.now();// 现在时间
      if (now - this.timer > 500) {
    if(type=='+'){
      skuNum=1
      item.skuNum++
     }else if(type=='-'){
      if(item.skuNum>1){
        skuNum=-1
        item.skuNum--
      }else{
      skuNum=0
      }
     
     }else{
      if(skuNum<1){
        skuNum=0
        this.getData()
      }
      else {
        skuNum=parseInt(skuNum-item.skuNum)
      }
     }
      this.$store.dispatch('addShopCart',{ skuId:item.skuId, skuNum })
      this.timer=now
      }
    
  
     
   
    // 起始数量和改变后数量的差值，组件防抖
   
   
    },
    // 删除全部商品
   async deletechoose(){
          await  this.$store.dispatch('getDeleteChooseCarAPI')
          this.getData()
    },
    // 全响应单选
   async changeAllChoose(){
      try{
     let checked=event.target.checked?"1":"0"
  await  this.$store.dispatch('getchangeAllChoose',checked)
  this.getData()
    }catch(err){
       alert('获取服务器信息失败！')
    }
    }
    },
    computed:{
      ...mapGetters(['carlist']),
      // 购物车数据
      cartInfoList(){
              return this.carlist.cartInfoList||[]
      },
      // 购物车已选的是否全部勾选
      whetherToChoose(){
        return this.cartInfoList.every(item=>{
          return item.isChecked==1
        })
      },
       // 商品的总价
      goodsPrice(){
        let sum=0
        this.cartInfoList.forEach(item=>{
          if(item.isChecked==1){ //只要被选择的商品才会计算价格
          sum+=item.skuPrice*item.skuNum
          }
        })
        return sum
      },
      // 已选商品的总的数量
      goodsNum(){
        let sum=0
        this.cartInfoList.forEach(item=>{
          if(item.isChecked==1){
            sum+=item.skuNum
          }
        })
        return sum
      }
    }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 4.1667%;
          }

          .cart-list-con2 {
            width: 25%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con3 {
            width: 20.8333%;

            .item-txt {
              text-align: center;
            }
          }

          .cart-list-con4 {
            width: 12.5%;

          }

          .cart-list-con5 {
            width: 12.5%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 12.5%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 12.5%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c48c1d5a"],{"50a1":function(s,e,t){"use strict";t.r(e);var a=function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("div",{staticClass:"trade-container"},[t("h3",{staticClass:"title"},[s._v("填写并核对订单信息")]),t("div",{staticClass:"content"},[t("h5",{staticClass:"receive"},[s._v("收件人信息")]),s._l(s.address,(function(e){return t("div",{key:e.id,staticClass:"address clearFix"},[t("span",{staticClass:"username ",class:{selected:1==e.isDefault}},[s._v(s._s(e.consignee))]),t("p",{on:{click:function(t){return s.changeDefault(e,s.address)}}},[t("span",{staticClass:"s1"},[s._v(s._s(e.fullAddress))]),t("span",{staticClass:"s2"},[s._v(s._s(e.phoneNum))]),t("span",{directives:[{name:"show",rawName:"v-show",value:1==e.isDefault,expression:"add.isDefault==1"}],staticClass:"s3"},[s._v("默认地址")])])])})),t("div",{staticClass:"line"}),t("h5",{staticClass:"pay"},[s._v("支付方式")]),s._m(0),t("div",{staticClass:"line"}),t("h5",{staticClass:"pay"},[s._v("送货清单")]),s._m(1),t("div",{staticClass:"detail"},[t("h5",[s._v("商品清单")]),s._l(s.orderList,(function(e){return t("ul",{key:e.skuId,staticClass:"list clearFix"},[t("li",[t("img",{attrs:{src:e.imgUrl}})]),t("li",[t("p",[s._v(" "+s._s(e.skuName)+" ")]),t("h4",[s._v("7天无理由退货")])]),t("li",[t("h3",[s._v("￥"+s._s(e.orderPrice)+".00")])]),t("li",[s._v("X1")]),t("li",[s._v("有货")])])}))],2),t("div",{staticClass:"bbs"},[t("h5",[s._v("买家留言：")]),t("textarea",{directives:[{name:"model",rawName:"v-model",value:s.msg,expression:"msg"}],staticClass:"remarks-cont",attrs:{placeholder:"建议留言前先与商家沟通确认"},domProps:{value:s.msg},on:{input:function(e){e.target.composing||(s.msg=e.target.value)}}})]),t("div",{staticClass:"line"}),s._m(2)],2),t("div",{staticClass:"money clearFix"},[t("ul",[t("li",[t("b",[t("i",[s._v(s._s(s.order.totalNum))]),s._v("件商品，总商品金额")]),t("span",[s._v("¥"+s._s(s.orderPrices)+".00")])]),s._m(3),s._m(4)])]),t("div",{staticClass:"trade"},[t("div",{staticClass:"price"},[s._v("应付金额:"),t("span",[s._v("¥"+s._s(s.orderPrices)+".00")])]),t("div",{staticClass:"receiveInfo"},[s._v(" 寄送至: "),t("span",[s._v(s._s(s.DefaultAdd.fullAddress))]),s._v(" 收货人："),t("span",[s._v(s._s(s.DefaultAdd.consignee))]),t("span",[s._v(s._s(s.DefaultAdd.phoneNum))])])]),t("div",{staticClass:"sub clearFix"},[t("a",{staticClass:"subBtn",on:{click:s.submitOrder}},[s._v("提交订单")])])])},i=[function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("div",{staticClass:"address clearFix"},[t("span",{staticClass:"username selected"},[s._v("在线支付")]),t("span",{staticClass:"username",staticStyle:{"margin-left":"5px"}},[s._v("货到付款")])])},function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("div",{staticClass:"way"},[t("h5",[s._v("配送方式")]),t("div",{staticClass:"info clearFix"},[t("span",{staticClass:"s1"},[s._v("天天快递")]),t("p",[s._v("配送时间：预计8月10日（周三）09:00-15:00送达")])])])},function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("div",{staticClass:"bill"},[t("h5",[s._v("发票信息：")]),t("div",[s._v("普通发票（电子） 个人 明细")]),t("h5",[s._v("使用优惠/抵用")])])},function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("li",[t("b",[s._v("返现：")]),t("span",[s._v("0.00")])])},function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("li",[t("b",[s._v("运费：")]),t("span",[s._v("0.00")])])}],r=t("2f62"),l={name:"Trade",data(){return{msg:""}},methods:{changeDefault(s,e){e.forEach(s=>s.isDefault=0),s.isDefault=1},submitOrder(){let{tradeNo:s}=this.order,e={tradeNo:s,consignee:this.DefaultAdd.consignee,consigneeTel:this.DefaultAdd.fullAddress,deliveryAddress:this.DefaultAdd.phoneNum,paymentWay:"ONLINE",orderComment:this.msg,orderDetailList:this.orderList};this.$store.dispatch("getsubmitOrder",e),this.$router.push("/pay?orderId=10552")}},mounted(){console.log(this.address.consignee)},computed:{...Object(r["c"])({address:s=>s.trade.address,order:s=>s.trade.order}),DefaultAdd(){let s={};return this.address.forEach(e=>{1==e.isDefault&&(s=e)}),s},orderList(){const s=this.order.detailArrayList||[];return s},orderPrices(){let s=0;return this.orderList.forEach(e=>{s+=e.orderPrice}),s}}},c=l,n=(t("5eb3"),t("2877")),d=Object(n["a"])(c,a,i,!1,null,"0c6d0069",null);e["default"]=d.exports},"5eb3":function(s,e,t){"use strict";t("89c8")},"89c8":function(s,e,t){}}]);
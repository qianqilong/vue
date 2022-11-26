export default  {
  install(Vue) {
    Vue.filter('myslice',function (val){
      return val.slice(0,5)
    }),
       //定义全局指令
		 Vue.directive('fbind',{
			//指令与元素成功绑定时（一上来）
			bind(element,binding){
				element.value = binding.value
			},
			//指令所在元素被插入页面时
			inserted(element,binding){
				element.focus()
			},
			//指令所在的模板被重新解析时
			update(element,binding){
				element.value = binding.value
			}
     }),
      
      Vue.prototype.hello = () => {
      alert('您好啊！')
      }

  }
}

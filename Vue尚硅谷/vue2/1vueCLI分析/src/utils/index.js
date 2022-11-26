class Bus {
  list
  constructor() {
    this.list = {}
  }
  // 添加发布函数
  on(name, callback) {
    // 没有发布为空数组
    const fn = this.list[name] || []
    // 数组中添加回调函数
    fn.push(callback)
    // 数组赋值给list(name对应回调)
    this.list[name] = fn
  }
  // 执行函数
  emit(name, ...args) {
    // 取出回调函数
    const evnentName = this.list[name]
    // 遍历执行函数
    evnentName.forEach(fn => {
      fn.apply(this, args)
    })
  }
  // 移除函数
  off(name) {
   delete this.list[name]
  }
  
}

export default new Bus()
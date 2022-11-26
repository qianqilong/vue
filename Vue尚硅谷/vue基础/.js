let obj1={x:100};
let obj2={y:200};
Object.defineProperty(obj2,'x',{
  get(){
    return obj1.x;
  },
  set(value){
   obj1.x= value;//通过obj2可以去修改obj1中x的值
  }
})
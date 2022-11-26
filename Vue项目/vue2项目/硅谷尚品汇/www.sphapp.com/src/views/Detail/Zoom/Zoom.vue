<template>
  <div class="spec-preview">
    <img :src=" imgObj.imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :src=" imgObj.imgUrl" ref="big"/>
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    data() {
      return {
        index:0
      }
    },
    methods:{
      handler(){
        let mask=this.$refs.mask
       //offsetX鼠标到左侧边框的距离
        let leftx=event.offsetX-mask.offsetWidth/2
        let topy=event.offsetY-mask.offsetHeight/2
        if(leftx<0)leftx=0
        if(leftx>mask.offsetWidth)leftx=mask.offsetWidth
        if(topy<0)topy=0
        if(topy>mask.offsetWidth)topy=mask.offsetWidth
        mask.style.left=leftx+'px'
        mask.style.top=topy+'px'

        let big=this.$refs.big
        big.style.left=-2*leftx+'px'
        big.style.top=-2*topy+'px'
      }
    },
    props:{
      skuImageList:Array,
      default:[]
    },
    computed:{
      imgObj(){
        return this.skuImageList[this.index]||{}
      }
    },
    mounted(){
      this.$bus.$on('getIndex',(index)=>{
    // 修改显示的图片
    this.index=index
  })
    },
    beforeDestroy(){
        this.$bus.$off('getIndex')
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>
<template>
  <div>
	<div
					class="swiper-container"
					ref="mySwiper"
				>
					<div class="swiper-wrapper">

						<div
							class="swiper-slide"
							v-for="item in List"
							:key="item.id"
						>
							<img :src="item.imgUrl" />
						</div>

					</div>

					<!-- 如果需要分页器 -->
					<div class="swiper-pagination"></div>

					<!-- 如果需要导航按钮 -->
					<div class="swiper-button-prev"></div>
					<div class="swiper-button-next"></div>
				</div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
name:'Carousel',
props:{
  List:Array
},
created(){
	this.$nextTick(() => {
			new Swiper(this.$refs.mySwiper, {
				loop: true, // 循环模式选项
				// 如果需要分页器
				pagination: {
					el: '.swiper-pagination',
					clickable:true
				},
				// 如果需要前进后退按钮
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev'
				}
			})
		})
			
},
	watch:{
		BannerList:{
			// 没办法保证v-for执行完成
			// 只写在这里会有bug,如果没有监视，就会先渲染，此时nextTick可能会先执行，用watch作为保证
			// 因为数据是在store中，推送是在App组件中，不会刷新，切换路由是watch就不会执行，这时放在会执行created中的回调
			immediate:true,
			handler(){
		this.$nextTick(() => {
			new Swiper(this.$refs.mySwiper, {
				loop: true, // 循环模式选项
				// 如果需要分页器
				pagination: {
					el: '.swiper-pagination',
					clickable:true
				},
				// 如果需要前进后退按钮
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev'
				}
			})
		})
			}
		}
	}
}
</script>

<style>

</style>
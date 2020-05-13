<template>
	<!-- 底部标签栏 -->
	<van-tabbar  v-model="active1" route>
		<van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
		<van-tabbar-item replace to="/orders" icon="orders-o">订单</van-tabbar-item>
		<van-tabbar-item replace to="/personal" icon="user-o">我的</van-tabbar-item>
	</van-tabbar>
</template>

<script>
	import {
		Tabbar,
		TabbarItem
	} from 'vant'
	
	export default {
		name: 'TabBar',
		props:['active'],
		components: {
			[Tabbar.name]: Tabbar,
			[TabbarItem.name]: TabbarItem
		},
		data() {
			return {
				active1: 0
			}
		},
		mounted() {
			const that = this
			that.active1 = that.active
		}
		
	}	
</script>

<style lang="scss" scoped>
	.van-tabbar {
		/deep/.van-tabbar-item--active {
			color: #FAC300;
		}
	}
</style>

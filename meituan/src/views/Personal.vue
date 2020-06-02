<template>
	<div class="personal">
	
		<!-- 顶部个人信息 -->
		<div class="top">
			<div class="avatar">
				<img src="../assets/logo.png" alt="">
			</div>
			<div class="info">
				<div class="user-name">大纳他</div>
				<div class="phone">187****8888</div>
			</div>
		</div>
		
		<div class="list">
			<div class="list-item"><i class="iconfont iconlocation"></i>我的地址<i class="iconfont iconright"></i></div>
			<div class="list-item"><i class="iconfont iconexport"></i>退出登录<i class="iconfont iconright"></i></div>
		</div>


		<!-- 底部标签栏 -->
		<TabBar :active="2"></TabBar>

	</div>
</template>

<script>
	import TabBar from '../components/TabBar.vue'
	export default {
		components: {
			TabBar
		},
		data() {
			return {

			}
		},
		methods: {

		},

	}
</script>

<style lang="scss" scoped>
	.personal {
		height: 100vh;
		background: #f5f4fa;

		.top {
			display: flex;
			align-items: center;
			padding: 20px 10px;
			background: #FAC300;
			margin-bottom: 10px;

			.avatar {
				display: inline-flex;
				justify-content: center;
				align-items: center;
				width: 60px;
				height: 60px;
				border-radius: 50%;
				border: 1px solid #ddd;
				overflow: hidden;
				background: #fff;
				margin-right: 10px;

				img {
					max-width: 100%;
					max-height: 100%;
				}
			}
			
			.user-name {
				font-weight: 600;
			}
			
		}
		
		.list {
			.list-item {
				font-size: 14px;
				padding: 10px;
				border-bottom: 1px solid #ddd;
				background: #fff;
				.iconfont {
					margin-right: 8px;
					color: #666;
					&.iconright {
						float: right;
						color: #999;
						margin-right: 0;
					}
				}
			}
		}
		
	}
</style>

<template>
	<div class="orders">

		<!-- 切换 -->
		<van-tabs>
			<van-tab title="全部订单">
				<!-- 列表 -->
				<van-list class="list" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
					<div class="list-item">
						<div class="bussiness-info">
							<div class="logo"><img src="../assets/logo.png" alt=""></div>
							<div class="r">
								<span class="title">九龙茶室（萝岗万达店）</span>
								<span class="order-state">订单已完成</span>
							</div>
						</div>
						<div class="order-detail">
							<div class="order-detail-item">皮蛋瘦肉粥<span class="num">×1</span></div>
							<div class="order-detail-item">皮蛋瘦肉粥<span class="num">×1</span></div>
							<div class="order-detail-item">皮蛋瘦肉粥<span class="num">×1</span></div>
							<div class="total">共3件商品，实付<span class="bold">¥62</span></div>
						</div>
						<div class="button-group">
							<van-button type="default" size="small">再来一单</van-button>
							<van-button color="#fac300" size="small">退款详情</van-button>
						</div>

					</div>
				</van-list>
			</van-tab>
			<van-tab title="待评价">暂无数据</van-tab>
			<van-tab title="退款">
				<!-- 列表 -->
				<van-list class="list" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
					<div class="list-item">
						<div class="bussiness-info">
							<div class="logo"><img src="../assets/logo.png" alt=""></div>
							<div class="r">
								<span class="title">九龙茶室（萝岗万达店）</span>
								<span class="order-state">订单已完成</span>
							</div>
						</div>
						<div class="order-detail">
							<div class="order-detail-item">皮蛋瘦肉粥<span class="num">×1</span></div>
							<div class="order-detail-item">皮蛋瘦肉粥<span class="num">×1</span></div>
							<div class="order-detail-item">皮蛋瘦肉粥<span class="num">×1</span></div>
							<div class="total">共3件商品，实付<span class="bold">¥62</span></div>
						</div>
						<div class="button-group">
							<van-button type="default" size="small">再来一单</van-button>
							<van-button color="#fac300" size="small">退款详情</van-button>
						</div>
				
					</div>
				</van-list>
			</van-tab>
		</van-tabs>

		<!-- 底部标签栏 -->
		<TabBar :active="1"></TabBar>

	</div>
</template>

<script>
	import TabBar from '../components/TabBar.vue'
	import {
		Tab,
		Tabs,
		List,
		Button
	} from 'vant'

	export default {
		components: {
			TabBar,
			[Tab.name]: Tab,
			[Tabs.name]: Tabs,
			[List.name]: List,
			[Button.name]: Button
		},
		data() {
			return {
				list: [],
				loading: false,
				finished: false,
			}
		},
		methods: {
			onLoad() {
				this.finished = true
			}
		},

	}
</script>

<style lang="scss" scoped>
	.orders {
		.van-tabs {
			/deep/.van-tab--active {
				color: #FAC300;
			}

			/deep/.van-tabs__line {
				background-color: #FAC300;
			}

			/deep/.van-tabs__content {
				padding: 10px 0;
			}

			.list {
				.list-item {
					padding: 10px;
					border-bottom: 1px solid #ddd;

					.bussiness-info {
						display: flex;
						align-items: center;

						.logo {
							display: inline-flex;
							justify-content: center;
							align-items: center;
							width: 40px;
							height: 30px;
							overflow: hidden;
							border: 1px solid #ddd;
							margin-right: 10px;

							img {
								max-width: 100%;
								max-height: 100%;
							}
						}

						.r {
							flex: 1;
							border-bottom: 1px solid #ddd;
							line-height: 30px;

							.title {
								font-weight: 600;
							}

							.order-state {
								float: right;
								font-size: 14px;
								color: #666;
							}
						}

					}

					.order-detail {
						font-size: 14px;
						color: #666;

						.order-detail-item {
							margin: 8px 0;
							
							.num {
								float: right;
							}
						}
						.total {
							text-align: right;
							.bold {
								font-weight: 600;
							}
						}

					}
					
					.button-group {
						text-align: right;
						margin: 6px 0;
						.van-button {
							margin-left: 10px;
						}
					}

				}
			}
		}
	}
</style>

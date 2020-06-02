<template>
	<div class="detail">

		<!-- 顶部背景 -->
		<div class="top">
			<!-- 返回按钮 -->
			<van-nav-bar left-text="" left-arrow @click-left="goBack" />
		</div>

		<!-- 商家信息 -->
		<div class="shop-info">
			<div class="part1">
				<div class="l">
					<img :src="shopDetail.shopBgImg" alt="">
				</div>
				<div class="r">
					<div class="title">{{shopDetail.shopName}}</div>
					<div class="other"><span>{{shopDetail.advantage}}</span><span>配送约{{shopDetail.time}}</span></div>
				</div>
			</div>
			<div class="part2">公告：{{shopDetail.notice}}</div>
			<div class="coupons">
				<van-tag plain type="danger" v-for="(item,index) in shopDetail.coupons" :key="index">{{item}}</van-tag>
			</div>
		</div>

		<!-- 产品 -->
		<div class="product" :style="'height:'+(screenHeight-265)+'px'">
			<!-- 左侧导航 -->
			<van-sidebar v-model="activeKey">
				<van-sidebar-item v-for="(nav,index) in productDatas" :key="nav.navId" :title="nav.navName" @click="jump(index)" />
			</van-sidebar>

			<!-- 产品列表 -->
			<div class="product-list" @scroll="listScroll">
				<div class="product-list-big-item" v-for="p in productDatas" :key="p.navId">
					<p class="product-list-title">{{p.navName}}</p>
					<div class="product-list-small-item" v-for="item in p.productDatas" :key="item.productId">
						<div class="product-img">
							<img :src="item.productImg" alt="">
						</div>
						<div class="product-info">
							<div class="product-title">{{item.productTitle}}</div>
							<div class="product-introduce">{{item.productIntroduce}}</div>
							<div class="other">
								<span>月售{{item.salesVolume}}</span>
								<span>赞{{item.like}}</span>
							</div>
							<div class="bottom-part">
								<div class="product-price">
									<span class="now-price">¥{{item.newPrice}}</span>
									<span class="old-price"><del>¥{{item.oldPrice}}</del>/{{item.unit}}</span>
								</div>
								<div class="button-group">
									<van-button round color="#fac300" @click="add(item)">+</van-button>
									<span class="count" v-if="item.productNum>0">{{item.productNum}}</span>
									<van-button round color="#fac300" v-if="item.productNum>0" @click="reduce(item)">-</van-button>
								</div>
							</div>
						</div>

					</div>
				</div>

			</div>

		</div>


		<!-- 底部购物车 -->
		<div class="detail-bottom">
			<div class="cart-part">
				<div class="l" @click="cartShow=true">
					<!-- 数量 -->
					<!-- <div class="cart-num">0</div> -->
					<img src="../assets/logo.png" alt="">
					<div class="price">¥{{total}}</div>
					<div class="small-text">另需配送费¥{{shopDetail.newDistributionPrice}}<del>¥{{shopDetail.oldDistributionPrice}}</del></div>
				</div>
				<div class="r">
					<div class="pay">去结算</div>
					<div class="small-text">支持代付</div>
				</div>
			</div>
		</div>
		<!-- 购物车内容 -->
		<van-popup position="bottom" v-model="cartShow">

		</van-popup>



	</div>
</template>

<script>
	import {
		GetShopDetail
	} from '@/api/shopDatas'
	import {
		NavBar,
		Tag,
		Sidebar,
		SidebarItem,
		Popup,
		Button
	} from 'vant'
	export default {
		name: 'detail',

		components: {
			[NavBar.name]: NavBar,
			[Tag.name]: Tag,
			[Sidebar.name]: Sidebar,
			[SidebarItem.name]: SidebarItem,
			[Popup.name]: Popup,
			[Button.name]: Button
		},
		data() {
			return {
				shopId: 0, //店铺id
				shopDetail: {}, //详情
				productDatas: [], //产品
				activeKey: 0, //侧边栏选择
				cartShow: false, //购物车展示
				screenHeight: 0, // 屏幕分辨率高度
				total: 0, //总价
			}
		},
		mounted() {
			const that = this
			//获取屏幕分辨率高度
			that.screenHeight = window.screen.height

			//获取shopId
			that.shopId = that.$route.query.shopId

			//获取店铺详情
			that.getDetail()

		},
		methods: {
			//返回上一页
			goBack() {
				this.$router.go(-1); //返回上一层
			},


			//获取店铺详情
			getDetail() {
				const that = this
				GetShopDetail({
					"shopId": that.shopId
				}).then(res => {
					if (res.status) {
						that.shopDetail = res.data
						that.productDatas = res.data.products
					}
				})
			},

			//点击左边菜单跳转到相应的列表项
			jump(index) {
				var items = document.querySelectorAll(".product-list-big-item");
				for (var i = 0; i < items.length; i++) {
					if (index === i) {
						items[i].scrollIntoView({
							block: "start", //默认跳转到顶部
							//behavior: "smooth" //滚动的速度
						});
					}
				}
			},

			//菜单列表滚动监听
			listScroll(e) { //e
				const that = this
				let scrollItems = document.querySelectorAll(".product-list-big-item")
				for (let i = scrollItems.length - 1; i >= 0; i--) {
					//判断是否滚动到底，如果是，左侧的tab变成最后一项
					let h = e.target.scrollHeight - e.target.clientHeight
					if (e.target.scrollTop == h) {
						that.activeKey = scrollItems.length - 1
						break
					}
					//滚动锚点定位
					if (e.target.scrollTop >= scrollItems[i].offsetTop) {
						that.activeKey = i
						break
					}

				}

			},

			//添加
			add(item) {
				const that = this
				item.productNum = item.productNum + 1
				//获取购物车总价
				that.total = that.total + item.newPrice
			},

			//减少
			reduce(item) {
				const that = this
				item.productNum = item.productNum - 1
				//获取购物车总价
				that.total = that.total - item.newPrice

			},


		},


	}
</script>

<style lang="scss" scoped>
	.detail {

		.top {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100px;
			background: url(../assets/logo.png) no-repeat;

			&::after {
				position: absolute;
				top: 0;
				left: 0;
				content: "";
				background-color: rgba(0, 0, 0, .4);
				width: 100%;
				height: 100%;
			}

			.van-nav-bar {
				background: transparent;

				&.van-hairline--bottom::after {
					border: none;
				}

				/deep/.van-icon {
					color: #FAC300;
				}
			}
		}

		.shop-info {
			position: relative;
			border: 1px solid #ddd;
			border-radius: 10px;
			margin: 70px 10px 10px;
			padding: 10px;
			background: #fff;

			.part1 {
				display: flex;
				align-items: center;

				.l {
					display: inline-flex;
					justify-content: center;
					align-items: center;
					width: 50px;
					height: 50px;
					border: 1px solid #ddd;
					border-radius: 4px;
					margin-right: 10px;

					img {
						max-width: 100%;
					}
				}

				.r {
					flex: 1;

					.title {
						font-weight: 600;
						width: 80%;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}

					.other {
						font-size: 12px;
						color: #666;
						margin: 4px 0;

						span {
							&:first-of-type {
								padding-right: 6px;
								border-right: 2px solid #ddd;
								margin-right: 6px;
							}
						}
					}

				}
			}

			.part2 {
				font-size: 12px;
				color: #666;
				width: 100%;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				margin: 8px 0;
			}

			.coupons {
				.van-tag {
					margin-right: 8px;
				}
			}

		}

		.product {
			display: flex;

			.van-sidebar {
				flex: 1;
				background: #f7f8fa;

				.van-sidebar-item {
					font-size: 13px;
					padding: 10px;

					/deep/.van-sidebar-item__text {
						width: 100%;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						vertical-align: top;
					}

					&.van-sidebar-item--select::before {
						background-color: #FAC300;
					}

				}
			}

			.product-list {
				position: relative;
				flex: 4;
				overflow: auto;

				.product-list-title {
					font-size: 13px;
					margin: 0;
					padding: 4px 10px;
					background: #f7f8fa;
				}

				.product-list-small-item {
					padding: 10px;
					border-bottom: 1px solid #eee;

					.product-img {
						display: inline-block;
						vertical-align: top;
						width: 20%;
						height: 50px;
						border: 1px solid #eee;
						overflow: hidden;
						text-align: center;

						img {
							max-width: 100%;
							max-height: 100%;
						}
					}

					.product-info {
						display: inline-block;
						width: 70%;
						margin-left: 2%;

						.product-title {
							font-weight: 600;
							width: 100%;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							padding: 0 0 4px 0;
						}

						.product-introduce {
							font-size: 12px;
							color: #666;
							width: 100%;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							margin: 4px 0;
						}

						.other {
							font-size: 12px;
							color: #888;
							margin: 4px 0;

							span {
								margin-right: 10px;
							}
						}

						.bottom-part {

							.product-price {
								display: inline-block;

								.now-price {
									font-size: 18px;
									font-weight: 600;
									color: #f00;
								}

								.old-price {
									font-size: 12px;
									color: #999;
									margin-left: 5px;
								}

							}

							.button-group {
								display: inline-block;
								float: right;

								button {
									width: 20px;
									height: 20px;
									padding: 0;
								}

								.count {
									margin: 0 4px;
								}
							}
						}

					}
				}
			}

		}

		.detail-bottom {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 60px;
			padding: 0 10px;
			box-sizing: border-box;

			.cart-part {
				display: flex;

				.l {
					position: relative;
					width: 70%;
					background: #000;
					color: #fff;
					border-radius: 30px 0 0 30px;
					box-sizing: border-box;
					padding: 7px 0 7px 76px;

					.cart-num {
						position: absolute;
						left: 45px;
						top: -35px;
						background: #f00;
						color: #fff;
						border-radius: 50%;
						width: 30px;
						height: 30px;
						z-index: 999;
					}

					img {
						position: absolute;
						top: -16px;
						left: 0;
						width: 70px;
					}

					.price {
						font-size: 18px;
						font-weight: 600;
					}

				}

				.r {
					width: 30%;
					background: #FAC300;
					border-radius: 0 30px 30px 0;
					padding: 7px 0;
					text-align: center;

					.pay {
						font-size: 18px;
						font-weight: 600;
					}
				}

				.small-text {
					font-size: 12px;

					del {
						margin-left: 4px;
					}
				}

			}
		}

	}
</style>

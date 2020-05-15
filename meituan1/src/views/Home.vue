<template>
	<div class="home">

		<!-- 顶部 -->
		<div class="top-part">
			<!-- 当前位置 -->
			<div class="top-part-1">
				<!-- 高德地图不需要显示 -->
				<el-amap vid="amap" :plugin="plugin" class="amap-demo" :center="center"></el-amap>
				<i class="iconfont iconlocation"></i><span>{{formattedAddress}}</span><i class="iconfont iconright"></i>
			</div>
			<!-- 搜索 -->
			<div class="top-part-2">
				<van-search :class="searchFixed?'search-fixed':''" shape="round" placeholder="请输入搜索关键词" />
				<div class="hot-words">
					<van-tag round>肯德基</van-tag>
					<van-tag round>必胜客</van-tag>
					<van-tag round>牛肉</van-tag>
					<van-tag round>茶餐厅</van-tag>
					<van-tag round>沙拉</van-tag>
					<van-tag round>鱼</van-tag>
				</div>
			</div>
		</div>

		<!-- 导航 -->
		<van-swipe class="nav-swipe" :loop="false" indicator-color="#FAC300">
			<van-swipe-item class="nav-swipe-item">
				<div class="item">
					<i class="iconfont iconiconpingtaimeituan01"></i>
					<div class="item-text">美食</div>
				</div>
				<div class="item">
					<i class="iconfont iconiconpingtaimeituan01"></i>
					<div class="item-text">超市便利</div>
				</div>
				<div class="item">
					<i class="iconfont iconiconpingtaimeituan01"></i>
					<div class="item-text">蔬菜水果</div>
				</div>
				<div class="item">
					<i class="iconfont iconiconpingtaimeituan01"></i>
					<div class="item-text">快食简餐</div>
				</div>
				<div class="item">
					<i class="iconfont iconiconpingtaimeituan01"></i>
					<div class="item-text">跑腿代购</div>
				</div>
				<div class="item">
					<i class="iconfont iconiconpingtaimeituan01"></i>
					<div class="item-text">下午茶</div>
				</div>
				<div class="item">
					<i class="iconfont iconiconpingtaimeituan01"></i>
					<div class="item-text">津贴联盟</div>
				</div>
				<div class="item">
					<i class="iconfont iconiconpingtaimeituan01"></i>
					<div class="item-text">奶茶果汁</div>
				</div>
				<div class="item">
					<i class="iconfont iconiconpingtaimeituan01"></i>
					<div class="item-text">家常菜</div>
				</div>
				<div class="item">
					<i class="iconfont iconiconpingtaimeituan01"></i>
					<div class="item-text">浪漫鲜花</div>
				</div>
			</van-swipe-item>
			<van-swipe-item class="nav-swipe-item">
				<div class="item">
					<i class="iconfont iconiconpingtaimeituan01"></i>
					<div class="item-text">汉堡披萨</div>
				</div>
				<div class="item">
					<i class="iconfont iconiconpingtaimeituan01"></i>
					<div class="item-text">日韩料理</div>
				</div>
				<div class="item">
					<i class="iconfont iconiconpingtaimeituan01"></i>
					<div class="item-text">无辣不欢</div>
				</div>
				<div class="item">
					<i class="iconfont iconiconpingtaimeituan01"></i>
					<div class="item-text">能量西餐</div>
				</div>
				<div class="item">
					<i class="iconfont iconiconpingtaimeituan01"></i>
					<div class="item-text">甜蜜蛋糕</div>
				</div>
				<div class="item">
					<i class="iconfont iconiconpingtaimeituan01"></i>
					<div class="item-text">煲仔饭</div>
				</div>
				<div class="item">
					<i class="iconfont iconiconpingtaimeituan01"></i>
					<div class="item-text">黄焖鸡米饭</div>
				</div>
				<div class="item">
					<i class="iconfont iconiconpingtaimeituan01"></i>
					<div class="item-text">品牌连锁</div>
				</div>
				<div class="item">
					<i class="iconfont iconiconpingtaimeituan01"></i>
					<div class="item-text">鸭脖卤味</div>
				</div>
				<div class="item">
					<i class="iconfont iconiconpingtaimeituan01"></i>
					<div class="item-text">全部分类</div>
				</div>
			</van-swipe-item>
		</van-swipe>

		<!-- 附近商家 -->
		<div class="shop-part">
			<h3>附近商家</h3>
			<!-- 筛选 -->
			<div :class="filterPartFixed?'filter-part-fixed filter-part':'filter-part'">
				<div class="item">综合排序<i class="iconfont iconcaret-down"></i></div>
				<div class="item">销量高</div>
				<div class="item">速度快</div>
				<div class="item">津贴联盟</div>
			</div>

			<!-- 商家列表 -->
			<van-list class="list" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
				<div class="list-item" v-for="item in list" :key="item.shopId" @click="goToDetail(item.shopId)">
					<div class="shop-logo">
						<img :src="item.logo" alt="">
					</div>
					<div class="shop-info">
						<div class="bussiness-name">{{item.title}}</div>
						<div class="other">
							<span><i class="iconfont iconstar-fill"></i>{{item.score}}</span>
							<span>月售{{item.salesVolume}}</span>
							<span>{{item.time}}</span>
							<span>{{item.distance}}</span>
						</div>
						<div class="other">
							<span>起送¥{{item.price1}}</span>
							<span>配送¥{{item.price2}}<del>¥{{item.delprice2}}</del></span>
							<span>人均¥{{item.price3}}</span>
						</div>
						<div class="other"><i class="iconfont iconstore"></i>{{item.mainProduct}}</div>
						<div class="tag">
							<van-tag plain type="danger" v-for="(tag,index) in item.coupons" :key="index">{{tag}}</van-tag>
						</div>
					</div>
				</div>
			</van-list>
		</div>

		<!-- 底部标签栏 -->
		<TabBar :active="0"></TabBar>



	</div>
</template>

<script>
	import {
		GetShopList
	} from '@/api/shopDatas'
	import TabBar from '@/components/TabBar'
	import {
		Search,
		Tag,
		Swipe,
		SwipeItem,
		List
	} from 'vant'


	export default {
		name: 'Home',
		components: {
			TabBar,
			[Search.name]: Search,
			[Tag.name]: Tag,
			[Swipe.name]: Swipe,
			[SwipeItem.name]: SwipeItem,
			[List.name]: List
		},
		data() {
			let self = this
			return {
				//当前位置
				formattedAddress: "",
				zoom: 12,
				//当前经纬度
				center: [106.354928, 29.613256],
				plugin: [{
					pName: 'Geolocation',
					events: {
						init(o) {
							// o 是高德地图定位插件实例
							o.getCurrentPosition((status, result) => {
								if (result && result.position) {
									self.lng = result.position.lng;
									self.lat = result.position.lat;
									self.center = [self.lng, self.lat];
									self.loaded = true;
									self.$nextTick();
									//逆编码
									self.getaddress0(self.center)
								}
							});
						}
					}
				}],

				searchFixed: false, //搜索是否固定在顶部
				filterPartFixed: false, //筛选区是否固定在顶部
				list: [], //商家列表
				loading: false, //列表加载中
				finished: false, //列表加载完成

			}
		},
		mounted() {
			const that = this
			// 绑定页面的滚动事件
			window.addEventListener('scroll', that.scrollHandle)


		},
		beforeDestroy() {
			//销毁滚动事件
			window.removeEventListener("scroll", this.scrollHandle)
		},
		methods: {
			//逆解码函数
			getaddress0: function(lnglat) {
				const that = this
				var geocoder = new AMap.Geocoder()
				geocoder.getAddress(lnglat, function(status, result) {
					console.log(status)
					console.log(result)
					that.formattedAddress = result.regeocode.formattedAddress
				})
			},

			//页面滚动事件
			scrollHandle: function() {
				const that = this
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop

				if (scrollTop >= 80) {
					that.searchFixed = true

				} else {
					that.searchFixed = false
				}

				if (scrollTop >= 270) {
					that.filterPartFixed = true

				} else {
					that.filterPartFixed = false
				}

			},
			//列表加载
			onLoad() {
				const that = this
				that.getShopList()

			},

			//获取商家列表
			getShopList() {
				const that = this
				GetShopList().then(res => {
					if (res.status) {
						that.list = res.data
						if (that.list.length == res.totals) {
							that.finished = true
						}
					}
				})

			},

			//跳转到详情页
			goToDetail(shopId) {
				const that = this
				that.$router.push({
					path: '/detail',
					query: {
						shopId: shopId
					}
				})
			},

		}
	}
</script>
<style lang="scss" scoped>
	.home {
		.top-part {

			.iconfont {
				font-size: 20px;
				vertical-align: top;
			}

			.top-part-1 {
				display: flex;
				padding: 10px 10px 0;

				span {
					display: inline-block;
					max-width: 80%;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

			}

			.top-part-2 {

				.search-fixed {
					position: fixed;
					top: 0;
					left: 0;
					z-index: 999;
					width: 100%;
					box-shadow: 0 0 4px 4px #eee;
				}

				.hot-words {
					padding: 0 10px 10px;

					.van-tag {
						margin-right: 10px;
						color: #555;
						background: #eee;
					}
				}
			}
		}

		.nav-swipe {
			.nav-swipe-item {

				.item {
					display: inline-block;
					width: 20%;
					text-align: center;
					margin: 10px 0;

					.iconfont {
						font-size: 50px;
						color: #FAC300;
					}

					.item-text {
						font-size: 12px;
						margin-top: 4px;
					}

					&:nth-of-type(2n) {
						.iconfont {
							color: #07BABD;
						}
					}

					&:nth-of-type(3n) {
						.iconfont {
							color: #E54B1C;
						}
					}

				}
			}

			/deep/.van-swipe__indicators {
				bottom: 0;
			}

			/deep/.van-swipe__indicator {
				width: 10px;
				height: 2px;
				background-color: #999;
			}
		}

		.shop-part {
			margin: 10px 0 0;

			h3 {
				margin: 0;
				padding: 10px;
			}

			.filter-part {
				display: flex;
				padding: 10px;

				.item {
					font-size: 14px;
					color: #999;
					margin-right: 14px;

					&:first-of-type {
						color: #000;
					}
				}

				&.filter-part-fixed {
					position: fixed;
					left: 0;
					top: 50px;
					width: 100%;
					z-index: 999;
					background: #fff;
					border-bottom: 1px solid #ddd;
				}

			}

			.list {
				margin-bottom: 80px;

				.list-item {
					display: flex;
					padding: 0 10px;
					margin: 20px 0;

					.shop-logo {
						display: inline-flex;
						justify-content: center;
						align-items: center;
						width: 80px;
						height: 60px;
						border: 1px solid #ddd;
						margin-right: 10px;
						overflow: hidden;

						img {
							max-width: 100%;
							max-height: 100%;
						}
					}

					.shop-info {
						flex: 1;

						.bussiness-name {
							font-weight: 600;
							margin: 0 0 10px 0;
						}

						.other {
							font-size: 12px;
							color: #666;
							margin: 4px 0;

							span {
								margin-right: 12px;

								del {
									margin-left: 4px;
									color: #999;
								}

								&.fr {
									float: right;
								}
							}

							.iconfont {
								font-size: 13px;
								margin-right: 2px;

								&.iconstar-fill {
									color: #FAC300;
								}
							}
						}

						.tag {
							.van-tag {
								margin-right: 4px;
							}
						}
					}
				}
			}

		}

	}
</style>

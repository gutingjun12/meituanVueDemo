<template>
	<div class="hello">
		<el-amap vid="amap" :plugin="plugin" class="amap-demo" :center="center"></el-amap>
		<p>当前经纬度：{{center}}</p>
		<p>当前地址：{{formattedAddress}}</p>
	</div>

</template>

<script>
	export default {
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
					}]
			};
		},

		methods: {
			//逆解码函数
			getaddress0: function(lnglat) {
				let self = this
				
				console.log(222)
				
				var geocoder = new AMap.Geocoder()

				geocoder.getAddress(lnglat, function(status, result) {
						console.log(status)
						console.log(result)
						self.formattedAddress = result.regeocode.formattedAddress
					
				})

			}
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped="scoped">
	.hello {
		height: 300px;

	}
</style>

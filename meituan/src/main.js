import Vue from 'vue'
import App from './App.vue'
import router from './router'

import VueAMap from 'vue-amap'

Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
	key: '4f69a48dbd48b54b232ae32fe17fb873',
	plugin: ['AMap.Geolocation'],
	// 默认高德 sdk 版本为 1.4.4
	v: '1.4.4'
});


Vue.config.productionTip = false

new Vue({
	router,
	render: h => h(App)
}).$mount('#app')

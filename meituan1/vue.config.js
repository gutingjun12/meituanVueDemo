module.exports = {

	devServer: {
		host: '192.168.0.64',
		port: 8080, // 端口号
		https: false, // https:{type:Boolean}
		open: true, //配置自动启动浏览器
		proxy: {
			'/api': {
				target: 'http://192.168.0.64:8080', //http://localhost:8080
				pathRewrite: {
					'^/api': ''
				},
				secure: false, //如果是https接口，需要配置这个参数
				changeOrigin: true //如果接口跨域，需要进行这个参数配置
			}
		}
	}

}

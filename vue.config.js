module.exports = {
	lintOnSave: false,
	devServer: {
		proxy: {
			'/api': {
				target: 'http://127.0.0.1:8888',
				// 允许跨域
				changeOrigin: true,
				ws: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		}
	}
}

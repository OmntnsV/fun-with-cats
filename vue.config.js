const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
	css: {
		loaderOptions: {
			scss: {
				additionalData: `@use "@/assets/_mixins.scss" as *;`
			}
		}
	}
})

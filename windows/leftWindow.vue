<template>
	<scroll-view class="sidebar" :class="vk.getVuex('$app.isPC') ? 'pc' : 'mobile'" scroll-y="true" v-loading="!vk.getVuex('$app.inited')" :style="styleCom">
		<!-- 通常情况下，请勿改动此文件代码，改变菜单的样式可以通过修改主题配置实现 主题文档：https://vkdoc.fsq.pub/admin/1/theme.html -->
		<vk-data-menu-nav
			v-if="vk.getVuex('$app.inited')"
			:data="vk.getVuex('$app.navMenu')"
			:uniqueOpened="true"
			:theme="theme"
			@select="select"
		></vk-data-menu-nav>
	</scroll-view>
</template>

<script>
	import config from "@/app.config.js";
	export default {
		data() {
			return {
				theme: config.theme
			}
		},
		methods: {
			select(e){

			},
		},
		// 监听属性
		watch: {
			$route: {
				immediate: true,
				handler(newRoute, oldRoute) {
					let that = this;
					let { vk } = that;
					let { path , query } = newRoute;
					let url = path + vk.pubfn.queryParams(query);
					let route = { path, query, url };
					vk.setVuex('$app.route', route);
				}
			}
		},
		// 计算属性
		computed: {
			styleCom(){
				let theme = this.theme;
				if (theme && theme.use) {
					return theme[theme.use].leftMenu;
				} else {
					return {};
				}
			}
		}
	}
</script>

<style lang="scss">
	.sidebar {
		position: fixed;
		top: var(--window-top);
		width: 240px;
		height: calc(100vh - (var(--window-top)) + 50px);
		box-sizing: border-box;
		box-shadow: var(--boxShadow, 2px 0 0px rgba(0,21,4,0.2));
		border-top: var(--borderTop);
		background-color: $left-window-bg-color;
		padding-bottom: 10px;
		top: 50px;
		z-index: 998;
	}
	.title {
		margin-left: 5px;
	}
	.center{
		text-align: center;
		margin-top: 100px;
	}
</style>

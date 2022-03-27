import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

// 定义路由跳转规则
// component 采用 路由懒加载形式
// 此项目中，均采用 name 方式指定路由进行跳转
/* 
    meta 用于定义路由元信息，
其中 
    isRouter 用于指示是否开启路由守卫（true 表示开启）。
    isTab 用于表示是否显示为标签页（true 表示显示）
    iframeUrl 用于表示 url，使用 http 或者 https 开头的 url 使用 iframe 标签展示
*/
const routes = [{
		path: '/',
		redirect: {
			name: "login"
		}
	},
	{
		path: '/404',
		name: '404',
		component: () => import('@/components/common/404.vue')
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/components/common/Login.vue')
	},
	{
		path: '/Home',
		name: 'Home',
		component: () => import('@/views/Home.vue'),
		redirect: {
			name: 'HomePage'
		},
		children: [{
				path: '/Home/Page',
				name: 'HomePage',
				component: () => import('@/views/menu/HomePage.vue'),
				meta: {
					isRouter: true
				}
			},
			{
				path:'/Home/VideoUpload',
				name:'VideoUpload',
				component:()=> import('@/views/menu/VideoUpload.vue'),
				meta:{
					isRouter: true
				}
			},
			{
				path:'/Home/CreateExam',
				name:'CreateExam',
				component:()=> import('@/views/menu/Exam.vue'),
				meta:{
					isRouter: true
				}
			},
			{
				path:'/Home/PptUpload',
				name:'PptUpload',
				component:()=> import('@/views/menu/PptUpload.vue'),
				meta:{
					isRouter: true
				}
			},
			{
				path: '/Home/Demo/Echarts',
				name: 'Echarts',
				component: () => import('@/views/menu/Echarts.vue'),
				meta: {
					isRouter: true,
					isTab: true
				}
			},
			{
				path: '/Home/Demo/Ueditor',
				name: 'Ueditor',
				component: () => import('@/views/menu/Ueditor.vue'),
				meta: {
					isRouter: true,
					isTab: true
				}
			},
			{
				path: '/Home/Demo/Baidu',
				name: 'Baidu',
				meta: {
					isRouter: true,
					isTab: true,
					iframeUrl: '@/test.html'
				}
			},
			// 路由匹配失败时，跳转到 404 页面
			{
				path: "*",
				redirect: {
					name: '404'
				}
			}
		]
	}
]

// 创建一个 router 实例
const router = new VueRouter({
	// routes 用于定义 路由跳转 规则
	routes,
	// mode 用于去除地址中的 #
	mode: 'history',
	// scrollBehavior 用于定义路由切换时，页面滚动。
	scrollBehavior: () => ({
		y: 0
	}),
	// isAddDynamicMenuRoutes 表示是否已经添加过动态菜单（防止频繁请求动态菜单）
	isAddDynamicMenuRoutes: false
})


// 解决相同路径跳转报错
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
	if (onResolve || onReject)
		return routerPush.call(this, location, onResolve, onReject)
	return routerPush.call(this, location).catch(error => error)
}

export default router

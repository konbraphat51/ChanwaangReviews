const router = VueRouter.createRouter({
	mode: "hash",
	history: VueRouter.createWebHashHistory(),
	routes: [
		{
			path: "/",
			name: "Home",
			component: Vue.defineAsyncComponent(() =>
				loadModule("src/components/Home/Home.vue", options),
			), //default page
		},
	],
})

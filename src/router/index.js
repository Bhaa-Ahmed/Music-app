import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomeView.vue";
import About from "../views/AboutView.vue";
import Manage from "../views/ManageView.vue";
import useUserStore from "../stores/user";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			name: "home",
			path: "/",
			component: Home,
		},
		{
			name: "about",
			path: "/about",
			component: About,
		},
		{
			name: "manage",
			path: "/manage",
			component: Manage,
			meta: {
				requiresAuth: true,
			},
		},
		{ path: "/manage-music", redirect: { name: "manage" } },
		{ path: "/:catchAll(.*)*", redirect: { name: "home" } },
	],
	linkExactActiveClass: "text-yellow-500",
});

router.beforeEach((to, from, next) => {
	if (!to.meta.requiresAuth) {
		next();
		return;
	}

	const store = useUserStore();

	if (store.userLoggedIn) {
		next();
	} else {
		next({ name: "home" });
	}
});

export default router;

import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {authMiddleware} from "@/router/middlewares";

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'home',
		component: HomeView
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('../views/LogInView.vue'),
	},
	{
		path: '/facts/:factId',
		name: 'fact',
		component: () => import('../views/FactView.vue'),
		beforeEnter: authMiddleware,
	},
	{
		path: '/facts',
		name: 'facts',
		component: () => import('../views/FactsView.vue'),
		beforeEnter: authMiddleware,
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router

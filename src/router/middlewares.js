import { auth } from "@/utils/auth";

export function authMiddleware(to, from, next) {
	if (to.path === '/login') {
		return next();
	}
	if (!auth.isAuthenticated) {
		return next('/login');
	}
	next();
}
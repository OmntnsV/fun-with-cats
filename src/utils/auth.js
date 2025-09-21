import Vue from 'vue';

const state = Vue.observable({
	username: localStorage.getItem('username') || null
});

export const auth = {
	get username() {
		return state.username;
	},
	get isAuthenticated() {
		this.checkAuthentication();
		return !!state.username;
	},
	async login(name) {
		return new Promise((resolve) => {
			setTimeout(() => {
				state.username = name;
				localStorage.setItem('username', name);
				resolve();
			}, 1000);
		})
	},
	logout() {
		state.username = null;
		localStorage.removeItem('username');
	},
	checkAuthentication() {
		state.username = localStorage.getItem('username') || null;
	}
};
<script>
	import {auth} from "@/utils/auth";

	export default {
		name: 'NavbarUser',
		data () {
			return {
				logoutOpen: false,
			}
		},
		methods: {
			async logout() {
				auth.logout();
				await this.$router.push('/login');
			},
			toggleLogout () {
				this.logoutOpen = !this.logoutOpen;
			},
			close (e) {
				if (!this.$el.contains(e.target)) {
					this.logoutOpen = false;
				}
			}
		},
		computed: {
			userFirstLetter() {
				return auth.username.split('')[0].toUpperCase();
			},
			isAuthenticated() {
				return auth.isAuthenticated;
			},
		},
		mounted() {
			document.addEventListener('click', this.close);
		},
		beforeDestroy() {
			document.removeEventListener('click', this.close);
		}
	}
</script>

<template>
	<div v-if="isAuthenticated" class="navbar__user" @click="toggleLogout">
		<span class="navbar__user-name">{{ userFirstLetter }}</span>
		<transition name="fade" mode="in-out">
			<button v-if="logoutOpen" class="navbar__user-logout" v-on:click="logout">Log Out</button>
		</transition>
	</div>
</template>

<style scoped lang="scss">
	.navbar {
		&__user {
			width: 56px;
			aspect-ratio: 1/1;
			border-radius: 50%;
			background-color: var(--color-accent);
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			cursor: pointer;
			color: var(--color-white);

			&-name {
				font-size: 2em;
				user-select: none;
				padding-top: 5px;
			}

			&-logout {
				position: absolute;
				top: calc(100% + 24px);
				right: 0;
				padding: 12px 1em;
				width: calc(100% + 100px);
				text-align: left;

				&:hover {
					background-color: var(--color-background-ui-active);
				}
			}
		}
	}
</style>
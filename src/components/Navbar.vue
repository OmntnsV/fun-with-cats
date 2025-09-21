<script>
	import ThemeSwitcher from "@/components/ThemeSwitcher.vue";
	import IconLogoText from "@/components/icons/IconLogoText.vue";
	import NavbarUser from "@/components/NavbarUser.vue";

	export default {
		name: 'NavBar',
		components: {NavbarUser, IconLogoText, ThemeSwitcher},
	}
</script>

<template>
	<div class="navbar">
		<RouterLink to="/facts" class="navbar__logo">
			<img src="@/assets/LogoBlue.png" alt="Logo" class="navbar__logo-image" />
			<IconLogoText class="navbar__logo-text" />
		</RouterLink>
		<div class="navbar__utils">
			<ThemeSwitcher />
			<NavbarUser />
		</div>
	</div>
</template>

<style lang="scss" scoped>
	@use '@/assets/variables';

	.navbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px 20px;
		background-color: var(--color-background-accent);
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: var(--size-navbar-height);
		z-index: 15;

		&__logo {
			display: flex;
			align-items: center;
			cursor: pointer;
			transition: .2s scale ease;

			&-text {
				color: var(--color-accent);
				display: none;

				@media screen and (min-width: #{variables.$size-tablet}) {
					display: initial;
				}
			}

			&-image {
				margin-right: 10px;
			}

			&:hover {
				scale: .95;
			}
		}

		&__utils {
			display: flex;
			align-items: center;

			& > *:not(:last-child) {
				margin-right: 20px;
			}
		}
	}
</style>
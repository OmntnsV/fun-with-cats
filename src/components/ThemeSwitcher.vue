<script>
	import IconMoon from "@/components/icons/IconMoon.vue";
	import IconSun from "@/components/icons/IconSun.vue";
	import {getTheme, setTheme} from "@/utils/theme";

	export default {
		name: 'ThemeSwitcher',
		components: {IconSun, IconMoon},
		data() {
			return {
				mode: getTheme()
			};
		},
		methods: {
			toggleTheme() {
				this.mode = this.mode === 'light' ? 'dark' : 'light';
				setTheme(this.mode);
			}
		},
		computed: {
			isDarkMode() {
				return this.mode === 'dark';
			}
		}
	}
</script>

<template>
	<button type="button" class="switcher" v-on:click="toggleTheme" :class="{'dark-mode': isDarkMode}">
		<IconMoon class="switcher__moon" />
		<IconSun class="switcher__sun" />
		<span class="switcher__selector"></span>
	</button>
</template>

<style scoped lang="scss">
	.switcher {
		width: 80px;
		height: 37px;
		border: none;
		border-radius: 30px;
		background-color: var(--color-background);
		position: relative;
		overflow: hidden;
		padding: 0;

		&__moon {
			position: absolute;
			top: 53%;
			left: 0;
			transform: translateY(-50%);
		}

		&__sun {
			position: absolute;
			top: 50%;
			right: 6px;
			transform: translateY(-50%);
			color: #f39c12;
		}

		&__selector {
			width: 28px;
			height: 28px;
			background-color: #888;
			border-radius: 50%;
			position: absolute;
			top: 50%;
			left: 5px;
			transform: translateY(-50%);
			transition: left 0.3s ease;
		}
	}

	.switcher.dark-mode {
		& .switcher__selector {
			left: 47px;
		}
	}
</style>
<script>
	import NavBar from "@/components/Navbar.vue";
	import {getTheme, setTheme} from "@/utils/theme";

	export default {
		name: 'App',
		components: {NavBar},
		mounted() {
			setTheme(getTheme());
		}
	}
</script>

<template>
  <div id="app">
    <NavBar />
    <router-view/>
  </div>
</template>

<style lang="scss">
@import './assets/style.scss';
</style>

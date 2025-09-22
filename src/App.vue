<script>
import NavBar from "@/components/Navbar.vue";
import {getTheme, setTheme} from "@/utils/theme";
import PageFooter from "@/components/Footer.vue";

export default {
	name: 'App',
	components: {PageFooter, NavBar},
	mounted() {
		setTheme(getTheme());
	}
}
</script>

<template>
	<div id="app">
		<NavBar/>
		<router-view class="main"/>
		<PageFooter v-if="this.$route.name !== 'login'"/>
	</div>
</template>

<style lang="scss">
@import './assets/style.scss';

#app {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
}

.main {
	flex: 1;
}
</style>

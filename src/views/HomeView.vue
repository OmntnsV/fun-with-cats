<template>
	<main>
		<h1>Hi there!</h1>
		<p>To begin please navigate to <RouterLink class="link" to="/facts">facts</RouterLink> page</p>
	</main>
</template>

<script>
export default {
	name: 'HomeView',
}
</script>

<style scoped>
	main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;

		.link {
			text-decoration: underline;
			font-weight: 500;
		}
	}
</style>

<script>
import {facts} from "@/utils/facts";
import IconDropdownCaret from "@/components/icons/IconDropdownCaret.vue";
import PageFooter from "@/components/Footer.vue";
// import {authMiddleware} from "@/router/middlewares";
export default {
	name: 'FactView',
	components: {PageFooter, IconDropdownCaret},
	data() {
		return {
			fact: {}
		}
	},
	async mounted() {
		const gotFact = await facts.getFactById(Number(this.$route.params.factId));
		if (!gotFact) await this.$router.push('/facts');
		this.fact = gotFact;
	}
}
</script>

<template>
	<div>
		<div class="fact">
			<div class="container">
				<RouterLink class="fact__back" to="/facts">
					<IconDropdownCaret class="fact__back-icon" />
					<span class="fact__back-text">Back</span>
				</RouterLink>
				<div class="fact__container">
					<img class="fact__img" :src="fact.imageSrc" alt="">
					<p>{{fact.fact}}</p>
				</div>
			</div>
		</div>
		<PageFooter />
	</div>
</template>

<style scoped lang="scss">
	.fact {
		margin-top: var(--size-navbar-height);
		min-height: calc(100svh - var(--size-navbar-height));

		&__back {
			display: flex;
			align-items: center;
			justify-content: flex-start;
			margin: .5em 0;
			transition: color .2s ease;

			&:hover {
				color: var(--color-accent);
			}

			&-text {
				padding-top: 2px;
			}

			&-icon {
				rotate: 90deg;
			}
		}

		&__container {
			max-width: 854px;
			width: 100%;
			margin: 0 auto;
		}

		&__img {
			width: 100%;
			height: auto;
			margin-bottom: 2.5em;
		}
	}
</style>
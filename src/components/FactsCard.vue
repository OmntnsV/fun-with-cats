<script lang="ts">
export default {
	name: 'FactsCard',
	props: {
		'fact': Object
	},
	computed: {
		isLong() {
			return this.fact.length > 100;
		}
	}
}
</script>

<template>
	<article class="fact">
		<RouterLink :to="`/facts/${fact.id}`" style="display: contents">
			<img class="fact__image" :src="fact.imageSrc" alt="">
			<div class="fact__content">
				<p v-if="!isLong" class="fact__short">{{fact.fact}}</p>
				<p v-else class="fact__long">{{fact.fact}}</p>
			</div>
		</RouterLink>
	</article>
</template>

<style scoped lang="scss">
@use '@/assets/variables';

	.fact {
		display: flex;
		flex-direction: column;
		gap: 40px;
		width: 100%;
		min-width: 0;
		max-width: 400px;
		border-radius: 6px;
		transition: background-color .2s ease;
		cursor: pointer;

		&:hover {
			background-color: var(--color-background-ui-active);
		}

		@include tablet {
			max-width: 100%;
		}

		&__content {
			padding: 1em;
			flex-grow: 1;


			* {
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 6;
				line-clamp: 6;
				overflow: hidden;
				line-height: 1.5em;
			}
		}

		&__short {
			font-size: 1.5em;
			font-weight: 700;
		}
	}
</style>

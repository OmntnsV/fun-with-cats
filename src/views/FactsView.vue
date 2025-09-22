<script>
import FactsCard from "@/components/FactsCard.vue";
import UiSelect from "@/components/Select.vue";
import IconLoader from "@/components/icons/IconLoader.vue";
import IconSearch from "@/components/icons/IconSearch.vue";
import {facts} from "@/utils/facts";

export default {
	name: "FactsView",
	components: { IconSearch, IconLoader, UiSelect, FactsCard },
	data() {
		return {
			searchText: this.$route.query.search || '',
			sortOption: 'all',
			dropdownOpen: false,
			filterSelected: this.$route.query.sort || '',
			sortOptions: [
				{ value: 'all', label: 'All facts' },
				{ value: 'longer-first', label: 'Show long ones first' },
				{ value: 'shorter-first', label: 'Show short ones first' },
				{ value: 'short-only', label: 'Short ones only' },
				{ value: 'long-only', label: 'Long ones only' },
			],
		}
	},
	methods: {
		getNewFacts() {
			facts.getNewFacts();
		},
	},
	computed: {
		facts() {
			return facts.facts;
		},
		loading() {
			return facts.loading;
		},
		canLoadMore() {
			return facts.isLastPage;
		},
		filteredFacts() {
			let result = this.facts.filter(f => f.fact.toLowerCase().includes(this.searchText.toLowerCase()));
			switch(this.filterSelected) {
				case 'longer-first':
					result.sort((a, b) => b.fact.length - a.fact.length);
					break;
				case 'shorter-first':
					result.sort((a, b) => a.fact.length - b.fact.length);
					break;
				case 'short-only':
					result = result.filter(f => f.fact.length <= 100);
					break;
				case 'long-only':
					result = result.filter(f => f.fact.length > 100);
					break;
			}
			return result;
		},
	},
	async mounted() {
		if (this.facts.length === 0) {
			await facts.getNewFacts();
		}
	},
	watch: {
		searchText() {
			this.$router.push({
				name: 'facts',
				query: {
					...this.$route.query,
					search: this.searchText,
				}
			})
		},
		filterSelected(){
			this.$router.push({
				name: 'facts',
				query: {
					...this.$route.query,
					sort: this.filterSelected,
				}
			});
		}
	}
}
</script>

<template>
	<main class="facts">
		<div class="container">
			<div class="facts__inner">
				<header class="facts__header">
					<h1 class="facts__title">Facts About Cats To Share With Kids!</h1>
				</header>
				<div class="facts__options">
					<div class="facts__options-filter">
						<input class="facts__options-filter-input" type="text" v-model="searchText" placeholder="Search facts here">
						<IconSearch class="facts__options-filter-icon" />
					</div>
					<UiSelect class="facts__options-select" :options="sortOptions" v-model="filterSelected"/>
				</div>
				<section class="facts__list" ref="factsList">
					<FactsCard v-for="fact in filteredFacts" :key="fact.id" :fact="fact"/>
				</section>
				<div class="facts__get" v-if="canLoadMore">
					<button v-if="!loading" class="facts__get-button" v-on:click="getNewFacts()">Load more facts</button>
					<IconLoader v-else style="width: 20px; height: 20px"/>
				</div>
			</div>
		</div>
	</main>
</template>

<style scoped lang="scss">
@use '@/assets/variables';

.facts {
	margin-top: var(--size-navbar-height);

	&__inner {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	&__title {
		text-align: center;
		font-size: 2em;

		@media screen and (min-width: #{variables.$size-tablet}) {
			font-size: 2.5em;
		}

		@media screen and (min-width: #{variables.$size-desktop}) {
			font-size: 3.5em;
		}
	}

	&__options {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		gap: 1em;
		width: 100%;
		margin: 0 auto;

		&-filter-input {
			width: 100%;
			padding-left: 50px;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: flex-start;
		}

		&-filter-icon {
			position: absolute;
			left: 1em;
			top: 50%;
			transform: translateY(-50%);
		}

		&-filter, &-select {
			width: 100%;
			max-width: 400px;
			position: relative;
			cursor: pointer;
		}

		@media screen and (min-width: #{variables.$size-tablet}) {
			flex-direction: row;

			&-filter {
				max-width: 373px;
			}

			&-select {
				max-width: 300px;
			}
		}
	}

	&__list {
		display: grid;
		grid-template-columns: 1fr;
		row-gap: 40px;
		justify-content: space-between;
		gap: 1.5rem;
		position: relative;
		width: fit-content;
		margin: 0 auto;

		@media screen and (min-width: #{variables.$size-tablet}) {
			grid-template-columns: repeat(2, 1fr);
			min-width: 100%;
		}

		@media screen and (min-width: #{variables.$size-desktop}) {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	&__get {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 42px;

		&-button {
			background-color: transparent;
			outline: 1px solid var(--color-accent);
			color: var(--color-accent);
			font-weight: 600;
			font-size: 18px;

			&:hover {
				background-color: var(--color-accent);
				color: var(--color-white);
			}
		}
	}
}
</style>
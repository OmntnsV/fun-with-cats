import Vue from 'vue';
import axios from "axios";

const API_URL = 'https://catfact.ninja/facts';

const state = Vue.observable({
	facts: [],
	loading: false,
	nextPageUri: API_URL,
	isLastPage: false,
})

export const facts = {
	get facts() {
		return state.facts;
	},

	get loading() {
		return state.loading;
	},

	get isLastPage() {
		return state.isLastPage;
	},

	async getNewFacts(limit = 10) {
		const data = await this.getLimitOfFactsFromUrl(limit, state.nextPageUri);
		state.nextPageUri = data['next_page_url'];
		const receivedFacts = data.data;
		const fullFactsList = state.facts.concat(receivedFacts);
		const fullFactsListWithIds = this.addIdsToFacts(fullFactsList);
		state.facts = this.addImagesToFacts(fullFactsListWithIds);
	},

	async addFactsTillLimit(limit) {
		const data = await this.getLimitOfFactsFromUrl(limit)
		const receivedFacts = data.data;
		const receivedFactsWithIds = this.addIdsToFacts(receivedFacts);
		const newFacts = receivedFactsWithIds.slice(state.facts.length);
		const fullFactsWithIds = state.facts.concat(newFacts);
		state.facts = this.addImagesToFacts(fullFactsWithIds);
	},

	async getLimitOfFactsFromUrl(limit, url = API_URL) {
		state.loading = true;
		const { data } = await axios.get(url, {
			params: { 'limit': limit }
		});
		state.isLastPage = !!data.next_page_url;
		state.loading = false;
		return data;
	},

	addIdsToFacts(factsList) {
		return factsList.map((fact, id) => {
			if (!fact.id) fact.id = id;
			return fact;
		})
	},

	addImagesToFacts(factsList) {
		let imageIterator = 1;
		return factsList.map((fact) => {
			if (!fact.imageSrc) {
				fact.imageSrc = require(`@/assets/cats/Pic${imageIterator}.png`);
			}
			imageIterator++;
			if (imageIterator >= 9) imageIterator = 1;
			return fact;
		})
	},

	async getFactById(id) {
		if (!state.facts[id]) {
			await this.addFactsTillLimit(Number(id) + 1);
		}
		return (state.facts[id]);
	}
}
import Vue from 'vue';
import axios from "axios";

const state = Vue.observable({
	facts: [],
	loading: false,
	nextPageUri: 'https://catfact.ninja/facts',
})

export const facts = {
	get facts() {
		return state.facts;
	},

	get loading() {
		return state.loading;
	},

	async getNewFacts(limit = 10) {
		state.loading = true;
		try {
			const { data } = await axios.get(state.nextPageUri, {
				params: { 'limit': limit }
			});
			this.processFetchedFacts(data);
		} catch (e) {
			console.error(e);
		}
	},

	async addFactsTillLimit(limit) {
		state.loading = true;
		const { data } = await axios.get('https://catfact.ninja/facts', {
			params: { 'limit': limit }
		});
		const receivedFacts = data.data;
		this.assignIdsToFacts(receivedFacts);
		const newFacts = receivedFacts.slice(state.facts.length);
		state.facts.push(...newFacts);
		this.addImagesToFacts();
		state.loading = false;
	},

	processFetchedFacts(data) {
		state.loading = false;
		state.facts = state.facts.concat(data.data);
		this.assignIdsToFacts(state.facts);
		this.addImagesToFacts()
		state.nextPageUri = data['next_page_url'];
	},

	assignIdsToFacts(factsList) {
		factsList.map((fact, id) => {
			if (!fact.id) fact.id = id;
		});
	},

	addImagesToFacts() {
		let imageIterator = 1;
		for (let i = 0; i < state.facts.length; i++) {
			const fact = state.facts[i];
			if (!fact.imageSrc) {
				fact.imageSrc = require(`@/assets/cats/Pic${imageIterator}.png`);
			}
			imageIterator++;
			if (imageIterator >= 9) imageIterator = 1;
		}
	},

	async getFactById(id) {
		if (!state.facts[id]) {
			await this.addFactsTillLimit(Number(id) + 1);
		}
		return (state.facts[id]);
	}
}
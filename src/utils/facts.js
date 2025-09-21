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

	async getFactsTillLimit(limit) {
		state.loading = true;
		try {
			const { data } = await axios.get('https://catfact.ninja/facts', {
				params: { 'limit': limit }
			});
			this.processFetchedFacts(data);
		} catch (e) {
			console.error(e);
		}
	},

	processFetchedFacts(data) {
		state.loading = false;
		state.facts = state.facts.concat(data.data);
		this.assignIdsToFacts()
		this.addImagesToFacts()
		state.nextPageUri = data['next_page_url'];
	},

	assignIdsToFacts() {
		state.facts.map((fact, id) => {
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
			try {
				await this.getFactsTillLimit(Number(id) - state.facts.length + 1);
			} catch (e) {
				console.error(e);
				return null
			}
		}
		return (state.facts[id]);
	}
}
<script>
import IconDropdownCaret from "@/components/icons/IconDropdownCaret.vue";
import IconCheck from "@/components/icons/IconCheck.vue";

export default {
	name: "UiSelect",
	components: {IconCheck, IconDropdownCaret},
	props: {
		modelValue: {
			type: String,
			default: ""
		},
		options: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			isOpen: false
		}
	},
	model: {
		prop: 'modelValue',
		event: 'change'
	},
	computed: {
		currentLabel() {
			const found = this.options.find(o => o.value === this.modelValue);
			return found ? found.label : "Select an option";
		}
	},
	methods: {
		toggleOpen() {
			this.isOpen = !this.isOpen;
		},
		select(value) {
			this.$emit('change', value);
			this.isOpen = false;
		},
		close (e) {
			if (!this.$el.contains(e.target)) {
				this.isOpen = false;
			}
		}
	},
	mounted() {
		document.addEventListener('click', this.close);
	},
	beforeDestroy() {
		document.removeEventListener('click', this.close);
	}
}
</script>

<template>
	<div class="select" @click="toggleOpen">
		<span class="select-label">{{ currentLabel }}</span>
		<IconDropdownCaret />
		<transition name="fade" mode="out-in">
			<ul v-show="isOpen" class="select-options">
				<li v-for="option in options" :key="option.value" @click.stop="select(option.value)" class="select-options-item" :class="{'select-options-item-active': option.value === modelValue}">
					<span>{{option.label}}</span>
					<IconCheck v-if="option.value === modelValue" />
				</li>
			</ul>
		</transition>
	</div>
</template>

<style scoped lang="scss">
.select {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;

	&-icon {

	}

	&-label {
		user-select: none;
	}

	&-options {
		position: absolute;
		top: calc(100% + 6px);
		left: 0;
		right: 0;
		margin: 0;
		padding: 0;
		list-style: none;
		border-radius: 6px;
		background-color: var(--color-background-ui);
		color: var(--color-text-ui-select);
		overflow-y: auto;
		z-index: 10;
		line-height: 24px;

		&-item {
			padding: 0.6rem 1rem;
			display: flex;
			align-items: center;
			justify-content: space-between;

			&:hover {
				background-color: var(--color-background-ui-active);
			}

			&-active {
				color: var(--color-text-ui-selected);
			}
		}
	}
}
</style>
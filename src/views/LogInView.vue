<script>
import debounce from "lodash/debounce";
import { auth } from "@/utils/auth";
import IconLoader from "@/components/icons/IconLoader.vue";

export default {
	name: "LogInView",
	components: {IconLoader},
	data() {
		return {
			name: "",
			error: "",
			loading: false,
		};
	},
	created() {
		this.debouncedValidate = debounce(() => {
			this.validate();
		}, 500);
	},
	methods: {
		validate() {
			const regex = /^[A-Za-z]+$/;
			if (!this.name) {
				this.error = "Name is required";
				this.$refs.inputName.setCustomValidity("Name is required");
				return false;
			} else if (!regex.test(this.name)) {
				this.error = "Invalid characters";
				this.$refs.inputName.setCustomValidity("Invalid characters");
				return false;
			} else if (this.name.length < 3) {
				this.error = "Name is too short";
				this.$refs.inputName.setCustomValidity("Invalid length");
				return false;
			} else if (this.name.length > 15) {
				this.error = "Name is too long";
				this.$refs.inputName.setCustomValidity("Invalid length");
				return false;
			} else {
				this.error = "";
				this.$refs.inputName.setCustomValidity("");
				return true;
			}
		},
		async handleLogin() {
			if (!this.validate()) return;
			this.error = "";
			this.loading = true;
			await auth.login(this.name);
			this.loading = false;
			await this.$router.push('/facts');
		}
	},
	watch: {
		name() {
			this.debouncedValidate();
		}
	}
};
</script>

<template>
	<main class="login">
		<h1 class="login__title" v-if="!loading">Log In</h1>
		<form @submit.prevent="handleLogin" class="login__form" v-if="!loading">
			<div class="login__area">
				<label class="login__area-label" for="name">Name</label>
				<input
						class="login__area-input"
						type="text"
						id="name"
						autocomplete="given-name"
						ref="inputName"
						v-model="name"
						placeholder="Enter your name"
				/>
				<transition name="fade">
					<div class="login__area-error" v-if="error">{{ error }}</div>
				</transition>
			</div>
			<button class="login__form-button" type="submit">Log In</button>
		</form>
		<IconLoader v-else class="login__loader" />
	</main>
</template>

<style scoped lang="scss">
	.login {
		margin-top: var(--size-navbar-height);
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		gap: 3em;
		height: calc(100svh - var(--size-navbar-height));
		padding: 1em;

		&__title {
			font-size: 1.5em;
		}

		&__form {
			display: flex;
			flex-direction: column;
			gap: 1em;
			align-items: center;
			width: 100%;
			max-width: 410px;
			margin-bottom: 30%;

			&-button {
				background-color: var(--color-button-primary);
				color: var(--color-white);
				font-weight: 600;
			}
		}

		&__area {
			position: relative;
			margin: 1em 0;
			width: 100%;

			&-label {
				position: absolute;
				translate: 0 -100%;
				font-size: 0.9em;
				color: var(--color-text-secondary);
				font-weight: 500;
			}

			&-input {
				max-width: 410px;
				width: 100%;
				caret-color: #6E72EC;
			}

			&-error {
				color: var(--color-invalid);
				font-size: 14px;
				margin-top: 0.2em;
				position: absolute;
				bottom: 0;
				translate: 0 100%;
			}
		}
	}
</style>
<script>
import IconLogoText from "@/components/icons/IconLogoText.vue";
import InstagramLogo from "@/components/icons/InstagramLogo.vue";
import FacebookLogo from "@/components/icons/FacebookLogo.vue";
import YoutubeLogo from "@/components/icons/YoutubeLogo.vue";
import TwitterLogo from "@/components/icons/TwitterLogo.vue";
import IconDropdownCaret from "@/components/icons/IconDropdownCaret.vue";

export default {
	name: 'PageFooter',
	components: {IconDropdownCaret, TwitterLogo, YoutubeLogo, FacebookLogo, InstagramLogo, IconLogoText},
}
</script>

<template>
	<footer class="footer">
		<div class="container">
			<div class="footer__inner">
				<header class="footer__header">
					<div class="footer__logo">
						<RouterLink to="/facts" class="footer__logo">
							<img src="@/assets/LogoWhite.png" alt="Logo" class="footer__logo-image" />
							<IconLogoText class="footer__logo-text" />
						</RouterLink>
					</div>
					<div class="footer__misc">
						<nav class="footer__misc-nav">
							<div class="footer__misc-nav-title">Built for catlovers</div>
							<RouterLink class="footer__misc-nav-link" to="/">About</RouterLink>
							<RouterLink class="footer__misc-nav-link" to="/">Blog</RouterLink>
						</nav>
						<div class="footer__misc-social">
							<div class="footer__misc-social-title">Social</div>
							<div class="footer__misc-social-links">
								<a href="/" target="_blank" class="footer__misc-social-link"><InstagramLogo /></a>
								<a href="/" target="_blank" class="footer__misc-social-link"><FacebookLogo /></a>
								<a href="/" target="_blank" class="footer__misc-social-link"><YoutubeLogo /></a>
								<a href="/" target="_blank" class="footer__misc-social-link"><TwitterLogo /></a>
							</div>
						</div>
					</div>
				</header>
				<div class="footer__divider" />
				<div class="footer__info">
					<div class="footer__info-legal">
						@cats.com inc. All rights reserved.
					</div>
					<div class="footer__info-lang">
						<span class="footer__info-lang-chosen">English</span>
						<IconDropdownCaret class="footer__info-lang-icon" />
					</div>
				</div>
			</div>
		</div>
	</footer>
</template>

<style scoped lang="scss">
	@use '@/assets/variables';

	.footer {
		background-color: var(--color-background-footer);
		color: var(--color-white);

		&__header {
			display: flex;
			align-items: center;
			gap: 1.5em;
			flex-direction: column;

			@include tablet {
				flex-direction: row;
				justify-content: space-between;
			}
		}

		&__logo {
			display: flex;
			align-items: center;
			cursor: pointer;
			transition: .2s scale ease;

			&-text {
				color: var(--color-white);
				display: none;

				@include tablet {
					display: initial;
				}
			}

			&-image {
				margin-right: 10px;
			}

			&:hover {
				scale: .95;
			}
		}

		&__misc {
			display: flex;
			flex-direction: column;
			gap: 2em;

			@include tablet {
				flex-direction: row;
			}

			&-nav {
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: .5em;

				@include tablet {
					align-items: flex-start;
				}

				&-title {
					font-weight: 700;
				}

				&-link {
					font-size: 14px;
				}
			}

			&-social {
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: .5em;

				@include tablet {
					align-items: flex-start;
				}

				&-title {
					font-weight: 700;
				}

				&-links {
					display: flex;
					flex-direction: row;
					gap: 24px;
				}
			}
		}

		&__divider {
			content: "";
			width: 100%;
			height: 1px;
			background-color: #8E8E8E;
			margin: 2em 0;
		}

		&__info {
			display: flex;
			flex-direction: column-reverse;
			align-items: center;
			gap: 1em;

			@include tablet {
				flex-direction: row;
				justify-content: space-between;
			}

			&-legal {
				font-size: 14px;
				opacity: .8;
			}

			&-lang {
				display: flex;
				flex-direction: row;
				align-items: center;
				gap: 5px;
				cursor: pointer;

				&-chosen {
					padding-top: 2px;
				}

				&-icon {
					rotate: -90deg;
				}
			}
		}

		a {
			transition: color .2s ease;

			&:hover {
				color: var(--color-accent);
			}
		}
	}
</style>

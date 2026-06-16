<template>
	<section
		id="imprint"
		class="relative flex h-screen w-full items-center justify-center overflow-hidden"
		data-heading="Imprint"
		data-in_viewport=""
	>
		<div
			class="absolute inset-0 bg-[radial-gradient(ellipse_45%_35%_at_25%_35%,rgba(89,25,141,0.22),transparent_70%),radial-gradient(ellipse_40%_35%_at_70%_60%,rgba(255,155,60,0.12),transparent_72%),linear-gradient(160deg,#10161d_0%,#1a2332_48%,#121820_100%)]"
			aria-hidden="true"
		/>
		<div
			class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_32%,rgba(0,0,0,0.45)_100%)]"
			aria-hidden="true"
		/>

		<div
			class="relative z-[1] w-full max-w-[52rem] px-5 pt-[clamp(5rem,10vh,6rem)] pb-[clamp(2rem,4vh,3rem)] duration-700 md:px-10"
			data-in_viewport="fade-left"
		>
			<header class="mb-4">
				<p
					class="mb-2 font-mono text-[0.8rem] font-light tracking-[0.14em] text-white/45 uppercase"
				>
					Legal
				</p>
				<h2
					class="[font-family:var(--font-display)] text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] font-semibold tracking-[-0.02em] text-white"
				>
					Imprint
				</h2>
			</header>

			<div
				class="max-h-[60vh] [scrollbar-gutter:stable] overscroll-contain overflow-y-auto rounded-[0.9rem] border border-white/10 bg-[rgba(15,20,25,0.55)] p-[clamp(1rem,2vw,1.35rem)] pr-3 text-[0.82rem] leading-[1.5] text-white/70 shadow-[0_16px_40px_rgba(0,0,0,0.22)] backdrop-blur-[10px] [webkit-overflow-scrolling:touch] lg:max-h-none lg:text-[0.96rem] lg:leading-[1.65]"
				@wheel.stop
				@touchstart.stop
				@touchmove.stop
				@touchend.stop
			>
				<p class="mb-3 lg:mb-4">
					<strong>Kontakt</strong><br />
					Freiberufler<br />
					Florian Becker
				</p>
				<p class="mb-3 lg:mb-4">
					<strong>Becker - Software</strong><br />
					Kollegstraße 2<br />
					44801 Bochum<br />
					E-Mail: info@florianbecker.eu
				</p>
				<p class="mb-3 lg:mb-4">
					<strong>Postadresse</strong><br />
					Postfach 10 02 02<br />
					44702 Bochum
				</p>
				<p class="mb-3 lg:mb-4">
					<strong>Steuerliche Angaben</strong><br />
					Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
					350/5012/5300
				</p>
				<p class="mb-3 lg:mb-4">
					<strong>Wirtschaftsidentifikationsnummer</strong><br />
					DE441672866
				</p>
				<p class="mb-3 lg:mb-4">
					<strong>Verbraucherstreitbeilegung/Universalschlichtungsstelle</strong><br />
					Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
					Verbraucherschlichtungsstelle teilzunehmen.
				</p>
				<p class="mb-3 lg:mb-4">
					<strong>Zentrale Kontaktstelle nach dem Digital Services Act (DSA)</strong><br />
					Unsere zentrale Kontaktstelle für Nutzer und Behörden nach Art. 11, 12 DSA (Verordnung
					(EU) 2022/265) erreichen Sie wie folgt:<br />
					E-Mail: info@florianbecker.eu
				</p>
				<p class="mb-3 lg:mb-4">
					<strong>Sonstige Kontaktwege</strong><br />
					Post:<br />
					Postfach 10 02 02<br />
					44702 Bochum
				</p>
				<p class="mb-0">
					<strong>Sprachen</strong><br />
					Die für den Kontakt zur Verfügung stehenden Sprachen sind: Deutsch, Englisch.
				</p>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { inject, onMounted } from 'vue';
import ContentSection from '../interfaces/ContentSection';
import { DocumentTextIcon as outlineIcon } from '@heroicons/vue/24/outline';
import { DocumentTextIcon as solidIcon } from '@heroicons/vue/24/solid';

onMounted(() => {
	const el = document.getElementById('imprint');
	if (el)
		(inject('sections') as Array<ContentSection>).push({
			el: el,
			active: false,
			icon: [outlineIcon, solidIcon]
		});
});
</script>

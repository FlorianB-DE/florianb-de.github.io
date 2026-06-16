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
				<p class="mb-2 font-mono text-[0.8rem] font-light tracking-[0.14em] text-white/45 uppercase">
					Legal Notice
				</p>
				<h2
					class="[font-family:var(--font-display)] text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] font-semibold tracking-[-0.02em] text-white"
				>
					Imprint
				</h2>
			</header>

			<div
				class="max-h-[60vh] [scrollbar-gutter:stable] overscroll-contain overflow-y-auto rounded-[0.9rem] border border-white/10 bg-[rgba(15,20,25,0.55)] p-[clamp(1rem,2vw,1.35rem)] pr-3 text-[0.82rem] leading-[1.5] text-white/70 shadow-[0_16px_40px_rgba(0,0,0,0.22)] backdrop-blur-[10px] [webkit-overflow-scrolling:touch] lg:max-h-[80vh] lg:text-[0.96rem] lg:leading-[1.65]"
				@wheel.stop
				@touchstart.stop
				@touchmove.stop
				@touchend.stop
			>
				<p class="mb-3 lg:mb-4">
					<strong>Contact</strong><br />
					Freelancer<br />
					Florian Becker
				</p>
				<p class="mb-3 lg:mb-4">
					<strong>Becker - Software</strong><br />
					Kollegstraße 2<br />
					44801 Bochum<br />
					Email: info@florianbecker.eu
				</p>
				<p class="mb-3 lg:mb-4">
					<strong>Postal Address</strong><br />
					Postfach 10 02 02<br />
					44702 Bochum
				</p>
				<p class="mb-3 lg:mb-4">
					<strong>Tax Information</strong><br />
					VAT identification number pursuant to Section 27a of the German VAT Act:<br />
					350/5012/5300
				</p>
				<p class="mb-3 lg:mb-4">
					<strong>Business Identification Number</strong><br />
					DE441672866
				</p>
				<p class="mb-3 lg:mb-4">
					<strong>Consumer Dispute Resolution / Universal Arbitration Board</strong><br />
					We are neither willing nor obligated to participate in dispute resolution proceedings
					before a consumer arbitration board.
				</p>
				<p class="mb-3 lg:mb-4">
					<strong>Central Contact Point under the Digital Services Act (DSA)</strong><br />
					Our central contact point for users and authorities pursuant to Art. 11, 12 DSA
					(Regulation (EU) 2022/265) can be reached as follows:<br />
					Email: info@florianbecker.eu
				</p>
				<p class="mb-3 lg:mb-4">
					<strong>Other Contact Channels</strong><br />
					Mail:<br />
					Postfach 10 02 02<br />
					44702 Bochum
				</p>
				<p class="mb-0">
					<strong>Languages</strong><br />
					The languages available for communication are: German, English.
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

<template>
	<div class="slider-shell flex w-full flex-col items-center gap-4">
		<div class="slider-row flex w-full items-center gap-2 lg:gap-4">
			<button
				type="button"
				class="nav-arrow shrink-0"
				aria-label="Previous project"
				@click="rotatePrevious"
			>
				<ChevronLeftIcon class="size-6" />
			</button>

			<div class="flex min-w-0 flex-1 justify-center">
				<div
					class="flex w-full flex-col items-center gap-4 lg:flex-row lg:items-stretch lg:justify-center"
					@mouseenter="isHovered = true"
					@mouseleave="onWrapperLeave"
				>
				<article class="slider-card preview-card relative w-full overflow-hidden">
					<Transition name="preview-bubble" mode="out-in">
						<div :key="previewProject.mdFile" class="absolute inset-0">
							<img
								:src="previewProject.imageUrl"
								:alt="previewProject.title"
								class="absolute inset-0 z-0 h-full w-full object-cover opacity-35"
							/>
							<div
								class="preview-scrim absolute inset-0 z-[1] bg-gradient-to-t from-[#0f1419] via-[#0f1419]/75 to-[#0f1419]/20"
							/>
							<div class="relative z-10 flex h-full flex-col justify-end p-6 lg:p-8">
								<p class="preview-label">Featured</p>
								<h2 class="preview-title">{{ previewProject.title }}</h2>
								<div class="card-content preview-body" v-html="previewProject.html" />
							</div>
						</div>
					</Transition>
				</article>

				<div
					class="autoplay-progress relative h-10 w-1.5 shrink-0 overflow-hidden rounded-full lg:h-auto lg:self-stretch"
					:class="isHovered ? 'opacity-40' : 'opacity-100'"
					aria-hidden="true"
				>
					<div
						class="autoplay-progress__fill absolute inset-x-0 bottom-0 rounded-full"
						:class="isHovered ? '' : 'autoplay-progress__fill--active'"
						:style="{ height: `${autoplayProgress}%` }"
					/>
				</div>

				<div class="slider-card grid-card relative w-full overflow-hidden">
					<SliderElement
						class="size-full"
						:max="queue.length"
						:current="0"
						:projects="queue"
						:hovered-index="hoveredIndex"
						@select="rotateTo"
						@hover="hoveredIndex = $event"
					/>
				</div>
				</div>
			</div>

			<button
				type="button"
				class="nav-arrow shrink-0"
				aria-label="Next project"
				@click="rotateNextManual"
			>
				<ChevronRightIcon class="size-6" />
			</button>
		</div>

		<div class="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Project slides">
			<button
				v-for="project in projects"
				:key="project.mdFile"
				type="button"
				class="nav-dot"
				:class="{ 'nav-dot--active': project.mdFile === activeMdFile }"
				:aria-label="`Go to ${project.title}`"
				:aria-selected="project.mdFile === activeMdFile"
				role="tab"
				@click="goToProject(project.mdFile)"
			/>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import type { EnrichedProject } from '../../interfaces/Project';
import SliderElement from './SliderElement.vue';

const props = defineProps<{
	projects: EnrichedProject[];
}>();

const AUTOPLAY_MS = 9000;

const queue = ref<EnrichedProject[]>([...props.projects]);
const hoveredIndex = ref<number | null>(null);
const isHovered = ref(false);
const autoplayProgress = ref(0);

let rafId: number | null = null;
let cycleStart = 0;
let pausedElapsed = 0;

const previewProject = computed(() => {
	const index = hoveredIndex.value ?? 0;
	return queue.value[index]!;
});

const activeMdFile = computed(() => previewProject.value.mdFile);

const rotateNext = () => {
	if (queue.value.length <= 1) return;
	queue.value = [...queue.value.slice(1), queue.value[0]!];
};

const rotatePrevious = () => {
	if (queue.value.length <= 1) return;
	const last = queue.value[queue.value.length - 1]!;
	queue.value = [last, ...queue.value.slice(0, -1)];
	hoveredIndex.value = null;
	resetCycle();
	if (!isHovered.value) startAutoplay();
};

const rotateNextManual = () => {
	rotateNext();
	hoveredIndex.value = null;
	resetCycle();
	if (!isHovered.value) startAutoplay();
};

const rotateTo = (displayIndex: number) => {
	if (displayIndex <= 0 || displayIndex >= queue.value.length) return;

	queue.value = [
		...queue.value.slice(displayIndex),
		...queue.value.slice(0, displayIndex)
	];
	hoveredIndex.value = null;
	resetCycle();
	if (!isHovered.value) startAutoplay();
};

const goToProject = (mdFile: string) => {
	const queueIndex = queue.value.findIndex((project) => project.mdFile === mdFile);
	if (queueIndex === -1) return;

	if (queueIndex === 0 && hoveredIndex.value === null) return;

	if (queueIndex === 0) {
		hoveredIndex.value = null;
		resetCycle();
		if (!isHovered.value) startAutoplay();
		return;
	}

	rotateTo(queueIndex);
};

const onWrapperLeave = () => {
	isHovered.value = false;
	hoveredIndex.value = null;
};

const resetCycle = () => {
	cycleStart = 0;
	pausedElapsed = 0;
	autoplayProgress.value = 0;
};

const tick = (now: number) => {
	if (!cycleStart) cycleStart = now;

	const elapsed = pausedElapsed + (now - cycleStart);
	autoplayProgress.value = Math.min(100, (elapsed / AUTOPLAY_MS) * 100);

	if (elapsed >= AUTOPLAY_MS) {
		rotateNext();
		resetCycle();
		cycleStart = now;
	}

	if (!isHovered.value) {
		rafId = requestAnimationFrame(tick);
	}
};

const startAutoplay = () => {
	stopAutoplay(false);
	if (!isHovered.value) {
		cycleStart = performance.now();
		rafId = requestAnimationFrame(tick);
	}
};

const stopAutoplay = (resetProgress = true) => {
	if (rafId !== null) {
		cancelAnimationFrame(rafId);
		rafId = null;
	}

	if (resetProgress) {
		resetCycle();
	} else if (cycleStart) {
		pausedElapsed += performance.now() - cycleStart;
		cycleStart = 0;
	}
};

watch(isHovered, (hovered) => {
	if (hovered) stopAutoplay(false);
	else startAutoplay();
});

onMounted(startAutoplay);
onUnmounted(() => stopAutoplay());
</script>

<style>
@reference 'tailwindcss';

.slider-shell {
	width: 100%;
}

.slider-row {
	min-height: min(72vw, 20rem);
}

@media (min-width: 1024px) {
	.slider-row {
		min-height: min(58vh, 30rem);
	}

	.preview-card,
	.grid-card {
		width: min(58vh, 30rem);
		height: min(58vh, 30rem);
		flex-shrink: 0;
	}
}

.slider-card {
	border-radius: 0.85rem;
	border: 1px solid rgba(255, 255, 255, 0.1);
	background: rgba(15, 20, 25, 0.45);
	backdrop-filter: blur(8px);
	box-shadow:
		0 0 0 1px rgba(255, 255, 255, 0.04),
		0 20px 48px rgba(0, 0, 0, 0.35);
	aspect-ratio: 1;
}

.preview-label {
	margin: 0 0 0.35rem;
	font-family: var(--font-mono);
	font-size: 0.68rem;
	font-weight: 300;
	letter-spacing: 0.12em;
	text-transform: uppercase;
	color: var(--accent-purple-light);
}

.preview-title {
	margin: 0 0 0.75rem;
	font-family: var(--font-display);
	font-size: clamp(1.35rem, 2.5vw, 1.85rem);
	font-weight: 600;
	line-height: 1.15;
	letter-spacing: -0.02em;
	color: #fff;
}

.preview-body {
	font-size: clamp(0.82rem, 1.2vw, 0.95rem);
	line-height: 1.65;
	color: rgba(255, 255, 255, 0.72);
}

.preview-body a {
	display: inline-flex;
	align-items: center;
	gap: 0.35rem;
	margin-top: 0.85rem;
	font-family: var(--font-mono);
	font-size: 0.78rem;
	letter-spacing: 0.02em;
	color: var(--accent-purple-light);
	text-decoration: none;
	transition: color 180ms ease, gap 180ms ease;
}

.preview-body a:hover {
	color: var(--hero-warm);
	gap: 0.55rem;
}

.preview-body a::after {
	content: '→';
}

.preview-body strong {
	font-weight: 600;
	color: rgba(255, 255, 255, 0.92);
}

.autoplay-progress {
	background: rgba(255, 255, 255, 0.08);
	box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06);
}

.preview-bubble-enter-active,
.preview-bubble-leave-active {
	transition:
		opacity 0.35s ease,
		transform 0.35s ease;
}

.preview-bubble-enter-from {
	opacity: 0;
	transform: translateY(1.5rem);
}

.preview-bubble-leave-to {
	opacity: 0;
	transform: translateY(-1.5rem);
}

.autoplay-progress__fill--active {
	transition: height 0.1s linear;
}

.autoplay-progress__fill {
	background: linear-gradient(to top, var(--accent-purple), var(--accent-purple-light));
}

.nav-arrow {
	@apply flex size-10 items-center justify-center rounded-full text-white/80 transition focus:outline-none focus-visible:ring-2;
	border: 1px solid rgba(255, 255, 255, 0.12);
	background: rgba(15, 20, 25, 0.55);
	backdrop-filter: blur(8px);
}

.nav-arrow:hover {
	background: rgba(89, 25, 141, 0.25);
}

.nav-arrow:hover,
.nav-arrow:focus-visible {
	border-color: var(--accent-purple-light);
	--tw-ring-color: var(--accent-purple-light);
}

.nav-dot {
	@apply size-2.5 rounded-full bg-white/25 transition hover:bg-white/50 focus:outline-none focus-visible:ring-2;
	--tw-ring-color: var(--accent-purple-light);
}

.nav-dot--active {
	@apply scale-125;
	background-color: var(--accent-purple-light);
}

.nav-dot--active:hover {
	background-color: var(--accent-purple-light);
}
</style>

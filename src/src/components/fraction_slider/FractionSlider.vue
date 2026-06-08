<template>
	<div class="flex w-full flex-col items-center gap-4">
		<div class="flex w-full items-center gap-2 lg:gap-4">
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
				<article
					class="preview card relative aspect-square w-full overflow-hidden border border-white/20 lg:w-2/5"
				>
					<Transition name="preview-bubble" mode="out-in">
						<div :key="previewProject.mdFile" class="absolute inset-0">
							<img
								:src="previewProject.imageUrl"
								:alt="previewProject.title"
								class="absolute inset-0 z-0 h-full w-full object-cover opacity-30"
							/>
							<div class="relative z-10 flex h-full flex-col justify-end p-6 lg:p-8">
								<h2 class="mb-3 text-2xl font-semibold lg:text-3xl">{{ previewProject.title }}</h2>
								<div
									class="card-content text-sm leading-relaxed opacity-90 lg:text-base"
									v-html="previewProject.html"
								/>
							</div>
						</div>
					</Transition>
				</article>

				<div
					class="autoplay-progress relative h-10 w-1.5 shrink-0 overflow-hidden rounded-full bg-white/10 lg:h-auto lg:self-stretch"
					:class="isHovered ? 'opacity-40' : 'opacity-100'"
					aria-hidden="true"
				>
					<div
						class="autoplay-progress__fill absolute inset-x-0 bottom-0 rounded-full"
						:class="isHovered ? '' : 'autoplay-progress__fill--active'"
						:style="{ height: `${autoplayProgress}%` }"
					/>
				</div>

				<div
					class="articles card relative aspect-square w-full overflow-hidden border border-white/20 lg:w-2/5"
				>
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

div.projects--cards__container > article.card div.card-content a {
	@apply underline;
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
	@apply flex size-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2;
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

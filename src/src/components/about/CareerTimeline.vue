<template>
	<footer class="career-timeline" aria-label="Career timeline">
		<div class="career-timeline-inner duration-700" data-in_viewport="fade-left">
			<div class="timeline-wrap">
				<div class="timeline-legend" aria-hidden="true">
					<span class="timeline-legend-top">Education and Research</span>
					<span class="timeline-legend-axis" />
					<span class="timeline-legend-bottom">Work, Freelance and Personal experience</span>
				</div>

				<div class="timeline-track">
					<ol class="timeline-row timeline-row--top">
						<li v-for="entry in entries" :key="`top-${timelineKey(entry)}`" class="timeline-cell">
							<div
								v-if="entry.category === 'education'"
								class="timeline-bubble timeline-bubble--education"
								:title="entry.description"
							>
								<time class="timeline-date" :datetime="timelineDatetime(entry)">
									{{ formatTimelineDate(entry) }}
								</time>
								<a
									v-if="entry.url"
									class="timeline-title"
									:href="entry.url"
									target="_blank"
									rel="noopener noreferrer"
								>
									{{ entry.title }}
								</a>
								<span v-else class="timeline-title">{{ entry.title }}</span>
							</div>
						</li>
					</ol>

					<div class="timeline-axis" aria-hidden="true">
						<span
							v-for="entry in entries"
							:key="`dot-${timelineKey(entry)}`"
							class="timeline-dot"
							:class="`timeline-dot--${entry.category}`"
						/>
					</div>

					<ol class="timeline-row timeline-row--bottom">
						<li
							v-for="entry in entries"
							:key="`bottom-${timelineKey(entry)}`"
							class="timeline-cell"
						>
							<div
								v-if="entry.category === 'work'"
								class="timeline-bubble timeline-bubble--work"
								:title="entry.description"
							>
								<time class="timeline-date" :datetime="timelineDatetime(entry)">
									{{ formatTimelineDate(entry) }}
								</time>
								<a
									v-if="entry.url"
									class="timeline-title"
									:href="entry.url"
									target="_blank"
									rel="noopener noreferrer"
								>
									{{ entry.title }}
								</a>
								<span v-else class="timeline-title">{{ entry.title }}</span>
							</div>
						</li>
					</ol>
				</div>
			</div>
		</div>
	</footer>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import type TimelineEntry from '../../interfaces/TimelineEntry';
import timelineData from '../../content/timeline.json';
import { formatTimelineDate, sortTimeline, timelineDatetime, timelineKey } from './timelineUtils';

const entries = computed(() => sortTimeline(timelineData as TimelineEntry[]));
</script>

<style scoped>
.career-timeline {
	display: none;
	flex-shrink: 0;
	width: 100%;
	margin-top: calc(clamp(0.35rem, 0.75vh, 0.6rem) + 5rem);
	padding: 0;
	box-sizing: border-box;
}

@media (min-width: 1024px) {
	.career-timeline {
		display: block;
	}
}

.career-timeline-inner {
	width: 100%;
}

.timeline-wrap {
	display: flex;
	align-items: stretch;
	gap: 0.75rem;
}

.timeline-legend {
	display: grid;
	flex-shrink: 0;
	grid-template-rows: 1fr auto 1fr;
	align-items: center;
	width: min(7.5rem, 22vw);
	font-family: var(--font-mono);
	font-size: 0.55rem;
	font-weight: 400;
	line-height: 1.35;
	letter-spacing: 0.06em;
	text-transform: uppercase;
}

.timeline-legend-top {
	grid-row: 1;
	align-self: end;
	padding-bottom: 0.35rem;
	text-align: right;
	color: var(--accent-purple-light);
}

.timeline-legend-bottom {
	grid-row: 3;
	align-self: start;
	padding-top: 0.35rem;
	text-align: right;
	color: var(--hero-warm);
}

.timeline-legend-axis {
	grid-row: 2;
	width: 100%;
	height: 1px;
	background: rgba(159, 167, 255, 0.25);
}

.timeline-track {
	display: grid;
	grid-template-rows: auto auto auto;
	flex: 1;
	min-width: 0;
	gap: 0.2rem;
}

.timeline-row {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-between;
	align-items: stretch;
	gap: clamp(0.25rem, 0.6vw, 0.5rem);
	margin: 0;
	padding: 0;
	list-style: none;
}

.timeline-row--top {
	align-items: flex-end;
}

.timeline-row--bottom {
	align-items: flex-start;
}

.timeline-cell {
	display: flex;
	flex: 1 1 0;
	justify-content: center;
	min-width: 0;
	max-width: 8rem;
}

.timeline-axis {
	display: flex;
	flex-wrap: nowrap;
	justify-content: space-between;
	align-items: center;
	gap: clamp(0.25rem, 0.6vw, 0.5rem);
	height: 1px;
	margin: 0.15rem 0;
	background: var(--accent-purple-light);
	mask-image: linear-gradient(
		to right,
		transparent 0%,
		rgb(0 0 0 / 0.4) 6%,
		black 14%,
		black 86%,
		rgb(0 0 0 / 0.4) 94%,
		transparent 100%
	);
	-webkit-mask-image: linear-gradient(
		to right,
		transparent 0%,
		rgb(0 0 0 / 0.4) 6%,
		black 14%,
		black 86%,
		rgb(0 0 0 / 0.4) 94%,
		transparent 100%
	);
}

.timeline-dot {
	flex: 1 1 0;
	max-width: 8rem;
	height: 0.45rem;
	display: flex;
	justify-content: center;
	align-items: center;
}

.timeline-dot::after {
	content: '';
	width: 0.45rem;
	height: 0.45rem;
	border-radius: 50%;
	background: var(--accent-purple-light);
	box-shadow: 0 0 8px rgba(159, 167, 255, 0.5);
}

.timeline-dot--work::after {
	background: var(--hero-warm);
	box-shadow: 0 0 8px rgba(255, 154, 60, 0.45);
}

.timeline-bubble {
	display: flex;
	flex-direction: column;
	gap: 0.2rem;
	width: 100%;
	padding: 0.3rem 0.45rem;
	border-radius: 0.6rem;
	text-align: center;
}

.timeline-bubble--education {
	border: 1px solid rgba(159, 167, 255, 0.3);
	background: rgba(89, 25, 141, 0.35);
}

.timeline-bubble--work {
	border: 1px solid rgba(255, 154, 60, 0.28);
	background: rgba(255, 154, 60, 0.18);
}

.timeline-date {
	font-family: var(--font-mono);
	font-size: 0.55rem;
	font-weight: 300;
	letter-spacing: 0.05em;
	text-transform: uppercase;
	color: rgba(255, 255, 255, 0.42);
	white-space: nowrap;
	line-height: 1.2;
}

.timeline-title {
	display: -webkit-box;
	overflow: hidden;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	font-family: var(--font-display);
	font-size: 0.65rem;
	font-weight: 600;
	line-height: 1.25;
	color: rgba(255, 255, 255, 0.88);
	text-decoration: none;
}

a.timeline-title:hover {
	color: var(--accent-purple-light);
}

.timeline-bubble--work a.timeline-title:hover {
	color: var(--hero-warm);
}
</style>

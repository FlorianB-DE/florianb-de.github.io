<template>
	<ul class="about-skills duration-700" data-in_viewport="fade-left">
		<li v-for="skill in skills" :key="skill">{{ skill }}</li>
	</ul>
</template>

<script lang="ts" setup>
defineProps<{
	skills: string[];
}>();
</script>

<style scoped>
.about-skills {
	display: flex;
	flex-shrink: 0;
	flex-wrap: wrap;
	gap: 0.5rem;
	margin: 0;
	padding: 0;
	list-style: none;
}

.about-skills li {
	padding: 0.35rem 0.75rem;
	border-radius: 999px;
	border: 1px solid rgba(159, 167, 255, 0.25);
	background: rgba(89, 25, 141, 0.2);
	font-family: var(--font-mono);
	font-size: 0.72rem;
	letter-spacing: 0.04em;
	color: rgba(255, 255, 255, 0.72);
}
</style>

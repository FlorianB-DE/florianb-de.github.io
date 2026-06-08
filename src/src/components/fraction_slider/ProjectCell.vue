<template>
	<div class="relative h-full w-full overflow-hidden">
		<Transition name="cell-bubble" mode="out-in">
			<div :key="imageUrl + title" class="absolute inset-0">
				<img
					:src="imageUrl"
					:alt="title"
					class="absolute inset-0 h-full w-full object-cover"
				/>
				<div
					class="relative z-10 flex h-full items-end bg-gradient-to-t from-[#0f1419]/95 via-[#0f1419]/30 to-transparent p-2 lg:p-3"
				>
					<span class="truncate text-left font-mono text-[0.65rem] font-medium tracking-wide text-white/90 lg:text-xs">{{ title }}</span>
				</div>
			</div>
		</Transition>
	</div>
</template>

<script lang="ts" setup>
defineProps<{
	title: string;
	imageUrl: string;
}>();
</script>

<style scoped>
.cell-bubble-enter-active,
.cell-bubble-leave-active {
	transition:
		opacity 0.3s ease,
		transform 0.3s ease;
}

.cell-bubble-enter-from {
	opacity: 0;
	transform: translateY(0.75rem) scale(0.97);
}

.cell-bubble-leave-to {
	opacity: 0;
	transform: translateY(-0.75rem) scale(0.97);
}
</style>

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
					class="relative z-10 flex h-full items-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-2 lg:p-3"
				>
					<span class="truncate text-left text-xs font-medium text-white lg:text-sm">{{ title }}</span>
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

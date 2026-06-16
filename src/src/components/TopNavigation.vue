<template>
	<nav
		class="nav-bar fixed top-0 z-50 grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-2 p-2 pr-3 text-white"
		:class="{ closed: !open }"
		ref="nav"
	>
		<div
			class="nav-items flex min-w-0 flex-1 justify-between gap-1 lg:w-full lg:justify-start lg:gap-0"
		>
			<a
				v-for="(item, n) in items"
				:key="item.el.id"
				class="no-select icon mr-0 ml-0 cursor-pointer lg:mr-2 lg:ml-2"
				@click="dispatcher(item)"
				:style="`--item-no: ${n}`"
			>
				<span
					:class="item.active ? 'font-bold' : ''"
					class="hidden text-2xl lg:inline"
					v-text="item.el.getAttribute('data-heading')"
				/>
				<component
					:is="item.icon[Number(item.active)]"
					class="nav-icon inline size-10 align-sub opacity-100 delay-[inherit] duration-[inherit] lg:hidden"
				/>
			</a>
		</div>
		<button
			type="button"
			class="menu-toggle relative h-9 w-9 shrink-0 lg:hidden"
			aria-label="Toggle navigation"
			@click="toggleMenu"
		>
			<Bars3Icon
				class="open btn absolute inset-0 m-auto aspect-square w-9 transition-transform"
				ref="openButton"
				:class="{ active: !open }"
			/>
			<XMarkIcon
				class="close btn absolute inset-0 m-auto aspect-square w-9 transition-transform"
				:class="{ active: open }"
			/>
		</button>
	</nav>
</template>

<script lang="ts" setup>
import { inject, PropType, ref, onMounted } from 'vue';
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline';
import ContentSection from '../interfaces/ContentSection';

const nav = ref<HTMLElement | null>(null);
const openButton = ref<HTMLElement | null>(null);

onMounted(() => openButton.value?.classList.add('init'));

const activeSection = inject('activeSection') as () => ContentSection;

let open = ref(true);

defineProps({
	items: {
		type: Object as PropType<Array<ContentSection>>,
		required: true
	}
});

const toggleMenu = () => {
	open.value = !open.value;
	if (!openButton.value) return;

	openButton.value.classList.remove('init');
};

const dispatcher = (item: ContentSection) => {
	activeSection().active = false;
	item.active = true;
	item.el.scrollIntoView();
};
</script>

<style scoped>
nav {
	--time-scale-multiplier: 1;
}

.open:not(.active) {
	transform: translateX(-100vw) !important;
}

.close:not(.active) {
	animation: gelatine linear calc(1.5s * var(--time-scale-multiplier));
	animation-delay: calc(150ms * var(--time-scale-multiplier));
	transform: translateX(-100vw);
}

.close.active {
	transform: translateX(0);
}

.init {
	transform: translateX(-100vw) !important;
	animation: unset !important;
}

.icon {
	transition-delay: calc(160ms * var(--time-scale-multiplier) * var(--item-no));
	transition-property: transform;
	transition-duration: calc(1s * var(--time-scale-multiplier));
}

.closed .icon {
	transform: translateX(-100vw);
}

.closed .icon > svg,
.closed .nav-icon {
	transition:
		transform calc(1s * var(--time-scale-multiplier))
			calc(160ms * var(--time-scale-multiplier) * var(--item-no)),
		opacity calc(275ms * var(--time-scale-multiplier) * (var(--item-no) + 1))
			calc(160ms * var(--time-scale-multiplier) * var(--item-no));
	transform: scale(0%);
	opacity: 0;
}

.menu-toggle {
	border: none;
	background: transparent;
	padding: 0;
}

.close:not(.active),
.open.active {
	transition-delay: calc(1s * var(--time-scale-multiplier)) !important;
}

.btn {
	transition-duration: calc(500ms * var(--time-scale-multiplier));
}
</style>

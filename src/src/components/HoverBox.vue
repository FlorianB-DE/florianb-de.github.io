<template>
	<aside class="hover-box border-5 border-solid  absolute z-10 p-5 text-white font-extralight">
		<slot />
	</aside>
</template>
<script lang="ts" setup></script>
<style scoped>
.hover-box {
	border-image-slice: 1;
	border-image-source: linear-gradient(to right, var(--accent-purple), var(--accent-purple-light));
}
</style>

<template>
	<figure class="mannequin duration-700" data-in_viewport="scale-in">
		<div class="mannequin-glow" aria-hidden="true" />
		<div class="mannequin-stage">
			<div class="part">
				<div
					class="head relative flex h-24 flex-col items-center justify-center rounded-t-[40%] rounded-b-[10%] bg-amber-100"
				>
					<img class="hair absolute top-[-10px] w-[20rem]" :src="hair" alt="" />
					<div class="eyes mt-4 flex w-full justify-around">
						<div class="eye circle flex h-5 w-5 border-2 border-white bg-green-800">
							<div class="circle m-auto aspect-square w-1.5 bg-black" />
						</div>
						<div class="eye circle flex h-5 w-5 border-2 border-white bg-green-800">
							<div class="circle m-auto aspect-square w-1.5 bg-black" />
						</div>
					</div>
					<div class="flex w-full justify-center pt-4">
						<div class="mouth h-5 w-[50%] rounded-t rounded-b-[50%] bg-red-400" />
					</div>
				</div>
			</div>
			<div class="part">
				<div class="arm relative z-0 h-32 rotate-[50deg] rounded-2xl bg-amber-100" />
				<div class="body z-[1] h-40 rounded-3xl bg-green-600" />
				<div class="arm right relative z-0 h-32 rotate-[-45deg] rounded-2xl bg-amber-100" />
			</div>
		</div>
	</figure>
</template>

<script lang="ts" setup>
import hair from '../../assets/hair.png';
</script>

<style scoped>
.mannequin {
	position: relative;
	display: none;
	justify-content: center;
	align-items: center;
	margin: 0;
	padding: 0;
	min-height: 0;
	max-height: 100%;
}

@media (min-width: 1024px) {
	.mannequin {
		display: flex;
	}
}

.mannequin-glow {
	position: absolute;
	inset: 10% 15%;
	border-radius: 50%;
	background: radial-gradient(
		circle,
		rgba(159, 167, 255, 0.18) 0%,
		rgba(89, 25, 141, 0.1) 45%,
		transparent 72%
	);
	filter: blur(28px);
	pointer-events: none;
}

.mannequin-stage {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: min(16rem, 100%);
	max-height: 100%;
	transform: scale(0.78);
	transform-origin: center center;
}

.part {
	display: flex;
	width: 16rem;
	max-width: 100%;
	justify-content: center;
}

.head {
	width: 6rem;
	flex-shrink: 0;
}

.hair {
	transform: scale(1.3, 1.3);
}

.mouth {
	border: 3px inset #3a0000;
}

.arm {
	aspect-ratio: 1/4;
}

.arm::after {
	content: '';
	position: absolute;
	bottom: -45%;
	left: 150%;
	z-index: 10;
	height: 8rem;
	width: 100%;
	rotate: 90deg;
	border-radius: 1rem;
	background-color: var(--color-amber-100, #fef3c7);
}

.right::after {
	animation: shake 1s ease-in-out infinite;
}

.body {
	width: 8rem;
	flex-shrink: 0;
}
</style>

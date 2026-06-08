import { createApp, reactive } from 'vue';
import App from './App.vue';
import ContentSection from './interfaces/ContentSection';

import './styles/styles.css';

const sections = reactive([] as Array<ContentSection>),
	activeIndex = () => {
		const index = sections.findIndex((element) => element.active);
		return index < 0 ? 0 : index;
	},
	syncActiveSectionFromScroll = () => {
		if (sections.length === 0) return;

		const viewportMid = window.innerHeight / 2;
		let bestIndex = 0;
		let bestDistance = Infinity;

		sections.forEach((section, index) => {
			const rect = section.el.getBoundingClientRect();
			const sectionMid = rect.top + rect.height / 2;
			const distance = Math.abs(sectionMid - viewportMid);
			if (distance < bestDistance) {
				bestDistance = distance;
				bestIndex = index;
			}
		});

		sections.forEach((section, index) => {
			section.active = index === bestIndex;
		});
	},
	scrollToSection = (indexOffset = 1) => {
		const nextIndex = Math.min(activeIndex() + indexOffset, sections.length - 1),
			nextEl = sections[nextIndex < 0 ? 0 : nextIndex];

		sections[activeIndex()].active = false;
		nextEl.el.scrollIntoView();
		nextEl.active = true;
	};

let timeout = 0;
let prevDirection = 0;
document.addEventListener('wheel', (event) => {
	const singedDelta = Math.sign(event.deltaY);
	if (!timeout || prevDirection != singedDelta) {
		prevDirection = singedDelta;
		scrollToSection(singedDelta);
		clearTimeout(timeout);
		timeout = setTimeout(() => (timeout = 0), 300);
	}
});

window.addEventListener('resize', () => scrollToSection(activeIndex() - 1));

let touchStart = 0;
document.addEventListener('touchstart', (event) => (touchStart = event.touches[0].clientY));
document.addEventListener('touchend', (event) => {
	const touchEnd = event.changedTouches[0].clientY;
	if (Math.abs(touchStart - touchEnd) > window.innerHeight / 10)
		scrollToSection(Math.sign(Number(touchStart > touchEnd + 5) - 0.5));
});

createApp(App)
	.provide('sections', sections)
	.provide('activeIndex', activeIndex)
	.provide('activeSection', () => sections[activeIndex()])
	.provide('scrollToSection', scrollToSection)
	.provide('syncActiveSectionFromScroll', syncActiveSectionFromScroll)
	.mount('#app');

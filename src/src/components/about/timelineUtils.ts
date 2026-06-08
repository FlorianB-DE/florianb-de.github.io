import type TimelineEntry from '../../interfaces/TimelineEntry';

const MONTHS = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec'
] as const;

const parseTimelinePart = (value: string): { year: number; month: number } => {
	const [yearPart, monthPart] = value.split('-');
	const year = Number(yearPart);
	const month = monthPart ? Number(monthPart) : 0;
	return { year, month };
};

export const sortValue = (entry: TimelineEntry): number => {
	const raw = entry.date ?? entry.start ?? '';
	const { year, month } = parseTimelinePart(raw);
	return year * 12 + month;
};

export const sortTimeline = (entries: TimelineEntry[]): TimelineEntry[] =>
	[...entries].sort((a, b) => sortValue(a) - sortValue(b));

const formatPart = (value: string): string => {
	const { year, month } = parseTimelinePart(value);
	if (!month) return String(year);
	return `${MONTHS[month - 1]} ${year}`;
};

export const formatTimelineDate = (entry: TimelineEntry): string => {
	if (entry.date) return formatPart(entry.date);

	const start = formatPart(entry.start!);
	if (entry.end === undefined || entry.end === null) return `${start} – present`;
	return `${start} – ${formatPart(entry.end)}`;
};

export const timelineDatetime = (entry: TimelineEntry): string => {
	if (entry.date) return entry.date.length === 4 ? `${entry.date}` : `${entry.date}-01`;
	if (entry.start) return entry.start.length === 4 ? `${entry.start}` : `${entry.start}-01`;
	return '';
};

export const timelineKey = (entry: TimelineEntry): string =>
	`${entry.category}-${entry.date ?? entry.start ?? ''}-${entry.title}`;

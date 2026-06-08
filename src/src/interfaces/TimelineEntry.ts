export type TimelineCategory = 'education' | 'work';

export default interface TimelineEntry {
	/** Single point in time, e.g. "2025-10" or "2025" */
	date?: string;
	/** Range start (use with `end`; omit `date` when using a range) */
	start?: string;
	/** Range end; omit or set `null` for ongoing */
	end?: string | null;
	title: string;
	description?: string;
	url?: string;
	category: TimelineCategory;
}

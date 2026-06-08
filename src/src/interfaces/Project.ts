export default interface Project {
	title: string;
	image: string;
	mdFile: string;
	url: string;
}

export interface EnrichedProject extends Project {
	imageUrl: string;
	html: string;
}

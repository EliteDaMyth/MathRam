export interface Answer {
	queryresult: Queryresult;
}

export interface Queryresult {
	success: boolean;
	error: boolean;
	numpods: number;
	datatypes: string;
	timedout: string;
	timedoutpods: string;
	timing: number;
	parsetiming: number;
	parsetimedout: boolean;
	recalculate: string;
	id: string;
	host: string;
	server: string;
	related: string;
	version: string;
	pods: Pod[];
}

export interface Pod {
	title: string;
	scanner: string;
	id: string;
	position: number;
	error: boolean;
	numsubpods: number;
	primary?: boolean;
	subpods: Subpod[];
	expressiontypes: Expressiontype[] | Expressiontype;
	states?: PodState[];
	infos?: Infos;
}

export interface Expressiontype {
	name: Name;
}

export enum Name {
	Default = "Default",
	The2DMathPlot = "2DMathPlot",
}

export interface Infos {
	text: string;
	img: InfosImg;
	links: Link[];
}

export interface InfosImg {
	src: string;
	alt: string;
	title: string;
	width: string;
	height: string;
}

export interface Link {
	url: string;
	text: string;
	title: string;
}

export interface PodState {
	count?: number;
	value?: string;
	delimiters?: string;
	states?: StateState[];
	name?: string;
	input?: string;
}

export interface StateState {
	name: string;
	input: string;
}

export interface Subpod {
	title: string;
	img: SubpodImg;
	plaintext: string;
}

export interface SubpodImg {
	src: string;
	alt: string;
	title: string;
	width: number;
	height: number;
	type: Type;
	themes: Themes;
	colorinvertable: boolean;
}

export enum Themes {
	The123456789101112 = "1,2,3,4,5,6,7,8,9,10,11,12",
}

export enum Type {
	Default = "Default",
	The2DMathPlot1 = "2DMathPlot_1",
}

export interface CountriesModel {
	countries: Country[];
}

export interface Country {
	code: string;
	name: string;
	native: string;
}

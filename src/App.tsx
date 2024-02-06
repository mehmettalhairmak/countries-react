import { useQuery } from "@apollo/client";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./components/ui/table";
import { CountriesModel, Country } from "./models/CountriesModel";
import { COUNTRIES_QUERY } from "./graphql/queries/countries";
import useRandomColors from "./hooks/useRandomColors";
import { useEffect, useState } from "react";
import useSearchAndGroup from "./hooks/useSearchAndGroup";

const App = () => {
	const { data, loading, error } = useQuery<CountriesModel>(COUNTRIES_QUERY);

	const [countries, setCountries] = useState<Country[]>([]);
	const [selectedCountry, setSelectedCountry] = useState<Country | null>(
		null
	);

	const dataLength = data?.countries.length || 0;

	const { input, search, group, handleInputChange } = useSearchAndGroup();

	const getRandomColor = useRandomColors(dataLength);

	useEffect(() => {
		if (data?.countries !== undefined && dataLength > 0) {
			const coloredCountries = data.countries.map((country, index) => ({
				...country,
				rowColor: getRandomColor[index],
			}));

			setCountries(coloredCountries);

			// Select the 10th or last country
			const indexToSelect = Math.min(10, coloredCountries.length) - 1;
			setSelectedCountry(coloredCountries[indexToSelect]);
		}
	}, [data, getRandomColor]);

	useEffect(() => {
		if (search !== "" || group !== 0) {
			const filteredCountries = countries
				.filter(
					(country) =>
						country.name
							.toLowerCase()
							.includes(search.toLowerCase()) ||
						country.code
							.toLowerCase()
							.includes(search.toLowerCase()) ||
						country.native
							.toLowerCase()
							.includes(search.toLowerCase())
				)
				.slice(0, group !== 0 ? group : dataLength);

			// Select the 10th item or the last one if there are less than 10 items
			const selectedItem =
				filteredCountries.length >= 10
					? filteredCountries[9]
					: filteredCountries[filteredCountries.length - 1];

			setSelectedCountry(selectedItem);
		}
	}, [search, group]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<div className="flex my-10 mx-10 flex-col">
			<input
				type="text"
				value={input}
				onChange={(e) => handleInputChange(e.target.value)}
				placeholder="Enter search and group..."
			/>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Country Code</TableHead>
						<TableHead>Country Name</TableHead>
						<TableHead>Native</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{countries
						.filter(
							(country) =>
								country.name
									.toLowerCase()
									.includes(search.toLowerCase()) ||
								country.code
									.toLowerCase()
									.includes(search.toLowerCase()) ||
								country.native
									.toLowerCase()
									.includes(search.toLowerCase())
						)
						.slice(0, group !== 0 ? group : dataLength)
						.map((country) => {
							return (
								<TableRow
									className="hover:bg-gray-100 cursor-pointer"
									style={{
										backgroundColor:
											selectedCountry === country
												? country.rowColor
												: undefined,
									}}
									key={country.code}
									onClick={() => {
										if (country === selectedCountry) {
											setSelectedCountry(null);
										} else {
											setSelectedCountry(country);
										}
									}}
								>
									<TableCell>{country.code}</TableCell>
									<TableCell>{country.name}</TableCell>
									<TableCell>{country.native}</TableCell>
								</TableRow>
							);
						})}
				</TableBody>
			</Table>
		</div>
	);
};

export default App;

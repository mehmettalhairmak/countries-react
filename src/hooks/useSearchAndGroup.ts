import { useState } from "react";

interface SearchAndGroupResult {
	input: string;
	search: string;
	group: number;
	handleInputChange: (value: string) => void;
}

const useSearchAndGroup = (): SearchAndGroupResult => {
	const [input, setInput] = useState<string>("");
	const [search, setSearch] = useState<string>("");
	const [group, setGroup] = useState<number>(0);

	const handleInputChange = (value: string): void => {
		setInput(value);
		processInput(value);
	};

	const processInput = (value: string) => {
		const keywords = value.split(" ");
		const searchText =
			keywords
				.find((keyword) => keyword.startsWith("search:"))
				?.substring(7) || "";
		const groupBy =
			keywords
				.find((keyword) => keyword.startsWith("group:"))
				?.substring(6) || "0";

		setSearch(searchText);
		setGroup(parseInt(groupBy));
	};

	return { input, search, group, handleInputChange };
};

export default useSearchAndGroup;

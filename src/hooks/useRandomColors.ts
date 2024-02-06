import { useState, useEffect } from "react";

type Color = string;

const useRandomColors = (count: number): Color[] => {
	const [randomColors, setRandomColors] = useState<Color[]>([]);

	useEffect(() => {
		const generateRandomColors = (count: number): Color[] => {
			const colors: Color[] = [];

			for (let i = 0; i < count; i++) {
				const randomColor = `rgb(${Math.floor(
					Math.random() * 256
				)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
					Math.random() * 256
				)})`;
				colors.push(randomColor);
			}

			return colors;
		};

		setRandomColors(generateRandomColors(count));
	}, [count]);

	return randomColors;
};

export default useRandomColors;

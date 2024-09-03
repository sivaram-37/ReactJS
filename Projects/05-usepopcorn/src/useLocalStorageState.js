import { useState, useEffect } from "react";

export function useLocalStorageState(initialArray, key) {
	const [value, setValue] = useState(() => {
		const storedValue = localStorage.getItem(key);
		return storedValue ? JSON.parse(storedValue) : initialArray;
	});

	useEffect(
		function () {
			localStorage.setItem(key, JSON.stringify(value));
		},
		[value, key]
	);

	return [value, setValue];
}

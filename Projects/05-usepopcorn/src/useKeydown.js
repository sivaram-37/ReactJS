import { useEffect } from "react";

export function useKeydown(key, action) {
	useEffect(() => {
		function lessoningForKeydown(e) {
			if (e.code.toLowerCase() === key.toLowerCase()) {
				action();
			}
		}
		document.addEventListener("keydown", lessoningForKeydown);

		return () => document.removeEventListener("keydown", lessoningForKeydown);
	}, [action, key]);
}

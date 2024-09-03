import { useEffect, useState } from "react";

export default function App() {
	const [amount, setAmount] = useState(1);
	const [fromCurrency, setFromCurrency] = useState("USD");
	const [toCurrency, setToCurrency] = useState("EUR");
	const [result, setResult] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	useEffect(
		function () {
			const controller = new AbortController();

			async function fetchCurrencyAPI() {
				try {
					setIsLoading(true);
					const res = await fetch(
						`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`,
						{ signal: controller.signal }
					);

					const data = await res.json();

					setResult(data.rates[toCurrency]);
				} catch (err) {
					console.log(err.message);
				} finally {
					setIsLoading(false);
				}
			}

			if (fromCurrency === toCurrency) return setResult(amount);

			fetchCurrencyAPI();

			return function () {
				controller.abort();
			};
		},
		[amount, fromCurrency, toCurrency]
	);

	return (
		<div>
			<input type="text" value={amount} onChange={(e) => setAmount(+e.target.value)} />

			<select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
				<option value="USD">USD</option>
				<option value="EUR">EUR</option>
				<option value="CAD">CAD</option>
				<option value="INR">INR</option>
			</select>

			<select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
				<option value="USD">USD</option>
				<option value="EUR">EUR</option>
				<option value="CAD">CAD</option>
				<option value="INR">INR</option>
			</select>

			{isLoading ? (
				<p>Converting...</p>
			) : (
				<p>
					{amount} {fromCurrency} = {result} {toCurrency}
				</p>
			)}
		</div>
	);
}

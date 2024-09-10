function DisplayScreen({ balance, loan }) {
	return (
		<div className="box">
			<p>
				Balance: <span>{balance}</span>
			</p>
			<p>
				Loan: <span>{loan}</span>
			</p>
		</div>
	);
}

export default DisplayScreen;

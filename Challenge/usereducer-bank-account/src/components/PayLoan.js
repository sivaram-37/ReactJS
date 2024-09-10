function PayLoan({ dispatch, isActive }) {
	return (
		<button
			className="btn"
			onClick={() => dispatch({ type: "payLoan" })}
			disabled={!isActive}
		>
			Pay loan
		</button>
	);
}

export default PayLoan;

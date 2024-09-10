function RequestLoan({ dispatch, isActive, reqLoan, setReqLoan }) {
	return (
		<div className="btn-box">
			<input
				type="text"
				placeholder="5000"
				value={reqLoan}
				onChange={(e) => setReqLoan(+e.target.value)}
				disabled={!isActive}
			/>
			<button
				className="inp-btn"
				onClick={() => dispatch({ type: "requestLoan", payload: reqLoan })}
				disabled={!isActive}
			>
				Request a loan
			</button>
		</div>
	);
}

export default RequestLoan;

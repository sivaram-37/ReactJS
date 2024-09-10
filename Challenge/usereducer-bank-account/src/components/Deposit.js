function Deposit({ dispatch, isActive, depositAmount, setDepositAmount }) {
	return (
		<div className="btn-box">
			<input
				type="text"
				placeholder="150"
				value={depositAmount}
				onChange={(e) => setDepositAmount(Number(e.target.value))}
				disabled={!isActive}
			/>
			<button
				className="inp-btn"
				onClick={() => dispatch({ type: "deposit", payload: depositAmount })}
				disabled={!isActive}
			>
				Deposit
			</button>
		</div>
	);
}

export default Deposit;

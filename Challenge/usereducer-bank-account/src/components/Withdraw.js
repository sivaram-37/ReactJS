function Withdraw({ dispatch, isActive, withdraw, setWithdraw }) {
	return (
		<div className="btn-box">
			<input
				type="text"
				placeholder="50"
				value={withdraw}
				onChange={(e) => setWithdraw(+e.target.value)}
				disabled={!isActive}
			/>
			<button
				className="inp-btn"
				onClick={() => dispatch({ type: "withdraw", payload: withdraw })}
				disabled={!isActive}
			>
				Withdraw
			</button>
		</div>
	);
}

export default Withdraw;

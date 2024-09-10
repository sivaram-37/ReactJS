function OpenAccount({ dispatch, isActive }) {
	return (
		<button
			className="btn"
			onClick={() => dispatch({ type: "openAccount" })}
			disabled={isActive}
		>
			Open account
		</button>
	);
}

export default OpenAccount;

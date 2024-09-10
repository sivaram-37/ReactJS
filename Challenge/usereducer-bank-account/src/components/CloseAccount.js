function CloseAccount({ dispatch, isActive }) {
	return (
		<button
			className="btn"
			onClick={() => dispatch({ type: "closeAccount" })}
			disabled={!isActive}
		>
			Close account
		</button>
	);
}

export default CloseAccount;

import { useEffect, useState } from "react";
import { useAuth } from "../Contexts/FakeAuthProvider";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import PageNav from "../components/PageNav";
import styles from "./Login.module.css";

export default function Login() {
	// PRE-FILL FOR DEV PURPOSES
	const { login, isAuthenticate } = useAuth();
	const navigate = useNavigate();

	const [email, setEmail] = useState("jack@example.com");
	const [password, setPassword] = useState("qwerty");

	function handleSubmit(e) {
		e.preventDefault();
		login(email, password);
	}

	useEffect(
		function () {
			if (isAuthenticate) navigate("/app");
		},
		[isAuthenticate, navigate]
	);

	return (
		<main className={styles.login} onSubmit={handleSubmit}>
			<PageNav />

			<form className={styles.form}>
				<div className={styles.row}>
					<label htmlFor="email">Email address</label>
					<input
						type="email"
						id="email"
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
				</div>

				<div className={styles.row}>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>
				</div>

				<div>
					<Button type="primary">Login</Button>
				</div>
			</form>
		</main>
	);
}

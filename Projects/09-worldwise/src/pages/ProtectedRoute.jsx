/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useAuth } from "../Contexts/FakeAuthProvider";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
	const { isAuthenticate } = useAuth();
	const navigate = useNavigate();

	useEffect(
		function () {
			if (!isAuthenticate) navigate("/");
		},
		[isAuthenticate, navigate]
	);

	return isAuthenticate ? children : null;
}

export default ProtectedRoute;

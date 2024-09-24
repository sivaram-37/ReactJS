import { Outlet, useNavigation } from "react-router-dom";
import Header from "./Header";
import Loader from "./Loader";
import CartOverview from "../features/cart/CartOverview";

function AppLayout() {
	const navigation = useNavigation();
	const isLoading = navigation.status === "loading";

	return (
		<div className="layout">
			{isLoading && <Loader />}

			<Header />
			<main>
				<Outlet />
			</main>
			<CartOverview />
		</div>
	);
}

export default AppLayout;

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home from "./ui/Home";
import Menu from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import CreateOrder from "./features/order/CreateOrder";
import OrderItem from "./features/order/OrderItem";

const router = createBrowserRouter([
	{
		element: <AppLayout />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/menu",
				element: <Menu />,
			},
			{
				path: "/cart",
				element: <Cart />,
			},
			{
				path: "/order/new",
				element: <CreateOrder />,
			},
			{
				path: "/order/:orderId",
				element: <OrderItem />,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;

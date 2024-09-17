import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CitiesProvider } from "./Contexts/CitiesProvider";
import { AuthProvider } from "./Contexts/FakeAuthProvider";

import CityList from "./components/CityList";
import City from "./components/City";
import Form from "./components/Form";
import CountryList from "./components/CountryList";
import SpinnerFullPage from "./components/SpinnerFullPage";

import ProtectedRoute from "./pages/ProtectedRoute";

// import Homepage from "./pages/Homepage";
// import Pricing from "./pages/Pricing";
// import Product from "./pages/Product";
// import Login from "./pages/Login";
// import AppLayout from "./pages/AppLayout";
// import PageNotFound from "./pages/PageNotFound";

const Homepage = lazy(() => import("./pages/Homepage"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Product = lazy(() => import("./pages/Product"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
	return (
		<div>
			<AuthProvider>
				<CitiesProvider>
					<BrowserRouter>
						<Suspense fallback={<SpinnerFullPage />}>
							<Routes>
								<Route path="/" element={<Homepage />} />
								<Route path="pricing" element={<Pricing />} />
								<Route path="product" element={<Product />} />
								<Route path="login" element={<Login />} />
								<Route
									path="app"
									element={
										<ProtectedRoute>
											<AppLayout />
										</ProtectedRoute>
									}
								>
									<Route index element={<Navigate replace to="cities" />} />
									<Route path="cities" element={<CityList />} />
									<Route path="cities/:id" element={<City />} />
									<Route path="countries" element={<CountryList />} />
									<Route path="form" element={<Form />} />
								</Route>
								<Route path="*" element={<PageNotFound />} />
							</Routes>
						</Suspense>
					</BrowserRouter>
				</CitiesProvider>
			</AuthProvider>
		</div>
	);
}

export default App;

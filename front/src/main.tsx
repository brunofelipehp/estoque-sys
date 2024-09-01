import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./main.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { FilterProduct } from "./page/FilterProduct.tsx";
import { ProductEntry } from "./page/ProductEntry.tsx";
import { Register } from "./page/Register.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/register",
		element: <Register />,
	},
	{
		path: "/entry",
		element: <ProductEntry />,
	},
	{
		path: "/products",
		element: <FilterProduct />,
	},
]);

// biome-ignore lint/style/noNonNullAssertion: <explanation>
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);

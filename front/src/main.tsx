import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./main.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { FilterProduct } from "./page/FilterProduct.tsx";
import { Register } from "./page/Register.tsx";
import { StockEntry } from "./page/StockEntry.tsx";

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
		element: <StockEntry />,
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

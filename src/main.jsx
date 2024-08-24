import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout01 from "./Templates/Layout01";

import {
	// useQuery,
	// useMutation,
	// useQueryClient,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import Book from "./pages/Book";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
	<QueryClientProvider client={queryClient}>
		<BrowserRouter>
			<Routes>
				<Route element={<Layout01 />}>
					<Route path="/" element={<Home />} />
					<Route path="/:bookId" element={<Book />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</QueryClientProvider>
);

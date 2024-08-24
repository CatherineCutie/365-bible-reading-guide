import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const Layout01 = () => {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<main className="flex-1 m-5">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default Layout01;

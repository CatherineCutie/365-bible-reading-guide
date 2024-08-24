import React from "react";

const Footer = () => {
	return (
		<footer className="footer footer-center bg-base-200 text-base-content p-4 flex justify-between">
			{/* <aside> */}
			<p>
				Copyright © {new Date().getFullYear()} - All right reserved by Cath
				Industries Ltd
			</p>
			{/* </aside> */}
			<a
				href="https://scripture.api.bible/"
				target="__blank"
				className="bg-slate-100 hover:bg-slate-400 transition-all duration-500 ease-in-out p-2 rounded-md"
			>
				<img src="../assets/api-logo@2x.png" alt="" className="h-5" />
			</a>
		</footer>
	);
};

export default Footer;

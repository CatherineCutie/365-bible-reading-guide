import React from "react";

const Header = () => {
	return (
		<div className="navbar bg-base-200">
			<div className="flex-1">
				<a className="btn btn-ghost text-xl">Free Bible App</a>
			</div>
			<div className="flex-none">
				<ul className="menu menu-horizontal px-1">
					<li>
						<details>
							<summary>Name</summary>
							<ul className="bg-base-300 rounded-sm  p-2 z-10 ">
								<li>
									<a>Cathy</a>
								</li>
								<li>
									<a>Sandy</a>
								</li>
							</ul>
						</details>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Header;

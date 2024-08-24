import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const queryClient = useQueryClient();

	const navigate = useNavigate();

	const books = [
		"06125adad2d5898a-01",
		"65eec8e0b60e656b-01",
		"de4e12af7f28f599-01",
	];

	const fetchBookVersions = async () => {
		try {
			const requests = books.map((bookId) =>
				axios.get("https://api.scripture.api.bible/v1/bibles/" + bookId, {
					headers: {
						accept: "application/json",
						"api-key": "9f9d4e58105e5be4a5dc8efb4d6b6ad0",
					},
				})
			);

			const responses = await Promise.all(requests);

			return responses.map((response) => response.data.data);
		} catch (error) {
			console.error(error);
		}
	};

	const fetchBookVersion = async () => {
		try {
			const { data } = await axios.get(
				"https://api.scripture.api.bible/v1/bibles/06125adad2d5898a-01",
				{
					headers: {
						accept: "application/json",
						"api-key": "9f9d4e58105e5be4a5dc8efb4d6b6ad0",
					},
				}
			);

			return data;
		} catch (error) {
			console.error(error);
		}
	};

	const query = useQuery({
		queryKey: ["fetchBookVersions"],
		queryFn: fetchBookVersions,
	});

	const selectedBook = (selectedBook) => {
		const versionID = encodeURIComponent(selectedBook);
		// console.log(versionID);

		navigate(versionID);
	};

	return (
		<div className="p-5 h-full">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:mx-10">
				{query.isError ? (
					<div role="alert" className="alert alert-error">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6 shrink-0 stroke-current"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<span>Something went wrong.</span>
					</div>
				) : (
					<>
						{query.isLoading ? (
							<>
								{books.map((book) => (
									<div key={book} className="skeleton h-56 w-full"></div>
								))}
							</>
						) : (
							<>
								{query.data.map((version) => (
									<div
										key={version.id}
										className="card bg-base-200 w-full shadow-xl"
									>
										<div className="card-body">
											<div className="h-16">
												<h2 className="card-title">{version.name}</h2>
												<h1 className="text-sm">({version.abbreviation})</h1>
											</div>

											<div className="divider"></div>
											<div className="card-actions">
												<button
													className="btn bg-base-300 hover:bg-base-100 border-0 w-full"
													onClick={() => selectedBook(version.id)}
												>
													Start Reading
												</button>
											</div>
										</div>
									</div>
								))}
							</>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default Home;

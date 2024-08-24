import { BiArrowBack } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react";

const Book = () => {
	const params = useParams();
	const navigate = useNavigate();

	const [bookId, setBookId] = useState(params.bookId);
	const [selectedChapter, setSelectedChapter] = useState("");
	const [verses, setVerses] = useState([]);
	const [chapterId, setChapterId] = useState("");
	const [verseId, setVerseId] = useState("");

	const fetchBookVersion = async () => {
		try {
			const { data } = await axios.get(
				"https://api.scripture.api.bible/v1/bibles/" + bookId,
				{
					headers: {
						accept: "application/json",
						"api-key": "9f9d4e58105e5be4a5dc8efb4d6b6ad0",
					},
				}
			);

			return [data.data];
		} catch (error) {
			console.error(error);
		}
	};

	const query = useQuery({
		queryKey: ["fetchBookVersion", bookId],
		queryFn: fetchBookVersion,
	});

	const fetchBookVersionWithChapters = async () => {
		try {
			const { data } = await axios.get(
				"https://api.scripture.api.bible/v1/bibles/" +
					bookId +
					"/books?include-chapters=true&include-chapters-and-sections=true",
				{
					headers: {
						accept: "application/json",
						"api-key": "9f9d4e58105e5be4a5dc8efb4d6b6ad0",
					},
				}
			);

			return data.data;
		} catch (error) {
			console.error(error);
		}
	};

	const query2 = useQuery({
		queryKey: ["fetchBookVersionWithChapters", bookId],
		queryFn: fetchBookVersionWithChapters,
	});

	const handleChapterChange = (e) => {
		const chapterId = e.target.value;
		setSelectedChapter(chapterId);

		const selectedChapterData = query2.data.find(
			(chapter) => chapter.name === chapterId
		);

		if (selectedChapterData) {
			setVerses(selectedChapterData.chapters);
		}
	};

	const fetchSelectedChapter = async () => {
		try {
			const { data } = await axios.get(
				"https://api.scripture.api.bible/v1/bibles/" +
					bookId +
					"/chapters/" +
					chapterId +
					"?content-type=json&include-notes=true&include-titles=true&include-chapter-numbers=true&include-verse-numbers=true&include-verse-spans=true",
				{
					headers: {
						accept: "application/json",
						"api-key": "9f9d4e58105e5be4a5dc8efb4d6b6ad0",
					},
				}
			);

			return data.data;
		} catch (error) {
			console.error(error);
		}
	};

	const query3 = useQuery({
		queryKey: ["fetchSelectedChapter", [bookId, chapterId]],
		queryFn: fetchSelectedChapter,
		enabled: chapterId ? true : false,
	});

	const fetchSelectedChapterVerse = async () => {
		try {
			const { data } = await axios.get(
				"https://api.scripture.api.bible/v1/bibles/" +
					bookId +
					"/chapters/" +
					chapterId +
					"/verses",
				{
					headers: {
						accept: "application/json",
						"api-key": "9f9d4e58105e5be4a5dc8efb4d6b6ad0",
					},
				}
			);

			return data.data;
		} catch (error) {
			console.error(error);
		}
	};

	const query4 = useQuery({
		queryKey: ["fetchSelectedChapterVerse", [bookId, chapterId]],
		queryFn: fetchSelectedChapterVerse,
		enabled: chapterId ? true : false,
	});

	const fetchSelectedVerse = async () => {
		try {
			const { data } = await axios.get(
				"https://api.scripture.api.bible/v1/bibles/" +
					bookId +
					"/verses/" +
					verseId +
					"?content-type=json&include-notes=true&include-titles=true&include-chapter-numbers=true&include-verse-numbers=true&include-verse-spans=true&use-org-id=true",
				{
					headers: {
						accept: "application/json",
						"api-key": "9f9d4e58105e5be4a5dc8efb4d6b6ad0",
					},
				}
			);

			console.log(data.data);

			return data.data;
		} catch (error) {
			console.error(error);
		}
	};

	const query5 = useQuery({
		queryKey: ["fetchSelectedVerse", [bookId, verseId]],
		queryFn: fetchSelectedVerse,
		enabled: verseId ? true : false,
	});

	return (
		<div className="p-5 h-full">
			<div className="grid grid-cols-1 md:mx-10">
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
							<div className="skeleton h-56 w-full"></div>
						) : (
							<>
								{query.data.map((version) => (
									<div
										key={version.id}
										className="card bg-base-200 w-full shadow-xl"
									>
										<div className="card-body">
											<div className="h-16">
												<div className="flex justify-between">
													<div>
														<h2 className="card-title font-bold">
															{version.name}
														</h2>
														<h1 className="text-xs uppercase ">
															({version.abbreviation})
														</h1>
													</div>
													<div className="flex justify-end items-center gap-10">
														<div className="flex">
															<select
																className="select select-sm select-ghost w-full max-w-xs"
																onChange={handleChapterChange}
															>
																<option defaultValue>--Books--</option>
																{query2.data?.map((chapter) => (
																	<option key={chapter.id} value={chapter.name}>
																		{chapter.name}
																	</option>
																))}
															</select>
															<select
																className="select select-sm select-ghost w-30"
																onChange={(e) => setChapterId(e.target.value)}
															>
																<option defaultValue>--Chapters--</option>
																{verses.map((verse) => (
																	<option key={verse.id} value={verse.id}>
																		{verse.number}
																	</option>
																))}
															</select>

															<select
																className="select select-sm select-ghost w-30"
																onChange={(e) => setVerseId(e.target.value)}
															>
																<option defaultValue>--Verse--</option>
																{query4.data?.map((verse, index) => (
																	<option key={verse.id} value={verse.id}>
																		{index + 1}
																	</option>
																))}
															</select>
														</div>

														<button
															className="btn btn-ghost btn-sm"
															onClick={() => navigate("/")}
														>
															BACK
															<BiArrowBack />
														</button>
													</div>
												</div>
											</div>

											<div className="divider"></div>
											<div>
												<div className="bg-base-300 p-10 rounded-md h-[40vh] overflow-y-auto">
													{chapterId == "" ? (
														<p
															dangerouslySetInnerHTML={{ __html: version.info }}
														></p>
													) : (
														<div>
															{query5.isLoading ? (
																<></>
															) : (
																<>
																	{query5.data?.content.map((data) => (
																		<Fragment key={data.id}>
																			{data.hasOwnProperty("items") ? (
																				<p className="mb-5 text-justify">
																					{data.items.map((item) => (
																						<>
																							{item.hasOwnProperty("items") ? (
																								<>
																									{item.items.map((para) => (
																										<>{para.text}</>
																									))}
																								</>
																							) : (
																								<span className="text-4xl">
																									{item.text}
																								</span>
																							)}
																						</>
																					))}
																				</p>
																			) : null}
																		</Fragment>
																	))}
																</>
															)}
														</div>
													)}
												</div>
											</div>
											<div className="card-actions mt-5">
												{/* <button
													className="btn btn-primary w-full"
													onClick={() => selectedBook(version.id)}
												>
													Start Reading
												</button> */}
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

export default Book;

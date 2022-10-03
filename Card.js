import React, { useState, useEffect } from "react";
import "./Card.css";
import { FaUserTimes } from "react-icons/fa";

export default function Card({ user_data, setShowModal, removeUser }) {
	const {
		name,
		username,
		stars,
		rating,
		highestRating,
		globalRank,
		countryRank,
		country,
		contestParticipated,
		problemPartiallySolved,
		problemFullySolved,
		isActiveUser,
	} = user_data;

	const countryAPI = "https://countryflagsapi.com/png/";

	// To Give Accent Color To Card.
	const colorClass = `stars${stars}`;

	// To Toggle moreDetails Card State.
	const [isMoreDetailsShown, setMoreDetailsShown] = useState(false);

	// To Handle Screen Size Changes.
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);
	const [isScreenSmall, setIsScreenSmall] = useState(false);

	// Handling Screen Resize.
	function handleResize() {
		setScreenWidth(window.innerWidth);
	}
	useEffect(() => {
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	// Checking Whether Screen Size Is Small.
	useEffect(() => {
		if (screenWidth < 669) {
			setIsScreenSmall(true);
		} else {
			setIsScreenSmall(false);
		}
	}, [screenWidth]);

	const starVar = "★";

	return (
		<div className={`cardBox ${colorClass} ${!isActiveUser && "inactive"}`}>
			<div className="cardDetails">
				<h1>{name}</h1>
				<div className="subtitleContainer">
					<a
						className="cardUsername"
						href={"https://codechef.com/users/" + username}
						target="_blank"
						rel="noreferrer noopener"
					>
						{username}
					</a>
					<img src={countryAPI + country} alt={country} className="flag" />
				</div>
				<div className="cardRating">
					<p>
						{stars} {starVar.repeat(stars)} | {rating}
					</p>
				</div>
				<div className="cardHighestRating">
					{isActiveUser ? (
						<>
							<h4>Highest Rating:</h4>
							<p>{highestRating}</p>
						</>
					) : (
						<>
							<h4>Inactive User</h4>
						</>
					)}
				</div>
				<div className="btnContainer">
					<button
						className="cardBtn"
						onClick={() => {
							setShowModal((previous) => {
								return {
									...previous,
									visible: true,
									type: "confirm",
									msg: `Are you sure to delete '${username}'?`,
									acceptFunc: () => removeUser(username),
								};
							});
						}}
					>
						<FaUserTimes />
						<p>Delete</p>
					</button>

					{isScreenSmall && (
						<button
							className="cardBtn"
							onClick={() => setMoreDetailsShown((prev) => !prev)}
						>
							<p>{isMoreDetailsShown ? "Close" : "View"} details</p>
						</button>
					)}
				</div>
			</div>

			{(isMoreDetailsShown || !isScreenSmall) && (
				<div className="moreDetails">
					<div className="detailsItemWrapper">
						<h1 className="wrapperHeading">Contest</h1>
						<div className="detailsItem">
							<p>Contest Participated:</p>
							<p>{contestParticipated || 0}</p>
						</div>
					</div>
					<div className="detailsItemWrapper">
						<h1 className="wrapperHeading">Ranking</h1>
						<div className="detailsItem">
							<p>Global Rank:</p>
							<p>{globalRank || "Not Available"}</p>
						</div>
						<div className="detailsItem">
							<p>Country Rank:</p>
							<p>{countryRank || "Not Available"}</p>
						</div>
					</div>
					<div className="detailsItemWrapper">
						<h1 className="wrapperHeading">Problem Solved</h1>
						<div className="detailsItem">
							<p>Fully:</p>
							<p>{problemFullySolved}</p>
						</div>
						<div className="detailsItem">
							<p>Partially:</p>
							<p>{problemPartiallySolved}</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

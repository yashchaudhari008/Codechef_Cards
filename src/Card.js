import React from "react";
import "./Card.css";
import { FaUserTimes } from "react-icons/fa";

export default function Card({ user_data, setShowModal, removeUser }) {
	const {
		user_details,
		stars,
		rating,
		highest_rating,
		global_rank,
		country_rank,
		partially_solved,
		fully_solved,
	} = user_data;

	// To Give Accent Color To Card.
	const colorClass = `stars${stars[0]}`;

	return (
		<div className={`cardBox ${colorClass}`}>
			<div className="cardDetails">
				<h1>{user_details.name}</h1>
				<p>({user_details.username})</p>
				<div className="cardRating">
					<p>
						{stars} | {rating}
					</p>
				</div>
				<div className="cardHighestRating">
					<h4>Highest Rating:</h4>
					<p>{highest_rating}</p>
				</div>
				<div>
					<button
						className="cardBtn"
						onClick={() => {
							setShowModal((previous) => {
								return {
									...previous,
									visible: true,
									type: "confirm",
									msg: `Are you sure to delete '${user_details.username}'?`,
									acceptFunc: () => removeUser(user_details.username),
								};
							});
						}}
					>
						<FaUserTimes />
						<p>Delete</p>
					</button>
				</div>
			</div>
			<div className="moreDetails">
				<div className="detailsItemWrapper">
					<h1 className="wrapperHeading">Ranking</h1>
					<div className="detailsItem">
						<p>Global Rank:</p>
						<p>{global_rank}</p>
					</div>
					<div className="detailsItem">
						<p>Country Rank:</p>
						<p>{country_rank}</p>
					</div>
				</div>
				<div className="detailsItemWrapper">
					<h1 className="wrapperHeading">Problem Solved</h1>
					<div className="detailsItem">
						<p>Fully:</p>
						<p>{fully_solved.count}</p>
					</div>
					<div className="detailsItem">
						<p>Partially:</p>
						<p>{partially_solved.count}</p>
					</div>
				</div>
			</div>
		</div>
	);
}

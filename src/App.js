import React, { useEffect, useState, useCallback } from "react";
import Header from "./Header";
import Footer from "./Footer";
import AddUserMenu from "./AddUserMenu";
import Card from "./Card";
import Modal from "./Modal";

export default function App() {
	const api_url = "https://competitive-coding-api.herokuapp.com/api/codechef/";

	const [users, setUsers] = useState([]); // Current Users.
	const [usersData, setUsersData] = useState([]); // Current Users Data.

	const [userFetched, setUserFetched] = useState([]); // Recently FETCHED User.

	// To Control State Of Modal.
	const [showModal, setShowModal] = useState({
		visible: false,
		type: "",
		msg: "",
		acceptFunc: null,
	});

	// To Remove User From 'users' And 'localStorage'.
	const removeUser = useCallback((username) => {
		setUsersData((usersData) =>
			usersData.filter((data) => data.user_details.username !== username)
		);
		setUsers((users) => {
			let users_temp = users.filter((user) => user !== username);
			localStorage.setItem("usernames", JSON.stringify(users_temp));

			return users_temp;
		});
	}, []);

	// To Fetch User Data From API.
	const fetchData = useCallback(
		(username) => {
			fetch(api_url + username)
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					// console.log(data);
					if (data.status === "Success") {
						setUserFetched({
							...data,
							user_details: { ...data.user_details, username },
						});
					} else {
						setShowModal((previous) => {
							return {
								...previous,
								visible: true,
								type: "alert",
								msg: "You entered Invalid Username.",
							};
						});
						removeUser(username);
					}
				})
				.catch((error) => console.log("Error:", error));
		},
		[removeUser]
	);

	// Loading Stored User And Fetching User Data. [RUNS ONLY ONCE]
	useEffect(() => {
		let user_temp = JSON.parse(localStorage.getItem("usernames"));
		if (user_temp) {
			setUsers(user_temp);
			user_temp.forEach((username) => {
				fetchData(username);
			});
		} else {
			setUsers([]);
		}
	}, [fetchData]);

	// Storing User Data After Fecthing.
	useEffect(() => {
		if (userFetched.length === 0) return;
		if (userFetched.rating === 0) {
			userFetched.stars = "1★";
			userFetched.global_rank = "Not Ranked!";
			userFetched.country_rank = "Not Ranked!";
		}

		setUsersData(() => [...usersData, userFetched]);
		setUserFetched([]);
	}, [userFetched, usersData]);

	return (
		<div className="App">
			<Header />
			<div className="Content">
				<AddUserMenu
					setUsers={setUsers}
					users={users}
					fetchData={fetchData}
					setShowModal={setShowModal}
				/>

				<div className="CardList">
					{usersData
						.sort((first, second) => {
							return second.rating - first.rating;
						})
						.map((user) => {
							return (
								<Card
									key={user.user_details.username}
									user_data={user}
									setShowModal={setShowModal}
									removeUser={removeUser}
								/>
							);
						})}
				</div>

				{showModal.visible && (
					<div className="backDrop">
						<Modal modalData={showModal} setShowModal={setShowModal} />
					</div>
				)}
			</div>
			<Footer />
		</div>
	);
}

import React, { useState, useRef } from "react";
import "./AddUserMenu.css";
import { FaChevronUp, FaChevronDown, FaUserPlus } from "react-icons/fa";

export default function AddUserMenu({
	users,
	setUsers,
	fetchData,
	setShowModal,
}) {
	const [isOpen, setIsOpen] = useState(false); // To Control State Of Menu.
	const usernameRef = useRef(null); // Reference To 'username' Input Element.

	// Handling Submit.
	const handleSubmit = (event) => {
		event.preventDefault();

		const username = usernameRef.current.value.toLowerCase(); // Using Lowercase To Avoid Duplication eg:('user1','User1')
		if (username === "") {
			// No Username Entered.
			setShowModal((previous) => {
				return {
					...previous,
					visible: true,
					type: "alert",
					msg: "No Username Entered!",
				};
			});
		} else {
			let users_temp = new Set(users);
			if (users_temp.has(username)) {
				// Username Already Exists.
				setShowModal((previous) => {
					return {
						...previous,
						visible: true,
						type: "warning",
						msg: "User already exists!",
					};
				});
			} else {
				// Add 'username' To 'users' And 'localStorage'.
				users_temp.add(username);
				setUsers(Array.from(users_temp));
				localStorage.setItem("users", JSON.stringify(Array.from(users_temp)));
				fetchData(username);
			}
			usernameRef.current.value = "";
		}
	};

	return (
		<div className="menuBox">
			<button className="menuBtn" onClick={() => setIsOpen(!isOpen)}>
				{isOpen ? <FaChevronUp /> : <FaChevronDown />}
			</button>

			{/* Menu Content */}
			{isOpen && (
				<form className="menuForm" onSubmit={handleSubmit}>
					<div>
						<label htmlFor="username"> Username: </label>
						<input
							type="text"
							id="username"
							name="username"
							ref={usernameRef}
						></input>
					</div>
					<div>
						<button className="menuBtn" type="submit">
							<FaUserPlus />
							<p>Add User</p>
						</button>
					</div>
				</form>
			)}
		</div>
	);
}

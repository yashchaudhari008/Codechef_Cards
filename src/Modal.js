import React from "react";
import "./Model.css";
import { FaBan, FaCheck, FaTimes } from "react-icons/fa";

export default function Modal({ modalData, setShowModal }) {
	const { type, msg, acceptFunc } = modalData;

	// To Remove Modal
	const removeModal = () => {
		setShowModal((previous) => {
			return {
				...previous,
				visible: false,
			};
		});
	};

	if (type === "alert") {
		return (
			<div className={`Modal ${type}Modal`}>
				<h1>Alert!</h1>
				<p>{msg}</p>
				<div className="modalBtnHolder">
					<button className="modalBtn" onClick={removeModal}>
						<FaTimes />
						Close
					</button>
				</div>
			</div>
		);
	}
	if (type === "warning") {
		return (
			<div className={`Modal ${type}Modal`}>
				<h1>Warning</h1>
				<p>{msg}</p>
				<div className="modalBtnHolder">
					<button className="modalBtn" onClick={removeModal}>
						<FaTimes />
						Close
					</button>
				</div>
			</div>
		);
	}
	if (type === "confirm") {
		return (
			<div className={`Modal ${type}Modal`}>
				<h1>Confirm</h1>
				<p>{msg}</p>
				<div className="modalBtnHolder">
					<button
						className="modalBtn"
						onClick={() => {
							acceptFunc();
							removeModal();
						}}
					>
						<FaCheck />
						Yes
					</button>
					<button className="modalBtn" onClick={removeModal}>
						<FaBan />
						No
					</button>
				</div>
			</div>
		);
	}
	throw new Error(`No modal defined for '${type}'`);
}

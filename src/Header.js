import React from "react";
import { FaGithub } from "react-icons/fa";

export default function Header() {
	const gotoGithub = () => {
		window.location.href = "https://github.com/yashchaudhari008/Codechef_Cards";
	};
	return (
		<header>
			<div>Codechef Cards</div>
			<FaGithub
				className="githubIcon"
				onClick={gotoGithub}
				style={{ cursor: "pointer" }}
			/>
		</header>
	);
}

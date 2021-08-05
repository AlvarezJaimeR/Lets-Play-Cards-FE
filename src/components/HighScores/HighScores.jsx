import axios from "axios";
import React, { useState, useEffect } from "react";
import { ROOT_URL } from "../../apiRoot";

const HighScores = () => {
	const [totalUsers, setTotalUsers] = useState([]);

	useEffect(() => {
		onLoad();
		console.log(totalUsers);
	}, []);

	async function onLoad() {
		await axios.get(`${ROOT_URL}api/users/`).then((response) => {
			setTotalUsers(response.data);
		});
	}

	return (
		<div>
			<h1>Hello Highscores Table...</h1>
		</div>
	);
};

export default HighScores;

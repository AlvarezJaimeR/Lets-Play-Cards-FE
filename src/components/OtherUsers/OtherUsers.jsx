import axios from "axios";
import React, { useState, useEffect } from "react";
import { ROOT_URL } from "../../apiRoot";
import "./OtherUsers.css";

const OtherUsers = () => {
	const [totalUsers, setTotalUsers] = useState([]);

	useEffect(() => {
		onLoad();
	}, []);

	async function onLoad() {
		await axios.get(`${ROOT_URL}api/users/`).then((response) => {
			setTotalUsers(response.data);
		});
	}

	return totalUsers.length > 0 ? (
		<div className="container full-user-table">
			<div className="row">
				<div className="col table-title">
					<h1>All Users</h1>
				</div>
			</div>
			<div className="row">
				{totalUsers.map((user, index) => (
					<div className="col-4 table-content" key={index}>
						<p>Username: {user.userName}</p>
						<p>Total Games Played: {user.games}</p>
						<p>Wins: {user.wins}</p>
						<p>Loses: {user.loses}</p>
					</div>
				))}
			</div>
		</div>
	) : (
		<div>
			<h1>Loading...</h1>
		</div>
	);
};

export default OtherUsers;

import axios from "axios";
import React, { useState, useEffect } from "react";
import { ROOT_URL } from "../../apiRoot";
import "./OtherUsers.css";
import { useHistory } from "react-router-dom";
import { useAppContext } from "../../libs/contextLib";

const OtherUsers = () => {
	const [totalUsers, setTotalUsers] = useState([]);
	const { userHasAuthenticated } = useAppContext();
	const history = useHistory();

	useEffect(() => {
		onLoad();
	}, []);

	async function onLoad() {
		await axios.get(`${ROOT_URL}api/users/`).then((response) => {
			setTotalUsers(response.data);
		});
	}

	function buttonClick(event) {
		switch (event.target.name) {
			case "home":
				try {
					history.push("/home");
				} catch (err) {
					console.log(err);
				}
				break;
			case "quit":
				try {
					console.log("logging out...");
					localStorage.removeItem("token");
					userHasAuthenticated(false);

					history.push("/home");
				} catch (err) {
					console.log(err);
				}
				break;
		}
	}

	return totalUsers.length > 0 ? (
		<div className="container full-user-table">
			<div className="row">
				<div className="col-11"></div>
				<div className="col-1">
					<button
						onClick={(event) => buttonClick(event)}
						name="home"
						className="btn-light">
						Home
					</button>
					<button
						onClick={(event) => buttonClick(event)}
						name="quit"
						className="btn-dark">
						Logout
					</button>
				</div>
			</div>
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
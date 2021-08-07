import axios from "axios";
import React, { useState, useEffect } from "react";
import { ROOT_URL } from "../../apiRoot";
import "./AllUsers.css";
import { useHistory } from "react-router-dom";
import { useAppContext } from "../../libs/contextLib";
import star from "../../images/Star.png";

const AllUsers = () => {
	const [totalUsers, setTotalUsers] = useState([]);
	const { userHasAuthenticated, loggedInUser } = useAppContext();
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
				<div className="col-6">
					<button
						onClick={(event) => buttonClick(event)}
						name="home"
						className="btn-light">
						Home
					</button>
				</div>
				<div className="col-6">
					<button
						onClick={(event) => buttonClick(event)}
						name="quit"
						className="btn-dark logout-button">
						Logout
					</button>
				</div>
			</div>
			<div className="row">
				<div className="col table-title">
					<h1>ALL USERS</h1>
				</div>
			</div>
			<div className="row">
				{totalUsers.map((user, index) => (
					<div
						className="col-sm-4 d-flex align-items-center justify-content-center"
						key={index}>
						{user.userName == loggedInUser.userName ? (
							<div className="card table-content">
								<div className="card-body text-center">
									<h2>Username: {user.userName}</h2>
									<h4>Total Games Played: {user.games}</h4>
									<h4>Wins: {user.wins}</h4>
									<h4>Loses: {user.loses}</h4>
									<img src={star} alt="star" className="img-star" />
								</div>
							</div>
						) : (
							<div className="card table-content">
								<div className="card-body text-center">
									<h2>Username: {user.userName}</h2>
									<h4>Total Games Played: {user.games}</h4>
									<h4>Wins: {user.wins}</h4>
									<h4>Loses: {user.loses}</h4>
								</div>
							</div>
						)}
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

export default AllUsers;

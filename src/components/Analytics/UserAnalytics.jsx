import React, { useEffect } from "react";
import { useAppContext } from "../../libs/contextLib";
import "../Screens/screens.css";
import ace from "../../images/ace.ico";
import { Link } from "react-router-dom";

const UserAnalytics = ({}) => {
	const { isAuthenticated, loggedInUser } = useAppContext();

	useEffect(() => {
		console.log(loggedInUser);
	}, [loggedInUser]);

	return (
		<div className="analytics-container p-3">
			<div className="try rounded" style={{ width: "100%" }}>
				<div className="row no-gutters">
					<div className="col-sm-5">
						<img
							className="card-img-top img-fluid"
							style={{ width: "50%" }}
							src={ace}
							alt="ace"
						/>
					</div>
					<div className="col-sm-7" style={{ width: "50%", height: "auto" }}>
						{isAuthenticated ? (
							<div className="card-block">
								<div class="card-body">
									<h2 class="card-title">
										<strong>My Stats</strong>
									</h2>
								</div>
								<ul class="list-group rounded list-group-flush">
									<li class="list-group-item">
										<strong>Name :</strong> {loggedInUser.userName}
									</li>
									<li class="list-group-item">
										<strong>Total Games :</strong> {loggedInUser.games}
									</li>
									<li class="list-group-item">
										<strong>Total Wins :</strong> {loggedInUser.wins}
									</li>
									<li class="list-group-item">
										<strong>Total Loses :</strong> {loggedInUser.loses}
									</li>
								</ul>
							</div>
						) : (
							<div className="card-block">
								<div class="card-body">
									<h2 class="card-title">
										<strong>Log in to view your Stats!</strong>
									</h2>
								</div>
							</div>
						)}
					</div>

					<div className="mt-5">
						<Link to="/allUsers">
							<button className="btn-light px-2">All Users</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserAnalytics;

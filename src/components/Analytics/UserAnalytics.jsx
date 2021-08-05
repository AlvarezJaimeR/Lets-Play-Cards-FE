import React, { useEffect } from "react";
import { useAppContext } from "../../libs/contextLib";
import "../Screens/screens.css";
import ace from "../../images/ace.ico";
import { Link } from "react-router-dom";

const UserAnalytics = ({}) => {
	const { isAuthenticated, userHasAuthenticated, loggedInUser } =
		useAppContext();

	useEffect(() => {
		console.log(loggedInUser);
	}, [loggedInUser]);

	return isAuthenticated ? (
		<div className="analytics-container p-3">
			<div className="card" style={{ width: "35rem", height: "28rem" }}>
				<div className="row no-gutters">
					<div className="col-sm-5">
						<img className="card-img-top" src={ace} alt="ace" />
					</div>
					<div className="col-sm-7">
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
					<div>
						<Link to="/highScores">
							<button className="btn-light">Highscores!</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	) : (
		<div className="analytics-container p-3">
			<div className="card" style={{ width: "35rem", height: "28rem" }}>
				<div className="row no-gutters">
					<div className="col-sm-5">
						<img className="card-img-top" src={ace} alt="ace" />
					</div>
					<div className="col-sm-7">
						<div class="card-body">
							<h2 class="card-title">
								<strong>Log in to view your Stats!</strong>
							</h2>
						</div>
						<ul class="list-group rounded list-group-flush"></ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserAnalytics;

{
	/*                {props.length > 0 ? (
                  <div className="registered-users p-3 text-left">
                    <h3 className="bg-dark rounded p-2 text-light text-left">Registered Users</h3>
                    {props.slice(0, 7).map((user, index) => {
                      return (
                        <div className="text-left" key={index}>
                          <strong>username: {user.userName}/ Wins:{ user.wins}</strong>

                        </div>
                      );
                    })}
                    <div>...</div>
                  </div>
                ) : (
                  <div>
                    <h2>Loading...</h2>
                  </div>
                )}
*/
}

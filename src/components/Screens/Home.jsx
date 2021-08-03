import React, { useState, useEffect, Fragment } from "react";
import "./screens.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAppContext } from "../../libs/contextLib";
import { useHistory } from "react-router-dom";

import UserAnalytics from "../Analytics/UserAnalytics";

import {ROOT_URL} from '../../apiRoot';


function Home() {
	const [totalUsers, setTotalUsers] = useState([]);
	const { isAuthenticated, userHasAuthenticated } = useAppContext();
	const history = useHistory();

	useEffect(() => {
		onLoad();
	}, []);

	async function onLoad() {
		await axios.get(`${ROOT_URL}api/users/`).then((response) => {
			setTotalUsers(response.data);
		});
	}

	function buttonSelection(event) {
		switch (event.target.name) {
			case "logout":
				try {
					console.log("logging out...");
					localStorage.removeItem("token");
					userHasAuthenticated(false);
					history.pushState("/home");
				} catch (err) {
					console.log(err);
				}
				break;
		}
	}

	return (
		<Fragment>
			<div className="home">
				{/* Landing Page */}

				<div className="homepage-sections border rounded">
					<h1 className="bg-dark rounded p-2 text-light m-3">👑 Let's Play Cards - WAR</h1>
					<div className="homepage-section-1">
						<div className="image-div">
						<img
							className="home-img"
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Kings_in_Deck_of_Cards.jpg/220px-Kings_in_Deck_of_Cards.jpg"
							alt="deck-of-cards"
						/>
					</div>
					<div className="rules-container">
							<p><ul><strong>⏩ WAR Game Rules:</strong></ul>
							<ul>✴ Each player will receive 26 cards, dealt one at a time.</ul>
							<ul>✴ Each player turns up a card at the same time and the player with the higher card wins the round. </ul>
							<ul>✴ If the card is the same value... each player will turn up the next card. If the turned-up cards are the same value again then each player will again turn up the next card. The player with the higher card value wins that round and receives a bonus score for each previous tie. </ul>
							<ul>✴ The game ends after 26 rounds have been played. The winner of the game is the player who wins the most rounds and receives the highest score.</ul>

						</p>
					</div>
					</div>
					
				</div>

				<div className="homepage-sections border rounded">
					<UserAnalytics/>
					{totalUsers.length > 0 ? (
						<div className="registered-users p-3 text-left">
							<h3 className="bg-dark rounded p-2 text-light text-left">Registered Users</h3>
							{totalUsers.slice(0, 7).map((user, index) => {
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
				</div>
			</div>
			{isAuthenticated ? (
				<div className="play-container mx-1">
					<Link to="/game">
						<button className="btn btn-secondary btn-lg mx-1">Play vs AI</button>
					</Link>
					<Link to="/multiplayer">
						<button className="btn btn-dark btn-lg">Play Online</button>
					</Link>
					<button
						className="btn btn-danger btn-lg mx-2"
						name="logout"
						onClick={(event) => buttonSelection(event)}>
						Logout
					</button>
				</div>
			) : (
				<div className="play-container mx-3">
					<Link to="/register">
						<button className="btn btn-light btn-lg mx-2">Register to Play</button>
					</Link>
					<Link to="/login">
						<button className="btn btn-dark btn-lg">Login to Play</button>
					</Link>
					
				</div>
			)}
		</Fragment>
	);
}

export default Home;

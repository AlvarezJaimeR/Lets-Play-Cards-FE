import React, { useState, useEffect, Fragment } from "react";
import "./screens.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAppContext } from "../../libs/contextLib";
import { useHistory } from "react-router-dom";
import ROOT_URL from '../../apiRoot';

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

				<div className="homepage-sections">
					<h1>👑 Let's Play Cards</h1>
					<div className="image-div">
						<img
							className="home-img"
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Kings_in_Deck_of_Cards.jpg/220px-Kings_in_Deck_of_Cards.jpg"
							alt="deck-of-cards"
						/>
					</div>
				</div>

				<div className="homepage-sections">
					{totalUsers.length > 0 ? (
						<div className="registered-users">
							<h3>Registered Users</h3>
							{totalUsers.map((user, index) => {
								return (
									<div key={index}>
										<p>{user.userName}</p>
									</div>
								);
							})}
						</div>
					) : (
						<div>
							<h2>Loading...</h2>
						</div>
					)}
				</div>
			</div>
			{isAuthenticated ? (
				<div className="play-container">
					<Link to="/game">
						<button className="btn btn-success">Lets play Vs AI</button>
					</Link>
					<Link to="/multiplayer">
						<button className="btn btn-dark">vs Online Player</button>
					</Link>
					<button
						className="btn btn-danger"
						name="logout"
						onClick={(event) => buttonSelection(event)}>
						Logout
					</button>
				</div>
			) : (
				<div className="play-container">
					<Link to="/register">
						<button className="btn btn-light">Register to Play</button>
					</Link>
					<Link to="/login">
						<button className="btn btn-dark">Login to Play</button>
					</Link>
					
				</div>
			)}
		</Fragment>
	);
}

export default Home;

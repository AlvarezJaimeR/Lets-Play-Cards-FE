import React, { useState, useEffect, Fragment } from "react";
import "./screens.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAppContext } from "../../libs/contextLib";
import { useHistory } from "react-router-dom";

import UserAnalytics from "../Analytics/UserAnalytics";

import { ROOT_URL } from "../../apiRoot";

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
      <div className="container">
  			<div className="home font-link row">
  				{/* Landing Page */}

  				<div className="col col-sm-12 col-lg-6">
            <div className="col-lg-12 col-sm-12 col-xs-12 homepage-sections first border rounded">
    					<h1 className="bg-dark rounded px-3 text-light  ">👑 Let's Play Cards - WAR 👑</h1>

    					<div className="rules-container rounded border text-left">
                <div className="trans-content">
      						<h2 className="text-center"><strong>WAR Game Rules:</strong></h2>
                  <ul>
                    <li>Each player will receive 26 cards, dealt one at a time.</li>
      						  <li>Each player turns up a card at the same time and the player with the higher card wins the round. </li>
      						  <li>If the card is the same value... each player will turn up the next card. If the turned-up cards are the same value again then each player will again turn up the next card. The player with the higher card value wins that round and receives a bonus score for each previous tie. </li>
      						  <li>The game ends after 26 rounds have been played. The winner of the game is the player who wins the most rounds and receives the highest score.</li>
                  </ul>

                </div>


    					</div>


    				</div>

            </div>

  				<div className="col col-sm-12 col-lg-6">
            <div className="col-lg-12 homepage-sections homepage-section-2 border rounded row col">
  					   <UserAnalytics props={totalUsers.data} />

            </div>

  				</div>
  			</div>
  			{isAuthenticated ? (
  				<div className="play-container mx-5 text-left">
  					<Link to="/game">
  						<button className="btn btn-secondary btn-lg mx-2 font-link"><strong>Play vs AI</strong></button>
  					</Link>

  					<button
  						className="btn btn-danger btn-lg mx-3 font-link"
  						name="logout"
  						onClick={(event) => buttonSelection(event)}>
  						Logout
  					</button>
  				</div>
  			) : (
  				<div className="play-container mx-0">
  					<Link to="/register">
  						<button className="btn btn-light btn-lg mx-0 font-link">Register to Play</button>
  					</Link>
  					<Link to="/login">
  						<button className="btn btn-dark btn-lg font-link">Login to Play</button>
  					</Link>

  				</div>
  			)}

      </div>

		</Fragment>
	);
}

export default Home;

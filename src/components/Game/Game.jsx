import React, { useState, useEffect } from "react";
import "./game.css";
import axios from "axios";
import { useAppContext } from "../../libs/contextLib";
import { useHistory } from "react-router-dom";
import {ROOT_URL} from '../../apiRoot';

const Game = () => {
	const { isAuthenticated, userHasAuthenticated } = useAppContext();
	const { loggedInUser, setLoggedInUser } = useAppContext();
	const history = useHistory();

	const [deckGrab, setDeckGrab] = useState(null);
	const [cardRemains, setCardRemains] = useState(52);

	const [cardOneDraw, setCardOneDraw] = useState(null);
	const [cardOneImage, setCardOneImage] = useState(null);
	const [cardOneValue, setCardOneValue] = useState(null);

	const [cardTwoDraw, setCardTwoDraw] = useState(null);
	const [cardTwoImage, setCardTwoImage] = useState(null);
	const [cardTwoValue, setCardTwoValue] = useState(null);

	const [playerOneScore, setPlayerOneScore] = useState(0);
	const [playerTwoScore, setPlayerTwoScore] = useState(0);

  console.log(loggedInUser);
  console.log(loggedInUser);

	useEffect(() => {
		async function grab() {
			await axios
				.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
				.then((response) => {
					setDeckGrab(response.data);

					return response;
				});
		}
		grab();
	}, []);

	// To Quit Game
	function buttonSelection(event) {
		switch (event.target.name) {
			case "logout":
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

	function scoreCompare() {
		console.log(cardOneValue);
		console.log(cardTwoValue);

		if (parseInt(cardOneValue, 10) > parseInt(cardTwoValue, 10)) {
			setPlayerOneScore(playerOneScore + 1);
		} else if (parseInt(cardTwoValue, 10) > parseInt(cardOneValue, 10)) {
			setPlayerTwoScore(playerTwoScore + 1);
		}
	}

	function resultButton() {
		if (playerOneScore > playerTwoScore) {
			axios.put(`${ROOT_URL}api/users/${loggedInUser._id}/win`);
      alert(`${loggedInUser.userName} Won`)
		} else {
			axios.put(`${ROOT_URL}api/users/${loggedInUser._id}/lose`);
      alert('AI won')

		}
	}

	async function drawOne() {
		await axios
			.get(
				`https://deckofcardsapi.com/api/deck/${deckGrab.deck_id}/draw/?count=2`
			)
			.then((response) => {
				console.log(response.data);
				setCardOneDraw(response.data.cards[0].code);
				setCardOneImage(response.data.cards[0].image);

				setCardTwoDraw(response.data.cards[1].code);
				setCardTwoImage(response.data.cards[1].image);

				if (response.data.cards[0].value === "JACK") {
					setCardOneValue("11");
				} else if (response.data.cards[0].value === "QUEEN") {
					setCardOneValue("12");
				} else if (response.data.cards[0].value === "KING") {
					setCardOneValue("13");
				} else if (response.data.cards[0].value === "ACE") {
					setCardOneValue("14");
				} else {
					setCardOneValue(response.data.cards[0].value);
				}

				if (response.data.cards[1].value === "JACK") {
					setCardTwoValue("11");
				} else if (response.data.cards[1].value === "QUEEN") {
					setCardTwoValue("12");
				} else if (response.data.cards[1].value === "KING") {
					setCardTwoValue("13");
				} else if (response.data.cards[1].value === "ACE") {
					setCardTwoValue("14");
				} else {
					setCardTwoValue(response.data.cards[1].value);
				}

				setCardRemains(response.data.remaining);
			})
			.then(() => {})
			.then(() => {
				scoreCompare();
			});
	}

	return deckGrab ? (
		<div>
			<div className="game-details-container border rounded">
				<div className="btn btn-block">
					<strong> Deck ID:</strong> {deckGrab.deck_id}
				</div>

				<div className="btn btn-block">
					<strong>Cards remaining:</strong> {cardRemains}
				</div>
				<button
					className="btn btn-danger"
					name="logout"
					onClick={(event) => buttonSelection(event)}>
					Quit Game
				</button>
			</div>

			<div className="game-container">
				<div className="d-flex card-sections border rounded">
					<h1 className="bg-dark rounded p-2 text-light">Player 1: {loggedInUser.userName}</h1>
					<h2>Score: {playerOneScore}</h2>
					<img className="card card1" src={cardOneImage} alt="" />

				</div>
				<div className="d-flex card-sections border rounded">
					<h1 className="bg-dark rounded p-2 text-light px-5">AI</h1>
					<h2>Score: {playerTwoScore}</h2>
					<img className="card card2" src={cardTwoImage} alt="" />


				</div>
			</div>

			{cardRemains > 0 || null ? (
				<div className="draw-button text-center">
					<button
						onClick={drawOne}
						variant="primary"
						className="btn btn-dark btn-lg">
						Draw
					</button>
				</div>
			) : (
				<div className="result-button">
					<button onClick={resultButton} className="btn btn-success">
						Result!
					</button>
				</div>
			)}
		</div>
	) : (
		<div>
			<div>Loading...</div>
		</div>
	);
};

export default Game;

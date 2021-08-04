import React, { useState, useEffect } from "react";
import "./game.css";
import axios from "axios";
import { useAppContext } from "../../libs/contextLib";
import { useHistory } from "react-router-dom";
import { ROOT_URL } from "../../apiRoot";
import { useTransition, animated } from 'react-spring';

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

	const [playerTieCounter, setPlayerTieCounter] = useState(0);
	const [resultsShown, setResultsShown] = useState(false);

  const transitionOne = useTransition([cardOneImage], item => item, {
    from: { opacity: 0, marginLeft: -100, marginRight: 100 },
    enter: { opacity: 1, marginLeft: 0, marginRight: 0 },
    leave: { opacity: 0, transform: 'translate3d(0,-40px,0)', width: '0px', height: "0px" },
    config: { duration: 1000 }
  });

  const transitionTwo = useTransition([cardTwoImage], item => item, {
    from: { opacity: 0, marginLeft: -100, marginRight: 100 },
    enter: { opacity: 1, marginLeft: 0, marginRight: 0  },
    leave: { opacity: 0, transform: 'translate3d(0,-40px,0)', width: '0px', height: "0px" },
    config: { duration: 1000 }
  });

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
			case "calculate":
				scoreCompare();
				return setResultsShown(true);
      case "again":
        try {
        window.location.reload();
        } catch (err) {
          console.log(err);
        }
      case "quit":
        try {
        history.push("/home");
        } catch (err) {
          console.log(err);
        }
		}
	}

	function scoreCompare() {
		//console.log(cardOneValue);
		//console.log(cardTwoValue);

		if (parseInt(cardOneValue, 10) > parseInt(cardTwoValue, 10)) {
			setPlayerOneScore(playerOneScore + 1 + playerTieCounter);
			setPlayerTieCounter(0);
			//console.log("Player One wins!");
		} else if (parseInt(cardTwoValue, 10) > parseInt(cardOneValue, 10)) {
			setPlayerTwoScore(playerTwoScore + 1 + playerTieCounter);
			setPlayerTieCounter(0);
			//console.log("Player Two wins!");
		} else if (parseInt(cardOneValue, 10) === parseInt(cardTwoValue, 10)) {
			setPlayerTieCounter(playerTieCounter + 1);
			alert(
				"You tied... Let's hope you win the next one to get an extra point!"
			);
			//console.log("This is a tie.");
		}
	}

	function resultButton() {
		if (playerOneScore > playerTwoScore) {
			axios.put(`${ROOT_URL}api/users/${loggedInUser._id}/win`);
			alert(`${loggedInUser.userName} Won!!`);
		} else if (playerOneScore === playerTwoScore) {
			axios.put(`${ROOT_URL}api/users/${loggedInUser._id}/tie`);
			alert("You tied against the AI. Better luck next time!");
		} else {
			axios.put(`${ROOT_URL}api/users/${loggedInUser._id}/lose`);
			alert("AI won :(");
		}
	}

	async function drawOne() {
		await axios
			.get(
				`https://deckofcardsapi.com/api/deck/${deckGrab.deck_id}/draw/?count=2`
			)
			.then((response) => {
				//console.log(response.data);
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
          className="btn btn-warning mx-3"
          name="quit"
          onClick={(event) => buttonSelection(event)}>
          Quit Game
        </button>
				<button
					className="btn btn-danger"
					name="logout"
					onClick={(event) => buttonSelection(event)}>
					Log Out
				</button>

			</div>

			<div className="game-container">
				<div className="d-flex card-sections border rounded">
					<h1 className="bg-dark rounded p-2 text-light">
						Player 1: {loggedInUser.userName}
					</h1>
					<h2>Score: {playerOneScore}</h2>

          { cardOneImage !== null ? (
            transitionOne.map(({item, props}) => (
              <animated.div>
                <animated.img className="" src={item} style={props} alt="" />
              </animated.div>

            ))) :
            <img className="card card1" alt="" />

          }


				</div>
				<div className="d-flex card-sections border rounded">
					<h1 className="bg-dark rounded p-2 text-light px-5">AI</h1>
					<h2>Score: {playerTwoScore}</h2>
          { cardTwoImage !== null ? (
            transitionTwo.map(({item, props}) => (
              <animated.div>
                <animated.img className="" src={item} style={props} alt="" />
              </animated.div>

            ))) :
            <img className="card card2" alt="" />

          }
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
			) : resultsShown == false ? (
				<div className="result-button">
					<button
						name="calculate"
						onClick={(event) => buttonSelection(event)}
						className="btn btn-danger">
						Calculate Results
					</button>
				</div>
			) : (
				<div className="text-center mt-3">
					<button onClick={resultButton} className="btn btn-lg btn-light text-dark d-inline mx-2">
						Outcome
					</button>
          <button
            name="again"
            onClick={(event) => buttonSelection(event)}
            className="btn btn-lg btn-success d-inline">
            Play Again
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

import React, { useState, useEffect } from 'react';
import './game.css';
import axios from "axios";
import { Link } from "react-router-dom";
import { useAppContext } from "../../libs/contextLib";
import { useHistory } from "react-router-dom";

const Game = () =>
{
  const { isAuthenticated, userHasAuthenticated } = useAppContext();
	const history = useHistory();

  const [deckGrab, setDeckGrab] = useState(null);
  const [cardRemains, setCardRemains] = useState(null);

  const [cardOneDraw, setCardOneDraw] = useState(null);
  const [cardOneImage, setCardOneImage] = useState(null);

  const [cardTwoDraw, setCardTwoDraw] = useState(null);
  const [cardTwoImage, setCardTwoImage] = useState(null);

  useEffect(() => {

    async function grab() {
      let response = await axios.get(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
      )
        .then(response => {
          setDeckGrab(response.data);

          return response
        })

    };
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
          
          history.push("/home")
				} catch (err) {
					console.log(err);
				}
				break;
		}
	}


  async function drawOne() {
    let response = await axios.get(
      `https://deckofcardsapi.com/api/deck/${deckGrab.deck_id}/draw/?count=2`
    )
      .then(response => {
        console.log(response.data);
        setCardOneDraw(response.data.cards[0].code);
        setCardOneImage(response.data.cards[0].image);

        setCardTwoDraw(response.data.cards[1].code);
        setCardTwoImage(response.data.cards[1].image);


        setCardRemains(response.data.remaining)
      })
  }



  return (
    deckGrab ? (
      <div>
        <div className="game-details-container">
          <div className="btn btn-block">
            <strong> Deck ID:</strong>  {deckGrab.deck_id}
          </div>
          <div className="btn btn-block">
            <strong>Shuffled ?</strong> {deckGrab.shuffled ? "Yes" : "No"}
          </div>
          <div className="btn btn-block">
            <strong>Cards remaining:</strong> {cardRemains}
          </div>
          <button
						className="btn btn-block btn-sm"
						name="logout"
						onClick={(event) => buttonSelection(event)}>
						⛔ Quit Game ⛔ 
					</button>
        </div>
     

        <div className="game-container">

        <div className="d-flex card-sections">
          <strong>Player 1</strong>
          <img className="card card1" src={cardOneImage} alt="" />

          <div style={{marginTop: "20px", fontWeight: "bold"}}>
            Card? {cardOneDraw}
          </div>

        </div>
        <div className="d-flex card-sections">
          <strong>AI</strong>
          <img  className="card card2" src={cardTwoImage} alt="" />

          <div style={{marginTop: "20px", fontWeight: "bold"}}>
            Card? {cardTwoDraw}
          </div>

        </div>

      </div>

        <div className="draw-button">
          <button onClick={drawOne} variant="primary" className="btn btn-primary">
        Draw
      </button>
</div>
      


    </div>
    ) : (
      <div>
        <div>
          Loading...
        </div>
      </div>
    )
  );
};

export default Game;

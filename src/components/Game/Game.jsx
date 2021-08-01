import React, { useState, useEffect } from 'react';
import './game.css';
import axios from "axios";

const Game = () => {

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
      <div>
        Deck ID: {deckGrab.deck_id}
      </div>

      <div>
        Shuffled? {deckGrab.shuffled ? "Yes" : "No"}
      </div>

      <div>
        Cards remaining: {cardRemains}
      </div>

      <div className="d-flex">

        <div className="d-flex">
          <h1>Player 1</h1>
          <img src={cardOneImage} alt="" />

          <div style={{marginTop: "20px", fontWeight: "bold"}}>
            Card? {cardOneDraw}
          </div>

        </div>
        <div className="d-flex">
          <h1>Player 2</h1>
          <img src={cardTwoImage} alt="" />

          <div style={{marginTop: "20px", fontWeight: "bold"}}>
            Card? {cardTwoDraw}
          </div>

        </div>

      </div>


      <button onClick={drawOne} variant="primary">
        Draw
      </button>


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

import React, { useState, useEffect } from 'react';
import './game.css';
import axios from "axios";

const Game = () => {

  const [cardGrab, setCardGrab] = useState(null);
  const [cardDraw, setCardDraw] = useState(null);

  useEffect(() => {

    async function grab() {
      let response = await axios.get(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
      )
        .then(response => {
          setCardGrab(response.data);

          return response
        })
        .then(response => axios.get(`https://deckofcardsapi.com/api/deck/${response.data.deck_id}/draw/?count=1`))
        .then(response => {

          setCardDraw(response.data.cards[0].code);
        })
        .then(response => {
          console.log(cardDraw);
        })



    };
    grab();

  }, [setCardDraw, setCardDraw]);

  async function drawOne() {
    let response = await axios.get(
      `https://deckofcardsapi.com/api/deck/${cardGrab.deck_id}/draw/?count=1`
    )
      .then(response => {
        setCardDraw(response.data.cards[0].code);
      })
  }

  return (
    cardGrab && cardDraw ? (
    <div>
      <div>
        Deck ID: {cardGrab.deck_id}
      </div>
      <div>
        Cards remaining: {cardGrab.remaining}
      </div>
      <div>
        Shuffled? {cardGrab.shuffled ? "Yes" : "No"}
      </div>

      <div style={{marginTop: "20px", fontWeight: "bold"}}>
        Card? {cardDraw}
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

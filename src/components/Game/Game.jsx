import React, { useState, useEffect } from 'react';
import './game.css';
import axios from "axios";

const Game = () => {

  const [deckGrab, setDeckGrab] = useState(null);
  const [cardDraw, setCardDraw] = useState(null);
  const [cardRemains, setCardRemains] = useState(null);
  const [cardImage, setCardImage] = useState(null);

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
      `https://deckofcardsapi.com/api/deck/${deckGrab.deck_id}/draw/?count=1`
    )
      .then(response => {
        console.log(response.data);
        setCardDraw(response.data.cards[0].code);
        setCardImage(response.data.cards[0].image);
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
        <div>
          Cards remaining: {cardRemains}
        </div>

        <img src={cardImage} alt="" />

        <div style={{marginTop: "20px", fontWeight: "bold"}}>
          Card? {cardDraw}
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

document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){
  const url = "https://deckofcardsapi.com/api/deck/new/draw/?count=2"

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        document.getElementById("img1").src = data.cards[0].images.png
        document.getElementById("img2").src = data.cards[1].images.png

        // Problem:
        // The "value" property of the cards array goes from 1-10, but then it goes KING, JACK, QUEEN, ACE, and probably JOKER.
        // I need to find a workaround on this, so perhaps I could give a numeric number to each of these cards and have my playerVsBotCardFlip take that logic in and apply it when necessary.

        let playerCardValueProperty = data.cards[0].value;
        let botCardValueProperty = data.cards[1].value; 

        function cardLogic() {
          if (playerCardValueProperty == Number() || botCardValueProperty == Number()) {
            
          } else if (playerCardValueProperty === "QUEEN" || botCardValueProperty === "QUEEN") {
            return 12;
          } else if (playerCardValueProperty === "KING" || botCardValueProperty === "KING") {
            return 13;
          } else if (playerCardValueProperty === "ACE" || botCardValueProperty === "ACE") {
            return 1;
          } else if (playerCardValueProperty === "JACK" || botCardValueProperty === "JACK") {
            return 11;
          }
        }

        function playerVsBotCardFlip() {
          let playerCard = Number(data.cards[0].value);
          let botCard = Number(data.cards[1].value);
        
          if (playerCard > botCard) {
            console.log("player takes both cards and places them on the bottom of their pile")
          } else if (playerCard < botCard) {
            console.log("bot takes both cards and places them on the bottom of their pile")
          } else if (playerCard === botCard) {
            console.log("warTime()");
          } else {
            console.log("An error has ocurred.")
          }
        }        
        playerVsBotCardFlip()

      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

// Pseudocode dis bitch
// Okay, War is a card game where two players take a card out and put it in front of them. The one with the higher value card wins and takes both their own card and their opponents. If both players present a card that has the same value as their opponents, then WAR happens:



// If WAR happens, each player puts three cards face down, and then places a final card face up. The player with the highest value card takes all the cards and puts them on the bottom of their pile. If there is a stalemate again, then WAR repeats until one of the cards is higher than the other, in which case the winner takes them all.

function warTime() {
  // player & bot draw three cards each
  if (playerCard > botCard) {
    "player takes all eight cards and places them on the bottom of their pile"
  } else if (playerCard < botCard) {
    "bot takes all eight cards and places them on the bottom of their pile"
  } else if (playerCard === botCard) {
    warTime();
  } else if (playerPile === 0 || botPile === 0){
    "player / bot loses"
  } else {
    console.log("An error has ocurred.")
  } 
}

// The winner of the game is decided when all of the cards of one side are owned by either the bot or the player.

// Notes
// There should be one deck, which is divided in two between the Player and the Computer.
// Player and Computer have one pile of cards each, which is where they draw cards from and where they place their earned cards on the bottom.
// In the alt value of the images of Player and Computer, it should display the value of each card as in: `{number} of  {card type}` (for example: "Six of Clubs") 
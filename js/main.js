// How to Play WAR?
// Okay, War is a card game where two players take a card out and put it in front of them. The one with the higher value card wins and takes both their own card and their opponents. If both players present a card that has the same value as their opponents, then WAR happens:

// If WAR happens, each player puts three cards face down, and then places a final card face up. The player with the highest value card takes all the cards and puts them on the bottom of their pile. If there is a stalemate again, then WAR repeats until one of the cards is higher than the other, in which case the winner takes them all.

// The winner of the game is decided when all of the cards of one side are owned by either the bot or the player.

// Notes
  // There should be one deck, which is divided in two between the Player and the Computer.
  // Player and Computer have one pile of cards each, which is where they draw cards from and where they place their earned cards on the bottom.
  // In the alt value of the images of Player and Computer, it should display the value of each card as in: `{number} of  {card type}` (for example: "Six of Clubs") 


// To-do list:
// TODO Develop warTime()
// TODO Work on a simple design for the application
// TODO Hide the start-button and alt images and set it to only appear after the deck-button has been clicked on
// TODO Modify the images alt value to reflect the card being shown at the time
// TODO Unhide the deck-button once the remaining property gets the value of 0
// TODO Break the app to see how to solve unusual situations (if a player runs out of cards while in the middle of WAR, for example)



// On page load
let deckId = "";

// Adds event listener to deck-button, executes splitTheDeck
document.getElementById("deck-button").addEventListener("click", splitTheDeck)

// Saves the deckId into local storage - user will be able to resume the simulation from where they left it.
function splitTheDeck() {
  fetch("https://deckofcardsapi.com/api/deck/new/")
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        deckId = data.deck_id
        localStorage.setItem("deckId", deckId)
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
    }

// Adds event listener to start-button, executes drawTwoCards
document.getElementById("start-button").addEventListener('click', drawTwoCards)

function drawTwoCards(){
  const url = `https://deckofcardsapi.com/api/deck/${localStorage.deckId}/draw/?count=2`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)

        // Gets card images and displays them on the DOM
        document.getElementById("img1").src = data.cards[0].images.png
        document.getElementById("img2").src = data.cards[1].images.png

        // Allows the numeric comparison of the value of the cards and saves it to the following variables for later use in comparison statements.
        let playerCard = cardLogic(data.cards[0].value);
        let botCard = cardLogic(data.cards[1].value);

        function cardLogic(value) {
          if (value === "JACK") {
            return 11;
          } else if (value === "QUEEN") {
            return 12;
          } else if (value === "KING") {
            return 13;
          } else if (value === "ACE") {
            return 14;
          } else {
            return Number(value)
          }
        }

        // Compares the numeric value of the cards. If the numberic value of both is the same, it triggers the warTime() function.
        function playerVsBotCardFlip() {
        
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
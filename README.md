# fend2

# Memory Game Project

## Game Instructions

The game board has sixteen cards, there are eight different pairs of cards.
Each card has a symbol that can be matched with another card's symbol.

##### Opening Cards

When you open any card, you must open another card to check if it has the same symbol of the first opened card.

You can't choose three cards at the same time.

##### Matching Condition

If the two opened cards have the same symbol, they will remain open.

##### Un-matching Condition

If the two opened cards are different, they will be flipped over.

##### The Number of Moves

Opening two cards will increase the number of moves by one.

##### Stars Rating

If you have reached fifteen moves, twenty moves, twenty five moves or thirteen moves, the star rating will decrease by one star for each of these number of moves.

##### Time Counter

The time counter will start when you press anywhere on the game board _(the deck)_ for the first time.

##### **Winning Condition**

If you have matched between all the eight pairs of cards, and all cards have been opened correctly, then you have won the game and a popup modal will appear to you indicating the time, the number of moves and the star rating that you have gained in that particular game.

##### Restart Game

You can restart the game by pressing the restart button.

##### Replay

You can restart the game after winning the previous one by clicking the **Play Again** button on the popup modal.

##### Closing Modal

You can press anywhere on the window except for the modal itself to close the modal window, or you can click on the close button.

## JS Functions (app.js)

**createLi** : creating li element with attribute data-info

**createI** : creating i element

**createAllCards** : creating cards and adding them to deck

**setCounter** : time counter function

**pad** : converting time to string

**restartGame** : restart game function

**flip(eve)** : flip function to flip cards when any click happend on them

**checkMatch** : checkMatch function to check the matching between cards

**removeStars** : removeStars function to remove stars based on the number of moves

**startListen** : startListen function to start listening to the click events

## Resources

[Shuffle function](http://stackoverflow.com/a/2450976)

[Count up timer](https://stackoverflow.com/a/5517836)

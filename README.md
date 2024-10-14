# Twenty One
## By: Maya Dahlke
This is the game 21, done in **React.js** and **Tailwind**. 

To play 21, with two players, you can follow these rules:  
- **Dealing**: The dealer gives each player two cards face up, and one card face down.  
- **Goal**: Players try to get closer to 21 without going over.  
- **Play**: Players can choose to "hit" or "stand" after receiving their first two cards. "Hitting" means asking for another card, while "standing" means keeping the current hand.  
- **Point values**: Jacks, Queens, Kings, and 10s are worth 10, while Aces can be counted as 1 or 11. All other cards are worth face value.  
- **Busting**: If a player's hand goes over 21, they "bust" and lose.  
- **Ties**: If both the player and dealer have hands that are tied, the game is a "push".  

## Want to play?
1) Clone this repository.
2) In terminal, cd into the folder `twenty-one-game-react/twenty-one`.
3) Run `npm run start`.
4) This should take you to `http://localhost:3000/` where you can try out the game.

## Possible Improvements
 - In the original game players place chips as a bet, so I could add chips and keep score of the chip value amount of the player.
 - The original game also has "splitting" and "doubling down", so if chips were added I could add this as well.
 - I could add other players to make it multiplayer.

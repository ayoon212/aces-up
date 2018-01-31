import React from "react";
import {
  StyleSheet,
  Text,
  View
} from "react-native";
import {Button} from "react-native-elements";
import PlayingCard from "../PlayingCard";
import Deck from "../Deck";
import {deck} from "../Deck/deck";

/*
 * State init
 */
const defaultState = {
  score: 0,
  numCards: 52
};

// Returns a copy of the deck array
function copyDeck() {
  const copy = [];
  deck.map(card => copy.push(card));
  return copy;
}
function getDefaultState() {
  const deckCopy = copyDeck();
  const newState = Object.assign({}, defaultState);
  newState.tableaus = new Array([],[],[],[]);
  newState.cardsRemaining = deckCopy;
  return newState;
}

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = getDefaultState();
    this.tryDiscard = this.tryDiscard.bind(this);
    this.resetCards = this.resetCards.bind(this);
    this.dealCards = this.dealCards.bind(this);
  }

  /*
   * Gameplay
   */
  tryDiscard(card, index) {
    this.state.tableaus.some((tableau, i) => {
      if (index === i || tableau.length === 0) {
        return false;
      }

      const compare = tableau[tableau.length-1];
      if (card.suit === compare.suit && card.value !== 1 &&
          (card.value <= compare.value || compare.value === 1)) {
        // Discard this card from pile; Aces high and can't be discarded
        this.setState((previousState) => {
          previousState.tableaus[index].pop();
          return previousState;
        });
        return true;
      }
    });
  }

  resetCards() {
    this.setState(getDefaultState());
  }

  dealCards() {
    this.setState((previousState) => {
      const prevNumCards = previousState.numCards;
      if (prevNumCards < 4) {
        return ({
          numCards: 0
        });
      } else {
        // Pull out 4 random cards and update state
        const cards = previousState.cardsRemaining;
        const tableaus = previousState.tableaus;
        let toDeal = [], index = 0;
        for (let i = prevNumCards-1; i > prevNumCards-5; i--) {
          index = Math.floor(Math.random()*i);
          toDeal = toDeal.concat(cards.splice(index,1));
        }
        for (let i = 0; i < 4; i++) {
          tableaus[i].push(toDeal[i]);
        }
        
        return ({
          numCards: prevNumCards - 4,
          cardsRemaining: cards,
          tableaus: tableaus
        });
      }
    });
  }

  /*
   * Render
   */
  render() {
    let tableaus = <Text>Nothing on tableaus yet.</Text>;
    if (this.state.tableaus.length > 0) {
      tableaus = this.state.tableaus.map((tableau, index) => {
        if (tableau && tableau.length > 0) {
          const topCard = tableau[tableau.length-1];
          return (
            <View key={topCard.suit+topCard.value}>
              <PlayingCard
                content={topCard}
                onPress={() => this.tryDiscard(topCard, index)}
              />
              <Text>Stack: {tableau.length}</Text>
            </View>
          );
        } else {
          return (
            <View key={"empty"+index}>
              <PlayingCard />
              <Text>Stack: 0</Text>
            </View>
          );
        }
      });
    }

    /* Debug info for the cards left in deck
     * TODO: Remove this
    let cardsRemaining = "No cards remaining.";
    if (this.state.cardsRemaining.length > 0) {
      cardsRemaining = this.state.cardsRemaining.reduce((acc, nextCard) => {
        const nextString = `${nextCard.value} ${nextCard.suit}, `;
        if (acc.hasOwnProperty("suit")) {
          return `${acc.value} ${acc.suit}, ` + nextString;
        } else {
          return acc + nextString;
        }
      });
    }*/

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Deck numCards={this.state.numCards} dealCards={this.dealCards} />
          <Button
            buttonStyle={styles.button}
            raised
            title="Reset"
            onPress={this.resetCards}
          />
        </View>
        <View style={styles.tableaus}>{tableaus}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 30
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  button: {
    backgroundColor: "#5E35B1",
    flex: 1
  },
  tableaus: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20
  }
});

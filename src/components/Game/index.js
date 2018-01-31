import React from "react";
import {
  StyleSheet,
  Text,
  View
} from "react-native";
import {Button} from "react-native-elements";
import Deck from "../Deck";
import {deck} from "../Deck/deck";

const defaultState = {
  score: 0,
  tableaus: [],
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
  newState.cardsRemaining = deckCopy;
  return newState;
}

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = getDefaultState();
    this.dealCards = this.dealCards.bind(this);
    this.resetCards = this.resetCards.bind(this);
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
        let toDeal = [], index = 0;
        for (let i = prevNumCards-1; i > prevNumCards-5; i--) {
          index = Math.floor(Math.random()*i);
          toDeal = toDeal.concat(cards.splice(index,1));
        }
        
        return ({
          numCards: prevNumCards - 4,
          cardsRemaining: cards,
          tableaus: toDeal
        });
      }
    });
  }

  render() {
    let tableaus = <Text>Nothing on tableaus yet.</Text>;
    if (this.state.tableaus.length > 0) {
      tableaus = this.state.tableaus.map((tableau) => {
        if (tableau) {
          return <Text key={tableau.suit+tableau.value}>{tableau.value} of {tableau.suit}</Text>;
        } else {
          return null;
        }
      });
    }
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
    }

    return (
      <View style={styles.container}>
        <Deck numCards={this.state.numCards} dealCards={this.dealCards} />
        <View>
          <Text>{cardsRemaining}</Text>
          <Text>Tableaus:</Text>
          {tableaus}
        </View>
        <Button
          buttonStyle={styles.button}
          raised
          title="Reset"
          onPress={this.resetCards}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 30
  },
  button: {
    backgroundColor: "#5E35B1"
  }
});

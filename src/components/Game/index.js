import React from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View
} from "react-native";
import {Button} from "react-native-elements";
import Tableau from "../Tableau";
import Deck from "../Deck";
import {deck} from "../Deck/deck";
import {getLastElement} from "../../util";

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
    this.canDiscard = this.canDiscard.bind(this);
    this.tryDiscard = this.tryDiscard.bind(this);
    this.canMove = this.canMove.bind(this);
    this.tryMove = this.tryMove.bind(this);
    this.tryAction = this.tryAction.bind(this);
    this.resetCards = this.resetCards.bind(this);
    this.dealCards = this.dealCards.bind(this);
  }

  /*
   * Gameplay
   */
  componentDidUpdate() {
    // Check win or loss conditions
    if (this.state.numCards === 0) {
      let comp = null;
      const loss = this.state.tableaus.reduce((acc, tableau, index) => {
        return acc && !this.canDiscard(getLastElement(tableau), index);
      }, true);
      if (loss) {
        Alert.alert("No more moves! You lose.");
      }

      const win = this.state.tableaus.reduce((acc, tableau) => {
        if (acc.hasOwnProperty("length")) {
          comp = acc;
        } else {
          comp = tableau;
        }
        return acc && (getLastElement(comp).value === 1);
      });

      if (win) {
        Alert.alert("You win!");
      }
    }
  }

  canDiscard(card, index) {
    if (!card) {
      return false;
    }
    // Can discard if there exists a higher card of same suit
    for (let i = 0; i < this.state.tableaus.length; i++) {
      const tableau = this.state.tableaus[i];
      if (index === i || tableau.length === 0) {
        continue;
      }

      const compare = getLastElement(tableau);
      if (card.suit === compare.suit && card.value !== 1 &&
          (card.value <= compare.value || compare.value === 1)) {
        // This card can be discarded; Aces high and can't be discarded
        return true;
      }
    }
    return false;
  }

  tryDiscard(card, index) {
    if (this.canDiscard(card, index)) {
      // Discard this card from pile
      this.setState((previousState) => {
        previousState.tableaus[index].pop();
        previousState.score += 1;
        return previousState;
      });
      return true;
    }
    return false;
  }

  canMove(card, index) {
    // Can move if there is an empty pile
    for (let i = 0; i < this.state.tableaus.length; i++) {
      const tableau = this.state.tableaus[i];
      if (index === i) {
        continue;
      }

      if (tableau.length === 0) {
        // Add 1 to i so we don't return 0, a falsey value
        return i+1;
      }
    }
    return 0;
  }

  tryMove(card, index) {
    const emptyPile = this.canMove(card, index);
    if (emptyPile) {
      // Move this card
      this.setState((previousState) => {
        const toMove = previousState.tableaus[index].pop();
        previousState.tableaus[emptyPile-1].push(toMove);
        return previousState;
      });
      return true;
    }
    return false;
  }

  tryAction(card, index) {
    if (!this.tryDiscard(card, index)) {
      this.tryMove(card, index);
    }
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
          const topCard = getLastElement(tableau);
          return (
            <Tableau
              key={topCard.suit+topCard.value}
              cards={tableau}
              onPress={() => this.tryAction(topCard, index)}
            />
          );
        } else {
          return <Tableau key={"empty"+index} />;
        }
      });
    }

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Deck numCards={this.state.numCards} dealCards={this.dealCards} />
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>Score: {this.state.score}</Text>
            <Button
              buttonStyle={styles.button}
              raised
              title="Reset"
              onPress={this.resetCards}
            />
          </View>
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
  scoreContainer: {
    flex: 1,
    marginLeft: 20
  },
  scoreText: {
    textAlign: "right",
    fontSize: 24,
    marginRight: 16,
    marginBottom: 20
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  button: {
    backgroundColor: "#3F51B5"
  },
  tableaus: {
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20
  }
});

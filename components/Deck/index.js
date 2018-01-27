import React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  View
} from "react-native";
import {
  Button,
  Card
} from "react-native-elements";
import {deck} from "./deck";

const defaultState = {
  numCards: 52,
  cardsRemaining: deck
};

export default class Deck extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    this.onPress = this.onPress.bind(this);
    this.resetCards = this.resetCards.bind(this);
  }

  onPress() {
    this.setState((previousState) => {
      const prevNumCards = previousState.numCards;
      if (prevNumCards <= 4) {
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
        this.props.dealCards(toDeal);
        
        return ({
          numCards: prevNumCards - 4,
          cardsRemaining: cards
        });
      }
    });
  }

  resetCards() {
    this.setState(defaultState);
  }

  render() {
    const cardBack =
      <View style={styles.deckContainer}>
        <Card containerStyle={styles.deckContainer}>
          <Image style={styles.fullSize} source={require("./card-back.png")} />
        </Card>
      </View>;

    let platformTag;
    if (Platform.OS === "android") {
      platformTag = 
        <TouchableNativeFeedback
          onPress={this.onPress}
          background={TouchableNativeFeedback.SelectableBackground()}
          useForeground={true}>
          {cardBack}
        </TouchableNativeFeedback>;
    } else {
      platformTag =
        <TouchableHighlight onPress={this.onPress} underlayColor="white">
          {cardBack}
        </TouchableHighlight>;
    }

    return (
      <View>
        {platformTag}
        <Text style={styles.text}>Cards Left: {this.state.numCards}</Text>
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
  deckContainer: {
    height: 126,
    width: 90,
    padding: 0,
    margin: 0
  },
  fullSize: {
    height: "100%",
    width: "100%"
  },
  text: {
    fontSize: 12
  },
  button: {
    backgroundColor: "#5E35B1"
  }
});
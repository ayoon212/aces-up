import React from "react";
import {
  StyleSheet,
  Text,
  View
} from "react-native";
import PlayingCard from "../PlayingCard";
import {getLastElement} from "../../util";

export default class Tableau extends React.Component {
  render() {
    let stack = null;
    if (this.props.cards && this.props.cards.hasOwnProperty("length") && this.props.cards.length > 0) {
      stack = this.props.cards.map((card, index) => {
        return (
          <View
            key={card.suit+card.value}
            style={positionOnStack(index)}
          >
            <PlayingCard
              content={card}
              onPress={(index === this.props.cards.length-1) ? this.props.onPress : null}
            />
          </View>
        );
      });
    } else {
      stack = <View style={styles.emptyStack}><PlayingCard /></View>;
    }

    return (
      <View style={styles.tableau}>
        <Text>Stack: {this.props.cards ? this.props.cards.length : 0}</Text>
        <View style={styles.stack}>
          {stack}
        </View>
      </View>
    );
  }
}

function positionOnStack(index) {
  return {
    position: "absolute",
    top: 32*index
  };
}

const styles = StyleSheet.create({
  tableau: {
    flex: 1
  },
  stack: {
    position: "relative"
  },
  emptyStack: {
    // borderColor: "#add"
  }
});

import React from "react";
import {
  Text,
  View
} from "react-native";
import PlayingCard from "../PlayingCard";
import {getLastElement} from "../../util";

export default class Tableau extends React.Component {
  render() {
    /* TODO: Create component for each card
     * For now, we only show the last card
    const cards = this.props.cards.map((card) => {
      // Do stuff
    })
    */
    let cards = null;
    if (this.props.cards && this.props.cards.hasOwnProperty("length") && this.props.cards.length > 0) {
      const topCard = getLastElement(this.props.cards);
      cards = (
        <View>
          <PlayingCard
            content={topCard}
            onPress={this.props.onPress}
          />
          <Text>Stack: {this.props.cards.length}</Text>
        </View>
      );
    } else {
      cards = (
        <View>
          <PlayingCard />
          <Text>Stack: 0</Text>
        </View>
      );
    }

    return cards;
  }
}

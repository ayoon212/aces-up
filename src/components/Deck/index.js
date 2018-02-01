import React from "react";
import {Text,View} from "react-native";
import {Card} from "react-native-elements";
import PlayingCard from "../PlayingCard";

export default class Deck extends React.Component {
  render() {
    let card = null;
    if (this.props.numCards === 0) {
      card = <PlayingCard />;
    } else {
      card = <PlayingCard isFaceDown={true} onPress={this.props.dealCards} />;
    }
    return (
      <View>
        {card}
        <Text>Cards Left: {this.props.numCards}</Text>
      </View>
    );
  }
}

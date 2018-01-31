import React from "react";
import {Text,View} from "react-native";
import {Card} from "react-native-elements";
import PlayingCard from "../PlayingCard";

export default class Deck extends React.Component {
  render() {
    return (
      <View>
        <PlayingCard isFaceDown={true} onPress={this.props.dealCards} />
        <Text>Cards Left: {this.props.numCards}</Text>
      </View>
    );
  }
}

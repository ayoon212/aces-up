import React from "react";
import {
  Image,
  Platform,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  View
} from "react-native";
import {Card} from "react-native-elements";
import styles from "./styles";

function getSuitSymbol(suitStr) {
  if (suitStr === "spades") {
    return String.fromCharCode(0x2660);
  } else if (suitStr === "diamonds") {
    return String.fromCharCode(0x2666);
  } else if (suitStr === "clubs") {
    return String.fromCharCode(0x2663);
  } else if (suitStr === "hearts") {
    return String.fromCharCode(0x2665);
  } else {
    return "";
  }
}
function getDisplayValue(val) {
  if (val === 1) {
    return "A";
  } else if (val <= 10) {
    return val.toString();
  } else if (val === 11) {
    return "J";
  } else if (val === 12) {
    return "Q";
  } else if (val === 13) {
    return "K";
  }
}

export default class PlayingCard extends React.Component {
  render() {
    // Set card content
    let cardContent = null;
    if (this.props.isFaceDown) {
      cardContent = <Image style={styles.fullSize} source={require("./images/card-back.png")} />;
    } else if (this.props.content) {
      cardContent = <Text style={[styles.fullSize, styles.card]}>{getDisplayValue(this.props.content.value)}{getSuitSymbol(this.props.content.suit)}</Text>;
    }

    // Set touch feedback based on platform
    let platformTag;
    if (Platform.OS === "android") {
      platformTag = 
        <TouchableNativeFeedback
          onPress={this.props.onPress}
          background={TouchableNativeFeedback.SelectableBackground()}
          useForeground={true}>
          <View style={styles.fullSize}>
            {cardContent}
          </View>
        </TouchableNativeFeedback>;
    } else {
      platformTag =
        <TouchableHighlight onPress={this.props.onPress} underlayColor="white">
          <View style={styles.fullSize}>
            {cardContent}
          </View>
        </TouchableHighlight>;
    }

    return (
      <View style={styles.cardContainer}>
        <Card containerStyle={styles.cardContainer}>
          {platformTag}
        </Card>
      </View>
    );
  }
}
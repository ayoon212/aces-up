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
import {Card} from "react-native-elements";
import styles from "./styles";

export default class Deck extends React.Component {
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
          onPress={this.props.dealCards}
          background={TouchableNativeFeedback.SelectableBackground()}
          useForeground={true}>
          {cardBack}
        </TouchableNativeFeedback>;
    } else {
      platformTag =
        <TouchableHighlight onPress={this.props.dealCards} underlayColor="white">
          {cardBack}
        </TouchableHighlight>;
    }

    return (
      <View>
        {platformTag}
        <Text style={styles.text}>Cards Left: {this.props.numCards}</Text>
      </View>
    );
  }
}

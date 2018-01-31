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

export default class PlayingCard extends React.Component {
  render() {
    // Set card content
    let cardContent = null;
    if (this.props.isFaceDown) {
      cardContent = <Image style={styles.fullSize} source={require("./images/card-back.png")} />;
    } else if (this.props.content) {
      cardContent = <Text>`${this.props.content.value} of ${this.props.content.suit.toString()}`</Text>;
    }

    // Set touch feedback based on platform
    let platformTag;
    if (Platform.OS === "android") {
      platformTag = 
        <TouchableNativeFeedback
          onPress={this.props.onPress}
          background={TouchableNativeFeedback.SelectableBackground()}
          useForeground={true}>
          <View>
            {cardContent}
          </View>
        </TouchableNativeFeedback>;
    } else {
      platformTag =
        <TouchableHighlight onPress={this.props.onPress} underlayColor="white">
          <View>
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
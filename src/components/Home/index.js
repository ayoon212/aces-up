import React from "react";
import {
  StyleSheet,
  View
} from "react-native";
import Game from "../Game";

export default class Home extends React.Component {
  render() {
    return (
      <View>
        <Game />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30
  }
});

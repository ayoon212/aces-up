import React from "react";
import {
  StyleSheet,
  Text,
  View
} from "react-native";

import Deck from "../Deck";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableaus: []
    };
    this.dealCards = this.dealCards.bind(this);
  }

  dealCards(toDeal) {
    if (toDeal.hasOwnProperty("length") && toDeal.length === 4) {
      this.setState({
        tableaus: toDeal
      });
    }
  }

  render() {
    const tableaus = this.state.tableaus.map((tableau) => {
      if (tableau) {
        return <Text key={tableau.suit+tableau.value.toString()}>{tableau.value} of {tableau.suit}</Text>;
      } else {
        return null;
      }
    });

    return (
      <View style={styles.container}>
        <Deck dealCards={this.dealCards} />
        <View>
          <Text>tableaus go here.</Text>
          {tableaus}
        </View>
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

import React from "react";
import { StyleSheet, Text } from "react-native";

export default function RestaurantName() {
  return <Text style={styles.name}>Chef's Corner</Text>;
}

const styles = StyleSheet.create({
  name: {
    color: "#555",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});

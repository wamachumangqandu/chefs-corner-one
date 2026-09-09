import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type TopNavBarProps = {
  activeScreen: "Menu" | "AddDish" | "EditDish";
  onNavigate: (screen: "Menu" | "AddDish" | "EditDish") => void;
};

const navItems = [
  { key: "Menu" as const, label: "Menu", icon: "⌂" },
  { key: "AddDish" as const, label: "Add", icon: "+" },
  { key: "EditDish" as const, label: "Edit", icon: "✎" },
];

export default function TopNavBar({
  activeScreen,
  onNavigate,
}: TopNavBarProps) {
  return (
    <View style={styles.container}>
      {navItems.map((item) => {
        const isActive = activeScreen === item.key;

        return (
          <TouchableOpacity
            key={item.key}
            style={[styles.button, isActive && styles.activeButton]}
            onPress={() => onNavigate(item.key)}
            activeOpacity={0.85}
          >
            <Text style={[styles.icon, isActive && styles.activeText]}>
              {item.icon}
            </Text>
            <Text style={[styles.label, isActive && styles.activeText]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 14,
    borderTopWidth: 1,
    borderTopColor: "#e6e6e6",
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  activeButton: {
    backgroundColor: "#111",
  },
  icon: {
    color: "#222",
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 22,
    marginBottom: 2,
  },
  label: {
    color: "#222",
    fontSize: 10,
    fontWeight: "700",
  },
  activeText: {
    color: "#fff",
  },
});

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";

export type MenuItem = {
  id: number;
  name: string;
  brand: string;
  description: string;
  price: string;
  quantity: string;
  image: any;
};

export const initialDishes: MenuItem[] = [
  {
    id: 1,
    name: "Grilled Salmon",
    brand: "Main",
    description: "Salmon cooked over direct heat",
    price: "R 120.00",
    quantity: "Quantity: 01",
    image: require("../assets/grilledsamon.png"),
  },
  {
    id: 2,
    name: "Grilled Chicken",
    brand: "Main",
    description: "Chicken cooked over direct heat",
    price: "R160.00",
    quantity: "Quantity: 01",
    image: require("../assets/Grilled Chicken.png"),
  },
  {
    id: 3,
    name: "Beef Stew",
    brand: "Main",
    description: "Slow cooked with spices",
    price: "R110.00",
    quantity: "Quantity: 01",
    image: require("../assets/beef stew.png"),
  },
  {
    id: 4,
    name: "Inyama Yentloko",
    brand: "Main",
    description: "Cooked with peppers",
    price: "R90.00",
    quantity: "Quantity: 01",
    image: require("../assets/inyama yentloko.png"),
  },
];

type MenuScreenProps = {
  navigation: {
    navigate: (screen: string, payload?: any) => void;
  };
  dishes: MenuItem[];
};

export default function MenuScreen({ navigation, dishes }: MenuScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const visibleDishes = dishes.filter((item) => {
    if (!normalizedQuery) {
      return true;
    }

    return [item.name, item.brand, item.description]
      .join(" ")
      .toLowerCase()
      .includes(normalizedQuery);
  });

  return (
    <View style={styles.screen}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>Menu</Text>
      </View>

      <View style={styles.headerBar}>
        <Text style={styles.searchIcon}>⌕</Text>
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search Food Here"
          placeholderTextColor="#7a7a7a"
          style={styles.searchInput}
        />
        <Text style={styles.cartIcon}>◌</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        {visibleDishes.length === 0 ? (
          <Text style={styles.emptyText}>No dishes found</Text>
        ) : (
          visibleDishes.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate("EditDish", { dishId: item.id })
              }
            >
              <View style={styles.itemCard}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemLabel}>ITEMS</Text>
                  <Text style={styles.itemLabel}>DESCRIPTION</Text>
                  <Text style={styles.itemLabel}>PRICE</Text>
                </View>

                <View style={styles.itemRow}>
                  <Image
                    source={
                      typeof item.image === "string"
                        ? { uri: item.image }
                        : item.image
                    }
                    style={styles.itemImage}
                  />

                  <View style={styles.itemDetails}>
                    <Text style={styles.brand}>
                      Course:{" "}
                      {item.brand && item.brand !== "Brand"
                        ? item.brand
                        : "Main"}
                    </Text>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                  </View>

                  <Text style={styles.price}>{item.price}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 16,
    paddingTop: 0,
    paddingBottom: 12,
  },
  titleRow: {
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111",
  },
  searchIcon: {
    fontSize: 22,
    color: "#222",
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderRadius: 14,
    height: 42,
    fontSize: 16,
    color: "#000",
    paddingHorizontal: 8,
  },
  cartIcon: {
    fontSize: 24,
    marginLeft: 12,
    color: "#222",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 110,
  },
  emptyText: {
    color: "#666",
    fontSize: 15,
    textAlign: "center",
    paddingTop: 32,
  },
  itemCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  itemLabel: {
    fontSize: 10,
    color: "#8a8a8a",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemImage: {
    width: 64,
    height: 64,
    borderRadius: 10,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  brand: {
    fontSize: 11,
    color: "#666",
    marginBottom: 4,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#222",
    marginBottom: 4,
  },
  description: {
    fontSize: 11,
    color: "#555",
    marginBottom: 2,
  },
  quantity: {
    fontSize: 11,
    color: "#555",
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
    color: "#222",
    marginLeft: 8,
  },
});

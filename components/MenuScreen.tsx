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
import { formatPrice, getCourse, parsePrice, type Course } from "./menuUtils";
import RestaurantName from "./RestaurantName";

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
    brand: "Main Course",
    description: "Salmon cooked over direct heat",
    price: "R 120.00",
    quantity: "Quantity: 01",
    image: require("../assets/grilledsamon.png"),
  },
  {
    id: 2,
    name: "Grilled Chicken",
    brand: "Main Course",
    description: "Chicken cooked over direct heat",
    price: "R 160.00",
    quantity: "Quantity: 01",
    image: require("../assets/Grilled Chicken.png"),
  },
  {
    id: 3,
    name: "Beef Stew",
    brand: "Main Course",
    description: "Slow cooked with spices",
    price: "R110.00",
    quantity: "Quantity: 01",
    image: require("../assets/beef stew.png"),
  },
  {
    id: 4,
    name: "Inyama Yentloko",
    brand: "Main Course",
    description: "Cooked with peppers",
    price: "R90.00",
    quantity: "Quantity: 01",
    image: require("../assets/inyama yentloko.png"),
  },
  {
    id: 5,
    name: "Crab Croquettes",
    brand: "Starter",
    description: "Golden, crispy crab croquettes",
    price: "R 90.00",
    quantity: "Quantity: 01",
    image: require("../assets/Crab croquettes.png"),
  },
  {
    id: 6,
    name: "Peri-Peri Chicken Livers",
    brand: "Starter",
    description: "Chicken livers prepared peri-peri style",
    price: "R 110.00",
    quantity: "Quantity: 01",
    image: require("../assets/peri-peri-chicken-livers.png"),
  },
  {
    id: 7,
    name: "Biscoff Banana Pudding",
    brand: "Dessert",
    description: "Banana pudding with Biscoff",
    price: "R 115.00",
    quantity: "Quantity: 01",
    image: require("../assets/Biscoff-Banana-Pudding.jpg"),
  },
  {
    id: 8,
    name: "Greek Yogurt Dessert",
    brand: "Dessert",
    description: "A creamy Greek yogurt dessert",
    price: "R 90.00",
    quantity: "Quantity: 01",
    image: require("../assets/greek-yogurt-dessert.webp"),
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
  const [selectedCourse, setSelectedCourse] = useState<Course | "All">("All");
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const prices = dishes
    .map((item) => parsePrice(item.price))
    .filter((price): price is number => price !== null);
  const averagePrice =
    prices.length > 0
      ? formatPrice(
          prices.reduce((total, price) => total + price, 0) / prices.length,
        )
      : formatPrice(0);
  const visibleDishes = dishes.filter((item) => {
    const matchesSearch =
      !normalizedQuery ||
      [item.name, item.brand, item.description]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);
    const matchesCourse =
      selectedCourse === "All" || getCourse(item.brand) === selectedCourse;
    return matchesSearch && matchesCourse;
  });
  const hasActiveFilters = normalizedQuery.length > 0 || selectedCourse !== "All";

  return (
    <View style={styles.screen}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>Menu</Text>
        <RestaurantName />
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
        {searchQuery.length > 0 && (
          <TouchableOpacity
            accessibilityLabel="Clear search"
            onPress={() => setSearchQuery("")}
            style={styles.clearSearchButton}
          >
            <Text style={styles.clearSearchText}>×</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        <View style={styles.statisticsCard}>
          <Text style={styles.statisticsTitle}>Menu Statistics</Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.statValue}>{dishes.length}</Text>
              <Text style={styles.statLabel}>Menu items</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.statValue}>{averagePrice}</Text>
              <Text style={styles.statLabel}>Average price</Text>
            </View>
          </View>
          <View style={styles.courseCounts}>
            {(["Starter", "Main Course", "Dessert"] as const).map((course) => {
              const count = dishes.filter(
                (item) => getCourse(item.brand) === course,
              ).length;

              return (
                <View key={course} style={styles.courseCount}>
                  <Text style={styles.courseCountValue}>{count}</Text>
                  <Text style={styles.courseCountLabel}>{course}</Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.filterHeader}>
          <Text style={styles.filterTitle}>Filter by course</Text>
          {hasActiveFilters && (
            <TouchableOpacity
              accessibilityRole="button"
              onPress={() => {
                setSearchQuery("");
                setSelectedCourse("All");
              }}
            >
              <Text style={styles.clearFilters}>Clear filters</Text>
            </TouchableOpacity>
          )}
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterOptions}
        >
          {(["All", "Starter", "Main Course", "Dessert"] as const).map(
            (course) => {
              const isSelected = selectedCourse === course;

              return (
                <TouchableOpacity
                  key={course}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected }}
                  onPress={() => setSelectedCourse(course)}
                  style={[
                    styles.filterOption,
                    isSelected && styles.selectedFilterOption,
                  ]}
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      isSelected && styles.selectedFilterText,
                    ]}
                  >
                    {course}
                  </Text>
                </TouchableOpacity>
              );
            },
          )}
        </ScrollView>

        {visibleDishes.length === 0 ? (
          <Text style={styles.emptyText}>
            {hasActiveFilters
              ? "No dishes match your search or course filter."
              : "No dishes found. Add a dish to get started."}
          </Text>
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
                      {getCourse(item.brand) ?? "Main Course"}
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  clearSearchButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  clearSearchText: {
    color: "#555",
    fontSize: 24,
    lineHeight: 28,
  },
  statisticsCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  statisticsTitle: {
    color: "#222",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: "row",
    marginBottom: 14,
  },
  summaryItem: {
    flex: 1,
  },
  statValue: {
    color: "#111",
    fontSize: 20,
    fontWeight: "700",
  },
  statLabel: {
    color: "#666",
    fontSize: 11,
    marginTop: 2,
  },
  courseCounts: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 12,
  },
  courseCount: {
    flex: 1,
  },
  courseCountValue: {
    color: "#222",
    fontSize: 15,
    fontWeight: "700",
  },
  courseCountLabel: {
    color: "#666",
    fontSize: 10,
    marginTop: 2,
  },
  filterHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  filterTitle: {
    color: "#333",
    fontSize: 13,
    fontWeight: "600",
  },
  clearFilters: {
    color: "#444",
    fontSize: 12,
    fontWeight: "600",
  },
  filterOptions: {
    gap: 8,
    paddingBottom: 14,
  },
  filterOption: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: "#fff",
  },
  selectedFilterOption: {
    backgroundColor: "#111",
    borderColor: "#111",
  },
  filterOptionText: {
    color: "#333",
    fontSize: 12,
    fontWeight: "600",
  },
  selectedFilterText: {
    color: "#fff",
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

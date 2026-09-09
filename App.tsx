import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import MenuScreen, {
  initialDishes,
  type MenuItem,
} from "./components/MenuScreen";
import AddDishScreen from "./components/AddDishScreen";
import EditDishScreen from "./components/EditDishScreen";
import TopNavBar from "./components/TopNavBar";

type AppScreen = "Menu" | "AddDish" | "EditDish";

type DishItem = MenuItem;

export default function App() {
  const [screen, setScreen] = useState<AppScreen>("Menu");
  const [dishes, setDishes] = useState<DishItem[]>(initialDishes);
  const [selectedDishId, setSelectedDishId] = useState<number | null>(null);

  const navigation = {
    navigate: (nextScreen: string, payload?: any) => {
      const validScreen = nextScreen as AppScreen;
      if (
        validScreen === "Menu" ||
        validScreen === "AddDish" ||
        validScreen === "EditDish"
      ) {
        if (validScreen === "EditDish" && payload?.dishId) {
          setSelectedDishId(payload.dishId);
        }
        setScreen(validScreen);
      }
    },
  };

  const handleAddDish = (dish: {
    name: string;
    description: string;
    price: string;
    category: string;
    image?: string | null;
  }) => {
    const newDish: DishItem = {
      id: Date.now(),
      name: dish.name,
      brand: dish.category || "Main",
      description: dish.description,
      price: dish.price,
      quantity: "Quantity: 01",
      image: dish.image
        ? { uri: dish.image }
        : require("./assets/grilledsamon.png"),
    };

    setDishes((currentDishes) => [newDish, ...currentDishes]);
    setScreen("Menu");
  };

  const handleUpdateDish = (updatedDish: {
    id: number;
    name: string;
    description: string;
    price: string;
    category: string;
    image?: string | null;
  }) => {
    setDishes((currentDishes) =>
      currentDishes.map((dish) =>
        dish.id === updatedDish.id
          ? {
              ...dish,
              name: updatedDish.name,
              brand: updatedDish.category || "Main",
              description: updatedDish.description,
              price: updatedDish.price,
              image: updatedDish.image
                ? { uri: updatedDish.image }
                : dish.image,
            }
          : dish,
      ),
    );
    setScreen("Menu");
  };

  const handleDeleteDish = (dishId: number) => {
    setDishes((currentDishes) =>
      currentDishes.filter((dish) => dish.id !== dishId),
    );
    setScreen("Menu");
  };

  const selectedDish =
    dishes.find((dish) => dish.id === selectedDishId) ?? dishes[0] ?? null;

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {screen === "Menu" ? (
        <MenuScreen navigation={navigation} dishes={dishes} />
      ) : screen === "AddDish" ? (
        <AddDishScreen navigation={navigation} onSave={handleAddDish} />
      ) : screen === "EditDish" && selectedDish ? (
        <EditDishScreen
          navigation={navigation}
          dish={selectedDish}
          dishes={dishes}
          onSave={handleUpdateDish}
          onDelete={handleDeleteDish}
        />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderTitle}>No dish selected</Text>
          <Text style={styles.placeholderText}>
            Add a dish before opening the editor.
          </Text>
        </View>
      )}

      <TopNavBar
        activeScreen={screen}
        onNavigate={(targetScreen) => navigation.navigate(targetScreen)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  placeholder: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111",
    marginBottom: 8,
  },
  placeholderText: {
    fontSize: 15,
    color: "#666",
  },
});

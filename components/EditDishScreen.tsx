import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import CourseSelector from "./CourseSelector";
import { formatPrice, getCourse, parsePrice, type Course } from "./menuUtils";
import RestaurantName from "./RestaurantName";

type DishLike = {
  id: number;
  name: string;
  brand: string;
  description: string;
  price: string;
  quantity: string;
  image: any;
};

type EditDishScreenProps = {
  navigation: {
    navigate: (screen: string, payload?: any) => void;
  };
  dish: DishLike;
  dishes: DishLike[];
  onSave: (dish: {
    id: number;
    name: string;
    description: string;
    price: string;
    category: string;
    image?: string | null;
  }) => void;
  onDelete: (dishId: number) => void;
};

export default function EditDishScreen({
  navigation,
  dish,
  dishes,
  onSave,
  onDelete,
}: EditDishScreenProps) {
  const [dishName, setDishName] = useState(dish.name);
  const [price, setPrice] = useState(() =>
    String(parsePrice(dish.price) ?? ""),
  );
  const [description, setDescription] = useState(dish.description);
  const [category, setCategory] = useState<Course>(
    getCourse(dish.brand) ?? "Main Course",
  );
  const [selectedImage, setSelectedImage] = useState<string | null>(() => {
    if (typeof dish.image === "string") {
      return dish.image;
    }

    if (dish.image && typeof dish.image === "object" && "uri" in dish.image) {
      return dish.image.uri as string;
    }

    return null;
  });

  useEffect(() => {
    setDishName(dish.name);
    setPrice(String(parsePrice(dish.price) ?? ""));
    setDescription(dish.description);
    setCategory(getCourse(dish.brand) ?? "Main Course");
    if (typeof dish.image === "string") {
      setSelectedImage(dish.image);
      return;
    }

    if (dish.image && typeof dish.image === "object" && "uri" in dish.image) {
      setSelectedImage(dish.image.uri as string);
      return;
    }

    setSelectedImage(null);
  }, [dish]);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission needed",
        "Please allow access to your photos to update the dish image.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.8,
      allowsEditing: true,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleUpdate = () => {
    if (!dishName.trim() || !description.trim()) {
      Alert.alert(
        "Missing details",
        "Please enter a dish name and description before updating the dish.",
      );
      return;
    }

    const amount = parsePrice(price);
    if (amount === null || amount <= 0) {
      Alert.alert(
        "Invalid price",
        "Enter a price greater than zero, using up to two decimal places.",
      );
      return;
    }

    onSave({
      id: dish.id,
      name: dishName.trim(),
      description: description.trim(),
      price: formatPrice(amount),
      category,
      image: selectedImage,
    });

    navigation.navigate("Menu");
  };

  const handleDelete = () => {
    Alert.alert("Delete dish", `Remove ${dish.name} from the menu?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          onDelete(dish.id);
          navigation.navigate("Menu");
        },
      },
    ]);
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerRow}>
        <View style={styles.headerTitle}>
          <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Edit Dish</Text>
        </View>
        <RestaurantName />
      </View>

      <Text style={styles.selectorLabel}>Choose a dish to edit</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.dishSelector}
      >
        {dishes.map((item) => {
          const isSelected = item.id === dish.id;

          return (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.dishOption,
                isSelected && styles.selectedDishOption,
              ]}
              onPress={() =>
                navigation.navigate("EditDish", { dishId: item.id })
              }
            >
              <Text
                numberOfLines={1}
                style={[
                  styles.dishOptionText,
                  isSelected && styles.selectedDishText,
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.formCard}>
        <Text style={styles.label}>Dish Name</Text>
        <TextInput
          value={dishName}
          onChangeText={setDishName}
          placeholder="Enter dish name"
          style={styles.input}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Describe the dish"
          multiline
          numberOfLines={4}
          style={[styles.input, styles.textArea]}
        />

        <Text style={styles.label}>Course</Text>
        <CourseSelector value={category} onChange={setCategory} />

        <Text style={styles.label}>Price</Text>
        <TextInput
          value={price}
          onChangeText={setPrice}
          placeholder="120.00"
          keyboardType="decimal-pad"
          style={styles.input}
        />

        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          {selectedImage ? (
            <Image
              source={{ uri: selectedImage }}
              style={styles.selectedImage}
            />
          ) : (
            <Text style={styles.imageText}>Insert Photo Here</Text>
          )}
        </TouchableOpacity>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
            <Text style={styles.primaryButtonText}>Update Dish</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>Delete Dish</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: 20,
    paddingTop: 48,
    paddingBottom: 110,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    fontSize: 28,
    color: "#111",
    marginRight: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111",
  },
  selectorLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  dishSelector: {
    paddingBottom: 18,
    gap: 8,
  },
  dishOption: {
    maxWidth: 170,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e2e2e2",
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
  selectedDishOption: {
    backgroundColor: "#111",
    borderColor: "#111",
  },
  dishOptionText: {
    color: "#222",
    fontSize: 13,
    fontWeight: "600",
  },
  selectedDishText: {
    color: "#fff",
  },
  formCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#f7f7f7",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e8e8e8",
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 18,
    fontSize: 15,
    color: "#111",
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  imagePicker: {
    height: 180,
    backgroundColor: "#f2f2f2",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginBottom: 18,
  },
  imageText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#a0a0a0",
    textAlign: "center",
    lineHeight: 36,
  },
  selectedImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  buttonRow: {
    gap: 12,
  },
  updateButton: {
    backgroundColor: "#111",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  deleteButton: {
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },
});

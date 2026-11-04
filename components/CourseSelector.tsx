import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { courseOptions, type Course } from "./menuUtils";

type CourseSelectorProps = {
  value: Course;
  onChange: (course: Course) => void;
};

export default function CourseSelector({
  value,
  onChange,
}: CourseSelectorProps) {
  return (
    <View style={styles.container}>
      {courseOptions.map((course) => {
        const isSelected = value === course;

        return (
          <TouchableOpacity
            key={course}
            accessibilityRole="radio"
            accessibilityState={{ selected: isSelected }}
            onPress={() => onChange(course)}
            style={[styles.option, isSelected && styles.selectedOption]}
          >
            <Text style={[styles.optionText, isSelected && styles.selectedText]}>
              {course}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 18,
  },
  option: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
    paddingHorizontal: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e8e8e8",
    backgroundColor: "#f7f7f7",
  },
  selectedOption: {
    backgroundColor: "#111",
    borderColor: "#111",
  },
  optionText: {
    color: "#333",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  selectedText: {
    color: "#fff",
  },
});

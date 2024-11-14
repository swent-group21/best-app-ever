import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { ThemedIconButton } from "@/components/theme/ThemedIconButton";

const { width, height } = Dimensions.get("window");

export type CommentType = {
  comment: string;
  user: string;
  createdAt?: string;
};

export function SingleComment(comment: CommentType) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: 15,
        alignItems: "center",
      }}
    >
      <ThemedIconButton
        name="person-circle-outline"
        onPress={() => {
          /* user button */
        }}
        size={45}
        color="white"
      />
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingBottom: 10,
          }}
        >
          <Text style={styles.user}> {comment.user} </Text>
          <Text style={styles.textofcomment}> {comment.createdAt} </Text>
        </View>
        <Text style={styles.textofcomment}> {comment.comment} </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    height: height * 0.08,
    flexDirection: "column",
    padding: 10,
    backgroundColor: "black",
    borderRadius: 15,
    borderColor: "black",
    borderWidth: 1,
  },
  textofcomment: {
    fontSize: 15,
    color: "white",
  },
  user: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
  },
});

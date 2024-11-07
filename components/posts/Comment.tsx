import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { ThemedIconButton } from "@/components/theme/ThemedIconButton";


const { width, height } = Dimensions.get("window");

export type CommentType = {
    comment: string;
    user?: string;
    createdAt?: Date;
};

export function SingleComment(comment : CommentType) {

    return (    
        <View style = {styles.container}>
        <Text style = {styles.user}> {comment.user} </Text>
        <Text > {comment.comment} </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width * 0.9,
        height: height * 0.08,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: 'transparent',
        borderRadius: 15,
        borderColor: 'white',
        borderWidth: 1,
    },
    textofcomment: {
        fontSize: 8,
        color: 'white',
    },
    user: {
        fontSize: 8,
        color: 'white',
        fontWeight: 'bold',
    },
});
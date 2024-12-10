import {ThemedView} from "@/components/theme/ThemedView";
import {ThemedText} from "@/components/theme/ThemedText";
import { StyleSheet } from "react-native";
import { ThemedIconButton } from "@/components/theme/ThemedIconButton";


export default function FriendsProfile() {
    return (
        <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>Friends Profile</ThemedText>
        <ThemedIconButton name="close" onPress={() => {}} />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
});
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme, Dimensions, Image } from 'react-native';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/theme/ThemedText';
import { ThemedView } from '@/components/theme/ThemedView';
import { ThemedIconButton } from '@/components/theme/ThemedIconButton';
import { useRouter } from "expo-router";
import FirestoreCtrl from '@/firebase/FirestoreCtrl';
import { useFetchChallenge } from '@/types/ChallengeBuilder';

const { width } = Dimensions.get("window");

export function Challenge(challengeId: any) {
    const router = useRouter();
    const firestoreCtrl = new FirestoreCtrl();
    const challengeData = useFetchChallenge(challengeId, firestoreCtrl);

    const [isOpen, setIsOpen] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const theme = useColorScheme() ?? 'light';

    // Display loading state or handle absence of challenge data
    if (!challengeData) {
        return <ThemedText>Loading Challenge...</ThemedText>;
    }

    const { challengeName, description, image, userName, location, dateTime } = challengeData;
    
    return (
    <ThemedView style={{backgroundColor: 'transparent'}}>
        <TouchableOpacity
            onPress={() => setIsOpen(!isOpen)}
            activeOpacity={0.8}>
            <ThemedView style={[styles.challenge, {height: 279}]}>
                <Image source={image} style={styles.image}/>
                
                {isOpen 
                && 
                <ThemedView style={styles.container}>  
                    <ThemedView style={[styles.user, {justifyContent: 'space-between'}]}>
                        <ThemedView style={styles.user}>
                            <ThemedIconButton iconName="person-circle-outline" onPress={() => {/* user button */}} size={45} color='white'/>
                            <ThemedView style={styles.userInfo}>
                                <ThemedText lightColor='white' darkColor='white' type='smallSemiBold'>{userName}</ThemedText>
                                <ThemedText lightColor='white' darkColor='white' type='small'>{`in ${location || 'unknown'} at ${dateTime}`}</ThemedText>
                            </ThemedView>
                        </ThemedView>
                        <ThemedIconButton iconName="chevron-expand-outline" onPress={() => {router.push("../home/maximize_screen")}} size={25} style={{paddingRight: 8}} color='white'/> 
                    </ThemedView>
                    <ThemedView style={styles.bottomBar}>
                        <ThemedIconButton iconName="heart" onPress={() => {setIsLiked(!isLiked)}} size={25} color={isLiked ? 'red' : 'white'}/>
                        <ThemedIconButton iconName="location-outline" onPress={() => {/* location button */}} size={25} color='white'/>
                    </ThemedView>
                </ThemedView>
                }
            </ThemedView>
        </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  challenge: {
    width: width - 20,
    height: 279,
    borderRadius: 15,
    backgroundColor: Colors.light.background,
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    padding: 5,
    backgroundColor: 'transparent',
  },
  userInfo: {
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
  bottomBar: {
    flexDirection: 'row',
    verticalAlign: 'middle',
    justifyContent: 'space-between',
    padding: 15,
    gap: 3,
    backgroundColor: 'transparent',
  },
});

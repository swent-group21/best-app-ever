import { PropsWithChildren, useState } from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme, Dimensions, Image } from 'react-native';

import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/theme/ThemedText';
import { ThemedView } from '@/components/theme/ThemedView';
import { ThemedIconButton } from '@/components/theme/ThemedIconButton';
import { useRouter } from "expo-router";

// Get screen width and height
const { width, height } = Dimensions.get("window");

export function Challenge({ children, title }: PropsWithChildren & { title: string }) { //image: string
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);
    const[isLiked, setIsLiked] = useState(false);
    const theme = useColorScheme() ?? 'light';

    const height = 279; // derived from the height of the image
    const userName = 'Sandraa'; // derived from the name of the user
    const userLocation = 'Plage de Vidy'; // derived from the location of the user
    const userTime = '18:26'; // derived from the time the user posted the challenge

    return (
    <ThemedView style = {{backgroundColor: 'transparent'}}>
        <TouchableOpacity
            onPress={() => setIsOpen(!isOpen)}
            activeOpacity={0.8}>
            <ThemedView style={[styles.challenge, {height: height}]}>
                {/* Challenge Image */}
                <Image source={require('@/assets/images/challenge2.png')} style={styles.image}/>
                
                {isOpen 
                && 
                <ThemedView style={styles.container}>  
                    <ThemedView style={[styles.user, {justifyContent: 'space-between'}]}>
                        <ThemedView style={styles.user}>
                            <ThemedIconButton iconName="person-circle-outline" onPress={() => {/* user button */}} size={45} color='white'/>
                            <ThemedView style={styles.userInfo}>
                                <ThemedText lightColor='white' darkColor='white' type='smallSemiBold'>{userName}</ThemedText>
                                <ThemedText lightColor='white' darkColor='white' type='small' >{"in " + userLocation + " at " + userTime}</ThemedText>
                            </ThemedView>
                        </ThemedView>
                        <ThemedIconButton iconName="chevron-expand-outline" onPress={() => {router.push("../home/maximize_screen")}} size={25} style={{paddingRight: 8}} color='white'/> 
                    </ThemedView>
                    <ThemedView style={styles.bottomBar}>
                        <ThemedIconButton iconName="heart" onPress={() => {setIsLiked(!isLiked)}} size={25} color= {isLiked? 'red':'white'}/>
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
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
    marginRight: 24,
  },
  challenge: {
    width: width - 20,
    height: height,
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

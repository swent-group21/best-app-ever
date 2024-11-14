import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useRouter } from 'expo-router';

const Stack = createNativeStackNavigator();
const router = useRouter();

export default function App() {
  return (
    router
  );
}

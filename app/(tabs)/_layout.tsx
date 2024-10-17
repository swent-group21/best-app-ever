import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';

export default function TabLayout() {
<<<<<<< HEAD

||||||| parent of dc43462 (fix(ui): styled interface sign up)
  const colorScheme = useColorScheme();

=======
  const colorScheme = useColorScheme();
// TODO: INSTEAD OF TOASTS, USE THE NAVIGATION STACK 
>>>>>>> dc43462 (fix(ui): styled interface sign up)
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),

        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
      />

    </Tabs>
  );
}

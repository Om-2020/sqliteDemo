import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import AddNewUser from './screens/AddNewUser';
import User from './screens/User';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="AddNewUser" 
            component={AddNewUser}
            options={{headerShown:false}}/>

              <Stack.Screen name="User"
                  component={User}
                  options={{ headerShown: false }} />
        </Stack.Navigator>

    </NavigationContainer>
  )
}

export default AppNavigator;
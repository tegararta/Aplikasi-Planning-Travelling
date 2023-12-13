import { SafeAreaView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import NavTabs from './src/components/NavTabs';


const Stack = createNativeStackNavigator();


export default function App() {
  
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
          name="Navtabs" 
          component={NavTabs} 
          options={{
            headerShown: false,
          }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}



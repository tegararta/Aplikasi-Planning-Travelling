import { SafeAreaView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import NavTabs from "./src/components/NavTabs";
import { Home, Note, NoteDetail, NoteEdit } from "./src/pages";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Navtabs"
            component={NavTabs}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen 
          name="Note" 
          component={Note}
          options={{ title:"Add" }}/>
          <Stack.Screen 
          name="NoteDetail" 
          component={NoteDetail}
          options={{ title:"Detail" }} />
          <Stack.Screen 
          name="NoteEdit" 
          component={NoteEdit} 
          options={{ title:""}} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

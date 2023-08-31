import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  StyleSheet,
  useColorScheme,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginPage from './pages/LoginPage';
import LinksListPage from './pages/LinksListPage';
import TagsPage from './pages/TagsPage';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
		<NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen
          name="Login"
          component={LoginPage}
          //options={{title: 'Welcome'}}
        />
        <Stack.Screen
          name="Home"
          component={LinksListPage}
          options={{title: 'ReLink'}}
        />
        <Stack.Screen
          name="Tags"
          component={TagsPage}
          //options={{title: 'Welcome'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
});

export default App;

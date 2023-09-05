import React, { useState, useEffect }from 'react';
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
import SplashPage from './pages/SplashPage';
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
      <Stack.Navigator initialRouteName='Splash'>
        <Stack.Screen
          name="Splash"
          component={SplashPage}
					options={{
						headerShown: false,
					}}
        />
        <Stack.Screen
          name="Login"
          component={LoginPage}
					options={{
						headerShown: false,
					}}
        />
        <Stack.Screen
          name="Home"
          component={LinksListPage}
          options={{
						title: 'ReLink',
						headerStyle: {
    					backgroundColor: '#eceff1',
							elevation: 0,
						},
						headerShadowVisible: false,
					}}
        />
        <Stack.Screen
          name="Tags"
          component={TagsPage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
});

export default App;

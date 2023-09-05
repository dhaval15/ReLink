import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getSettings } from '../api/settingsApi'

const SplashPage = ({navigation}) => {

	useEffect(() => {
		getSettings().then((settings) => {
			if (settings.instanceUrl && settings.token){
				navigation.replace('Home');
			} else {
				navigation.replace('Login');
			}
		});
	});

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ReLink</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eceff1',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 48,
    marginBottom: 40,
    color: '#455a64',
  },
});

export default SplashPage;

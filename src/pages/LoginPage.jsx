import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const LoginPage = () => {
  const [hostAddress, setHostAddress] = useState('');
  const [apiKey, setApiKey] = useState('');

  const handleTestButton = () => {
  };

  const handleSubmitButton = () => {
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ReLink</Text>
      <TextInput
        style={styles.input}
        placeholder="Host Address"
        value={hostAddress}
        onChangeText={text => setHostAddress(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="API Key"
        value={apiKey}
        onChangeText={text => setApiKey(text)}
      />
      <View style={styles.buttonContainer}>
				<TouchableOpacity style={styles.button} onPress={handleTestButton}>
          <Text style={styles.buttonText}>Test</Text>
        </TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={handleSubmitButton}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 36,
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 48,
    borderWidth: 0,
    borderColor: '#ccc',
    borderRadius: 2,
    paddingHorizontal: 12,
    marginBottom: 16,
		backgroundColor: 'rgba(96, 125, 139, 0.1)',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
	button: {
    flex: 1,
    backgroundColor: '#455a64',
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LoginPage;

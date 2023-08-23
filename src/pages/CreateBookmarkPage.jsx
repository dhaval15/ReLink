import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Toggle from '../components/Toggle';

const CreateBookmarkPage = () => {
  const [url, setUrl] = useState('');
  const [tags, setTags] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [unread, setUnread] = useState(false);

  const handleCreateBookmark = () => {
    // Handle creating the bookmark with the form data
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Bookmark</Text>
      <TextInput
        style={styles.input}
        placeholder="URL"
        value={url}
        onChangeText={text => setUrl(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Tags (comma-separated)"
        value={tags}
        onChangeText={text => setTags(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={text => setTitle(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={text => setDescription(text)}
        multiline
      />
			<Toggle
				label="Unread"
				value={unread}
				onValueChange={value => setUnread(value)}
			/>
      <TouchableOpacity style={styles.button} onPress={handleCreateBookmark}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eceff1',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#607d8b',
    marginBottom: 48,
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
  button: {
    backgroundColor: '#607d8b',
    paddingVertical: 10,
		marginTop: 28,
    borderRadius: 8,
    width: '40%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CreateBookmarkPage;

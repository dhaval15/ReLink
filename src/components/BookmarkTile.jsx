import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from 'TODO';

const BookmarkTile = ({ bookmark }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{bookmark.title}</Text>
      <Text style={styles.url}>{bookmark.url}</Text>
      <View style={styles.tagContainer}>
        {bookmark.tag_names && bookmark.tag_names.map(tag => (
          <Text key={tag} style={styles.tag}>#{tag}</Text>
        ))}
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{bookmark.description}</Text>
				<MaterialIcons 
					name={bookmark.unread ? "mail" : "drafts"} 
					size={20} color="#455a64"/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
		backgroundColor: 'rgba(96, 125, 139, 0.1)',
    padding: 16,
    marginBottom: 16,
    borderRadius: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  url: {
    marginBottom: 8,
		color: '#455a64',
		textDecorationLine: 'underline',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 2,
  },
  tag: {
		color: '#455a64',
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 0,
		fontWeight: 'bold',
  },
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  description: {
    flex: 1,
    marginRight: 8,
  },
});

export default BookmarkTile;

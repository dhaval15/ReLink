import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BookmarkTile = ({ bookmark }) => {
	var title = bookmark.title;
	if (title == null || title.length === 0) {
		title = bookmark.website_title;
	}
	var description = bookmark.description;
	if (description == null || description.length === 0) {
		description = bookmark.website_description;
	}
	description = description?.substr(0, 80);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.url}>{bookmark.url}</Text>
      <View style={styles.tagContainer}>
        {bookmark.tag_names && bookmark.tag_names.map(tag => (
          <Text key={tag} style={styles.tag}>#{tag}</Text>
        ))}
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{description ?? ''}</Text>
				<Icon 
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
		color: '#182c35',
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
		color: '#182c35',
  },
});

export default BookmarkTile;

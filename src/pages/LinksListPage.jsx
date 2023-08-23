import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import BookmarkTile from '../components/BookmarkTile';


const LinksListPage = () => {
	const [bookmarks, setBookmarks] = useState([]);
	//TODO: Api Call
  return (
    <View style={styles.container}>
      <FlatList
        data={[... bookmarks]}
        keyExtractor={bookmark => bookmark.id.toString()}
        renderItem={({ item }) => <BookmarkTile bookmark={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#eceff1',
  },
});

export default LinksListPage;


import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import BookmarkTile from '../components/BookmarkTile';
import LinkdingApi from '../api/linkdingApi';

import { getSettings } from '../api/settingsApi'

const LinksListPage = () => {
	const [bookmarks, setBookmarks] = useState([]);
	const [text, setText] = useState('Undefined');
	useEffect(() => {
		getSettings().then((settings) => {
			setText(settings);
			LinkdingApi(settings.instanceUrl, settings.token).getBookmarks().then((result) => {
				setBookmarks(result.results);
				setText(settings);
			}).catch((err) => {
				setText(err);
			});
		});
	});
	return (
		<View style={styles.container}>
			<Text> {text} </Text>
			<FlatList
				data={[...bookmarks]}
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


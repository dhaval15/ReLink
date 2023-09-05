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
			//setText(settings);
			const api = new LinkdingApi(settings.instanceUrl, settings.token);
			api.getBookmarks().then((result) => {
				setBookmarks(result.results);
			});
		});
	});
	return (
		<View style={styles.container}>
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


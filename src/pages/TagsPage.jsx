import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import TagSection from '../components/TagSection';
import LinkdingApi from '../api/linkdingApi';

const settings = {
	instanceUrl: 'https://links.dhaval.cloud',
	token: 'aefd62710a4337b700fb11a4c36c4ddcc216e1ec',
};

const api = new LinkdingApi(settings.instanceUrl, settings.token);

const TagsPage = () => {
	const [tags, setTags] = useState([]);

	useEffect(() => {
		api.getTags().then((result) => {
			setTags(result);
		});
	}, []);

	const groupTagsByFirstCharacter = () => {
		const groupedTags = {};
		for (const tag of tags) {
			const firstChar = tag.charAt(0).toUpperCase();

			// Group tags starting with a number under '#'
			const groupKey = /^[0-9]/.test(firstChar) ? '#' : firstChar;

			if (!groupedTags[groupKey]) {
				groupedTags[groupKey] = [];
			}

			groupedTags[groupKey].push(tag);
		}

		return groupedTags;
	};


	const renderTagSections = () => {
		const groupedTags = groupTagsByFirstCharacter();

		const sortedKeys = Object.keys(groupedTags).sort((a, b) => {
			if (a === '#') return -1;
			if (b === '#') return 1;
			return a.localeCompare(b);
		});

		return sortedKeys.map((groupKey) => (
			<TagSection key={groupKey} tags={groupedTags[groupKey]} leading={groupKey} />
		));
	};

	return (
		<ScrollView style={astyles.container}>
			{renderTagSections()}
		</ScrollView>
	);
};

const astyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		padding: 16,
		backgroundColor: '#eceff1',
	},
});

export default TagsPage;


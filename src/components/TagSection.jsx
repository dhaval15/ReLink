import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TagSection = ({ tags, leading }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leadingContainer}>
        <Text style={styles.leading}>{leading}</Text>
      </View>
      <View style={styles.tagsContainer}>
        {tags.map((tag, index) => (
          <View key={index} style={styles.tagContainer}>
            <Text style={styles.tag}>{tag}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  leadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30, // Adjust as needed
  },
  leading: {
    fontSize: 14,
    color: '#849ea9',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
		marginLeft: 4,
  },
  tagContainer: {
    marginVertical: 5,
    marginHorizontal: 5,
  },
  tag: {
    paddingVertical: 3,
    paddingHorizontal: 8,
		backgroundColor: 'rgba(96, 125, 139, 0.1)',
    borderRadius: 4,
		color: '#455a64',
		fontWeight: '500',
		fontSize: 15,
  },
});

export default TagSection;

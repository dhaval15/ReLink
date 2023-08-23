import React, {useState} from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
const Toggle = ({ label, value, onValueChange }) => {
	const [_value, setValue] = useState(value);
  return (
		<View style={styles.switchContainer}>
			<Text style={styles.switchLabel}>{label}</Text>
			<TouchableOpacity
				style={[
					styles.squareToggle,
				]}
				onPress={() => {
					setValue(!_value);
				}}
			>
				{_value && <View style={styles.squareInner} />}
			</TouchableOpacity>
		</View>
  );
};

const styles = StyleSheet.create({
  squareToggle: {
    width: 24,
    height: 24,
    borderRadius: 2,
    justifyContent: 'center',
		backgroundColor: 'rgba(96, 125, 139, 0.2)',
    alignItems: 'center',
  },
  squareInner: {
    width: 14,
    height: 14,
    backgroundColor: '#607d8b',
    borderRadius: 2,
  },
  switchContainer: {
    flexDirection: 'row',
		justifyContent: 'space-between',
    marginBottom: 10,
		width: '100%',
  },
  switchLabel: {
		marginLeft: 4,
  },
});

export default Toggle;

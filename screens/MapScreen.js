import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import tw from "tailwind-react-native-classnames";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Map from "../components/Map";
import NavigateCard from "../components/NavigateCard";
import RideOptionsCard from "../components/RideOptionsCard";

const MapScreen = () => {
	const Stack = createNativeStackNavigator();
	return (
		<View>
			<View style={tw`h-1/2`}>
				<Map />
			</View>
			<View style={tw`h-1/2`}>
				<Stack.Navigator screenOptions={{
					headerShown: false
				}}>
					<Stack.Screen name="NavigateCard" component={NavigateCard} />
					<Stack.Screen name="RideOptionsCard" component={RideOptionsCard} />
				</Stack.Navigator>
			</View>
		</View>
	)
};

const styles = StyleSheet.create({
});

export default MapScreen;
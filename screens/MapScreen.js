import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import tw from "tailwind-react-native-classnames";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

import Map from "../components/Map";
import NavigateCard from "../components/NavigateCard";
import RideOptionsCard from "../components/RideOptionsCard";

const MapScreen = () => {
	const Stack = createNativeStackNavigator();
	const navigation = useNavigation();
	return (
		<View>
			<TouchableOpacity
				onPress={() => navigation.navigate('HomeScreen')} 
				style={tw`absolute top-16 left-10 bg-gray-100 z-50 p-3 rounded-full shadow-lg`}>
				<Icon name="menu" />
			</TouchableOpacity>
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
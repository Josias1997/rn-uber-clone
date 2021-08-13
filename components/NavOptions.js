import React from 'react'
import { FlatList, TouchableOpacity, Text, View, Image, StyleSheet } from 'react-native';
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectOrigin } from "../slices/navSlice";

const data = [
	{
		id: "173",
		title: "Get a ride",
		image: "https://links.papareact.com/3pn",
		screen: "MapScreen"
	},
	{
		id: "456",
		title: "Order food",
		image: "https://links.papareact.com/28w",
		screen: "EatsScreen"
	}
]

const NavOptions = () => {
	const origin = useSelector(selectOrigin);
	const navigation = useNavigation();
	return (
		<FlatList
			data={data}
			horizontal
			renderItem={({ item }) => (
				<TouchableOpacity 
					onPress={() => navigation.navigate(item.screen)}
					style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}
					disabled={!origin}
				>
					<View>
						<Image 
							style={styles.image}
							source={{ uri: item.image }} 
						/>
						<Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
						<Icon 
							style={tw`p-2 bg-black rounded-full w-10 mt-4`}
							type="antdesign" name="arrowright" color="white" />
					</View>
				</TouchableOpacity>
			)}
			keyExtractor={item => item.id}
		/>
	)
};

const styles = StyleSheet.create({
	image: {
		width: 120,
		height: 120,
		resizeMode: "contain"
	}
})


export default NavOptions;
import React, { useState } from 'react';
import { View, SafeAreaView, FlatList, Platform, Image, TouchableOpacity, Text } from 'react-native';
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import 'intl';
import 'intl/locale-data/jsonp/en';

import { selectTravelTimeInformation } from "../slices/navSlice";

const data = [
	{
		id: "Uber X",
		title: "Uber X",
		multiplier: 1,
		image: "https://links.papareact.com/3pw" 
	},
	{
		id: "Uber XL",
		title: "Uber XL",
		multiplier: 1.2,
		image: "https://links.papareact.com/" 
	},
	{
		id: "Uber Lux",
		title: "Uber Lux",
		multiplier: 1.75,
		image: "https://links.papareact.com/" 
	}
];

const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
	const navigation = useNavigation();
	const [ selected, setSelected ] = useState(null);
	const travelTimeInformation = useSelector(selectTravelTimeInformation);

	return (
		<SafeAreaView style={tw`bg-white flex-grow`}>
			<View>
				<TouchableOpacity 
					onPress={() => navigation.goBack()}
					style={tw`absolute top-3 left-5 p-3 rounded-full z-10`}>
					<Icon name="chevron-left" type="font-awesome" />
				</TouchableOpacity>
				<Text style={tw`text-center py-5 text-xl`}>Select a Ride - {travelTimeInformation?.distance?.text}</Text>
			</View>
			<FlatList
				style={tw`flex-1`}
				data={data}
				keyExtractor={item => item.id}
				renderItem={({ item: { id, title, multiplier, image }, item }) => (
					<TouchableOpacity
						onPress={() => setSelected(item)} 
						style={tw`flex-row justify-between items-center px-10 ${id === selected?.id && `bg-gray-200`}`}>
						<Image
							style={{
								width: 90,
								height: 90,
								resizeMode: 'contain'
							}}
							source={{ uri: image }} 
						/>
						<View style={tw`ml-6`}>
							<Text style={tw`text-xl font-semibold`}>{title}</Text>
							<Text style={tw`text-xs`}>{travelTimeInformation?.duration?.text} Travel time</Text>
						</View>
						<Text style={tw`text-xl`}>
							{new Intl.NumberFormat('en-US', {
								style: 'currency',
								currency: "USD",
							}).format((travelTimeInformation?.duration?.value * SURGE_CHARGE_RATE * multiplier) / 100)}
						</Text>
					</TouchableOpacity>
				)}
			/>
			<View style={tw`mt-auto border-t border-gray-200`}>
				<TouchableOpacity 
					disabled={!selected} 
					style={tw`bg-black py-2 m-3 ${!selected && `bg-gray-300`}`}
				>
					<Text style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	)
};

export default RideOptionsCard;
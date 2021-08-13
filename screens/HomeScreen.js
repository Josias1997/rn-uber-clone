import React from 'react'
import { View, Text, Image, Platform, StyleSheet } from 'react-native';
import tw from "tailwind-react-native-classnames";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setOrigin, setDestination } from "../slices/navSlice"

import NavOptions from "../components/NavOptions";
import NavFavourites from "../components/NavFavourites";

const HomeScreen = () => {
	const dispatch = useDispatch();
	return (
		<View style={tw`bg-white h-full`}>
			<View style={tw`p-5`}>
				<Image 
					source={{
						uri: "https://links.papareact.com/gzs"
					}}
					style={styles.logo} 
				/>
				<GooglePlacesAutocomplete
			      placeholder='Where from'
			      styles={{
			      	container: {
			      		flex: 0
			      	},
			      	textInput: {
			      		fontSize: 18
			      	}
			      }}
			      onPress={(data, details = null) => {
			        dispatch(setOrigin({
			        	location: details.geometry.location,
			        	description: data.description
			        }));
			        dispatch(setDestination(null));
			      }}
			      fetchDetails={true}
			      query={{
			        key: GOOGLE_MAPS_APIKEY,
			        language: 'en',
			      }}
			      nearbyPlacesAPI="GooglePlacesSearch"
			      debounce={400}
			      enablePoweredByContainer={false}
			    />
				<NavOptions />
				<NavFavourites />
			</View>
		</View>
	)
};

const styles = StyleSheet.create({
	logo: {
		width: 100,
		height: 100,
		resizeMode: "contain"
	}
});

export default HomeScreen;
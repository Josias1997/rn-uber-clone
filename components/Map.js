import React, { useRef, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from "react-native-maps";
import tw from "tailwind-react-native-classnames";
import { useSelector } from "react-redux";
import { selectOrigin, selectDestination } from "../slices/navSlice";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "@env";

const Map = () => {
	const origin = useSelector(selectOrigin);
	const destination = useSelector(selectDestination);
	const mapRef = useRef(null);

	useEffect(() => {
		if (!origin || !destination) return;
		mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
			edgePadding: {
				top: 50,
				right: 50,
				bottom: 50,
				left: 50
			}
		});
	}, [origin, destination]);

	return (
		<MapView
			ref={mapRef}
			style={tw`flex-1`}
			mapType="mutedStandard"
		    initialRegion={{
		      	latitude: origin.location.lat,
			    longitude: origin.location.lng,
			    latitudeDelta: 0.05,
			    longitudeDelta: 0.05,
		    }}
		>
			{origin && destination && (
				<MapViewDirections
					origin={origin.description}
					destination={destination.description}
					apikey={GOOGLE_MAPS_APIKEY}
					strokeWidth={5}
					strokeColor="black"
					lineDashPattern={[1]}
				/>
			)}
			{origin.location && (
				<Marker
					coordinate={{
						latitude: origin.location.lat,
						longitude: origin.location.lng
					}} 
					title="Origin"
					description={origin.description}
					identifier="origin"
				/>
			)}
			{destination?.location && (
				<Marker
					coordinate={{
						latitude: destination.location.lat,
						longitude: destination.location.lng
					}} 
					title="Origin"
					description={destination.description}
					identifier="destination"
				/>
			)}
		</MapView>
	)
};

const styles = StyleSheet.create({
});

export default Map;
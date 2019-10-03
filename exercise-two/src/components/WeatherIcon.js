import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudRain, faCloud, faSun, faWind } from '@fortawesome/free-solid-svg-icons';

export default function WeatherIcon({weatherValue}) {
	console.log('weatherValue', weatherValue);

	switch(weatherValue){
		case 'Rain':
			return( 
				<FontAwesomeIcon 
					icon={faCloudRain} 
					className="WeatherIcon"
					size="6px"
				/>
		);
		case 'Clouds':
			return( 
				<FontAwesomeIcon 
					icon={faCloudRain} 
					className="WeatherIcon"
					size="6px"
				/>
		);
		case 'Clear':
			return (
				<FontAwesomeIcon 
					icon={faSun} 
					className="WeatherIcon"
					size="6px"
				/>
				);
		default:
			return <div>{weatherValue}</div>
	}

	
}
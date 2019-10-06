import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudRain, faCloud, faSun, faWind, faMoon, faSmog } from '@fortawesome/free-solid-svg-icons';

export default function WeatherIcon({weatherValue}) {
	console.log('weatherValue', weatherValue);
	var d = new Date();
	var n = d.getTime();
	console.log(n);

	switch(weatherValue){
		case 'Rain':
			return( 
				<FontAwesomeIcon 
					icon={faCloudRain} 
					className="WeatherIcon"
					size="lg"
				/>
		);
		case 'Clouds':
			return( 
				<FontAwesomeIcon 
					icon={faCloud} 
					className="WeatherIcon"
					size="lg"
				/>
		);
		case 'Mist':
			return( 
				<FontAwesomeIcon 
					icon={faSmog} 
					className="WeatherIcon"
					size="lg"
				/>
		);	

		case 'Clear':
			if ((n > 7) && (n < 19)){
				return (
					<FontAwesomeIcon 
						icon={faSun} 
						className="WeatherIcon"
						size="lg"
					/>
					);
			}
			else{
				return (
					<FontAwesomeIcon 
						icon={faMoon} 
						className="WeatherIcon"
						size="lg"
					/>
					);
			}
		default:
			return <div>{weatherValue}</div>
	}

	
}
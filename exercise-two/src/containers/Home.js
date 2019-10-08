import React, {useEffect, useState} from 'react';
import axios from 'axios';
import WeatherIcon from '../components/WeatherIcon'
import PageWrapper from '../components/PageWrapper'


const apiKey = '41174326945db514cb5d9e727c0e7a7b'

export default function Home(props){
	const [error, isError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const [success, isSuccess] = useState(false);

	const [city, setCity] = useState('');
	const [weather, setWeather] = useState({});
	const [cloudy, setCloudy] = useState('');
	const [weatherType, setWeatherType] = useState('');
	const [mintemp, setminTemp] = useState('');
	const [maxtemp, setmaxTemp] = useState('');
	const [currtemp, setcurrTemp] = useState('');

	function queryWeatherAPI(queryCity){
		axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${queryCity}&APPID=${apiKey}`)
		.then(function(response){
			// console.log('response', response);
			setWeather(response);
			isSuccess(true);
			return response;
		})
		.catch(function(error){
			console.log('error', error);
			isError(true);
			setErrorMessage(`${error.status}: ${'Error'}`);
			return error;
		});
	}

	function convert(temp){
		let Ftemp = Math.round((temp - 273.15) * (9/5) + 32);
		return Ftemp;
	}

	useEffect(() =>  {
		const urlParams = new URLSearchParams(props.location.search)
		const cityParam = urlParams.get('city') ? urlParams.get('city') : 'Seoul';
		setCity(cityParam);
		queryWeatherAPI(cityParam);

	}, []);

	useEffect(() =>  {
		let mintemp = weather.data ? weather.data.main.temp_min: '';
		setminTemp(convert(mintemp));
		let maxtemp = weather.data ? weather.data.main.temp_max: '';
		setmaxTemp(convert(maxtemp));
		let currtemp = weather.data ? weather.data.main.temp: '';
		setcurrTemp(convert(currtemp));

		let time =  weather.data ? weather.data.sys.sunrise: '';
		console.log("time", time);

		let getWeatherType = weather.data ? weather.data.weather[0].main : '';
		setWeatherType(getWeatherType);
		let getCloudy =weather.data ? weather.data.clouds.all: 0;
		setCloudy(getCloudy);
	}, [weather]);


	return(
		<PageWrapper cloudy={cloudy}>
			<div className = "WeatherNav">
				<a className= {`WeatherNav__Item ${city === 'New York' ? 'WeatherNav__Item--active' : ''}`} href="/?city=New+York">NYC</a>
				<a className= {`WeatherNav__Item ${city === 'London' ? 'WeatherNav__Item--active' : ''}`} href="/?city=London">London</a>
				<a className= {`WeatherNav__Item ${city === 'New Delhi' ? 'WeatherNav__Item--active' : ''}`} href="/?city=New+Delhi">New Delhi</a>
				<a className= {`WeatherNav__Item ${city === 'San Francisco' ? 'WeatherNav__Item--active' : ''}`} href="/?city=San+Francisco">SF</a>
			</div>
			<h1>Weather in <span>{city}</span></h1>

			{error && <div className="errorMessage">{errorMessage}</div>}
			{success && <div className="successMessage">Weather query successful!</div>}

			<WeatherIcon weatherValue={weatherType}/>
			<p>Weather: {weather.data ? weather.data.weather[0].main: ''}</p>
			<p>Current Temperature: {currtemp}°F</p>
			<p>High Temperature: {mintemp}°F </p> 
			<p>Low Temperature: {maxtemp}°F</p>
			<p>Humidity: {weather.data ? weather.data.main.humidity: ''}%</p>
			<p>Cloudiness: {weather.data ? weather.data.clouds.all: 0}%</p>
			<p>Wind Speed: {weather.data ? weather.data.wind.speed: ''} mph</p>

		</PageWrapper>
		)

}
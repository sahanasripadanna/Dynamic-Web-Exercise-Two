import React, {useEffect, useState} from 'react';
import axios from 'axios';
import WeatherIcon from '../components/WeatherIcon'
import PageWrapper from '../components/PageWrapper'


const apiKey = '41174326945db514cb5d9e727c0e7a7b'

export default function Home(props){
	console.log(props)
	const [city, setCity] = useState('');
	const [weather, setWeather] = useState({});
	const [cloudy, setCloudy] = useState('');
	const [weatherType, setWeatherType] = useState('');
	const [mintemp, setTemp] = useState('');

	function queryWeatherAPI(queryCity){
		axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${queryCity}&APPID=${apiKey}`)
		.then(function(response){
			console.log('response', response);
			setWeather(response);
			return response;
		})
		.catch(function(error){
			console.log('error', error);
			return error;
		});
	}

	useEffect(() =>  {
		const urlParams = new URLSearchParams(props.location.search)
		const cityParam = urlParams.get('city') ? urlParams.get('city') : 'Seoul';
		setCity(cityParam);
		queryWeatherAPI(cityParam);

	}, []);

	useEffect(() =>  {
		let mintemp = weather.data ? weather.data.main.temp_min: '';
		mintemp = (mintemp - 273.15) * (9/5) + 32;
		setTemp(temp);
		let getWeatherType = weather.weather ? weather.weather[0].main : '';
		let getCloudy = weather.clouds ? weather.clouds.all : 0;
		setWeatherType(getWeatherType);
		setCloudy(getCloudy)
	}, [weather]);


	return(
		<PageWrapper cloudy={cloudy}>
			<div className = "WeatherNav">
				<a className= {`WeatherNav__Item ${city === 'Seoul' ? 'WeatherNav__Item---active' : ''}`} href="/?city=Seoul">Seoul</a>
				<a className= {`WeatherNav__Item ${city === 'London' ? 'WeatherNav__Item---active' : ''}`} href="/?city=London">London</a>
				<a className= {`WeatherNav__Item ${city === 'Miami' ? 'WeatherNav__Item---active' : ''}`} href="/?city=Miami">Miami</a>
				<a className= {`WeatherNav__Item ${city === 'Chicago' ? 'WeatherNav__Item---active' : ''}`} href="/?city=Chicago">Chicago</a>
			</div>
			<h1>Weather in <span>{city}</span></h1>
			<WeatherIcon weatherValue={weatherType}/>
			<p>Weather: {weather.data ? weather.data.weather[0].main: ''}</p>
			<p>Current Temperature: {weather.data ? weather.data.main.unit: ''}</p>
			<p>Humidity: {weather.data ? weather.data.main.humidity: ''}</p>
			<p>Minimum Temperature: {temp} </p> 
			<p>Maximum Temperature: {weather.data ? weather.data.main.temp_max: ''}</p>
			<p>Wind Speed: {weather.data ? weather.data.wind.speed: ''}</p>
			<p>Cloudiness: {weather.data ? weather.data.clouds.all: ''}%</p>

		</PageWrapper>
		)

}
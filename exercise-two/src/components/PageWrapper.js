import React from 'react'

export default function PageWrapper({cloudy, children}){
	const wrapperOpacity = cloudy ? (cloudy * 0.01) : 0;
	const redValue = ((cloudy+1) / 255) * 255;
	const greenValue = ((cloudy+1) / 150) * 255;
	const blueValue = ((cloudy+1) / 2) * 255;
// set blue value for day?
// dark value for night
// const currentDate = new Date();
// const currentTime = currentDate.getHours();
	return(
		<div style={{
			height: '100%',
			width: '100%',
			minHeight: '100vh',
			minWidth: '100vw',
			backgroundColor: `rgba(0, ${greenValue}, ${blueValue}, ${wrapperOpacity})`
		}}>
			{children}
		</div>
		);
}
import React, { useState } from 'react'
import './WeatherApp.css'
import searchIcon from '../Assets/search.png';
import clearIcon from '../Assets/clear.png';
import cloudIcon from '../Assets/cloud.png';
import drizzleIcon from '../Assets/drizzle.png';
import rainIcon from '../Assets/rain.png';
import snowIcon from '../Assets/snow.png';
import windIcon from '../Assets/wind.png';
import humidityIcon from '../Assets/humidity.png';


function WeatherApp() {

    let api_key = "dd94f859a0e52d6e4767fddf735f04a7";

    let [wicon,setWicon] = useState(cloudIcon);


    const search = async () => {
        const element = document.getElementsByClassName("cityInput");
        
        if(element[0].value === ""){
            return 0;
        }

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

        let responce = await fetch(url);

        let data = await responce.json();

        const humidity = document.getElementsByClassName("humidityPercent");
        const wind = document.getElementsByClassName("windRate");
        const temprature = document.getElementsByClassName("weatherTemp");
        const location = document.getElementsByClassName("weatherLocation");

        humidity[0].innerHTML = data.main.humidity + "%";
        wind[0].innerHTML = Math.floor(data.wind.speed) + "km/h";
        temprature[0].innerHTML = Math.floor(data.main.temp) + "°c";
        location[0].innerHTML = data.name;

        
        if(data.weather[0].icon === "01d" || data.weather[0].icon === "01n" ){
            setWicon(clearIcon);
        }
        else if(data.weather[0].icon === "02d" || data.weather[0].icon === "02n" ){
            setWicon(cloudIcon);
        }
        else if(data.weather[0].icon === "03d" || data.weather[0].icon === "03n" ){
            setWicon(drizzleIcon);
        }
        else if(data.weather[0].icon === "04d" || data.weather[0].icon === "04n" ){
            setWicon(drizzleIcon);
        }
        else if(data.weather[0].icon === "09d" || data.weather[0].icon === "09n" ){
            setWicon(rainIcon);
        }
        else if(data.weather[0].icon === "010d" || data.weather[0].icon === "010n" ){
            setWicon(rainIcon);
        }
        else if(data.weather[0].icon === "013d" || data.weather[0].icon === "013n" ){
            setWicon(snowIcon);
        }
        else{
            setWicon(clearIcon);
        }

    }
    

  return (
    <div className='container'>
        <div className="topBar">
            <input type="text" className='cityInput' placeholder="Search"/>
            <div className="searchIcon" onClick={() => {search()}}>
                <img src={searchIcon} alt="" />
            </div>
        </div>
        <div className="weatherImage">
            <img src={wicon} alt="" className='wImg'/>
        </div>
        <div className="weatherTemp">24°C</div>
        <div className="weatherLocation">London</div>
        <div className="dataContainer">
            <div className="element">
                <img src={humidityIcon} alt="" className="icon" />
                <div className="data">
                    <div className="humidityPercent">64%</div>
                    <div className="text">Humidity</div>
                </div>
            </div>
            <div className="element">
                <img src={windIcon} alt="" className="icon" />
                <div className="data">
                    <div className="windRate">18 km/h</div>
                    <div className="text">Wind Speed</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WeatherApp

import React from 'react';
import {
    UilTemperature,
    UilTear,
    UilWind,
    UilSun,
    UilSunset,
} from '@iconscout/react-unicons';
import { formatToLocalTime, iconUrlFromCode } from '../services/weatherService';

function TemperatureAndDetails({
    weather: {
        details,
        icon,
        temp,
        sunrise,
        sunset,
        speed,
        humidity,
        feels_like,
        timezone,
    },
}) {
    return (
        <div>
            <div className="flex items-center justify-center text-white">
                <p className="text-5xl">{`${temp.toFixed()}°`}</p>
                <img src={iconUrlFromCode(icon)} alt="" className="w-30" />
            </div>
            <div className="flex mb-3 items-center justify-center  text-3xl text-white">
                <p>{details}</p>
            </div>
            <div className="flex mb-3 text-l justify-center space-x-2 text-white text-md">
                <UilSun />
                <p className="text-center font-light">
                    Rise
                    <span className="font-medium ml-2">
                        {formatToLocalTime(sunrise, timezone, 'hh:mma')}
                    </span>
                </p>
                <p className="text-center font-light">
                    Set
                    <span className="font-medium ml-2">
                        {formatToLocalTime(sunset, timezone, 'hh:mma')}
                    </span>
                </p>
                <p className="text-center font-light"></p>
                <UilSunset />
            </div>
            <div className="flex text-l items-center justify-center mb-3 space-x-3 text-white text-md">
                <UilTemperature size={18} className="mr-1" />
                Real fell
                <span className="font-medium ml-1">{`${feels_like.toFixed()}°`}</span>
                <p className="text-center font-light"></p>Humidity
                <span className="font-medium ml-1">{`${humidity.toFixed()}%`}</span>
                <UilTear size={18} className="mr-1" />
            </div>
            <div className="flex text-l items-center justify-center space-x-3 text-white text-md">
                <UilWind size={18} className="mr-1" />
                Wind
                <span className="font-medium ml-1">{`${speed.toFixed()} km/h`}</span>
                <UilWind size={18} className="mr-1" />
            </div>
        </div>
    );
}

export default TemperatureAndDetails;

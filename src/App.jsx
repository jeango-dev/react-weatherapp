import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import Forecast from './components/Forecast';
import Loading from './components/Loading';
import getFormattedWeatherData, {
    iconUrlFromCode,
} from './services/weatherService';
import Swal from 'sweetalert2';

function App() {
    const [query, setQuery] = useState({ q: 'bogota' });
    const [units, setUnits] = useState('metric');
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchWeather = async () => {
            setLoading(true);
            await getFormattedWeatherData({ ...query, units })
                .then((data) => {
                    setWeather(data);
                    setLoading(false);
                })
                .catch((error) =>
                    Swal.fire({
                        title: '¡Sorry!',
                        icon: 'error',
                        text: 'No results found',
                        button: 'Try again',
                    })
                );
            setLoading(false);
        };
        fetchWeather();
    }, [query, units]);

    const formatBackgroundCard = () => {
        if (!weather) return 'from-cyan-500 to-blue-400 h-fit  rounded-lg';
        const threshold = units === 'metric' ? 25 : 79;
        if (weather.temp <= threshold)
            return 'from-cyan-500 to-blue-400 h-fit  rounded-lg';
        return 'from-yellow-500 to-orange-400 h-fit  rounded-lg';
    };

    return (
        <div className="container mx-auto">
            <Row className="justify-content-md-center">
                <Col xl={10} lg={8} md={10} sm={12}>
                    <div
                        className={`mx-auto text-center mt-3 py-2 px-3 bg-gradient-to-br from-cyan-500 to-blue-400 h-fit  rounded-lg`}
                        style={{ opacity: '0.8' }}
                    >
                        <div
                            style={{
                                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                                borderRadius: '10px',
                            }}
                            className={`my-2 pb-2 rounded-lg`}
                        >
                            <div className="nav-logo flex items-center justify-center text-white">
                                <p className="text-white text-center text-4xl font-medium">
                                    WeatherApp
                                </p>
                                <img
                                    className="w-30"
                                    src={iconUrlFromCode('02d')}
                                    alt="Logo"
                                />
                            </div>
                            <TopButtons setQuery={setQuery} />
                            <Inputs
                                setQuery={setQuery}
                                units={units}
                                setUnits={setUnits}
                            />
                        </div>
                    </div>
                </Col>
            </Row>
            <div>
                {loading ? (
                    <Loading />
                ) : (
                    weather && (
                        <div>
                            <Row className="justify-content-md-center">
                                <Col xl={5} lg={8} md={10} sm={12}>
                                    <div>
                                        <div
                                            style={{
                                                backgroundImage: `url(${formatBackgroundCard()})`,
                                                backgroundSize: 'cover',
                                                opacity: '0.9',
                                            }}
                                            className={`my-2 p-3 bg-gradient-to-br ${formatBackgroundCard()} rounded-lg`}
                                        >
                                            <div
                                                style={{
                                                    backgroundColor:
                                                        'rgba(0, 0, 0, 0.4)',
                                                    borderRadius: '10px',
                                                }}
                                                className="py-4"
                                            >
                                                <TimeAndLocation
                                                    weather={weather}
                                                />
                                                <TemperatureAndDetails
                                                    weather={weather}
                                                />
                                                <div>
                                                    <iframe
                                                        className="mx-auto mt-3 rounded"
                                                        title="map"
                                                        src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15905.208849639464!2d${weather.lon}!3d${weather.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sco!4v1658597844873!5m2!1ses!2sco`}
                                                        width="600"
                                                        height="450"
                                                        style={{
                                                            border: 0,
                                                            width: 'auto',
                                                            maxWidth: '250px',
                                                            maxHeight: '250px',
                                                        }}
                                                        allowFullScreen=""
                                                        loading="lazy"
                                                        referrerPolicy="no-referrer-when-downgrade"
                                                    ></iframe>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col xl={5} lg={8} md={10} sm={12}>
                                    <div>
                                        <div
                                            style={{
                                                backgroundImage: `url(${formatBackgroundCard()})`,
                                                backgroundSize: 'cover',
                                                opacity: '0.9',
                                            }}
                                            className={`my-2 p-3 bg-gradient-to-br ${formatBackgroundCard()} rounded-lg`}
                                        >
                                            <div
                                                style={{
                                                    backgroundColor:
                                                        'rgba(0, 0, 0, 0.4)',
                                                    borderRadius: '10px',
                                                }}
                                                className="py-3"
                                            >
                                                <div className="flex items-center mt-2 justify-center">
                                                    <p className="text-white text-3xl font-medium">
                                                        Forecast
                                                    </p>
                                                </div>
                                                <Forecast
                                                    title="hourly forecast"
                                                    items={weather.hourly}
                                                />
                                                <Forecast
                                                    title="daily forecast"
                                                    items={weather.daily}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

export default App;

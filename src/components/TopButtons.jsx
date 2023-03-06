import React from 'react';
import { Row, Col } from 'react-bootstrap';

function TopButtons({ setQuery }) {
    const cities = [
        {
            id: 1,
            title: 'Bogota',
        },
        {
            id: 2,
            title: 'Miami',
        },
        {
            id: 3,
            title: 'Orlando',
        },
        {
            id: 4,
            title: 'New York',
        },
    ];

    return (
        <div>
            <Row className="d-flex justify-content-center mb-3">
                <Col md={10}>
                    <div className="flex justify-content-center">
                        {cities.map((city) => (
                            <button
                                key={city.id}
                                className="mx-auto text-white text-xl font-medium transition ease-out hover:scale-125"
                                onClick={() => setQuery({ q: city.title })}
                            >
                                {city.title}
                            </button>
                        ))}
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default TopButtons;

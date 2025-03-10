import React from 'react';

interface CoordinatesDisplayProps {
    coordinates: [number, number][];
}

const CoordinatesDisplay: React.FC<CoordinatesDisplayProps> = ({ coordinates }) => {
    return (
        <div style={{ position: 'absolute', top: 10, left: 10, backgroundColor: '#fff', padding: '10px', borderRadius: '5px', boxShadow: '0px 4px 6px rgba(0,0,0,0.1)' }}>
            <h3>Координаты кликов</h3>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Долгота</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Широта</th>
                    </tr>
                </thead>
                <tbody>
                    {coordinates.map((coord, index) => (
                        <tr key={index}>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{coord[0].toFixed(6)}</td> {/* долгота */}
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{coord[1].toFixed(6)}</td> {/* широта */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CoordinatesDisplay;
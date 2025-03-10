import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Feature } from 'ol';
import Polygon from 'ol/geom/Polygon';
import { fromLonLat, toLonLat } from 'ol/proj';
import { Style, Fill, Stroke } from 'ol/style';


interface Parking {
    id: number;
    coordinates: [number, number][];
}


interface MapComponentProps {
    parkings: Parking[];
}

const MapComponent: React.FC<MapComponentProps> = ({ parkings }) => {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const mapInstanceRef = useRef<Map | null>(null);

    useEffect(() => {
        if (mapRef.current && !mapInstanceRef.current) {
            //карта
            const map = new Map({
                target: mapRef.current,
                layers: [
                    new TileLayer({
                        source: new OSM(),
                    }),
                ],
                view: new View({
                    center: fromLonLat([37.526286, 55.831216]),
                    zoom: 15,
                }),
            });

            // солой для парковки 
            const vectorSource = new VectorSource();

            // добавление парковок
            parkings.forEach((parking) => {
                const polygonCoordinates = parking.coordinates.map((coord) =>
                    fromLonLat(coord)
                );
                const polygon = new Polygon([polygonCoordinates]);

                const feature = new Feature(polygon);

                feature.setStyle(
                    new Style({
                        fill: new Fill({
                            color: 'rgba(0, 0, 0, 0.5)',
                        }),
                        stroke: new Stroke({
                            color: '#00FF00',
                            width: 5,
                        }),
                    })
                );

                vectorSource.addFeature(feature);
            });

            const vectorLayer = new VectorLayer({
                source: vectorSource,
            });

            map.addLayer(vectorLayer);

            // получаем коорды
            map.on('click', (event) => {
                const clickedCoordinate = toLonLat(event.coordinate);
                console.log('Координаты (в формате OpenLayers):', event.coordinate);
                console.log(
                    `Долгота и широта (WGS84): [${clickedCoordinate[0].toFixed(
                        6
                    )}, ${clickedCoordinate[1].toFixed(6)}]`
                );
            });

            mapInstanceRef.current = map;
        }

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.setTarget(undefined);
                mapInstanceRef.current = null;
            }
        };
    }, [parkings]);

    return <div ref={mapRef} style={{ width: '100%', height: '100vh' }} />;
};

export default MapComponent;

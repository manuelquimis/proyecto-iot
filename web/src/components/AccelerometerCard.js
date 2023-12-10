import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledAccelerometerCard = styled.div`
  background-color: white;
  box-shadow: 2px 2px 12px 1px rgba(140, 140, 140, 0.5);
  padding: 20px;
  text-align: left;
  margin-bottom: 20px;
  margin-top: 20px;
  font-family: "Montserrat", sans-serif;
`;

const AccelerometerTitle = styled.p`
  color: #00795e;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 10px;
  font-family: "Montserrat", sans-serif;
`;

const Reading = styled.p`
  font-size: 1.2rem;
  margin: 10px 0;
  font-family: "Montserrat", sans-serif;
`;

const AccelerometerCard = () => {
  const [accelerometerData, setAccelerometerData] = useState({
    accX: 0,
    accY: 0,
    accZ: 0,
  });

  useEffect(() => {
    const fetchLatestData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/sensor'); // Reemplaza con la URL correcta de tu API
        const data = await response.json();

        // Actualizar el estado con los últimos datos
        if (data.length > 0) {
          const latestAccelerometerData = data[0];
          setAccelerometerData({
            accX: latestAccelerometerData.AccX,
            accY: latestAccelerometerData.AccY,
            accZ: latestAccelerometerData.AccZ,
          });
        }
      } catch (error) {
        console.error('Error fetching latest accelerometer data:', error);
      }
    };

    // Llamada inicial al montar el componente
    fetchLatestData();

    // Establecer un temporizador para actualizar los datos cada 100 milisegundos
    const intervalId = setInterval(() => {
      fetchLatestData();
    }, 1000);

    // Limpiar el temporizador al desmontar el componente
    return () => clearInterval(intervalId);
  }, []);

  return (
    <StyledAccelerometerCard>
      <AccelerometerTitle>Sensor: Acelerómetro</AccelerometerTitle>
      <Reading>X: <span id="accX">{accelerometerData.accX}</span> ms<sup>2</sup></Reading>
      <Reading>Y: <span id="accY">{accelerometerData.accY}</span> ms<sup>2</sup></Reading>
      <Reading>Z: <span id="accZ">{accelerometerData.accZ}</span> ms<sup>2</sup></Reading>
    </StyledAccelerometerCard>
  );
};

export default AccelerometerCard;

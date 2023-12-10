import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledGyroscopeCard = styled.div`
  background-color: white;
  box-shadow: 2px 2px 12px 1px rgba(140, 140, 140, 0.5);
  padding: 20px;
  text-align: left;
  margin-bottom: 20px;
  margin-top: 20px;
  font-family: "Montserrat", sans-serif;
`;

const GyroscopeTitle = styled.p`
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

const GyroscopeCard = () => {
  const [gyroscopeData, setGyroscopeData] = useState({
    gyroX: 0,
    gyroY: 0,
    gyroZ: 0,
  });

  useEffect(() => {
    const fetchLatestData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/sensor'); // Reemplaza con la URL correcta de tu API
        const data = await response.json();

        // Actualizar el estado con los últimos datos
        if (data.length > 0) {
          const latestGyroscopeData = data[0];
          setGyroscopeData({
            gyroX: latestGyroscopeData.GyroX,
            gyroY: latestGyroscopeData.GyroY,
            gyroZ: latestGyroscopeData.GyroZ,
          });
        }
      } catch (error) {
        console.error('Error fetching latest gyroscope data:', error);
      }
    };

    // Llamada inicial al montar el componente
    fetchLatestData();

    // Establecer un temporizador para actualizar los datos cada, por ejemplo, 10 segundos
    const intervalId = setInterval(() => {
      fetchLatestData();
    }, 1000); 

    // Limpiar el temporizador al desmontar el componente
    return () => clearInterval(intervalId);
  }, []);

  return (
    <StyledGyroscopeCard>
      <GyroscopeTitle>Sensor: Giróscopio</GyroscopeTitle>
      <Reading>X: <span id="gyroX">{gyroscopeData.gyroX}</span> rad</Reading>
      <Reading>Y: <span id="gyroY">{gyroscopeData.gyroY}</span> rad</Reading>
      <Reading>Z: <span id="gyroZ">{gyroscopeData.gyroZ}</span> rad</Reading>
    </StyledGyroscopeCard>
  );
};

export default GyroscopeCard;

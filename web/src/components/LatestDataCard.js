// LatestDataCard.js
import React, { useState, useEffect } from "react";
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 20px 150px; /* Ajusta el margen según tus preferencias */
  padding: 5px 50px; /* Ajusta el relleno según tus preferencias */
  border: 1px solid #ccc; /* Añade un borde para visualización */
`;

const StyledTitle = styled.h2`
  margin: 0;
  /* Agrega estilos según tus preferencias para el h2 */
`;

const StyledCount = styled.p`
  margin: 0;
  /* Agrega estilos según tus preferencias para el p */
`;

const LatestDataCard = () => {
  const [latestId, setLatestId] = useState(null);

  useEffect(() => {
    const fetchLatestId = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/sensor");
        const sensorData = await response.json();
        const latestId = sensorData.length > 0 ? sensorData[0].id : null;
        setLatestId(latestId);
      } catch (error) {
        console.error("Error fetching latest ID:", error);
      }
    };

    // Llamar a la función de búsqueda inicial y configurar la actualización periódica (cada segundo, por ejemplo)
    fetchLatestId();
    const intervalId = setInterval(fetchLatestId, 1000);

    // Limpiar el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, []);

  return (
    <StyledContainer>
      {/* <StyledTitle>Último Registrado</StyledTitle> */}
      {latestId !== null ? (
        <StyledCount> <p> <strong> Cantidad de registros obtenidos por el sensor: </strong> {latestId}</p></StyledCount>
      ) : (
        <StyledCount>No hay datos disponibles</StyledCount>
      )}
    </StyledContainer>
    // <div>
    //   <h2>Último Registrado</h2>
    //   {latestId !== null ? (
    //     <p>{latestId}</p>
    //   ) : (
    //     <p>No hay datos disponibles</p>
    //   )}
    // </div>
  );
};

export default LatestDataCard;

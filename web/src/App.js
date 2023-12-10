// App.js
import React, { useState } from "react";
import CardList from "./styles/CardList";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import GyroscopeCard from "./components/GyroscopeCard";
import AccelerometerCard from "./components/AccelerometerCard";
import SensorChart from "./components/SensorChart";
import LatestDataCard from "./components/LatestDataCard"; // Importa el nuevo componente

import styled from "styled-components";
const StyledContainer = styled.div`
  text-align: center;
  margin: 50px 150px; /* Ajusta el margen según tus preferencias */
  padding: 5px 50px; /* Ajusta el relleno según tus preferencias */
  font-family: "Montserrat", sans-serif; /* Ajusta la fuente según tus preferencias */
  border: 1px solid #ccc; /* Añade un borde para visualización */
`;

const StyledHeader = styled.h1`
  margin: 0;
  /* Ajusta estilos según tus preferencias para el h1 */
`;

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // Actualizar el estado para indicar que el usuario ha iniciado sesión
    setLoggedIn(true);
  };

  return (
    <div>
      <Navbar />
      {isLoggedIn ? (
        // Mostrar la aplicación principal si el usuario ha iniciado sesión
        <div>
          <LatestDataCard />
          {/* <div> */}
          <StyledContainer>
            <p>
              {" "}
              <strong>Representación Gráfica de Datos: </strong> Sensor
              Giróscopio{" "}
            </p>
            <SensorChart
              sensorDataKeys={["GyroZ", "GyroY", "GyroX"]}
              label="Gyro"
            />
          </StyledContainer>
          <StyledContainer>
            <p> <strong>Representación Gráfica de Datos: </strong> Sensor Acelerómetro </p>
            <SensorChart
              sensorDataKeys={["AccZ", "AccY", "AccX"]}
              label="Acc"
            />
          </StyledContainer>

          {/* </div> */}

          {/* <StyledContainer> */}
          {/* <p> */}
              {/* {" "} */}
              {/* <strong>Representación Gráfica de Datos: </strong> Sensor */}
              {/* Giróscopio{" "} */}
            {/* </p> */}
          {/* <CardList> */}
            {/* <GyroscopeCard /> */}
            {/* <AccelerometerCard /> */}
            {/* Agrega el componente LatestDataCard */}
            {/* <LatestDataCard /> */}
          {/* </CardList> */}
          {/* </StyledContainer> */}

        </div>
      ) : (
        // Mostrar el formulario de inicio de sesión si el usuario no ha iniciado sesión
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;

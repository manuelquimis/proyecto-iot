// Navbar.js
import styled from "styled-components";

export const StyledNavbar = styled.div`
  // overflow: hidden;
  background-color: #d68910;
  color: #ffffff;
  font-size: 1rem;
  padding: 15px; /* Agrega padding para dar espacio al contenido */
  // text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Montserrat", sans-serif;
`;

export const StyledTitle = styled.h1`
  margin: 0; /* Elimina el margen predeterminado del h1 */
  font-size: 1.5rem; /* Ajusta el tamaño de la fuente según sea necesario */
  font-family: "Montserrat", sans-serif;
`;

export const StyledLogo = styled.img`
  width: 200px; /* Ajusta el tamaño según tus preferencias */
  height: auto;
  margin-right: 10px; /* Agrega un margen derecho para separar la imagen del texto */
  font-family: "Montserrat", sans-serif;
`;

// Resto del componente Navbar
const Navbar = () => {
  return (
    <StyledNavbar>
      <StyledLogo
          src="https://moodledanu.uleam.edu.ec/pluginfile.php/1/theme_klass/logo/1701869356/logo_ULEAM_2017_horizontal_blanco.png"
          alt="ULEAM Logo"
        />
      <StyledTitle>
        <i className=""></i>PROYECTO DE IOT <i className="far fa-compass"></i>
      </StyledTitle>
      <StyledTitle>
        <StyledLogo
          src="https://moodledanu.uleam.edu.ec/pluginfile.php/1/theme_klass/logo/1701869356/logo_ULEAM_2017_horizontal_blanco.png"
          alt="ULEAM Logo"
        />
      </StyledTitle>
    </StyledNavbar>
  );
};

export default Navbar;

import {
  ButtonLogin,
  ButtonRegister,
  ContainerNav,
  SectionLogo,
  SectionRegister,
} from "./styles";

const NavBar: React.FC = () => {
  const handleLogout = () => {
    // Limpe o token JWT do localStorage
    localStorage.removeItem("jwtToken");
    // Redirecione o usuário para a página de login
    window.location.href = "/login";
  };

  return (
    <ContainerNav>
      <SectionLogo>
        <a href="/">
          <h1>Test Inmeta</h1>
        </a>
      </SectionLogo>
      <SectionRegister>
        <a href="/login">
          <ButtonLogin>Login</ButtonLogin>
        </a>
        <a href="/login">
          <ButtonLogin onClick={handleLogout}>Logout</ButtonLogin>
        </a>
        <a href="/register">
          <ButtonRegister>Register</ButtonRegister>
        </a>
      </SectionRegister>
    </ContainerNav>
  );
};

export default NavBar;

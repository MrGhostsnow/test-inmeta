import {
  ButtonLogin,
  ButtonRegister,
  ContainerNav,
  SectionLogo,
  SectionRegister,
} from "./styles";

const NavBar: React.FC = () => {
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
        <a href="/register">
          <ButtonRegister>Register</ButtonRegister>
        </a>
      </SectionRegister>
    </ContainerNav>
  );
};

export default NavBar;

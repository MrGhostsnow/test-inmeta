import React from "react";
import { useState, useEffect } from "react";
import {
  ButtonLogin,
  ButtonRegister,
  ContainerNav,
  SectionLogo,
  SectionRegister,
} from "./styles";

interface ButtonLoginProps {
  href: string;
  onClick?: () => void;
  children: React.ReactNode;
}

const CustomButtonLogin: React.FC<ButtonLoginProps> = ({
  href,
  onClick,
  children,
}) => {
  return (
    <a href={href}>
      <ButtonLogin onClick={onClick}>{children}</ButtonLogin>
    </a>
  );
};

const NavBar: React.FC = () => {
  const handleLogout = () => {
    // Limpe o token JWT do localStorage
    localStorage.removeItem("jwtToken");
    // Redirecione o usuário para a página de login
    window.location.href = "/login";
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <ContainerNav>
      <SectionLogo>
        <a href="/">
          <h1>Test Inmeta</h1>
        </a>
      </SectionLogo>
      <SectionRegister>
        {isLoggedIn ? (
          <>
            <CustomButtonLogin href="/trade-form">Trade</CustomButtonLogin>
            <ButtonLogin onClick={handleLogout}>Logout</ButtonLogin>
          </>
        ) : (
          <>
            <CustomButtonLogin href="/login">Login</CustomButtonLogin>
            <CustomButtonLogin href="/register">Register</CustomButtonLogin>
          </>
        )}
      </SectionRegister>
    </ContainerNav>
  );
};

export default NavBar;

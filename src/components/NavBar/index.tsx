import React from "react";
import { useState, useEffect } from "react";
import {
  ButtonLogin,
  ButtonRegister,
  ContainerNav,
  SectionLogo,
  SectionRegister,
} from "./styles";
import { CgProfile } from "react-icons/cg";
import { TbLogout } from "react-icons/tb";

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

const CustomButtonRegister: React.FC<ButtonLoginProps> = ({
  href,
  onClick,
  children,
}) => {
  return (
    <a href={href}>
      <ButtonRegister onClick={onClick}>{children}</ButtonRegister>
    </a>
  );
};

const NavBar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    window.location.href = "/login";
  };

  return (
    <ContainerNav>
      <SectionLogo>
        <a href="/">
          <h1>Trade Cards</h1>
        </a>
      </SectionLogo>
      <SectionRegister>
        {isLoggedIn ? (
          <>
            <CustomButtonLogin href="/trade-form">Trade</CustomButtonLogin>
            <CustomButtonRegister href="/profile">
              <CgProfile />
            </CustomButtonRegister>
            <ButtonRegister onClick={handleLogout}>
              <TbLogout />
            </ButtonRegister>
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

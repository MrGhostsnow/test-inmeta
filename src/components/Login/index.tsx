import React, { useState } from "react";
import axios from "axios";
import {
  ContainerLogin,
  SectionFormLogin,
  TitleLogin,
  ContainerForm,
  FormLogin,
  InputLogin,
  ButtonLogin,
} from "./styles";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://cards-marketplace-api.onrender.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to login");
      }

      const data = await response.json();
      const token = data.token;
      const user = data.user;
      console.log("Login successful");
      console.log("JWT token:", token);
      console.log("User:", user);

      // Armazenar o token JWT no localStorage para autenticação futura
      localStorage.setItem("jwtToken", token);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <ContainerLogin>
      <SectionFormLogin>
        <TitleLogin>Login</TitleLogin>
        <FormLogin onSubmit={handleLogin}>
          <ContainerForm>
            <InputLogin
              type="email"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <InputLogin
              type="password"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </ContainerForm>
          <ButtonLogin type="submit">Login</ButtonLogin>
        </FormLogin>
      </SectionFormLogin>
    </ContainerLogin>
  );
};

export default Login;

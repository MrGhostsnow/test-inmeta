import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

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

      // Redirecionar o usuário para a página de perfil após o login bem-sucedido
      navigate("/profile");
    } catch (error) {
      console.error("Login failed:", error);
      setError("Failed to login. Please check your credentials and try again.");
    }
  };

  return (
    <ContainerLogin>
      <SectionFormLogin>
        <TitleLogin>Login</TitleLogin>
        {error && <p>{error}</p>}
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

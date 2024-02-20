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
import { login } from "../../api/loginApi";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await login(email, password);
      localStorage.setItem("jwtToken", token);
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
        <FormLogin onSubmit={handleLogin}>
          <ContainerForm>
            <InputLogin
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              placeholder="Email"
              required
            />
            <InputLogin
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              placeholder="Password"
              required
            />
          </ContainerForm>
          <ButtonLogin type="submit">Login</ButtonLogin>
        </FormLogin>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </SectionFormLogin>
    </ContainerLogin>
  );
};

export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ContainerRegister,
  SectionFormRegister,
  TitleRegister,
  FormRegister,
  InputRegister,
  ButtonRegister,
} from "./styles";

const Register: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://cards-marketplace-api.onrender.com/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to register user");
      }

      const data = await response.json();
      const userId = data.userId;
      console.log("Registration successful, userId:", userId);

      // Redirecionar para a página de perfil após o registro bem-sucedido
      navigate("/profile");
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Failed to register user. Please try again later.");
    }
  };

  return (
    <ContainerRegister>
      <SectionFormRegister>
        <TitleRegister>Register</TitleRegister>
        {error && <p>{error}</p>}
        <FormRegister onSubmit={handleRegister}>
          <InputRegister
            type="text"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            placeholder="Name"
            required
          />
          <InputRegister
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            placeholder="Email"
            required
          />
          <InputRegister
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            placeholder="Password"
            required
          />
          <ButtonRegister type="submit">Register</ButtonRegister>
        </FormRegister>
      </SectionFormRegister>
    </ContainerRegister>
  );
};

export default Register;

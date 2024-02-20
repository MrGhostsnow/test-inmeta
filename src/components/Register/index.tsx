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
import { registerUser } from "../../api/registerApi";

const Register: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userId = await registerUser(name, email, password);
      console.log("Registration successful, userId:", userId);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Failed to register user. Please try again later.");
    }
  };

  return (
    <ContainerRegister>
      <SectionFormRegister>
        <TitleRegister>Register</TitleRegister>
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
      {error && <p style={{ color: "red" }}>{error}</p>}
    </ContainerRegister>
  );
};

export default Register;

import React, { useState } from "react";
import axios from "axios";
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
        throw new Error("Registration failed");
      }

      const data = await response.json();
      const userId = data.userId;
      console.log("Registration successful, userId:", userId);
    } catch (error) {
      console.error("Registration failed:", error);
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
    </ContainerRegister>
  );
};

export default Register;

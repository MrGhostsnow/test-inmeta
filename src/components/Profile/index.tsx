import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Obtenha o token JWT do localStorage
        const token = localStorage.getItem("jwtToken");
        if (!token) {
          throw new Error("JWT token not found in localStorage");
        }

        // Configure o cabeçalho de autorização com o token JWT
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // Faça a solicitação GET para a rota /me com o cabeçalho de autorização
        const response = await axios.get(
          "https://cards-marketplace-api.onrender.com/me",
          { headers }
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUserProfile();
  }, []);

  console.log("user", user);

  return (
    <div>
      <h2>Profile</h2>
      {user && (
        <div>
          <h3>Name: {user.name}</h3>
          <p>Email: {user.email}</p>
          <h4>Owned Cards:</h4>
          <div>
            {user.cards.map((card: any) => (
              <div key={card.id}>
                <h5>{card.name}</h5>
                <p>{card.description}</p>
                <img src={card.imageUrl} alt={card.name} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

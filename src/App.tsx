import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import CardList from "./components/CardList";
import TradeList from "./components/TradeList";
import TradeForm from "./components/TradeForm";
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";

const App: React.FC = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cards" element={<CardList />} />
        <Route path="/trades" element={<TradeList />} />
        <Route path="/trade-form" element={<TradeForm />} />
        <Route path="/" element={<TradeList />} />
      </Routes>
    </Router>
  );
};

export default App;

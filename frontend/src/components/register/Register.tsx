import './register.css'

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/user", {
        name,
        email,
        password,
      });

      setMessage("Usuário cadastrado com sucesso!");
      setTimeout(() => navigate("/login"), 2000); // Redireciona para login após 2s
    } catch (error) {
      setMessage("Erro ao criar usuário. Verifique os dados e tente novamente.");
      console.error("Erro ao criar usuário:", error);
    }
  };

  return (
    <div className="register-container">
      <h1>Registrar</h1>
      <form onSubmit={handleRegister} className="register-form">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome"
          required
          className="input-field"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="input-field"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          required
          className="input-field"
        />
        <button type="submit" className="submit-btn">Registrar</button>
      </form>
      {message && <p>{message}</p>}
      <p onClick={() => navigate("/login")}>Já tem uma conta? Faça login</p>
    </div>
  );

};

export default Register;

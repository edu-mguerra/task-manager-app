import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { } from "../taskForm/task";

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/login', {
        email,
        password,
      });

      setMessage('Login bem-sucedido!');
      console.log('Login bem-sucedido:', response.data);
      localStorage.setItem('userId', response.data.user.id);



      setTimeout(() => {
        navigate('../taskForm/task');
      }, 2000);


    } catch (error) {
      setMessage('Erro ao fazer login. Verifique suas credenciais.');
      console.error('Erro ao fazer login:', error);
    }
  };

  const handleCreateUser = () => {
    navigate('/register')
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <p className='createU' onClick={handleCreateUser}>Criar usuarios</p>
      <button type="submit">Login</button>
      {message && <p>{message}</p>}
    </form>
  );
};

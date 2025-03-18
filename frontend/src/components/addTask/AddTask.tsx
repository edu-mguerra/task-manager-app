import { useState } from 'react';
import axios from 'axios';
import './AddTask.css';
import { useNavigate } from 'react-router-dom'; // Importando o hook useNavigate

export const AddTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [redirectToTasks, setRedirectToTasks] = useState(false); // Estado para controle de redirecionamento
  const userId = localStorage.getItem('userId'); // Recupera o userId do localStorage

  const navigate = useNavigate(); // Usando o hook useNavigate

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (userId) {
      axios.post('http://localhost:3000/tasks', { title, description, userId })
        .then((response) => {
          alert('Tarefa adicionada com sucesso!');
        })
        .catch((error) => {
          console.error('Erro ao adicionar a tarefa:', error);
        });
    }
  };

  const handleTask = () => {
    setRedirectToTasks(true);
  };

  if (redirectToTasks) {
    navigate('/taskForm/task');
    return null;
  }
  return (
    <div className="add-task-container">
      <h1 className="add-task-title">Adicionar Tarefa</h1>
      <form onSubmit={handleSubmit} className="add-task-form">
        <div className="input-group">
          <label htmlFor="title" className="input-label">Título:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="description" className="input-label">Descrição:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-field"
            required
            maxLength={150}
          />
          <p>{200 - description.length} caracteres restantes</p>
        </div>
        <button type="submit" className="submit-btn">Salvar</button>
        <button type="button" onClick={handleTask} className="submit-btn">Tarefas</button>
      </form>
    </div>
  );
}

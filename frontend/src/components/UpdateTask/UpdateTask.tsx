
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UpdateTask.css'
export const UpdateTask = () => {
  const { id } = useParams<{ id: string }>(); // Pega o ID da tarefa da URL
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);

  // Carregar os dados da tarefa quando o componente for montado
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3000/tasks/${id}`) // Substitua com a URL da sua API
        .then((response) => {
          setTitle(response.data.title);
          setDescription(response.data.description);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Erro ao carregar a tarefa:', error);
          setLoading(false);
        });
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Enviar a tarefa atualizada para a API
    const updatedTask = { title, description };

    axios
      .patch(`http://localhost:3000/tasks/${id}`, updatedTask)
      .then(() => {
        navigate('/taskForm/task');
      })
      .catch((error) => {
        console.error('Erro ao atualizar a tarefa:', error);
      });
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="add-task-container">
      <h1 className="add-task-title">Atualizar Tarefa</h1>
      <form onSubmit={handleSubmit} className="add-task-form">
        <div className="input-group">
          <label htmlFor="title" className="input-label">Novo Título:</label>
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
          <label htmlFor="description" className="input-label">Nova Descrição:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-field"
            required
            maxLength={150}
          />
        </div>
        <button type="submit" className="submit-btn">Salvar</button>
      </form>
    </div>
  );
};

export default UpdateTask;

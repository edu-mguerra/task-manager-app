import { useEffect, useState } from 'react';
import axios from 'axios';
import './AddTask.css';
import { useNavigate } from 'react-router-dom';

export const AddTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [categories, setCategories] = useState<any[]>([]);
  const [redirectToTasks, setRedirectToTasks] = useState(false);
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/categories')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Erro ao carregar as categorias:', error);
      });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (userId && categoryId) {
      axios.post('http://localhost:3000/tasks', { title, description, userId, categoryId, dueDate })

        .then((response) => {
          alert('Tarefa adicionada com sucesso!');
          setTitle('');
          setDescription('');
          setCategoryId('');
          setDueDate('');
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

        {/* Campo de Seleção de Categoria */}
        <div className="input-group">
          <label htmlFor="category" className="input-label">Categoria:</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="input-field"
            required
          >
            <option value="">Selecione uma Categoria</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Campo para a Data Limite */}
        <div className="input-group">
          <label htmlFor="dueDate" className="input-label">Data Limite:</label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="input-field"
            required
          />
        </div>

        <button type="submit" className="submit-btn">Salvar</button>
        <button type="button" onClick={handleTask} className="submit-btn">Tarefas</button>
      </form>
    </div>
  );
};

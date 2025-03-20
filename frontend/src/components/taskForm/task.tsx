import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './task.css';

export const TaskList = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<any[]>([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:3000/tasks/${userId}`)
        .then((response) => {
          console.log(response.data)
          setTasks(response.data);
        })
        .catch((error) => {
          console.error('Erro ao carregar as tarefas:', error);
        });
    }
  }, [userId]);

  const handleAddTask = () => {
    navigate('/addTask');
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/login');
  };

  const handleDeleteTask = (id: string) => {
    axios.delete(`http://localhost:3000/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== id));
      })
      .catch((error) => {
        console.error('Erro ao deletar a tarefa:', error);
      });
  };

  const handleUpdateTask = (id: string) => {
    navigate(`/updateTask/${id}`);
  };

  return (
    <>
      <div className="task-list-container">
        <h1>Tarefas</h1>
        <div className='scroll'>
          <ul>
            {tasks.map((task) => (
              <li key={task.id} className="task-item">
                <h3>{task.title}</h3>
                <p>{task.description}</p>


                {task.Category && (
                  <p><strong>Categoria:</strong> {task.Category.name}</p>
                )}

                {task.dueDate && (
                  <p><strong>Data Limite:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
                )}

                <div className="task-actions">
                  <div className="trash" onClick={() => handleDeleteTask(task.id)}>
                    🗑️ Deletar
                  </div>
                  <div className="update" onClick={() => handleUpdateTask(task.id)}>
                    ✏️ Atualizar
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="action-buttons">
        <button onClick={handleAddTask} className="action-btn">Adicionar Tarefa</button>
        <button onClick={handleLogout} className="action-btn">Sair</button>
      </div>
    </>
  );
};

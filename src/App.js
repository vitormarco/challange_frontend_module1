import React, { useState, useEffect, useCallback } from 'react';

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    try {
      const response = await api.post('/repositories', {
        title: `New repository ${Date.now()}`,
        url: 'https://github.com/vitormarco',
        techs: []
      })

      const { data } = response;

      setRepositories([...repositories, data]);

    } catch (error) {
      console.log(error)
    }
  }

  async function handleRemoveRepository(id) {
    try {
      const response = await api.delete(`/repositories/${id}`);

      if (response.status === 204) {
        const index = repositories.findIndex(repo => repo.id = id);

        if (index !== -1) {
          const newRepositories = [...repositories];
          newRepositories.splice(index, 1);
          setRepositories(newRepositories);
        }
      }

    } catch (error) {
      console.log(error);
    }
  }

  const listAllRepositories = useCallback(async () => {
    try {
      const getRepositories = await api.get('/repositories');
      const { data } = getRepositories;

      setRepositories(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    listAllRepositories();
  }, [listAllRepositories]);

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map(repo => (
          <li key={repo.id}>
            { repo.title }
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

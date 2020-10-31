import React, { useState, useEffect, useCallback } from 'react';

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [repositoriesText, setRepositoriesText] = useState('Carregando repositórios...')

  async function handleAddRepository() {
    // TODO
  }

  async function handleRemoveRepository(id) {
    // TODO
    console.log(id)
  }

  const listAllRepositories = useCallback(async () => {
    try {
      const getRepositories = await api.get('/repositories');
      const { data } = getRepositories;

      setRepositories(data);

      if (!data) {
        setRepositoriesText('Nenhum repositório encontrado');
      }

    } catch (error) {
      setRepositoriesText('Tivemos um problema ao carregar os repositórios');
    }
  }, []);

  useEffect(() => {
    listAllRepositories();
  }, [listAllRepositories]);

  const listRepositories = repositories.length > 0 ? (
    repositories.map(repo => (
      <li key={repo.id}>
        { repo.title }
        <button onClick={() => handleRemoveRepository(repo.id)}>
          Remover
        </button>
      </li>
    ))) : <li>{ repositoriesText }</li>; 

  return (
    <div>
      <ul data-testid="repository-list">
        { listRepositories }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

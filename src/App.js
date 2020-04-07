import React, {useState, useEffect} from "react";
import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const repository = await api.post("repositories", {
      title: 'title',
      url: "url",
      techs: [],
    });

    console.log(repository);
    setRepositories([...repositories, repository.data]);
  }

  async function handleRemoveRepository(id) {
    
    const result = await api.delete(`repositories/${id}`);

    const repositoryIndex = repositories.findIndex(repository => repository.id === id);
    repositories.splice(repositoryIndex, 1);
    setRepositories([...repositories]);
  }

  useEffect(() => {
    api.get("repositories").then(response => {
      setRepositories(response.data);
    })
  }, [])

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.length > 0 && repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
          </li>
        )) }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

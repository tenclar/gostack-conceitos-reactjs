import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function loadResp() {
      const response = await api.get("repositories");
      setRepositories(response.data);
    }
    loadResp();
  }, []);

  async function handleAddRepository() {
    const resp = await api.post("repositories", {
      title: "Titulo",
      url: "http://www.github.com/tenclar",
      techs: ["nodejs", "reactjs"],
    });

    setRepositories([...repositories, resp.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const repository = repositories.filter((r) => r.id !== id);
    setRepositories(repository);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

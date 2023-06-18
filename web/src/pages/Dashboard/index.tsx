import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import api from "../../services/api";
import { DashboardContainer } from "./styles";

interface Dados {
  id: string;
  name: string;
  description: string;
  category: string;
  contact: string;
  latitude: string;
  longitude: string;
  user: object;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [stores, setStores] = useState<Dados[]>([]);
  const [release, setRelease] = useState(false)
  const userId = user?.id;

  const getStores = () => {
    api.get(`/user/${userId}`).then((res) => {
      console.log(res.data);
      setStores(res.data.stores);
    });
  };

  const deleteDocument = (id: string) => {
    api.delete(`/store/${id}`).then((res) => {
      console.log(res.data);
      getStores(); // Atualiza os stores após a remoção do documento
    });
  };
  

  useEffect(() => {
    getStores();
  }, [stores]);

  return (
    <DashboardContainer>
      <h2>Dashboard</h2>
      <p>Gerencie seus stores</p>
      {stores && stores.length === 0 ? (
        <div className="nostores">
          <p>Não Foram encontrados stores</p>
          <Link to="/new" className="btn">
            Criar Primeiro Post
          </Link>
        </div>
      ) : (
        <>
          <div className="post_header">
            <span>Título</span>
            <span className="span">Ação</span>
          </div>
          {stores &&
            stores.map((post, id) => (
              <div key={id} className="post_row">
                <p>{post.name}</p>
                <div>
                  <Link
                    to={`/barberdetail/${post.id}`}
                    className="btn btn-outline"
                  >
                    Ver
                  </Link>

                  <Link
                    to={`/stores/edit/${post.id}`}
                    className="btn btn-outline"
                  >
                    Editar
                  </Link>

                  <button
                    onClick={() => deleteDocument(post.id)}
                    className="btn btn-outline btn-danger"
                  >
                    Deletar
                  </button>
                </div>
              </div>
            ))}
        </>
      )}
    </DashboardContainer>
  );
};

export default Dashboard;

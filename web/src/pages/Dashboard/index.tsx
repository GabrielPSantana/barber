import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import api from "../../services/api";
import { DashboardContainer } from "./styles";
import { useToastMessage } from "../../hooks/useToast";

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
  const [release, setRelease] = useState(false);
  const { setToastMessage } = useToastMessage();
  const userId = user?.id;

  const getStores = async () => {
    await api.get(`/user/${userId}`).then((res) => {
      console.log(res.data);
      setStores(res.data.stores);
    });
  };

  const deleteDocument = async (id: string, name: string) => {
    await api
      .delete(`/store/${id}`)
      .then((res) => {
        console.log(res.data);
        setToastMessage(`${name} foi deletado!`, "warning")
        getStores();
      })
      .catch((error) => {
        setToastMessage(error.message , "error")
      });
    // Atualiza os stores após a remoção do documento
  };

  useEffect(() => {
    getStores();
  }, [release]);

  return (
    <DashboardContainer>
      <h2>Dashboard</h2>
      <p>Gerencie seus Barbearias</p>
      {stores && stores.length === 0 ? (
        <div className="nostores">
          <p>Não Foram encontrados Barbearias</p>
          <Link to="/new" className="btn">
            Criar sua Primeira Barbearia
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
                    to={`/store/edit/${post.id}`}
                    className="btn btn-outline"
                  >
                    Editar
                  </Link>

                  <button
                    onClick={() => deleteDocument(post.id, post.name)}
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

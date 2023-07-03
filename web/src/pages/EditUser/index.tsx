import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAuth } from "../../contexts/auth";
import { FormStyled, Container } from "./styles";

import Input from "../../components/Input";
import api from "../../services/api";
import { useToastMessage } from "../../hooks/useToast";

const Update = () => {
  const { signOut } = useAuth();

  const { setToastMessage } = useToastMessage();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const params = useParams();

  const getUser = async (id: string) => {
    await api
      .get(`/user/${id}`)
      .then((res) => {
        const user = res.data;
        console.log(res.status);

        const updateUser = {
          name: user.name,
          email: user.email,
          password: "",
          confirmPassword: "",
        };
        setUser(updateUser);
      })
      .catch((erro) => {
        navigate("/");
        console.log(erro);
      });
  };

  const updateUser = async (id: string) => {
    await api
      .put(`/user/${id}`, {
        name: user.name,
        email: user.email,
        password: user.password,
      })
      .then((res) => {
        console.log(res.data);
        setToastMessage(res.data.message, "success");
        navigate("/");
      })
      .catch((erro) => {
        console.log(erro);
        setToastMessage(erro.response.data.message, "error");
      });
  };

  const deleteUser = async (id: string) => {
    await api
      .delete(`/user/${id}`)
      .then((res) => {
        setToastMessage("Usuário Deletado", "warning");
        signOut();
      })
      .catch((erro) => {
        setToastMessage(erro.response.data.message, "error");
      });
  };

  const handleDelete = () => {
    const id = params.id ? params.id : "";
    deleteUser(id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      setToastMessage("As senhas não são iguais", "error");
      return;
    }

    const id = params.id ? params.id : "";
    updateUser(id);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const id = params.id ? params.id : "";
    getUser(id);
  }, []);

  return (
    <Container>
      <FormStyled>
        <h1>Editar usuário</h1>
        <form onSubmit={handleSubmit}>
          <Input
            label="Nome"
            name="name"
            value={user.name}
            onChange={handleChange}
          />

          <Input
            label="E-mail"
            name="email"
            value={user.email}
            onChange={handleChange}
          />

          <Input
            label="Senha"
            name="password"
            value={user.password}
            onChange={handleChange}
            type="password"
          />

          <Input
            label="Confirme Senha"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleChange}
            type="password"
          />
          <input type="submit" value="Editar" />
        </form>
        <p>
          Deseja excluir seu usuário{" "}
          <button onClick={handleDelete}>Clique aqui</button>
        </p>
      </FormStyled>
    </Container>
  );
};

export default Update;

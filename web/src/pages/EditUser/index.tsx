import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAuth } from "../../contexts/auth";
import { FormStyled, Container } from "./styles";

import Input from "../../components/Input";
import api from "../../services/api";

const Update = () => {
  const { handleSignUp, signOut } = useAuth();
  const [message, setMessage] = useState("");
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
        const user = res.data
        console.log(res.status)
        
        const updateUser = {
          name: user.name,
          email: user.email,
          password: '',
          confirmPassword:'',
        }
        setUser(updateUser)
      })
      .catch((erro) =>{
        navigate('/')
        console.log(erro)
      })
  }

  const updateUser = async (id: string) => {
    await api
      .put(`/user/${id}`, {
        "name": user.name,
        "email": user.email,
        "password": user.password,
      })
      .then(()=> {
        toast.success('Usuário Atualizado !')
      })
      .catch((erro) =>{
        navigate('/')
        console.log(erro)
      })
  }

  const deleteUser = async (id: string) => {
    await api
      .delete(`/user/${id}`)
      .then(()=> {
        toast.success('Usuário Deletado!')
        signOut();
      })
      .catch((erro) =>{
        toast.error('Exclua suas barbearias antes')
      })
  }

  const handleDelete = () => {
    const id = params.id ? params.id : '';
    deleteUser(id)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      setMessage("As senhas não são iguais");
      return;
    }

    const id = params.id ? params.id : '';
    updateUser(id)
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(()=> {
    const id = params.id ? params.id : '';
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
          />

          <Input
            label="Confirme Senha"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleChange}
          />
          <span>{message}</span>
          <input type="submit" value="Editar" />
        </form>
        <p>
          Deseja excluir seu usuário <button onClick={handleDelete}>Clique aqui</button> 
        </p>
      </FormStyled>
    </Container>
  );
};

export default Update;

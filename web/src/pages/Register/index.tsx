import { useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../contexts/auth";
import { FormStyled, Container } from "./styles";

import Input from "../../components/Input";
import { useToastMessage } from "../../hooks/useToast";

const Register = () => {
  const { handleSignUp } = useAuth();
  const {setToastMessage} = useToastMessage()
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      setToastMessage("As senhas não são iguis", "error")
      return;
    }

    const newUser = {
      name: user.name,
      email: user.email,
      password: user.password,
    };
    handleSignUp(newUser);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <FormStyled>
        <h1>Register</h1>
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
          <input type="submit" value="Entrar" />
        </form>
        <p>
          Já tem conta? <Link to={"/"}>Clique aqui</Link>
        </p>
      </FormStyled>
    </Container>
  );
};

export default Register;

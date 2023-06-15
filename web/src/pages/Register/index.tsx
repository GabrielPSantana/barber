import { useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../contexts/auth";
import { FormStyled, Container } from "./styles";

import Input from "../../components/Input";

const Register = () => {
  const { handleSignUp } = useAuth();
  const [message, setMessage] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      setMessage("As senhas não são iguais");
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
          />

          <Input
            label="Confirme Senha"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleChange}
          />
          <span>{message}</span>
          <input type="submit" value="Entrar" />
        </form>
        <p>
          Não tem conta? <Link to={"/register"}>Clique aqui</Link>
        </p>
      </FormStyled>
    </Container>
  );
};

export default Register;

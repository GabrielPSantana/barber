import { useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../contexts/auth";
import { FormStyled, Container } from "./styles";
import Input from "../../components/Input";

const Login = () => {
  const { handleSignIn } = useAuth();
  const [user, setUser] = useState({ email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSignIn(user);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <FormStyled>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />

          <Input
            label="Password"
            name="password"
            value={user.password}
            type="password"
            onChange={handleChange}
          />

          <input type="submit" value="Entrar" />
        </form>
        <p>
          Não tem conta? <Link to={"/register"}>Clique aqui</Link>
        </p>
      </FormStyled>
    </Container>
  );
};

export default Login;

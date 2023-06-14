import { styled } from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: url("./home-background.svg") no-repeat 700px bottom;
  background-color: ${(props) => props.theme.background};
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const FormStyled = styled.section`
  width: 300px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;

  form {
    width: 100%;
  }

  input[type="submit"] {
    border-radius: 8px;
    color: #fff;
    min-height: 100px;
    min-height: 2.5em;
    background-color: #25b456;
    width: 100%;
    cursor: pointer;
    font-size: 1.1em;
    font-weight: bold;
  }

  input[type="submit"]:hover {
    background-color: #1c8a42;
  }

  h1 {
    font-size: 3em;
    margin-bottom: 1em;
    font-weight: bold;
  }

  p {
    margin-top: 1em;
  }
  p a {
    color: #16479d;
    font-weight: bold;
  }
`;

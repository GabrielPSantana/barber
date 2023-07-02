import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 1.5em;
  width: 100%;
`;

export const InputStyled = styled.input`
  border: 1px solid;
  margin-top: .5em;
  padding: 5px 10px;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  border-radius: 8px;
  height: 28px;
  font-size: 1em;
  outline: 0;
`;

import { Container, InputStyled } from "./style";
import React, { ChangeEvent } from "react";

interface InputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ label, name, value, onChange }: InputProps) => {
  return (
    <Container>
      <label>{label}</label>
      <InputStyled
        required
        name={name}
        value={value}
        onChange={onChange}
      />
    </Container>
  );
};

export default Input;

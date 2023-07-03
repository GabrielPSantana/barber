import { InputType } from "zlib";
import { Container, InputStyled } from "./style";
import React, { ChangeEvent } from "react";

interface InputProps {
  label: string;
  name: string;
  value: string;
  type?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ label, name, value, onChange, type }: InputProps) => {
  return (
    <Container>
      <label>{label}</label>
      <InputStyled
        required
        name={name}
        value={value}
        onChange={onChange}
        type={type ? type : "text"}
      />
    </Container>
  );
};

export default Input;

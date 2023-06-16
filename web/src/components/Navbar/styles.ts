import { styled } from "styled-components";

export const NavContainer = styled.nav`
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.15) 0px -2px 10px 0px;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em 2em;

  .brand {
    font-size: 1.2em;
    text-decoration: none;
    background-color: none;
  }

  .brand span {
    font-weight: 900;
    text-transform: uppercase;
  }

  .links_list {
    display: flex;
    list-style: none;
    margin-right: 1em;
    flex-direction: row;
    align-items: center;
  }

  .links_list li a {
    padding: 0.4em 0.6em;
    text-decoration: none;
  }

  .active {
    background-color: #000;
    color: #fff;
  }

  a,
  button {
    text-decoration: none;
    background-color: transparent;
    border: none;
    color: var(--color-black);
    transition: 0.4s;
    font-size: 1em;
    cursor: pointer;
    font-family: "Montserrat", sans-seri;
  }

  a:hover,
  nav button:hover {
    color: #bbb;
  }
`;

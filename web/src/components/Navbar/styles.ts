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

  @media screen and (max-width: 1024px) {
    font-size: 80%;
    white-space: nowrap;
  }

  @media screen and (max-width: 700px) {
    font-size: 80%;
    white-space: nowrap;

    .links_list {
      margin-right: 0px;
    }

    .links_list li a {
      padding: 0.4em 0.6em;
      text-decoration: none;
    }
  }

  @media screen and (max-width: 600px) {
    font-size: 50%;

    .links_list li a {
      padding: 0.4em 0.6em;
    }
    
    .brand {
      font-size: 1em;
    }
  }
`;

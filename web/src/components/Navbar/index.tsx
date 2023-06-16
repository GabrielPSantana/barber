import { useAuth } from "../../contexts/auth";
import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import { NavContainer } from "./styles";

const Navbar = () => {
  const { signOut, user } = useAuth();

  return (
    <NavContainer>
      <NavLink to={"/"}  className={({ isActive }) => (isActive ? "brand" : "brand")} end>
        Get <span>Barber</span>
      </NavLink>
      <ul className="links_list">
        <li>
          <NavLink
            to={"/"}
            className={({ isActive }) => (isActive ? "active" : "")}
            end
          >
            Home
          </NavLink>
        </li>
        {user && (
          <>
            <li>
              <NavLink
                to={"/new"}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Cadastrar Barbearia{" "}
              </NavLink>
            </li>

            <li>
              <NavLink
                to={"/everybarber"}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Localizar Barbearia
              </NavLink>
            </li>
          </>
        )}
        {!user && (
          <>
            <li>
              <NavLink
                to={"/register"}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Cadastrar
              </NavLink>
            </li>
          </>
        )}

        {user && (
          <li>
            <button onClick={signOut}>Sair</button>
          </li>
        )}
      </ul>
    </NavContainer>
  );
};

export default Navbar;

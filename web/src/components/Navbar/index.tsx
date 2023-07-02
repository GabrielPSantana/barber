import { useAuth } from "../../contexts/auth";
import styles from "./Navbar.module.css";
import { Link, NavLink } from "react-router-dom";
import { NavContainer } from "./styles";

const Navbar = () => {
  const { signOut, user } = useAuth();

  return (
    <NavContainer>
      <Link
        to={"/"}
        className="brand"
      >
        Get <span>Barber</span>
      </Link>
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
                to={"/dashboard"}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Dashboard
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
                to={"/everybarber"}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Localizar Barbearia
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/login"}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Login
              </NavLink>
            </li>
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

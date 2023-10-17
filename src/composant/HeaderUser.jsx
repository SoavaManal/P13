import { NavLink } from "react-router-dom";
import "../css/main.css";
import argentBankLogo from "../asset/argentBankLogo.png";
import { store } from "../index";
import {setToken} from "../actions/jwt";

export default function HeaderUser() {
  const handleOut = () => {
    localStorage.removeItem("token");
    store.dispatch(setToken(null));
  };
  return (
    <nav className="main-nav">
      <NavLink className="main-nav-logo" to="/home">
        <img
          className="main-nav-logo-image"
          src={argentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      <div>
        <NavLink className="main-nav-item" to="/home" >
          <i className="fa fa-user-circle"></i>
          Tony
        </NavLink>
        <NavLink className="main-nav-item" to="/home" onClick={handleOut}>
          <i className="fa fa-sign-out"></i>
          Sign Out
        </NavLink>
      </div>
    </nav>
  );
}
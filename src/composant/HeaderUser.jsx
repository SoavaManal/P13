import { NavLink } from "react-router-dom";
import "../css/main.css";
import argentBankLogo from "../asset/argentBankLogo.png";
import { setToken } from "../reducers/jwt.reducer";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../reducers/user.reducer";

export default function HeaderUser() {
  const token = useSelector((state) => state.authReducer.token);
  const firstName = useSelector((state) => state.userReducer.user?.firstName);
  const dispatch = useDispatch();
  const handleOut = () => {
    localStorage.removeItem("token");
    dispatch(setToken(null));
    dispatch(setUser(null));
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
      {token ? (
        <div>
          <NavLink className="main-nav-item" to="/home">
            <i className="fa fa-user-circle"></i>
            {firstName}
          </NavLink>
          <NavLink className="main-nav-item" to="/home" onClick={handleOut}>
            <i className="fa fa-sign-out"></i>
            Sign Out
          </NavLink>
        </div>
      ) : (
        <NavLink className="main-nav-item" to="/user/login">
          <i className="fa fa-user-circle"></i>
          Sign In
        </NavLink>
      )}
    </nav>
  );
}

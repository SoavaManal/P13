import { useNavigate } from "react-router-dom";
import { setToken } from "../reducers/jwt.reducer";
import Footer from "../composant/Footer";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Header from "../composant/Header";

export default function SignIn() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState(false);

  // checkbox function
  const handleCheckbox = () => {
    setRemember(!remember);
  };
  const navigate = useNavigate();
  // Submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    // POST request
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/user/login",
        request
      );
      if (!response.ok) {
        setError("Incorrect Username or Password");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setError("");
      console.log("Réponse du serveur :", data.body.token);
      dispatch(setToken(data.body.token));
      if (remember) {
        localStorage.setItem("token", data.body.token);
      }
      navigate("/user/profile");
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération des données :",
        error
      );
    }
  };
  return (
    <>
      <Header />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                onInput={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                onInput={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <p className="error">{error}</p>
            </div>
            <div className="input-remember">
              <input
                type="checkbox"
                id="remember-me"
                onClick={handleCheckbox}
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>

            <button type="submit" className="sign-in-button">
              Sign In
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}

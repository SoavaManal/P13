import { useNavigate } from "react-router-dom";
import { store } from "..";
import { setToken } from "../actions/jwt";
import Footer from "../composant/Footer";
import Header from "../composant/Header";
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

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
        "Content-Type": "application/json", // Type de contenu JSON
      },
      body: JSON.stringify(data),
    };
    const result = fetch("http://localhost:3001/api/v1/user/login", request)
      .then((response) => {
        if (!response.ok) {
          document.querySelector(".error").innerHTML =
            "Incorrect Username or Password";
          throw new Error("Erreur HTTP " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        document.querySelector(".error").innerHTML = "";
        console.log("Réponse du serveur :", data.body.token);
        store.dispatch(setToken(data.body.token));
        if (remember) {
          localStorage.setItem("token", data.body.token);
        }
        navigate("/user/profile");
      })
      .catch((error) => {
        console.error("Erreur lors de la requête :", error);
      });
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
              <p className="error"></p>
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

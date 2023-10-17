import { useEffect, useState } from "react";
import Footer from "../composant/Footer";
import HeaderUser from "../composant/HeaderUser";
import Wrapper from "../composant/Wrapper";
import "../css/main.css";
// import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {store}from ".."
import {setUser} from "../actions/jwt"

export default function Profile() {
  // récuperer le token depuis Redux
  const token=useSelector(state=>state.authReducer.token)
  console.log(token);
  // const navigate = useNavigate();
  const request = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    console.log(request)
    const getProfile = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/v1/user/profile",
          request
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log(response)
        const data = await response.json();
        store.dispatch(setUser(data.body))
        console.log(data.body)
        return data.body
      } catch (error) {
        console.error(
          "Une erreur s'est produite lors de la récupération des données :",
          error
        );
       
      }
    };
    console.log(getProfile());
  }, []);

  return (
     
      <>
      <HeaderUser />
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            Tony Jarvis!
          </h1>
          <button className="edit-button">Edit Name</button>
        </div>
        <h2 className="sr-only">Accounts</h2>

        <Wrapper
          header="Argent Bank Checking (x8349)"
          firsttext="$2,082.79"
          secondetext="Available Balance"
          button="View transactions"
        />
        <Wrapper
          header="Argent Bank Savings (x6712)"
          firsttext="$10,928.42"
          secondetext="Available Balance"
          button="View transactions"
          />
          <Wrapper
          header="Argent Bank Credit Card (x8349)"
          firsttext="$184.30"
          secondetext="Current Balance"
          button="View transactions"
          />
          </main>
          <Footer />
          </>
        
  );
}

import { useEffect } from "react";
import Footer from "../composant/Footer";
import HeaderUser from "../composant/HeaderUser";
import Wrapper from "../composant/Wrapper";
import "../css/main.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setUser,
  updateFirstname,
  updateLastname,
} from "../reducers/user.reducer";
import { useState } from "react";

export default function Profile() {
  const token = useSelector((state) => state.authReducer.token);
  const [isEdit, setIsEdit] = useState(false);
  const [firstNameUp, setFirstNameUp] = useState();
  const [lastNameUp, setLastNameUp] = useState();
  const dispatch = useDispatch();
  const handleForum = () => {
    setIsEdit(true);
  };
  const handleSave = (e) => {
    e.preventDefault();
    const requestPut = {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ firstName:firstNameUp, lastName:lastNameUp }),
    };
    fetch("http://localhost:3001/api/v1/user/profile", requestPut)
      .then((response) => response.json())
      .then((data) => {
        dispatch(updateFirstname(firstNameUp));
        dispatch(updateLastname(lastNameUp));
        setIsEdit(false); 
      });
  };
  const handleCancel = () => {
    setIsEdit(false);
    console.log(isEdit);
  };
  useEffect(() => {
    const getProfile = async () => {
      const requestPost = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await fetch(
          "http://localhost:3001/api/v1/user/profile",
          requestPost
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log(response);
        const data = await response.json();
        dispatch(setUser(data.body));
        console.log(data.body);
        return data.body;
      } catch (error) {
        console.error(
          "Une erreur s'est produite lors de la récupération des données :",
          error
        );
      }
    };
    console.log(getProfile());
  }, []);
  const firstName = useSelector((state) => state.userReducer.user?.firstName);
  const lastName = useSelector((state) => state.userReducer.user?.lastName);
  console.log(firstName);
  console.log(lastName);
  return (
    <>
      <HeaderUser />
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {firstName} {lastName}
          </h1>
          {isEdit ? (
            <form onSubmit={handleSave}>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onInput={(e) => setFirstNameUp(e.target.value)}
              />
              <input
                type="text"
                id="lastName"
                value={lastName}
                onInput={(e) => setLastNameUp(e.target.value)}
              />
              <button type="submit">Save</button>
              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
            </form>
          ) : (
            ""
          )}
          <button className="edit-button" onClick={() => handleForum()}>
            Edit Name
          </button>
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

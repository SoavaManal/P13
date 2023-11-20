import { useEffect } from "react";
import Footer from "../composant/Footer";
import Header from "../composant/Header";
import Wrapper from "../composant/Wrapper";
import "../css/main.css";
import { useDispatch, useSelector } from "react-redux";
import { setUser, updateName } from "../reducers/user.reducer";
import { useState } from "react";

export default function Profile() {
  const token = useSelector((state) => state.authReducer.token);
  const [isEdit, setIsEdit] = useState(false);
  const [firstNameUp, setFirstNameUp] = useState("");
  const [lastNameUp, setLastNameUp] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const handleForum = () => {
    setIsEdit(true);
  };
  const handleSave = async (e) => {
    e.preventDefault();
    if (!firstNameUp.trim() || !lastNameUp.trim()) {
      setError("fields are required.");
      return;
    }
    setError("");
    const requestPut = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ firstName: firstNameUp, lastName: lastNameUp }),
    };
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        requestPut
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      dispatch(updateName({ firstName: firstNameUp, lastName: lastNameUp }));
      setIsEdit(false);
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération des données :",
        error
      );
    }
  };
  const handleCancel = () => {
    setIsEdit(false);
    setError("");
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
        const data = await response.json();
        dispatch(setUser(data.body));
        setFirstNameUp(data.body.firstName)
        setLastNameUp(data.body.lastName)
        return data.body;
      } catch (error) {
        console.error(
          "Une erreur s'est produite lors de la récupération des données :",
          error
        );
      }
    };
    console.log(getProfile());
  }, [dispatch, token]);
  const firstName = useSelector((state) => state.userReducer.user?.firstName);
  const lastName = useSelector((state) => state.userReducer.user?.lastName);
  return (
    <>
      <Header />
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {isEdit ? "" : `${firstName} ${lastName}`}
          </h1>
          {isEdit ? (
            <form onSubmit={handleSave} className="formUp">
              <div className="formInput">
                <input
                  type="text"
                  id="firstName"
                  defaultValue={firstName}
                  onChange={(e) => setFirstNameUp(e.target.value)}
                />
                <input
                  type="text"
                  id="lastName"
                  defaultValue={lastName}
                  onChange={(e) => setLastNameUp(e.target.value)}
                />
                <p className="error">{error}</p>
              </div>
              <div className="formBtn">
                <button type="submit">Save</button>
                <button type="button" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            ""
          )}
          {isEdit ? (
            ""
          ) : (
            <button className="edit-button" onClick={() => handleForum()}>
              Edit Name
            </button>
          )}
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

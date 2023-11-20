import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Home from "./page/Home";
import SignIn from "./page/SignIn";
import User from "./page/User";
import { useSelector } from "react-redux";

export default function App() {
  const tokenStore = useSelector((state) => state.authReducer.token);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/user/login" element={<SignIn />} />
        <Route
          path="/user/profile"
          element={tokenStore ? <User /> : <Navigate to="/home" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

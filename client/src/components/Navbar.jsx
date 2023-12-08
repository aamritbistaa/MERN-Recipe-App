import React from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };
  return (
    <div className="navbar-wrapper">
      <Link to="/">Home</Link>
      <Link to="/create">Create</Link>

      {!cookies.access_token ? (
        <Link to="/auth">Login/Register</Link>
      ) : (
        <>
          <Link to="/saved-recipies">Saved</Link>
          <button
            onClick={logout}
            style={{
              padding: "8px 10px",
              fontSize: 16,
              fontWeight: 600,
              backgroundColor: "red",
              color: "white",
              border: "none",
              // letterSpacing: "1px",
            }}>
            logout
          </button>
        </>
      )}
    </div>
  );
};

export default Navbar;

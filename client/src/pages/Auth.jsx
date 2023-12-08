import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
const Auth = () => {
  const [choice, setChoice] = useState(true);
  return (
    <div className="auth-wrapper">
      {choice ? (
        <Login setChoice={setChoice} />
      ) : (
        <Register setChoice={setChoice} />
      )}
    </div>
  );
};

export default Auth;

const Register = ({ setChoice }) => {
  const [data, setData] = useState({
    username: "",
    password: "",
    name: "",
  });
  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/auth/register", {
        data,
      });
      alert(res.data.message);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <button type="submit">Submit</button>

        <div>
          Already have an account ?
          <span onClick={() => setChoice(true)}>Login</span>
        </div>
      </form>
    </div>
  );
};
const Login = ({ setChoice }) => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/auth/login", {
        data,
      });
      if (res.data.message) {
        alert(res.data.message);
      } else {
        setCookies("access_token", res.data.token);
        window.localStorage.setItem("userID", res.data.userID);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>

        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <button type="submit">Submit</button>

        <div>
          Don't have an account?
          <span onClick={() => setChoice(false)}>signup</span>
        </div>
      </form>
    </div>
  );
};

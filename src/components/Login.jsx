import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true, // Ensure cookies are sent with the request
        }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  return (
    <div className="flex items-center justify-center my-10">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title mb-4">Login</h2>
          <div className="form-control w-full max-w-xs mb-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              placeholder="Enter your email"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs mb-4">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs mb-4">
            <button
              className="btn btn-primary w-full"
              onClick={handleLogin}
              disabled={!emailId || !password}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

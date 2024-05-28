import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearErrors, register } from "../components/redux/actions/userAction";
import { IoIosEyeOff } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import toast from "react-hot-toast";

const Registration = () => {
  const [name, setName] = useState("");
  const [dateOfBirth, setdateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(name, dateOfBirth, email, password, navigate));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, error, isAuthenticated, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-teal-400 to-blue-500">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <div className="mb-3 text-center flex items-center justify-center flex-col">
          <h2 className="text-xl  flex items-center justify-center font-semibold text-[#00B6B5] mb-3 -mt-11 w-36 h-11 bg-[rgb(0,245,225)]">
            SIGN UP
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="w-full p-2 text-gray-900 bg-gray-200 rounded"
              type="text"
              id="name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="dob">
              Date of birth
            </label>
            <input
              className="w-full p-2 text-gray-900 bg-gray-200 rounded"
              type="date"
              id="dob"
              required
              value={dateOfBirth}
              onChange={(e) => setdateOfBirth(e.target.value)}
              placeholder="Select dob"
            />
          </div>{" "}
          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full p-2 text-gray-900 bg-gray-200 rounded"
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email id"
            />
          </div>
          <div className="mb-6">
            <label className="block text-white mb-2" htmlFor="password">
              Create Password
            </label>
            <div className="flex items-center justify-center">
              <input
                className="w-full p-2 text-gray-900 bg-gray-200 rounded"
                type={showPassword ? "text" : "password"}
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                placeholder="Enter Password"
              />
              {showPassword ? (
                <FaEye
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute text-xl translate-x-36"
                />
              ) : (
                <IoIosEyeOff
                  className="absolute text-xl translate-x-36"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
          </div>
          <div className="flex items-center justify-end mb-4 gap-1">
            <span className="text-white">Already have an account?</span>
            <Link
              to="/login"
              className="text-teal-200 hover:text-teal-400 hover:underline"
              title="not implemented"
            >
              Sign In
            </Link>
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[rgb(0,245,225)] hover:bg-teal-300 text-[#00B6B5] font-bold rounded"
            >
              REGISTRAION
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;

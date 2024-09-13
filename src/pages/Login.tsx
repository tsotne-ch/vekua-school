import React from "react";
import { Helmet } from "react-helmet";
import { signInWithEmailAndPassword } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { auth } from "../firebase/firebase.config";

const Login = () => {
  const navigate = useNavigate();

  const onLogin = (e: any) => {
    e.preventDefault();

    signInWithEmailAndPassword(
      auth,
      e.target.email.value,
      e.target.password.value
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Swal.fire({
          icon: "error",
          title: "შეცდომა",
          text: "ელ-ფოსტა ან პაროლი არასწორია",
        });
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div className="h-dvh flex justify-center items-center">
      <Helmet>
        <title>Admin</title>
      </Helmet>
      <div className="w-full">
        <form onSubmit={onLogin} className="max-w-2xl mx-auto">
          <div className="inline-block p-1 rounded-full bg-white mb-3">
            <img src="/vekua_simplified.png" className="w-20 " />
          </div>
          <p className="mb-5 dark:text-white">
            Vekua application admin panel (CMS)
          </p>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              required
              name="email"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              name="password"
            />
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

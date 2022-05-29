import DarkModeSwitcher from "@/components/dark-mode-switcher/Main";
import React from 'react';
import dom from "@left4code/tw-starter/dist/js/dom";
import logoUrl from "@/assets/images/logo.svg";
import illustrationUrl from "@/assets/images/illustration.svg";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { signin } from "../../../redux/actions/auth";
import { useLocation, useNavigate } from 'react-router-dom';

function Main() {

  const history = useNavigate();

  useEffect(() => {
    dom("body").removeClass("main").removeClass("error-page").addClass("login");
  }, []);

  const dispatch = useDispatch();

  const [values, setValues] = useState({
    email: "",
    password: ""
  })

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    if(value) {
      setValues((state) => ({
        ...state,
        [name]: value
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values)
    if(values.email !== "" && values.password !== "") {
      dispatch(signin(values, history));
    }
  }

  React.useEffect(() => {
    const tokens = window.localStorage.getItem("token");
    if(tokens) {
      history("/")
    }
  }, [])

  return (
    <>
      <div>
        <DarkModeSwitcher />
        <div className="container sm:px-10">
          <div className="block grid-cols-2 gap-4 xl:grid">
            {/* BEGIN: Login Info */}
            <div className="flex-col hidden min-h-screen xl:flex">
              <a href="" className="flex items-center pt-5 -intro-x">
                <img
                  alt="Midone Tailwind HTML Admin Template"
                  className="w-6"
                  src={logoUrl}
                />
                <span className="ml-3 text-lg text-white"> Rubick </span>
              </a>
              <div className="my-auto">
                <img
                  alt="Midone Tailwind HTML Admin Template"
                  className="w-1/2 -mt-16 -intro-x"
                  src={illustrationUrl}
                />
                <div className="mt-10 text-4xl font-medium leading-tight text-white -intro-x">
                  A few more clicks to <br />
                  sign in to your account.
                </div>
                <div className="mt-5 text-lg text-white -intro-x text-opacity-70 dark:text-slate-400">
                  Manage all your e-commerce accounts in one place
                </div>
              </div>
            </div>
            {/* END: Login Info */}
            {/* BEGIN: Login Form */}
            <form type="submit" onSubmit={handleSubmit}>
              <div className="flex h-screen py-5 my-10 xl:h-auto xl:py-0 xl:my-0">
                <div className="w-full px-5 py-8 mx-auto my-auto bg-white rounded-md shadow-md xl:ml-20 dark:bg-darkmode-600 xl:bg-transparent sm:px-8 xl:p-0 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto">
                  <h2 className="text-2xl font-bold text-center intro-x xl:text-3xl xl:text-left">
                    Sign In
                  </h2>
                  <div className="mt-2 text-center intro-x text-slate-400 xl:hidden">
                    A few more clicks to sign in to your account. Manage all your
                    e-commerce accounts in one place
                  </div>
                  <div className="mt-8 intro-x">
                    <input
                      type="text"
                      name="email"
                      onChange={handleInputChange}
                      className="block px-4 py-3 intro-x login__input form-control"
                      placeholder="Email"
                    />
                    <input
                      type="password"
                      name="password"
                      className="block px-4 py-3 mt-4 intro-x login__input form-control"
                      placeholder="Password"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex mt-4 text-xs intro-x text-slate-600 dark:text-slate-500 sm:text-sm">
                    <div className="flex items-center mr-auto">
                      <input
                        id="remember-me"
                        type="checkbox"
                        className="mr-2 border form-check-input"
                      />
                      <label
                        className="cursor-pointer select-none"
                        htmlFor="remember-me"
                      >
                        Remember me
                      </label>
                    </div>
                    <a href="">Forgot Password?</a>
                  </div>
                  <div className="mt-5 text-center intro-x xl:mt-8 xl:text-left">
                    <button className="w-full px-4 py-3 align-top btn btn-primary xl:w-32 xl:mr-3">
                      Login
                    </button>
                    <button className="w-full px-4 py-3 mt-3 align-top btn btn-outline-secondary xl:w-32 xl:mt-0">
                      Register
                    </button>
                  </div>
                  <div className="mt-10 text-center intro-x xl:mt-24 text-slate-600 dark:text-slate-500 xl:text-left">
                    By signin up, you agree to our
                    <a className="text-primary dark:text-slate-200" href="">
                      Terms and Conditions
                    </a>
                    &
                    <a className="text-primary dark:text-slate-200" href="">
                      Privacy Policy
                    </a>
                  </div>
                </div>
              </div>
            </form>
            {/* END: Login Form */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;

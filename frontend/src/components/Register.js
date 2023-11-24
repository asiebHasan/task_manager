import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate,Link } from "react-router-dom";

import { register } from '../actions/auth'

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirm_password] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state) => state.auth);
    const { message } = useSelector((state) => state.message);

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
        setPasswordsMatch(password === confirm_password);
    };

    const onChangeConfirmPassword = (e) => {
        const confirm_password = e.target.value;
        setConfirm_password(confirm_password);
        setPasswordsMatch(password === confirm_password);
    };

    const handleRegister = (e) => {
        e.preventDefault();
        if (username || email || passwordsMatch ){
            dispatch(register(username, email, password, confirm_password))
        }

    };

    return (
        <div className="flex flex-col items-center justify-center px-6 py-4 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-dark rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign Up
                    </h1>
                    <form
                        className="space-y-4 md:space-y-6"
                        onSubmit={handleRegister}
                    >
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Your username
                            </label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                value={username}
                                onChange={onChangeUsername}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="username"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Your username
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={email}
                                onChange={onChangeEmail}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="email"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={password}
                                onChange={onChangePassword}
                                placeholder="password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Password
                            </label>
                            <input
                                type="password"
                                name="confirm_password"
                                id="confirm_password"
                                value={confirm_password}
                                onChange={onChangeConfirmPassword}
                                placeholder="confirm password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                            />
                            <span className={`mt-2 ${passwordsMatch? "hidden" : ""} text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block`}>
                                Password does not match
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <a
                                href="#"
                                className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                            >
                                Forgot password?
                            </a>
                        </div>
                        <button
                            type="submit"
                            className={`w-full bg-blue-500 ${passwordsMatch ? "": "opacity-50 cursor-not-allowed"} hover:bg-blue-700 focus:ring-4 text-white font-bold py-2 px-4 border border-blue-700 rounded`}
                            disabled={!passwordsMatch}
                        >
                            Sign In
                        </button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Already have an account?{" "}
                            <Link
                                to={'/login'}
                                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                            >
                                Sign In
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;

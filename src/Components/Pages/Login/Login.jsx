// helmet
import { HelmetFunc } from "../../Utils/Helmet/Helmet";
// react router
import { Link, useLocation, useNavigate } from "react-router-dom";
// picture
import LoginLogo from "../../../assets/Photo/login_side_pic.svg"
import LoginIcon from "../../../assets/Photo/login.ico"
import { useContext, useState } from "react";
import { AuthContext } from "../../../ContextStorage/FirebaseContext";
import Swal from "sweetalert2";


// class variable
const labelClass = "block text-sm font-medium text-gray-700 dark:text-zinc-200";

const Login = () => {
    const {logInOldUser} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || "/";

    // handle error statement
    const [error, setError] = useState("");

    // handle Submit
    const handleLogin = (e) => {
        setError("");
        // auto reload off
        e.preventDefault();
        const form = e.target;
        // get email & password value
        const email = form.email.value;
        const password = form.password.value;
        logInOldUser(email, password)
        .then((user) =>{
            Swal.fire("Log In Successful.");
            navigate(from);
        })
        .catch(err =>{
            const formattedError = err?.code?.split("/")[1] || "Something Worng";
            setError(formattedError);
        });
        // fresh input field
        // form.reset();
    }

    return (
        <div className="w-full p-3">
            {/* helmet */}
            {HelmetFunc("Login")}
            <Link className="yuji-mai-regular text-[14px] md:text-[16px]">Login</Link>


            {/* login Form */}
            <div className="mt-5 h-14 w-14">
                <img src={LoginIcon} alt="logo" />
            </div>
            <section className="mt-10 md:mt-20 md:flex min-h-32">
                {/* info div */}
                <div className="w-full md:w-[50%] mb-5">
                    <p className="text-red-500 mb-4 font-bold">{error}</p>
                    {/* form */}
                    <form
                        onSubmit={handleLogin}
                        className="xl:grid grid-cols-2 gap-3 md:mr-3">
                        <div className="mb-5">
                            <label className={labelClass}>
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-4 py-2 mt-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your email"
                                required
                                autoComplete="username"
                            />
                        </div>
                        <div className="mb-5">
                            <label className={labelClass}>
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="w-full px-4 py-2 mt-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your password"
                                required
                                autoComplete="current-password"
                            />
                        </div>
                        <button
                            type="submit"
                            className="col-span-2 w-full mt-5 px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                        >
                            Login
                        </button>
                    </form>
                    <p className="mt-4 text-sm text-center text-gray-600">
                        Don't have an account?{" "}
                        <Link to={"/register"} className="text-blue-500 hover:underline"
                        state={{from}}>
                            Register here
                        </Link>
                    </p>
                </div>
                {/* icon div */}
                <div className="flex justify-center w-full md:w-[50%]">
                    <img src={LoginLogo} alt='' className="h-full" />
                </div>
            </section>
        </div>
    )
};
export default Login
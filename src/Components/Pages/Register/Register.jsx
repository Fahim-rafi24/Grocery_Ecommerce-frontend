// helmet
import { HelmetFunc } from "../../Utils/Helmet/Helmet";
// react router
import { Link } from "react-router-dom";
// picture
import LoginLogo from "../../../assets/Photo/login_side_pic.svg"
import LoginIcon from "../../../assets/Photo/login.ico"
// context
import { useContext, useState } from "react";
import { AuthContext } from "../../../ContextStorage/FirebaseContext";


// class variable
const labelClass = "block text-sm font-medium text-gray-700 dark:text-zinc-200";

const Register = () => {
    // auth
    const { signNewUser } = useContext(AuthContext);

    // state
    const [err, setError] = useState("");
    const [success, setSuccess] = useState("");

    // handle Submit
    const handleSignUp = (e) => {
        // auto reload off
        e.preventDefault();
        setSuccess("");
        setError("");
        const form = e.target;
        // get email & password value
        const first_name = form.first_name.value;
        const last_name = form.last_name.value;
        const email = form.email.value;
        const password = form.password.value;
        if (!first_name.trim() || !last_name.trim()) {
            setError("Give All Info Properly");
            return;
        }
        if (!(password.length > 5)) {
            setError("Password should be at least 6 characters");
            return;
        }
        // firebase call
        signNewUser(email, password)
            .then(res => {
                setSuccess("Sign Up Successfully")
                // fresh input field
                form.reset();
                console.log(res.user)
            })
            .catch(error => {
                const formattedError = error?.code?.split("/")[1] || "Something Worng";
                setError(formattedError);
            })
    }

    return (
        <div className="w-full p-3">
            {/* helmet */}
            {HelmetFunc("Register")}
            <Link className="yuji-mai-regular text-[14px] md:text-[16px]">Register</Link>


            {/* login Form */}
            <div className="mt-5 h-14 w-14">
                <img src={LoginIcon} alt="logo" />
            </div>
            <section className="mt-10 md:mt-20 md:flex min-h-32">
                {/* info div */}
                <div className="w-full md:w-[50%]">
                    {/* form */}
                    <p className="mb-6 text-green-500 font-bold">{success}</p>
                    <p className="mb-6 text-red-500 font-bold">{err}</p>
                    <form
                        onSubmit={handleSignUp}
                        className="xl:grid grid-cols-2 gap-3 md:mr-3">
                        {/* name */}
                        <div className="mb-5">
                            <label className={labelClass}>
                                First Name
                            </label>
                            <input
                                type="text"
                                id="first_name"
                                className="w-full px-4 py-2 mt-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your first name"
                                required
                            />
                        </div>
                        <div className="mb-5">
                            <label className={labelClass}>
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="last_name"
                                className="w-full px-4 py-2 mt-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your last name"
                                required
                            />
                        </div>
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
                            Sign Up
                        </button>
                    </form>
                    <p className="mt-4 mb-7 text-sm text-center text-gray-600">
                        Have already an account?{" "}
                        <Link to={"/login"} className="text-blue-500 hover:underline">
                            Login
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
export default Register
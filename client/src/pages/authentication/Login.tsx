import { Link } from "react-router-dom";

function Login() {

    // const [ email, setEmail ] = useState();

    return ( 
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-5 m-auto bg-white rounded-md shadow-md lg:max-w-md">
                <h1 className="text-3xl font-semibold text-center text-red-700">
                Sign in
                </h1>
                <form className="mt-6 px-6">
                    <div className="mb-4">
                        <label
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            className="block w-full px-4 py-2 mt-2 bg-white border rounded-md  focus:outline-none"
                        />
                    </div>
                    <div className="mt-6">
                        <button className="rounded-full w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-700 hover:bg-red-600 focus:outline-none focus:bg-red-600">
                            Login
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="font-medium text-red-600 hover:underline"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
     );
}

export default Login;
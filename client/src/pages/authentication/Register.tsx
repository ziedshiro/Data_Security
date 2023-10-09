import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {

    const [acceptedPrivacyPolicy, setAcceptedPrivacyPolicy] = useState(false);

    const navigate = useNavigate();

    const togglePrivacyPolicyAcceptance = () => {
        setAcceptedPrivacyPolicy(!acceptedPrivacyPolicy);
      };

    const handleRegistrationSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    
        if (acceptedPrivacyPolicy) {
          navigate("/")
        } else {
          alert('Please accept both terms & conditions and privacy policy to register.');
        }
      };

    return ( 
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-5 m-auto bg-white rounded-md shadow-md lg:max-w-md">
                <h1 className="text-3xl font-semibold text-center text-red-700">
                Register
                </h1>
                <form className="mt-6 px-6" onSubmit={handleRegistrationSubmit}>
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
                            First Name
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
                            Last Name
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
                    <div className="mb-4">
                        <label className="flex items-center">
                        <input
                            type="checkbox"
                            className="mr-3"
                            checked={acceptedPrivacyPolicy}
                            onChange={togglePrivacyPolicyAcceptance}
                        />
                        I accept the Privacy Policy
                        </label>
                    </div>
                    <div className="my-6">
                        {acceptedPrivacyPolicy?(
                            <button 
                                type="submit" 
                                className="rounded-full w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-700 hover:bg-red-600 focus:outline-none focus:bg-red-600"
                            >
                                Register
                            </button>
                        ) : (
                            <button 
                                type="submit" 
                                className="rounded-full w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-300"
                                disabled
                            >
                                    Register
                            </button>
                        )}
                    </div>
                </form>

            </div>
        </div>
     );
}

export default Register;
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFormik } from 'formik';
import { useMFACodeQuery,useRegisterMutation } from "../../store";
import { Button } from "@material-tailwind/react";
import Modal from "../../components/Modal";
import User from '../../Model/User';
import * as yup from 'yup';


function Register() {
    const [register,registerResult] = useRegisterMutation();
    const navigate = useNavigate();
    const [onOpen,setOnOpen] = useState(false);
    const [seconds, setSeconds] = useState(30);
    const [userData,setUserData] = useState<any>([]);

    const validationSchema = yup.object().shape({
        userId: yup
            .string()
            .email('Please enter correct email.')
            .required('Email is required.'),
        firstname: yup
            .string()
            .min(8,'Firstname must be at least 8 characters.')
            .max(15,'Firstname can contain up to 18 characters.')
            .required('Firstname is require'),
        lastname: yup
            .string()
            .min(8,'Lastname must be at least 8 characters.')
            .max(15,'Lastname can contain up to 18 characters.')
            .required('Lastname is require'),
        password: yup
            .string()
            .min(8, 'Password must be at least 8 characters.')
            .max(18, 'Passwords can contain up to 18 characters.') // Changed 15 to 18
            .matches(
                /^(?=.*[a-zA-Z])(?=.*\d)/,
                'Password must contain at least one character and one number'
            )
            .required('Password is required.'),
    
    });

    const formik = useFormik({
        initialValues: {
            userId: '',
            firstname:'',
            lastname:'',
            password: '',
        },
        validationSchema: validationSchema,
        validateOnBlur:false,
        validateOnChange:false,
        onSubmit: (values) => {
            // Manually validate the form on submission
            validationSchema
              .validate(values, { abortEarly: false }) // abortEarly: false ensures that all validation errors are collected
              .then( async () => {
                if (acceptedPrivacyPolicy) {
                    setUserData(values);
                    setOnOpen(!onOpen);
                  } else {
                    alert('Please accept both terms & conditions and privacy policy to register.');
                  }
              })
              .catch((errors) => {
                // Validation failed, set the form errors
                formik.setErrors(errors.inner.reduce((acc:any, error:any) => {
                  acc[error.path] = error.message;
                  return acc;
                }, {}));
              });
          },
    });

    const [acceptedPrivacyPolicy, setAcceptedPrivacyPolicy] = useState(false);

    const togglePrivacyPolicyAcceptance = () => {
        setAcceptedPrivacyPolicy(!acceptedPrivacyPolicy);
      };

    const handleRegistrationSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formElement = e.target as HTMLFormElement;
        const inputElement = formElement.querySelector('[name="codeTwoFactorAuthentication"]') as HTMLInputElement;
        const inputValue = inputElement.value;
        const user = {
            userId:userData.userId,
            firstname:userData.firstname,
            lastname:userData.lastname,
            password:userData.password,
            codeTwoFactorAuthentication: inputValue,
            secretCode:MFAresult.data?.secret
        }
        await register(user);
        console.log(registerResult);
        
        
        
      };

    return ( 
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-5 m-auto bg-white rounded-md shadow-md lg:max-w-md">
                <h1 className="text-3xl font-semibold text-center text-red-700">
                Register
                </h1>
                <form className="mt-6 px-6" onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            type="text"
                            id="userId"
                            name="userId"
                            onChange={formik.handleChange}
                            value={formik.values.userId}
                            className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:outline-none"
                        />
                        {formik.errors.userId ? (
                            <div className="text-red-500 text-xs">{formik.errors.userId}</div>
                        ) : null}
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-sm font-semibold text-gray-800"
                        >
                            First Name
                        </label>
                        <input
                            id="firstname"
                            name="firstname"
                            onChange={formik.handleChange}
                            value={formik.values.firstname}
                            type="text"
                            className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:outline-none"
                        />
                        {formik.errors.firstname ? (
                            <div className="text-red-500 text-xs">{formik.errors.firstname}</div>
                        ) : null}
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            onChange={formik.handleChange}
                            value={formik.values.lastname}
                            className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:outline-none"
                        />
                        {formik.errors.lastname ? (
                            <div className="text-red-500 text-xs">{formik.errors.lastname}</div>
                        ) : null}
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            className="block w-full px-4 py-2 mt-2 bg-white border rounded-md  focus:outline-none"
                        />
                    </div>
                    {formik.errors.password ? (
                        <div className="text-red-500 text-xs mb-3">{formik.errors.password}</div>
                    ) : null}
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
                <Modal open={onOpen} setOpen={setOnOpen} title="MFA Code">
                    <h1>Timer: {seconds} seconds</h1>
                    <img src={MFAresult.data?.uri} alt="mfaImage"/>
                    <form onSubmit={handleRegistrationSubmit}>
                        <label
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Code
                        </label>
                        <input
                            type="text"
                            id="codeTwoFactorAuthentication"
                            name="codeTwoFactorAuthentication"
                            className="block w-full px-4 py-2 mt-2 bg-white border rounded-md  focus:outline-none"
                        />
                          <Button className="mt-3" color="green" type="submit">verify</Button>
                    </form>
                </Modal>
            </div>
        </div>
     );
}

export default Register;
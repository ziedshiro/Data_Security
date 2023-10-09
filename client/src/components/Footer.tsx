import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer
            className="bg-red-600 text-center text-white lg:text-left">

         
            <div className="mx-6 py-10 text-center md:text-left">
                <div className="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* <!-- Tailwind Elements section --> */}
                    <div className="">
                    <h6
                        className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="mr-3 h-4 w-4">
                        <path
                            d="M12.378 1.602a.75.75 0 00-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03zM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 00.372-.648V7.93zM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 00.372.648l8.628 5.033z" />
                        </svg>
                        Tailwind ELEMENTS
                    </h6>
                    <p>
                        Here you can use rows and columns to organize your footer
                        content.
                    </p>
                    </div>
                    {/* <!-- Products section --> */}
                    <div className="">
                    <h6
                        className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
                        Products
                    </h6>
                    <p className="mb-4">
                        <Link to="/" className="text-neutral-600 dark:text-neutral-200"
                        >Angular</Link>
                    </p>
                    <p className="mb-4">
                        <Link to="/" className="text-neutral-600 dark:text-neutral-200"
                        >React</Link>
                    </p>
                    </div>
                    {/* <!-- Useful links section --> */}
                    <div className="">
                    <h6
                        className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
                        Useful links
                    </h6>
                    <p className="mb-4">
                        <Link to="/" className="text-neutral-600 dark:text-neutral-200"
                        >Pricing</Link>
                    </p>
                    <p className="mb-4">
                        <Link to="/" className="text-neutral-600 dark:text-neutral-200"
                        >Settings</Link>
                    </p>
                    </div>
                    {/* <!-- Contact section --> */}
                    <div>
                    <h6
                        className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
                        Contact
                    </h6>
                    <p className="mb-4 flex items-center justify-center md:justify-start">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="mr-3 h-5 w-5">
                        <path
                            d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                        <path
                            d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                        </svg>
                        New York, NY 10012, US
                    </p>
                    <p className="mb-4 flex items-center justify-center md:justify-start">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="mr-3 h-5 w-5">
                        <path
                            d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                        <path
                            d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                        </svg>
                        info@example.com
                    </p>
                    </div>
                </div>
            </div>

            {/* <!--Copyright section--> */}
            <div className="bg-red-900 p-6 text-center">
            <span>© 2023 Copyright:</span>
            <Link
                className="font-semibold text-white"
                to="/"
            > Tailwind Elements</Link>
            </div>
        </footer>
        );
}

export default Footer;
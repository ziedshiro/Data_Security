import { useState,useEffect } from "react";
import { NavLink,Outlet } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { FiLogOut } from "react-icons/fi";
import { FaBars,FaXmark } from "react-icons/fa6";

function NavList({className}:any) {
    let active: string;
    
    if(!className && className !== undefined){
        active = "pt-3 border-t-4 border-yellow-500 text-yellow-500 text-base";
    }else{
        active = "border-b-4 pb-1 border-yellow-500 text-yellow-500 text-base ";
    }

    useEffect(() => {

    }, [className]);


    return (
        <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 pb-4 pt-3 ml-4">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
            >
                <NavLink 
                    to='profile'  
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? active:"text-base"
                    }
                >
                    Profile
                </NavLink>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
            >
                <NavLink 
                    to="management" 
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? active:"text-base"
                    }
                >
                    Management
                </NavLink>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
            >
                <NavLink 
                    to="order" 
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? active:"text-base"
                    }
                >
                    Order
                </NavLink>
            </Typography>
        </ul>
    );
}
 
function Store() {
 const [openNav, setOpenNav] = useState(false);
 
  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);
 
  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
 
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
 
  return (
    <div>
        <Navbar className="px-6 py-3 bg-blue-900 border-blue-900 p-0">
            <div className="flex items-center justify-between text-blue-gray-900">
                <div className="hidden lg:block">
                    <NavList className={openNav}/>
                </div>
                <Typography
                    as="a"
                    href="#"
                    variant="h6"
                    className="hidden lg:block mx-4 cursor-pointer py-3 hover:text-yellow-500"
                >
                    <div className="flex justify-center items-center">
                        StoreName<FiLogOut className="ml-2" size={18}/>
                    </div>
                </Typography>
                <IconButton
                    variant="text"
                    className="h-7 w-7 my-4 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden flex ml-4"
                    ripple={false}
                    onClick={() => setOpenNav(!openNav)}
                    >
                    {openNav ? (
                        <FaXmark className="h-7 w-7"/>
                    ) : ( 
                        <FaBars className="h-7 w-7"/>
                    )}
                </IconButton>
            </div>
            <Collapse open={openNav}>
                <NavList />
            </Collapse>
        </Navbar>
        <Outlet/> 
    </div>
  );
}

export default Store;
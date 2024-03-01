import {Outlet} from "react-router-dom"
import AuthNavbar from "./AuthNavbar";
import isLoggedIn from "./checkLogin";

const RootPrivate = () => {
    return<>
    {isLoggedIn("private")}
    <AuthNavbar/>
    <Outlet/>
    </>
};

export default RootPrivate;
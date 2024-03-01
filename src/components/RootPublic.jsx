import { Outlet } from "react-router-dom";
import NonAuthNavbar from "./NonAuthNavbar";
import isLoggedIn from "./checkLogin";


const RootPublic = () => {
  return (
    <>
      {isLoggedIn("public")}
      <NonAuthNavbar />
      <Outlet />
    </>
  );
};

export default RootPublic;

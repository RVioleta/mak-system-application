import { Box, TextField, Stack, FormControl } from "@mui/material";
import { CustomButton } from "./CustomButton";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import isLoggedIn from "./checkLogin";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event) =>{
  setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData.email === email && userData.password === password) {
      localStorage.setItem("isLoggedIn", true)
      NotificationManager.success("You Logged In","",2000)
      navigate("/home/");
      console.log("vo red");
    } else {
      console.log("ne ste registrirani");
    }
  };

  return (
    <>
    {isLoggedIn("login")}
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
        marginTop={"100px"}
      >
        <form>
          <Stack rowGap={3}>
            <FormControl>
              <TextField
                required
                type="email"
                label="email"
                variant="outlined"
                InputProps={{ sx: { borderRadius: "15px" } }}
                onChange={(event) => handleEmailChange(event)}
              />
            </FormControl>
            <FormControl>
              <TextField
                required
                type="password"
                label="password"
                variant="outlined"
                InputProps={{ sx: { borderRadius: "15px" } }}
                onChange={(event) => handlePasswordChange(event)}
              />
            </FormControl>
            <FormControl sx={{ alignItems: "center" }}>
              <CustomButton variant="outlined" onClick={() => handleLogin()}>
                Sing In
              </CustomButton>
            </FormControl>
          </Stack>
        </form>

        {/* <Button onClick={()=>handleLogin()}>Submit</Button> */}
      </Box>
      <NotificationContainer/>
    </>
  );
};
export default Login;

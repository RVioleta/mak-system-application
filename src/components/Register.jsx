import { useState } from "react";
import {
  TextField,
  Box,
  Button,
  FormControl,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';



const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const validateRegister = () => {
    if (email.includes("@") && password === confirmPassword) {
      const userObj = {
        userName: userName,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      };
      localStorage.setItem("userData", JSON.stringify(userObj));
      NotificationManager.success('Success Registation', '', 2000);
      console.log("uspesno");
      navigate("/login/");
      
    } else {
      NotificationManager.error('There is an error', '', 2000);
    }
  };

  return (
    <>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
        marginTop={"100px"}
      >
        <form sx={{ width: "500px" }}>
          <Stack rowGap={3}>
            <FormControl>
              <TextField
                type="text"
                required
                label="username"
                variant="outlined"
                InputProps={{ sx: { borderRadius: "15px" } }}
                onChange={(event) => handleUserNameChange(event)}
              />
            </FormControl>

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
                onChange={(event) => handlePassword(event)}
              />
            </FormControl>

            <FormControl>
              <TextField
                required
                type="password"
                label="confirm password"
                InputProps={{ sx: { borderRadius: "15px" } }}
                onChange={(event) => handleConfirmPasswordChange(event)}
              />
            </FormControl>
          </Stack>
        </form>

        <Box sx={{ width: "100px", marginTop: "30px" }}>
          <Button
            onClick={() => validateRegister()}
            sx={{
              color: "black",
              border: "1px solid grey",
              borderRadius: "10px",
              padding: "10px 20px",
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
      <NotificationContainer/>
    </>
  );
};

export default Register;

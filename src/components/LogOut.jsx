import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const LogOut = () => {
  const removeItem = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("isLoggedIn");
    console.log("izbrisano");
  };
  const userData = JSON.parse(localStorage.getItem("userData"));
  return (

    <>


      <Box sx={{ textAlign: "center", marginTop: "100px" }}>
        <Typography variant="h4">{userData.userName} are you sure to Log Out?</Typography>
        <Box>
          <Button
            sx={{
              marginTop: "30px",
              marginRight: "30px",
              background: "#cfe2f3",
            }}
          >
            <Link
              to="/home/"
              style={{
                textDecoration: "none",
                color: "#01174b",
                padding: "10px 20px",
                borderRadius: "10px",
              }}
            >
              Cansel
            </Link>
          </Button>

          <Button
            sx={{
              marginTop: "30px",
              background: "#cfe2f3",
            }}
          >
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                color: "#01174b",
                padding: "10px 20px",
                borderRadius: "10px",
              }}
              onClick={removeItem}
            >
              Log Out
            </Link>
          </Button>
        </Box>
      </Box>
    </>
  );
};
export default LogOut;

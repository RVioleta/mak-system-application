import { Box, Typography } from "@mui/material";
import Divider from '@mui/material/Divider';

const User = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));

  return (
    <>
      <Box sx={{   textAlign:"center",  padding:"10px", borderRadius:"10px", margin:"20px 0 "}}>
        <root>
        <Divider textAlign="right">
        <Typography variant="h4"> Welcome {userData.userName} </Typography>
        </Divider>
        </root>
       
      
      </Box>
    </>
  );
};

export default User;
